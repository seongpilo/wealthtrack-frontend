export interface TradeLog {
  date: string;
  name: string;
  type: 'BUY' | 'SELL';
  price: number;
  quantity: number;
}

export function parseStockCsv(csvText: string): TradeLog[] {
  const lines = csvText.split('\n');
  const result: TradeLog[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const [date, name, type, price, quantity] = line.split(',');
    result.push({
      date,
      name,
      type: type === '매수' ? 'BUY' : 'SELL',
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
    });
  }
  return result;
}
