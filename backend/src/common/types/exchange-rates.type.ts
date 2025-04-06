export interface ExchangeRates {
  EUR: number;
  BRL: number;
  JPY: number;
  AUD: number;
  CAD: number;
}

export interface ExchangeRatesResponse {
  data: {
    usd: {
      eur: string;
      brl: string;
      jpy: string;
      aud: string;
      cad: string;
    };
  };
}
