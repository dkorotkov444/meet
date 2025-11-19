// src/components/EventGenresChart.jsx

import React, { useState, useEffect, useRef } from 'react';
import { ResponsiveContainer, PieChart, Pie } from 'recharts';

// Genres (topics) we are interested in visualizing. Keep at module scope
// so the identity is stable and the effect dependencies stay simple.
const GENRES = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

const EventGenresChart = ({ allEvents }) => {
    // Local state holding pie chart data: array of { name, value }
    const [data, setData] = useState([]);
    // Ref + state for responsive outerRadius calculation
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);

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

    // Measure container width and update on resize. Use ResizeObserver when available,
    // fall back to window resize event for environments (like older jsdom) without it.
    useEffect(() => {
        const node = containerRef.current;
        if (!node) return undefined;

        const setWidth = () => {
            const w = Math.max(0, Math.floor(node.getBoundingClientRect().width || 0));
            setContainerWidth(w);
        };

        setWidth();

        let ro;
        if (typeof ResizeObserver !== 'undefined') {
            ro = new ResizeObserver(() => setWidth());
            ro.observe(node);
        } else {
            // fallback: update on window resize
            window.addEventListener('resize', setWidth);
        }

        return () => {
            if (ro && typeof ro.disconnect === 'function') ro.disconnect();
            else window.removeEventListener('resize', setWidth);
        };
    }, []);

    // Compute a responsive outerRadius in pixels based on containerWidth and chart height.
    // Bound it so it never becomes too small or too large.
    const chartHeight = 400; // matches ResponsiveContainer height
    const maxAvail = Math.min(containerWidth || 0, chartHeight);
    const outerRadius = containerWidth
        ? Math.max(60, Math.min(140, Math.floor(maxAvail * 0.28)))
        : 100;

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
        <div ref={containerRef}>
            <h2 className="chart-title">Event Themes Popularity</h2>
            <ResponsiveContainer width="99%" height={400}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        fill="#8884d8"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={outerRadius}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EventGenresChart;
