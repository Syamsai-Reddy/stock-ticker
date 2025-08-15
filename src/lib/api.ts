// Stock API integration with error handling
const BASE_URL = 'https://portal.tradebrains.in/api/assignment';

export interface Stock {
  symbol: string;
  name: string;
  exchange?: string;
  sector?: string;
}

export interface StockSearchResult {
  symbol: string;
  name: string;
  exchange: string;
  sector: string;
}

export interface StockMover {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface StockPrice {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'APIError';
  }
}


export async function searchStocks(keyword: string, length: number = 10): Promise<StockSearchResult[]> {
  if (!keyword.trim()) return [];
  
  try {
    const response = await fetch(`${BASE_URL}/search?keyword=${encodeURIComponent(keyword)}&length=${length}`);
    
    if (!response.ok) {
      throw new APIError(`Search failed: ${response.statusText}`, response.status);
    }
    
    const data = await response.json();
    
    
    if (Array.isArray(data)) {
      return data;
    } else if (data.results) {
      return data.results;
    } else if (data.data) {
      return data.data;
    }
    
    return [];
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
   
    console.warn('API not accessible, using mock data for search:', keyword);
    return generateMockSearchResults(keyword);
  }
}


export async function getStockMovers(): Promise<StockMover[]> {
  try {
    const response = await fetch(`${BASE_URL}/index/NIFTY/movers/`);
    
    if (!response.ok) {
      throw new APIError(`Failed to fetch movers: ${response.statusText}`, response.status);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : data.movers || [];
  } catch (error) {
    console.warn('API not accessible, using mock data for movers');
    return generateMockMovers();
  }
}


export async function getStockPrices(
  symbol: string, 
  days: number = 1, 
  type: 'INTRADAY' | 'DAILY' = 'INTRADAY', 
  limit: number = 100
): Promise<StockPrice[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/stock/${encodeURIComponent(symbol)}/prices?days=${days}&type=${type}&limit=${limit}`
    );
    
    if (!response.ok) {
      throw new APIError(`Failed to fetch prices for ${symbol}: ${response.statusText}`, response.status);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : data.prices || [];
  } catch (error) {
    console.warn(`API not accessible, using mock data for ${symbol}`);
    return generateMockPriceData(symbol);
  }
}


function generateMockSearchResults(keyword: string): StockSearchResult[] {
  const mockStocks = [
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', exchange: 'NSE', sector: 'Oil & Gas' },
    { symbol: 'TCS', name: 'Tata Consultancy Services', exchange: 'NSE', sector: 'IT Services' },
    { symbol: 'INFY', name: 'Infosys Limited', exchange: 'NSE', sector: 'IT Services' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', exchange: 'NSE', sector: 'Banking' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Limited', exchange: 'NSE', sector: 'Banking' },
    { symbol: 'ADANIPORTS', name: 'Adani Ports & SEZ Ltd', exchange: 'NSE', sector: 'Infrastructure' },
    { symbol: 'ASIANPAINT', name: 'Asian Paints Limited', exchange: 'NSE', sector: 'Paints' },
    { symbol: 'AXISBANK', name: 'Axis Bank Limited', exchange: 'NSE', sector: 'Banking' },
    { symbol: 'BAJFINANCE', name: 'Bajaj Finance Limited', exchange: 'NSE', sector: 'NBFC' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Limited', exchange: 'NSE', sector: 'Telecom' },
  ];
  
  return mockStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(keyword.toLowerCase()) ||
    stock.name.toLowerCase().includes(keyword.toLowerCase())
  ).slice(0, 5);
}

function generateMockMovers(): StockMover[] {
  const mockMovers = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 45.30, changePercent: 1.88 },
    { symbol: 'TCS', name: 'TCS Limited', price: 3234.20, change: -23.45, changePercent: -0.72 },
    { symbol: 'INFY', name: 'Infosys Ltd', price: 1456.80, change: 34.25, changePercent: 2.41 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1623.45, change: -12.30, changePercent: -0.75 },
    { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 945.60, change: 18.75, changePercent: 2.02 },
  ];
  
  return mockMovers;
}

function generateMockPriceData(symbol: string): StockPrice[] {
  const basePrice = Math.random() * 2000 + 500; // Random price between 500-2500
  const data: StockPrice[] = [];
  const now = new Date();
  
  for (let i = 49; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 15 * 60 * 1000).toISOString(); // 15-minute intervals
    const volatility = 0.02; // 2% volatility
    const change = (Math.random() - 0.5) * volatility * basePrice;
    const price = basePrice + change * (i / 50); // Trending effect
    
    data.push({
      timestamp,
      open: price,
      high: price * (1 + Math.random() * 0.01),
      low: price * (1 - Math.random() * 0.01),
      close: price,
      volume: Math.floor(Math.random() * 100000) + 10000,
    });
  }
  
  return data;
}