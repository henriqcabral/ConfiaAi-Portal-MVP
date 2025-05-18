export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://confiaai-backend-dyg5dbcfaugfaqft.canadacentral-01.azurewebsites.net',
  ENDPOINTS: {
    ANALYZE_POLICY: '/api/analyze-policy'
  }
} as const;

export const getApiUrl = (endpoint: keyof typeof API_CONFIG.ENDPOINTS): string => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS[endpoint]}`;
};

export const defaultFetchOptions = {
  credentials: 'include' as const,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
}; 