import { useEffect, useState } from 'react';
import { getStockMovers, StockMover } from '@/lib/api';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TickerBar = () => {
  const [movers, setMovers] = useState<StockMover[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovers = async () => {
      try {
        const data = await getStockMovers();
        setMovers(data);
      } catch (error) {
        console.error('Failed to fetch stock movers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovers();
    const interval = setInterval(fetchMovers, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
        <div className="animate-pulse flex space-x-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2 min-w-fit">
              <div className="w-16 h-4 bg-primary-foreground/20 rounded"></div>
              <div className="w-12 h-4 bg-primary-foreground/20 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-primary text-primary-foreground py-3 overflow-hidden relative">
      <div className="ticker-scroll flex space-x-12 animate-scroll">
        {[...movers, ...movers].map((stock, index) => (
          <div key={`${stock.symbol}-${index}`} className="flex items-center space-x-3 min-w-fit whitespace-nowrap">
            <span className="font-semibold text-sm">{stock.symbol}</span>
            <span className="text-sm">₹{stock.price.toFixed(2)}</span>
            <span className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full ${
              stock.change >= 0 
                ? 'bg-success/20 text-success-foreground' 
                : 'bg-danger/20 text-danger-foreground'
            }`}>
              {stock.change >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
            </span>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        
        .ticker-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default TickerBar;