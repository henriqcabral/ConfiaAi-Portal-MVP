import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { PolicyData } from '@/lib/analyze-policy';

// Inicializa o cliente OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    // Verifica se a chave de API está configurada
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'A chave de API da OpenAI não está configurada' },
        { status: 500 }
      );
    }

    // Extrai os dados da requisição
    const { message, policyData }: { message: string; policyData: PolicyData | null } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Mensagem não fornecida' },
        { status: 400 }
      );
    }

    // Cria o contexto para o assistente baseado nos dados da apólice
    let systemPrompt = 'Você é um assistente especializado em seguros de automóveis. ';
    
    if (policyData) {
      systemPrompt += `
        Os dados da apólice do usuário são:
        - Número da apólice: ${policyData.policyNumber}
        - Seguradora: ${policyData.insurer}
        - Vigência: ${policyData.validFrom} a ${policyData.validTo}
        - Veículo: ${policyData.vehicle.make} ${policyData.vehicle.model} (${policyData.vehicle.year})
        - Placa: ${policyData.vehicle.licensePlate}
        - Franquia: ${policyData.deductible}
        
        Coberturas:
        ${policyData.coverages.map((c) => `- ${c.title}: ${c.description}. Limite: ${c.limit}`).join('\n')}
        
        Exclusões:
        ${policyData.exclusions.map((e) => `- ${e}`).join('\n')}
        
        Assistência 24h:
        ${policyData.assistance.map((a) => `- ${a}`).join('\n')}
      `;
    }

    systemPrompt += `
      Responda às perguntas do usuário de forma clara e simples, evitando jargões técnicos.
      Se não souber a resposta, diga que não tem essa informação e sugira que o usuário entre em contato com a seguradora.
      Responda sempre em português do Brasil.
    `;

    // Chama a API da OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    // Extrai a resposta do assistente
    const assistantMessage = completion.choices[0]?.message?.content || 'Desculpe, não consegui processar sua pergunta.';

    // Retorna a resposta
    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    // console.error('Erro ao processar a mensagem:', error);
    return NextResponse.json(
      { error: 'Erro ao processar a mensagem' },
      { status: 500 }
    );
  }
} 