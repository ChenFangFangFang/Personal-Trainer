import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useState, useEffect } from "react";
import groupBy from "lodash.groupby";
import sumBy from "lodash.sumby";
import { useTheme } from '@mui/material/styles';

export default function Statistics() {
    const [trainings, SetTrainings] = useState([])
    const theme = useTheme();
    useEffect(() => fetchData(), [])
    const fetchData = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings')
            .then(response => response.json())
            .then(data => SetTrainings(data._embedded.trainings))
            .catch(error => console.log('Error fetching data:', error))
    }
    const normalizedTrainings = trainings.map(training => ({
        ...training,
        activity: training.activity.toLowerCase() // Normalize to lowercase for case-insensitive grouping
    }));
    const activityGroups = groupBy(normalizedTrainings, 'activity');

    const activityDurations = Object.entries(activityGroups).map(([activity, sessions]) => {
        const totalDuration = sumBy(sessions, 'duration');
        return { activity, totalDuration };
    });


    return (
        <div style={{ width: '100%', height: '500px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityDurations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="activity" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalDuration" name="Activity" fill={theme.palette.training.main} />
                </BarChart>
            </ResponsiveContainer>
        </div>

    )
}