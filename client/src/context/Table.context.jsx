import React, { createContext, useContext } from 'react'
import { axiosRequest } from '../utils/serverConnection';
import { useState } from 'react';
import axios from 'axios';



export const TableContext = createContext();
export const TableProvider = ({ children }) => {

    const [currentTable, setCurrentTable] = useState(JSON.parse(localStorage.getItem('table')) || null);
    const token = localStorage.getItem('RestToken');
    const authorization = `Bearer ${token}`;

    const updateCurrentTable = (table) => {
        setCurrentTable(table);
        localStorage.setItem('table', JSON.stringify(table));
    };

    const getAllTable = async () => {
        const url = `/table/getAllTables`
        const getAllTable = await axiosRequest('get', url);
        console.log('get', getAllTable);
        return getAllTable;
    }
    const getTable = async (id) => {
        const url = `/table/getTable/${id}`
        const getTable = await axiosRequest('get', url);
        return getTable;
    }

    const addTable = async (nameTable) => {
        const url = '/table/createTable'
        const data = nameTable
        const Table = await axiosRequest('post', url, data);
        return Table;
    }

    const updateTable = async (id, dataTable) => {
        const url = `/table/editTable/${id}`
        const data = dataTable
        const Table = await axiosRequest('patch', url, data);
        return Table;
    }


    const deleteTable = async (id) => {
        const url = `/table/deleteTable/${id}`
        const Table = await axiosRequest('delete', url);
        return Table;
    }



    return (
        <TableContext.Provider value={{ currentTable, updateCurrentTable, getAllTable, getTable, addTable, updateTable, deleteTable }}>
            {children}
        </TableContext.Provider>
    )
}




//     const addTable = async (nameTable) => {
//         const config = {
//             headers: {
//                 'Authorization': authorization,
//                 'Content-Type': 'application/json',
//             },
//             method: 'post',
//             url: 'http://localhost:3000/table/createTable',
//             data: nameTable
//         };
//         const Table = await axiosRequest(config);
//         return Table;
//     }

//     const updateTable = async (id, dataTable) => {
//         const config = {
//             headers: {
//                 'Authorization': authorization,
//                 'Content-Type': 'application/json',
//             },
//             method: 'patch',
//             url: `http://localhost:3000/table/editTable/${id}`,
//             data: dataTable
//         };
//         const Table = await axiosRequest(config);
//         return Table;
//     }
//     const deleteTable = async (id) => {
//         const config = {
//             headers: {
//                 'Authorization': authorization,
//                 'Content-Type': 'application/json',
//             },
//             method: 'delete',
//             url: `http://localhost:3000/table/deleteTable/${id}`
//         }
//         const Table = await axiosRequest(config);
//         return Table;
//     }



//     return (
//         <TableContext.Provider value={{ currentTable, updateCurrentTable, getAllTable, getTable, addTable, updateTable, deleteTable }}>
//             {children}
//         </TableContext.Provider>
//     )
// }
