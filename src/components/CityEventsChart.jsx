// src/components/CityEventsChart.jsx

import React , {useState, useEffect} from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CityEventsChart = ({ allLocations, allEvents }) => {
    const [data, setData] = useState([]);

    // Update chart data when the full events dataset or locations change
    useEffect(() => {
        // Prepare data for the scatter chart using the full dataset
        const chartData = allLocations.map((location) => {
            const count = allEvents.filter((event) => event.location === location).length;
            const city = location.split(/,| - /)[0].trim();
            return { city, count };
        });
        setData(chartData);
    }, [allEvents, allLocations]);

    // Render the scatter chart
    return (
        <ResponsiveContainer width="99%" height={400}>
        <ScatterChart
            margin={{
            top: 20,
            right: 20,
            bottom: 60,
            left: -30,
            }}
        >
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="City"
                angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }} />
            <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="A school" data={data} fill="#8884d8" />
        </ScatterChart>
        </ResponsiveContainer>
    );
};

export default CityEventsChart;