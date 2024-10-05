import React from "react";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AddTraining from "./AddTraining";
import DeleteTraining from "./DeleteTraining"
export default function Training() {
    const [trainings, SetTrainings] = useState([])
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const handleAlertClose = () => {
        setAlert({ ...alert, open: false });
    };
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
    const addTraining = (training) => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Error adding training');
                }
                fetchData();
                setAlert({
                    open: true,
                    message: 'Training added successfully',
                    severity: 'success'
                });
            })
            .catch(error => console.log('Error fetching data:', error))

    }
    const deleteTraining = (training, link) => {

        fetch(link, {
            method: 'DELETE',
        })
            .then(res => {
                fetchData()
                setAlert({
                    open: true,
                    message: 'Customer delete successfully',
                    severity: 'success'
                });
            })
            .catch(error => console.log('Error fetching data:', error))
    }
    const [columnDefs, setColumnDefs] = useState([
        { field: "date", valueFormatter: (params) => dayjs(params.value).format('DD-MM-YYYY'), filter: true, floatingFilter: true },
        { field: "duration", filter: true, floatingFilter: true },
        { field: "activity", filter: true, floatingFilter: true },
        { field: "customer.firstname", headerName: 'First Name', filter: true, floatingFilter: true },
        { field: "customer.lastname", headerName: 'Last Name', filter: true, floatingFilter: true },
        {
            headerName: 'Option',
            sortable: false,
            cellRenderer: (row) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <DeleteTraining deleteTraining={deleteTraining} training={row.data} />
                </div>
            ),
            pinned: "right",
        }
    ])
    return (
        <div>

            <AddTraining addTraining={addTraining} />
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
                    <Snackbar
                        open={alert.open}
                        autoHideDuration={4000}
                        onClose={handleAlertClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        <Alert
                            onClose={handleAlertClose}
                            severity={alert.severity}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {alert.message}
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </div>

    )
}