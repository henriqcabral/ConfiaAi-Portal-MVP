import OpenAI from 'openai';
import pdfParse from 'pdf-parse';

// Inicializa o cliente OpenAI
const defaultOpenAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface PolicyData {
  policyNumber: string;
  insurer: string;
  validFrom: string;
  validTo: string;
  vehicle: {
    make: string;
    model: string;
    year: string;
    licensePlate: string;
  };
  coverages: Array<{
    title: string;
    description: string;
    limit: string;
  }>;
  deductible: string;
  exclusions: string[];
  assistance: string[];
}

export class PolicyAnalysisError extends Error {
  constructor(message: string, public statusCode: number = 500) {
    super(message);
    this.name = 'PolicyAnalysisError';
  }
}

export async function analyzePolicyFromPDF(file: File, openaiClient: OpenAI = defaultOpenAI): Promise<PolicyData> {
  try {
    // Verifica se a chave de API está configurada
    if (!process.env.OPENAI_API_KEY) {
      throw new PolicyAnalysisError('A chave de API da OpenAI não está configurada', 500);
    }

    // Verifica se o arquivo é um PDF
    if (file.type !== 'application/pdf') {
      throw new PolicyAnalysisError('O arquivo deve ser um PDF', 400);
    }

    try {
      // Converte o arquivo para ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Extrai o texto do PDF
      const pdfData = await pdfParse(buffer);
      const pdfText = pdfData.text;

      if (!pdfText) {
        throw new PolicyAnalysisError('Não foi possível extrair texto do PDF', 400);
      }

      // Cria o prompt para a API da OpenAI
      const prompt = `
        Analise o seguinte texto de uma apólice de seguro de automóvel e extraia as informações principais em formato JSON.
        O JSON deve conter os seguintes campos:
        - policyNumber: número da apólice
        - insurer: nome da seguradora
        - validFrom: data de início da vigência (formato DD/MM/AAAA)
        - validTo: data de término da vigência (formato DD/MM/AAAA)
        - vehicle: objeto com make (marca), model (modelo), year (ano) e licensePlate (placa)
        - coverages: array de objetos com title (título), description (descrição) e limit (limite)
        - deductible: valor da franquia
        - exclusions: array de strings com as exclusões
        - assistance: array de strings com os serviços de assistência 24h

        Texto da apólice:
        ${pdfText}

        Retorne apenas o JSON, sem nenhum texto adicional.
      `;

      // Chama a API da OpenAI
      const completion = await openaiClient.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Você é um assistente especializado em extrair informações de apólices de seguro.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' },
      });

      // Extrai a resposta do assistente
      const responseText = completion.choices[0]?.message?.content;

      if (!responseText) {
        throw new PolicyAnalysisError('Não foi possível obter resposta da API', 500);
      }

      // Tenta fazer o parse do JSON
      try {
        const policyData = JSON.parse(responseText) as PolicyData;
        return policyData;
      } catch (error) {
        console.error('Erro ao fazer parse do JSON:', error);
        throw new PolicyAnalysisError('Erro ao processar os dados da apólice', 500);
      }
    } catch (error) {
      console.error('Erro ao processar o PDF:', error);
      if (error instanceof PolicyAnalysisError) {
        throw error;
      }
      throw new PolicyAnalysisError('Erro ao processar o arquivo PDF', 500);
    }
  } catch (error) {
    if (error instanceof PolicyAnalysisError) {
      throw error;
    }
    console.error('Erro não tratado:', error);
    throw new PolicyAnalysisError('Erro interno ao processar o arquivo', 500);
  }
} 