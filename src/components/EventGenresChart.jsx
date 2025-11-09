// src/components/EventGenresChart.jsx

import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie } from 'recharts';

// Genres (topics) we are interested in visualizing. Keep at module scope
// so the identity is stable and the effect dependencies stay simple.
const GENRES = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

const EventGenresChart = ({ allEvents }) => {
    // Local state holding pie chart data: array of { name, value }
    const [data, setData] = useState([]);

    // Initialize local data when the full events dataset changes
    useEffect(() => {
        const chartData = GENRES.map((genre) => {
            const filteredEvents = (allEvents || []).filter((event) =>
                event.summary && event.summary.toLowerCase().includes(genre.toLowerCase())
            );
            return {
                name: genre,
                value: filteredEvents.length,
            };
        });
        // Filter out zero-value slices so we don't render empty segments/labels
        const nonZero = chartData.filter(item => item.value > 0);
        setData(nonZero);
    }, [allEvents]);

    // Customized label renderer: displays "Genre XX%" near each slice
    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
        return percent ? (
            <text
                x={x}
                y={y}
                fill="#8884d8"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${data[index] ? data[index].name : ''} ${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };

    return (
        <div>
            <h2 className="chart-title">Event Themes Popularity</h2>
            <ResponsiveContainer width="99%" height={400}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        fill="#8884d8"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={150}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EventGenresChart;
