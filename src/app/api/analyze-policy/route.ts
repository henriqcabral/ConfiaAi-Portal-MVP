import { NextRequest, NextResponse } from 'next/server';
import { analyzePolicyFromPDF, PolicyAnalysisError } from '@/lib/analyze-policy';

// Configuração do runtime
export const runtime = 'nodejs';

// Configuração da rota
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutos

export async function POST(request: NextRequest) {
  try {
    // Extrai o arquivo da requisição
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo foi enviado' },
        { status: 400 }
      );
    }

    // Analisa o arquivo PDF
    const policyData = await analyzePolicyFromPDF(file);
    return NextResponse.json(policyData);
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);

    if (error instanceof PolicyAnalysisError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor ao processar o arquivo' },
      { status: 500 }
    );
  }
} 