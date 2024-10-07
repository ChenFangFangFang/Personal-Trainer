"use strict";
import React from "react";
import { useCallback, useRef, useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import AddCustomer from "./AddCustomer";
import Button from '@mui/material/Button';

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import EditCustomer from "./EditCustomer";
import DeleteCustomer from "./DeleteCustomer";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { CsvExportModule } from "@ag-grid-community/csv-export";
// Register the CSV export module
ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    CsvExportModule,

]);

export default function Customer() {
    const gridRef = useRef();

    const [customers, SetCustomers] = useState([])
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => fetchData(), [])
    const handleAlertClose = () => {
        setAlert({ ...alert, open: false });
    };
    const fetchData = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
            .then(response => response.json())
            .then(data => SetCustomers(data._embedded.customers))
            .catch(error => console.log('Error fetching data:', error))
    }
    const [columnDefs, setColumnDefs] = useState([
        { field: "firstname", headerName: 'First Name', filter: true, floatingFilter: true, maxWidth: 120 },
        { field: "lastname", headerName: 'Last Name', filter: true, floatingFilter: true, maxWidth: 120 },
        { field: "streetaddress", headerName: 'Street Address', filter: true, floatingFilter: true, maxWidth: 200 },
        { field: "postcode", filter: true, floatingFilter: true, maxWidth: 120 },
        { field: "city", filter: true, floatingFilter: true, maxWidth: 120 },
        { field: "email", filter: true, floatingFilter: true, },
        { field: "phone", filter: true, floatingFilter: true, },
        {
            colId: 'option',
            headerName: 'Option',
            sortable: false,
            cellRenderer: (row) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <EditCustomer updateCustomer={updateCustomer} customer={row.data} />
                    <DeleteCustomer deleteCustomer={deleteCustomer} customer={row.data} />
                </div>
            ),
            pinned: "right",

        },
    ])
    const addCustomer = (customer) => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)

        })
            .then(res => {
                fetchData()
                setAlert({
                    open: true,
                    message: 'Customer added successfully',
                    severity: 'success'
                });
            })
            .catch(error => console.log('Error fetching data:', error))
    }
    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)

        })
            .then(res => {
                fetchData()
                setAlert({
                    open: true,
                    message: 'Customer updated successfully',
                    severity: 'success'
                });
            })
            .catch(error => console.log('Error fetching data:', error))
    }
    const deleteCustomer = (customer, link) => {
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
    // Function to export data as CSV
    const onBtnExport = useCallback(() => {
        const date = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
        const filename = `customer_data_${date}.csv`;

        const exportColumns = columnDefs.filter(col => col.colId !== 'editColumn');
        const params = {
            columnKeys: exportColumns.map(col => col.field), // Only include columns without the 'editColumn' colId
            fileName: filename
        };
        gridRef.current.api.exportDataAsCsv(params); // Export CSV if gridRef exists

    }, [columnDefs, gridRef]);
    return (
        <div>
            <AddCustomer addCustomer={addCustomer} />
            <Button
                variant="contained"
                onClick={onBtnExport}
                sx={{ marginBottom: 2, marginLeft: 2 }} // This adds space below the button
            >
                Export file
            </Button>
            <div style={{ width: '100%', height: '600px' }}>
                <div className="ag-theme-quartz" style={{ width: '100%', height: 600 }}>
                    <AgGridReact
                        ref={gridRef}//Bind ref to AgGridReact component
                        rowData={customers}
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