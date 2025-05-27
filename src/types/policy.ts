export interface Cobertura {
  nome: string;
  descricao: string;
  valor: string;
}

export interface Beneficio {
  nome: string;
  descricao: string;
}

export interface PolicyData {
  resumo: string;
  coberturas: Cobertura[];
  beneficios: Beneficio[];
  recomendacoes: string[];
  riscos: string[];
} 