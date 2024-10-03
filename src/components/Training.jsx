import React from "react";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid


export default function Customer() {
    const [trainings, SetTrainings] = useState([])
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
    const [columnDefs, setColumnDefs] = useState([
        { field: "date", valueFormatter: (params) => dayjs(params.value).format('DD-MM-YYYY'), filter: true, floatingFilter: true },
        { field: "duration", filter: true, floatingFilter: true },
        { field: "activity", filter: true, floatingFilter: true },
        { field: "customer.firstname", headerName: 'First Name', filter: true, floatingFilter: true },
        { field: "customer.lastname", headerName: 'Last Name', filter: true, floatingFilter: true }

    ])
    return (

        <div style={{ width: '100%' }}>
            <div className="ag-theme-quartz" style={{ width: '100%', height: 600 }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 20, 50]}
                    domLayout='autoHeight'
                />
            </div>
        </div>


    )
}