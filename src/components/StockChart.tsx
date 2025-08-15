import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { format } from 'date-fns';
import { StockPrice } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface StockChartProps {
  data: StockPrice[];
  symbol: string;
  loading?: boolean;
}

const StockChart = ({ data, symbol, loading }: StockChartProps) => {
  const chartData = useMemo(() => {
    return data.map((item) => {
      
      const timestamp = new Date(item.timestamp);
      const isValidDate = !isNaN(timestamp.getTime());
      
      return {
        ...item,
        time: isValidDate ? format(timestamp, 'HH:mm') : 'Invalid',
        formattedTime: isValidDate ? format(timestamp, 'MMM dd, HH:mm') : 'Invalid Date',
      };
    });
  }, [data]);

  const priceChange = useMemo(() => {
    if (data.length < 2) return { change: 0, changePercent: 0, isPositive: true };
    
    const first = data[0].close;
    const last = data[data.length - 1].close;
    const change = last - first;
    const changePercent = (change / first) * 100;
    
    return {
      change,
      changePercent,
      isPositive: change >= 0,
    };
  }, [data]);

  const stats = useMemo(() => {
    if (data.length === 0) return null;
    
    const prices = data.map(d => d.close);
    const high = Math.max(...prices);
    const low = Math.min(...prices);
    const volume = data.reduce((sum, d) => sum + d.volume, 0);
    const avgVolume = volume / data.length;
    
    return { high, low, avgVolume };
  }, [data]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Price Chart</span>
            </CardTitle>
            <div className="animate-pulse h-6 w-20 bg-muted rounded"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Loading chart data...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Price Chart</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-lg font-medium">No chart data available</p>
              <p className="text-sm text-muted-foreground">Chart data for {symbol} could not be loaded</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border rounded-lg shadow-medium p-3">
          <p className="font-medium text-sm mb-2">{data.formattedTime}</p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between space-x-4">
              <span className="text-muted-foreground">Close:</span>
              <span className="font-medium">₹{data.close.toFixed(2)}</span>
            </div>
            <div className="flex justify-between space-x-4">
              <span className="text-muted-foreground">High:</span>
              <span className="text-success">₹{data.high.toFixed(2)}</span>
            </div>
            <div className="flex justify-between space-x-4">
              <span className="text-muted-foreground">Low:</span>
              <span className="text-danger">₹{data.low.toFixed(2)}</span>
            </div>
            <div className="flex justify-between space-x-4">
              <span className="text-muted-foreground">Volume:</span>
              <span className="font-medium">{data.volume.toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>{symbol} Price Chart</span>
          </CardTitle>
          <Badge 
            variant={priceChange.isPositive ? "default" : "destructive"}
            className={`flex items-center space-x-1 ${
              priceChange.isPositive 
                ? 'bg-success text-success-foreground' 
                : 'bg-danger text-danger-foreground'
            }`}
          >
            {priceChange.isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>
              {priceChange.isPositive ? '+' : ''}{priceChange.changePercent.toFixed(2)}%
            </span>
          </Badge>
        </div>
        
        {stats && (
          <div className="flex space-x-6 text-sm">
            <div className="text-center">
              <div className="text-muted-foreground">High</div>
              <div className="font-semibold text-success">₹{stats.high.toFixed(2)}</div>
            </div>
            <div className="text-center">
              <div className="text-muted-foreground">Low</div>
              <div className="font-semibold text-danger">₹{stats.low.toFixed(2)}</div>
            </div>
            <div className="text-center">
              <div className="text-muted-foreground">Avg Volume</div>
              <div className="font-semibold">{stats.avgVolume.toLocaleString()}</div>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={priceChange.isPositive ? "hsl(var(--success))" : "hsl(var(--danger))"} 
                    stopOpacity={0.3}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={priceChange.isPositive ? "hsl(var(--success))" : "hsl(var(--danger))"} 
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              
              <XAxis 
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={['dataMin', 'dataMax']}
                tickFormatter={(value) => `₹${value.toFixed(0)}`}
              />
              
              <Tooltip content={<CustomTooltip />} />
              
              <Area
                type="monotone"
                dataKey="close"
                stroke={priceChange.isPositive ? "hsl(var(--success))" : "hsl(var(--danger))"}
                strokeWidth={2}
                fill="url(#priceGradient)"
                dot={false}
                activeDot={{ 
                  r: 4, 
                  fill: priceChange.isPositive ? "hsl(var(--success))" : "hsl(var(--danger))",
                  strokeWidth: 2,
                  stroke: "white"
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockChart;