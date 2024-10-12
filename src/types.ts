export interface Alert {
  id: number;
  url: string;
  currentPrice: number;
  lastCheckedPrice: number;
  status: 'Monitoreando' | 'Cambio detectado';
}