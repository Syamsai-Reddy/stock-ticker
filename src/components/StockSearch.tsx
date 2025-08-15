import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, Building2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { searchStocks, StockSearchResult } from '@/lib/api';
import { cn } from '@/lib/utils';

interface StockSearchProps {
  placeholder?: string;
  className?: string;
}

const StockSearch = ({ placeholder = "Search stocks (e.g., RELIANCE, TCS)...", className }: StockSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<StockSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

 
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const delayedSearch = setTimeout(async () => {
      setLoading(true);
      try {
        const searchResults = await searchStocks(query, 8);
        setResults(searchResults);
        setShowResults(true);
        setSelectedIndex(-1);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query]);

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleStockSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleStockSelect = (stock: StockSearchResult) => {
    setQuery(stock.symbol);
    setShowResults(false);
    navigate(`/stock/${stock.symbol}`);
  };

  return (
    <div ref={searchRef} className={cn("relative w-full max-w-md", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setShowResults(true)}
          className="pl-10 h-12 border-border/50 focus:border-primary transition-colors"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
          </div>
        )}
      </div>

      {showResults && (results.length > 0 || loading) && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-medium border-border/50 max-h-80 overflow-y-auto">
          {loading ? (
            <div className="p-4">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                <span className="text-muted-foreground text-sm">Searching...</span>
              </div>
            </div>
          ) : (
            <div className="py-2">
              {results.map((stock, index) => (
                <div
                  key={stock.symbol}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 hover:bg-accent cursor-pointer transition-colors",
                    selectedIndex === index && "bg-accent"
                  )}
                  onClick={() => handleStockSelect(stock)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{stock.symbol}</div>
                      <div className="text-xs text-muted-foreground truncate">{stock.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-right">
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Building2 className="w-3 h-3" />
                      <span>{stock.exchange}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {results.length === 0 && (
                <div className="px-4 py-6 text-center text-muted-foreground">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No stocks found for "{query}"</p>
                  <p className="text-xs mt-1">Try searching with stock symbol or company name</p>
                </div>
              )}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default StockSearch;