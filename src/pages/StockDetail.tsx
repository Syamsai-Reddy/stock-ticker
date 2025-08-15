import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, TrendingUp, TrendingDown, DollarSign, Activity, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import StockChart from '@/components/StockChart';
import SEOHead from '@/components/SEOHead';
import { getStockPrices, StockPrice } from '@/lib/api';
import { cn } from '@/lib/utils';

const StockDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const [priceData, setPriceData] = useState<StockPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) {
      navigate('/');
      return;
    }

    const fetchStockData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const prices = await getStockPrices(symbol, 1, 'INTRADAY', 50);
        setPriceData(prices);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stock data');
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbol, navigate]);

  const currentPrice = priceData.length > 0 ? priceData[priceData.length - 1] : null;
  const previousPrice = priceData.length > 1 ? priceData[priceData.length - 2] : null;
  
  const priceChange = currentPrice && previousPrice 
    ? currentPrice.close - previousPrice.close 
    : 0;
  
  const priceChangePercent = currentPrice && previousPrice && previousPrice.close !== 0
    ? (priceChange / previousPrice.close) * 100 
    : 0;

  const isPositive = priceChange >= 0;

  const stockStats = currentPrice ? {
    symbol: symbol!,
    price: currentPrice.close,
    change: priceChange,
    changePercent: priceChangePercent,
  } : undefined;

  if (!symbol) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${symbol} Stock Price - Live Chart & Analysis | Stock Ticker`}
        description={`View live ${symbol} stock price, interactive charts, and detailed analysis. Get real-time market data and trading insights for ${symbol}.`}
        keywords={`${symbol}, ${symbol} stock price, ${symbol} live chart, stock analysis, financial data, trading`}
        canonicalUrl={`${window.location.origin}/stock/${symbol}`}
        stockData={stockStats}
      />

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Search</span>
          </Button>
        </div>

        {/* Stock Info Header */}
        
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold flex items-center space-x-3">
                <Building2 className="w-8 h-8 text-primary" />
                <span>{symbol}</span>
              </h1>
              <p className="text-muted-foreground mt-1">Live stock price and chart analysis</p>
            </div>
            
            {loading ? (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>
            ) : currentPrice && (
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold">₹{currentPrice.close.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">Current Price</div>
                </div>
                <Badge 
                  variant={isPositive ? "default" : "destructive"}
                  className={cn(
                    "flex items-center space-x-1 px-3 py-1",
                    isPositive 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-danger text-danger-foreground'
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>
                    {isPositive ? '+' : ''}₹{Math.abs(priceChange).toFixed(2)} ({isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%)
                  </span>
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Error State */}
        
        {error && (
          <Card className="mb-6 border-danger">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 text-danger">
                <Activity className="w-5 h-5" />
                <div>
                  <p className="font-medium">Unable to load stock data</p>
                  <p className="text-sm text-muted-foreground mt-1">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <StockChart data={priceData} symbol={symbol} loading={loading} />
          </div>

          {/* Side Panel - Stock Info */}
          <div className="space-y-6">

            {/* Key Metrics */}
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Key Metrics</span>
                </CardTitle>
                <CardDescription>Latest trading session data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    ))}
                  </>
                ) : currentPrice ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Open</span>
                      <span className="font-medium">₹{currentPrice.open.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">High</span>
                      <span className="font-medium text-success">₹{currentPrice.high.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Low</span>
                      <span className="font-medium text-danger">₹{currentPrice.low.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Volume</span>
                      <span className="font-medium">{currentPrice.volume.toLocaleString()}</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No data available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Market Status */}
        
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Market Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">
                    Last updated: {new Date().toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Data refreshes automatically every 30 seconds during market hours
                </p>
              </CardContent>
            </Card>

            {/* Actions */}
        
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    if (currentPrice) {
                      const shareText = `${symbol}: ₹${currentPrice.close.toFixed(2)} (${isPositive ? '+' : ''}${priceChangePercent.toFixed(2)}%)`;
                      if (navigator.share) {
                        navigator.share({
                          title: `${symbol} Stock Price`,
                          text: shareText,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(`${shareText} - ${window.location.href}`);
                      }
                    }
                  }}
                >
                  Share Stock
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.reload()}
                >
                  Refresh Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;