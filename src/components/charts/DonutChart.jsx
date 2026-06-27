'use client';

import React from 'react';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from 'recharts';

const DEFAULT_COLORS = [
    '#4F46E5', '#16A34A', '#9333EA', '#EC4899',
    '#F59E0B', '#EF4444', '#0284C7', '#14B8A6'
];

export default function DonutChart({
    title = "Data Distribution",
    data = [],
    dataKey = "value",
    nameKey = "name",
    centerLabel = "Total",
    isDark = false,
    colors = DEFAULT_COLORS,
    emptyMessage = "No data available"
}) {
    // Dynamically compute the total sum for the center hole display
    const totalCount = data.reduce((sum, item) => sum + (Number(item[dataKey]) || 0), 0);

    return (
        <div className={`max-h-[500px] p-6 rounded-lg border ${isDark
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
                <div className="h-[320px] pb-12 relative" style={{ width: '100%', height: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius="80%"
                                outerRadius="100%"
                                cornerRadius={10}
                                paddingAngle={5}
                                dataKey={dataKey}
                                nameKey={nameKey}
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={colors[index % colors.length]}
                                    />
                                ))}
                            </Pie>

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
                            />

                            <Legend
                                verticalAlign="bottom"
                                iconType="circle"
                                iconSize={10}
                                wrapperStyle={{
                                    paddingTop: '20px',
                                    fontSize: '12px'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Centered Donut Hole Total Counter */}
                    <div className="absolute top-[25%] tablet:top-[33%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        <p className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-text-primary' : 'text-text-primary'}`}>
                            {totalCount}
                        </p>
                        <p className={`text-xs uppercase tracking-wider font-semibold ${isDark ? 'text-text-secondary' : 'text-text-secondary'}`}>
                            {centerLabel}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
