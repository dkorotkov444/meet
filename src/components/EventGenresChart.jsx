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
        setData(chartData);
    }, [allEvents]);

    return (
        <div>
            <h2 className="chart-title">Event Genres Popularity</h2>
            <ResponsiveContainer width="99%" height={400}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        fill="#8884d8"
                        labelLine={false}
                        label
                        outerRadius={130}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EventGenresChart;
