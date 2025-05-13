import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyzePolicyFromPDF, PolicyAnalysisError } from './analyze-policy';
import OpenAI from 'openai';
import pdfParse from 'pdf-parse';

// Mock das dependências
vi.mock('openai');
vi.mock('pdf-parse', () => ({
  default: vi.fn().mockImplementation(async (buffer) => {
    console.log('Mock pdf-parse chamado com buffer:', buffer);
    return {
      text: 'Texto de exemplo da apólice'
    };
  })
}));

describe('analyzePolicyFromPDF', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.OPENAI_API_KEY = 'test-key';
  });

  it('deve lançar erro se a chave da API não estiver configurada', async () => {
    delete process.env.OPENAI_API_KEY;
    const file = new File([''], 'test.pdf', { type: 'application/pdf' });

    await expect(analyzePolicyFromPDF(file)).rejects.toThrow(
      new PolicyAnalysisError('A chave de API da OpenAI não está configurada', 500)
    );
  });

  it('deve lançar erro se o arquivo não for PDF', async () => {
    const file = new File([''], 'test.txt', { type: 'text/plain' });

    await expect(analyzePolicyFromPDF(file)).rejects.toThrow(
      new PolicyAnalysisError('O arquivo deve ser um PDF', 400)
    );
  });

  it('deve processar um PDF válido corretamente', async () => {
    console.log('Iniciando teste de processamento de PDF válido');

    // Mock da resposta da OpenAI
    const mockOpenAI = {
      chat: {
        completions: {
          create: vi.fn().mockImplementation(async () => {
            console.log('Mock OpenAI chamado');
            return {
              choices: [{
                message: {
                  content: JSON.stringify({
                    policyNumber: '123456',
                    insurer: 'Teste Seguros',
                    validFrom: '01/01/2024',
                    validTo: '31/12/2024',
                    vehicle: {
                      make: 'Toyota',
                      model: 'Corolla',
                      year: '2023',
                      licensePlate: 'ABC1234'
                    },
                    coverages: [
                      {
                        title: 'Colisão',
                        description: 'Cobertura para danos em colisão',
                        limit: 'R$ 100.000,00'
                      }
                    ],
                    deductible: 'R$ 1.000,00',
                    exclusions: ['Danos por enchente'],
                    assistance: ['Guincho 24h']
                  })
                }
              }]
            };
          })
        }
      }
    };

    (OpenAI as any).mockImplementation(() => {
      console.log('Mock OpenAI instanciado');
      return mockOpenAI;
    });

    // Criar um arquivo PDF mock
    const fileContent = new Uint8Array([0x25, 0x50, 0x44, 0x46]); // %PDF em bytes
    const file = new File([fileContent], 'test.pdf', { type: 'application/pdf' });
    console.log('Arquivo mock criado:', file);

    try {
      const result = await analyzePolicyFromPDF(file, mockOpenAI as any);
      console.log('Resultado obtido:', result);

      // Verificar se o pdf-parse foi chamado
      expect(pdfParse).toHaveBeenCalled();
      console.log('pdf-parse foi chamado');

      // Verificar se a OpenAI foi chamada
      expect(mockOpenAI.chat.completions.create).toHaveBeenCalled();
      console.log('OpenAI foi chamada');

      // Verificar o resultado
      expect(result).toEqual({
        policyNumber: '123456',
        insurer: 'Teste Seguros',
        validFrom: '01/01/2024',
        validTo: '31/12/2024',
        vehicle: {
          make: 'Toyota',
          model: 'Corolla',
          year: '2023',
          licensePlate: 'ABC1234'
        },
        coverages: [
          {
            title: 'Colisão',
            description: 'Cobertura para danos em colisão',
            limit: 'R$ 100.000,00'
          }
        ],
        deductible: 'R$ 1.000,00',
        exclusions: ['Danos por enchente'],
        assistance: ['Guincho 24h']
      });
      console.log('Teste concluído com sucesso');
    } catch (error) {
      console.error('Erro durante o teste:', error);
      throw error;
    }
  });
}); 