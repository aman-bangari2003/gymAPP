import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp } from 'lucide-react';

const ProgressChart = () => {
  const data = [
    { day: 'Mon', weight: 79.0 },
    { day: 'Tue', weight: 78.8 },
    { day: 'Wed', weight: 78.6 },
    { day: 'Thu', weight: 78.5 },
    { day: 'Fri', weight: 78.4 },
    { day: 'Sat', weight: 78.2 },
    { day: 'Sun', weight: 78.1 },
  ];

  return (
    <div className="dash-card" style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={styles.cardIconWrapper}>
          <TrendingUp size={24} color="var(--primary-color)" />
        </div>
        <h2 style={styles.cardTitle}>Weekly <span>Progress</span></h2>
      </div>

      <div style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              domain={['dataMin - 0.5', 'dataMax + 0.5']} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--bg-card)', 
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'white'
              }}
              itemStyle={{ color: 'var(--primary-color)' }}
            />
            <Area 
              type="monotone" 
              dataKey="weight" 
              stroke="var(--primary-color)" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorWeight)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.chartFooter}>
        <div style={styles.footerStat}>
          <span style={styles.footerLabel}>Total Change</span>
          <span style={styles.footerValue}>-0.9 kg</span>
        </div>
        <div style={styles.footerStat}>
          <span style={styles.footerLabel}>Weekly Avg</span>
          <span style={styles.footerValue}>78.5 kg</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'var(--bg-card)',
    padding: '2rem',
    borderRadius: '16px',
    border: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    height: '420px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  cardIconWrapper: {
    width: '48px',
    height: '48px',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: '1.4rem',
    color: 'white',
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  chartContainer: {
    height: '220px',
    width: '100%',
  },
  chartFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid rgba(255,255,255,0.05)',
  },
  footerStat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  footerLabel: {
    color: 'var(--text-muted)',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  footerValue: {
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '800',
  }
};

export default ProgressChart;
