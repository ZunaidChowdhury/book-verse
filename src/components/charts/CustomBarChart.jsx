'use client';

import React from 'react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from 'recharts';

export default function CustomBarChart({
    title = "Analytics Overview",
    data = [],
    dataKey = "value",
    xAxisKey = "name",
    barColor = "#4F46E5",
    maxBarSize = 50,
    isDark = false,
    emptyMessage = "No data available"
}) {
    return (
        <div className={`p-6 rounded-lg border ${
            isDark
                ? 'bg-gradient-to-b from-[#111836] to-[#0b0f24] border-border-dark'
                : 'bg-foreground border-border-light'
        }`}>
            <h2 className={`text-lg sm:text-xl font-bold mb-6 ${isDark ? 'text-text-primary' : 'text-text-primary'}`}>
                {title}
            </h2>

            {data.length === 0 ? (
                <div className="text-center py-8">
                    <p className={isDark ? 'text-text-secondary' : 'text-text-secondary'}>
                        {emptyMessage}
                    </p>
                </div>
            ) : (
                <div className="h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 20, right: 20, left: -12, bottom: 20 }}>
                            {/* Modern grid lines: clean, soft, and horizontal-only */}
                            <CartesianGrid stroke={isDark ? '#1e293b' : '#f1f5f9'} strokeDasharray="4" vertical={false} />
                            
                            {/* X Axis bound to custom dynamic property mapping keys */}
                            <XAxis 
                                dataKey={xAxisKey} 
                                tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }} 
                                axisLine={false}
                                tickLine={false}
                            />
                            
                            {/* Y Axis configuration */}
                            <YAxis 
                                tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }} 
                                axisLine={false}
                                tickLine={false}
                            />
                            
                            {/* Customized dynamic theme tooltip matching your donut framework */}
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? '#0b0f24' : '#ffffff',
                                    borderColor: isDark ? '#1e293b' : '#e2e8f0',
                                    borderRadius: '12px',
                                    fontSize: '13px'
                                }}
                                itemStyle={{
                                    color: isDark ? '#f8fafc' : '#0f172a'
                                }}
                                labelStyle={{
                                    color: isDark ? '#94a3b8' : '#64748b'
                                }}
                                cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}
                            />
                            
                            {/* Custom rendered Data Bar element mapping shapes */}
                            <Bar 
                                dataKey={dataKey} 
                                fill={barColor} 
                                radius={[8, 8, 0, 0]} 
                                maxBarSize={maxBarSize} 
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
