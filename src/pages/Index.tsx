import { TrendingUp, Search, BarChart3, Globe, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StockSearch from '@/components/StockSearch';
import TickerBar from '@/components/TickerBar';
import SEOHead from '@/components/SEOHead';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Stock Ticker "
        description="Get live stock prices, interactive charts, and market analysis. Search stocks, view price movements, and track your investments with our professional stock ticker application."
        keywords="stock market, live stock prices, stock charts, market analysis, trading, investment, NSE, BSE, financial data"
        canonicalUrl={window.location.origin}
      />

      {/* Ticker Bar */}
      
      <TickerBar />
      
      {/* Hero Section */}
      
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Professional Stock Ticker
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Track live stock prices, analyze market trends, and make informed investment decisions with our comprehensive stock market platform
            </p>
          </div>
          
          {/* Search Section */}
      
          <div className="max-w-md mx-auto mb-12">
            <StockSearch placeholder="Search stocks (e.g., RELIANCE, TCS, INFY)..." />
            <p className="text-sm text-muted-foreground mt-3">
              Start typing to search from thousands of stocks
            </p>
          </div>

          {/* CTA Buttons */}
      
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gradient-primary hover:bg-primary-hover transition-all px-8">
              <TrendingUp className="w-5 h-5 mr-2" />
              Explore Market
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              <BarChart3 className="w-5 h-5 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      
      <section className="py-20 px-4 bg-accent/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Stock Ticker?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional-grade tools and real-time data for serious investors and traders
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <TrendingUp className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Real-time Data</CardTitle>
                <CardDescription>
                  Get live stock prices and market updates with minimal latency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Live price feeds</li>
                  <li>• Intraday charts</li>
                  <li>• Volume analysis</li>
                  <li>• Market movers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <Search className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Smart Search</CardTitle>
                <CardDescription>
                  Powerful search with autocomplete for quick stock discovery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Instant autocomplete</li>
                  <li>• Symbol & name search</li>
                  <li>• Sector filtering</li>
                  <li>• Exchange information</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <BarChart3 className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Interactive Charts</CardTitle>
                <CardDescription>
                  Professional-grade charts with detailed technical analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Responsive design</li>
                  <li>• Multiple timeframes</li>
                  <li>• Price overlays</li>
                  <li>• Export capabilities</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <Globe className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Market Coverage</CardTitle>
                <CardDescription>
                  Comprehensive coverage of Indian stock exchanges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• NSE & BSE stocks</li>
                  <li>• All major indices</li>
                  <li>• Sector-wise data</li>
                  <li>• F&O instruments</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <Zap className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Optimized performance for seamless user experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Sub-second loading</li>
                  <li>• Cached data</li>
                  <li>• Progressive enhancement</li>
                  <li>• Mobile optimized</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <Shield className="w-10 h-10 text-primary mb-4" />
                <CardTitle>Reliable & Secure</CardTitle>
                <CardDescription>
                  Built with security and reliability as top priorities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Data encryption</li>
                  <li>• 99.9% uptime</li>
                  <li>• Error handling</li>
                  <li>• Privacy focused</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Stocks Section */}
      
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular Stocks to Track
            </h2>
            <p className="text-lg text-muted-foreground">
              Quick access to most searched and traded stocks
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'ICICIBANK', 'ADANIPORTS'].map((symbol) => (
              <Button
                key={symbol}
                variant="outline"
                className="h-16 text-center hover:bg-accent transition-colors"
                onClick={() => window.location.href = `/stock/${symbol}`}
              >
                <div>
                  <div className="font-semibold text-sm">{symbol}</div>
                  <div className="text-xs text-muted-foreground">View Chart</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}

      <footer className="py-12 px-4 bg-card border-t">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">Stock Ticker</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Professional stock market data and analysis platform. Built for traders and investors.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © 2024 Stock Ticker. Market data provided for informational purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
