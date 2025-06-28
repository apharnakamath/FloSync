import React from 'react';
import Card, { CardHeader, CardContent } from 'src/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './styles.css';

export const Analysis = () => {
  // Sample data
  const cycleData = [
    { month: 'Jun', cycleLength: 28, periodLength: 5 },
    { month: 'Jul', cycleLength: 30, periodLength: 4 },
    { month: 'Aug', cycleLength: 29, periodLength: 5 },
    { month: 'Sep', cycleLength: 27, periodLength: 4 },
    { month: 'Oct', cycleLength: 28, periodLength: 5 },
    { month: 'Nov', cycleLength: 29, periodLength: 4 },
  ];

  const averageCycleLength = Math.round(
    cycleData.reduce((sum, data) => sum + data.cycleLength, 0) / cycleData.length
  );

  const averagePeriodLength = Math.round(
    cycleData.reduce((sum, data) => sum + data.periodLength, 0) / cycleData.length
  );

  const nextPeriodDate = new Date();
  nextPeriodDate.setDate(nextPeriodDate.getDate() + 14);

  return (
    <div className="analysis-container">
      {/* Summary Stats */}
      <div className="stats-container">
        <Card>
          <CardContent className="card-content">
            <div className="text-center">
              <h3 className="card-title">Avg. Cycle Length</h3>
              <p className="card-value">{averageCycleLength} days</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="card-content">
            <div className="text-center">
              <h3 className="card-title">Avg. Period Length</h3>
              <p className="card-value">{averagePeriodLength} days</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="card-content">
            <div className="text-center">
              <h3 className="card-title">Next Period</h3>
              <p className="card-value">
                {nextPeriodDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cycle Length Trend */}
      <Card>
        <CardHeader>
          <h2 className="chart-title">Cycle Length Trend</h2>
        </CardHeader>
        <CardContent>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cycleData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[20, 35]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="cycleLength" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ fill: '#2563eb' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Period Length Trend */}
      <Card>
        <CardHeader>
          <h2 className="chart-title">Period Length Trend</h2>
        </CardHeader>
        <CardContent>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cycleData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 7]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="periodLength" 
                  stroke="#dc2626" 
                  strokeWidth={2}
                  dot={{ fill: '#dc2626' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

