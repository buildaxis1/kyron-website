export const fmtUSD = (n: number) => 
  new Intl.NumberFormat('en-US', {
    style: 'currency', 
    currency: 'USD', 
    maximumFractionDigits: 2
  }).format(n);

export const fmtShortUSD = (n: number) => 
  n >= 1e9 ? `$${(n/1e9).toFixed(2)}B` : 
  n >= 1e6 ? `$${(n/1e6).toFixed(2)}M` : 
  fmtUSD(n);

export const fmtInt = (n: number) => 
  new Intl.NumberFormat('en-US').format(n);
