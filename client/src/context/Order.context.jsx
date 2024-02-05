import React, { createContext, useContext } from 'react'
import { axiosRequest } from '../utils/serverConnection';
import { useState } from 'react';



export const OrderContext = createContext();
export const OrderProvider = ({ children }) => {

    const [currentOrder, setCurrentOrder] = useState(JSON.parse(localStorage.getItem('order')) || null);
    const token = localStorage.getItem('userToken');
    const authorization = `Bearer ${token}`;


    const getAllOrders = async () => {
        const url = `/order/getAllOrders`;
        const getTable = await axiosRequest('get', url);
        return getTable;
    }
    const updateCurrentOrder = (order) => {
        setCurrentOrder(order);
        localStorage.setItem('order', JSON.stringify(order));
    };

    const getTablesAvailable = async (id,  time,date, number) => {
        const url = `/order/getTablesAvailable/${id}?timeOrder=${time}&dateOrder=${date}&numberPeople=${number}`;
        const getTable = await axiosRequest('get', url);
        console.log("getTable", getTable);
        return getTable;
    }

    const addOrder = async (nameOrder) => {
        console.log(nameOrder);
        const url = '/order/createOrder'
        const data = nameOrder
        const Order = await axiosRequest('post', url, data);
        return Order;
    }




    return (
        <OrderContext.Provider value={{ currentOrder, updateCurrentOrder, getAllOrders, getTablesAvailable, addOrder }}>
            {children}
        </OrderContext.Provider>
    )
}
