import React from "react";
import { useEffect, useState } from "react";

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid


export default function Customer() {
    const [customers, SetCustomers] = useState([])

    useEffect(() => fetchData(), [])

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
        { field: "email", filter: true, floatingFilter: true, maxWidth: 150 },
        { field: "phone", filter: true, floatingFilter: true, maxWidth: 180 }
    ])
    return (

        <div style={{ width: '100%' }}>
            <div className="ag-theme-quartz" style={{ width: '100%', height: 600 }}>
                <AgGridReact
                    rowData={customers}
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