import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import React from "react";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTheme } from '@mui/material/styles';

export default function CalendarPage() {
    const localizer = momentLocalizer(moment)
    const [trainings, SetTrainings] = useState([])
    const theme = useTheme();
    useEffect(() => fetchData(), [])

    const fetchData = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings')
            .then(response => response.json())
            .then(async data => {
                const trainingsWithCustomers = await Promise.all(
                    data._embedded.trainings.map(async (training) => {
                        try {
                            const customerResponse = await fetch(training._links.customer.href);
                            const customerData = await customerResponse.json();
                            return { ...training, customer: customerData }; // 将客户数据添加到训练记录中
                        } catch (error) {
                            console.log(`Error fetching customer for training ${training.id}:`, error);
                            return { ...training, customer: null }; // 如果获取客户数据出错，仍返回训练数据
                        }
                    }))
                SetTrainings(trainingsWithCustomers);
            })
            .catch(error => console.log('Error fetching data:', error))
    }
    const transformToCalendarEvents = () => {
        return trainings.map(training => {
            const start = dayjs(training.date).toDate();
            const end = dayjs(training.date).add(training.duration, 'minute').toDate();
            return {
                title: `${training.activity} / ${training.customer?.firstname || ''} ${training.customer?.lastname || ''}`,
                start,
                end,
            };
        });
    };

    const events = transformToCalendarEvents();
    return (
        <div style={{ height: '80vh' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                titleAccessor="title"
                style={{ height: '100%', }}

                components={{
                    event: ({ event }) => (

                        <div
                        // style={{
                        //     backgroundColor: theme.palette.training.main,

                        // }}
                        >
                            {event.title}
                        </div>
                    ),
                }}
            />
        </div>
    );
}
