import React, { createContext, useContext } from 'react'
import { axiosRequest } from '../utils/serverConnection';
import { useState } from 'react';

export const RestaurantContext = createContext();
export const RestaurantProvider = ({ children }) => {

    const [currentRestaurant, setCurrentRestaurant] = useState(null);
    // const [currentRestaurant, setCurrentRestaurant] = useState(localStorage.getItem('restaurant') || null);
    const [loginError, setLoginError] = useState('');
    
    const updateCurrentRestaurant = (restaurant) => {
        setCurrentRestaurant(restaurant);

    };

    const login = async (restData) => {
        try {
            const url= '/rest/login'
           const data =restData
            const loggedRest = await axiosRequest('post',url,data);
            localStorage.setItem('RestToken', loggedRest.result.token);
            updateCurrentRestaurant(loggedRest.result.existingRestaurant);
            // setCurrentRestaurant(loggedRest.result.existingRestaurant);
            // localStorage.setItem('rest', JSON.stringify(loggedRest.result.existingRestaurant));
            setLoginError('');

            return loggedRest;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setLoginError(error.response.data.message);
            } else {
                setLoginError('An error occurred during login.');
            }
        }
    }

    const logOut= async()=>{
        localStorage.removeItem('RestToken');
    }


    const register = async (restData) => {
        const url= '/rest/createRest'
        const data= restData
        const signedRest = await axiosRequest('post',url,data);
        return signedRest;
    }


    const getAllRestaurant = async () => {
        const url="/rest/getAllRest"
        const AllRestaurant = await axiosRequest('get',url);
        return AllRestaurant;
    }
    
    const getRestaurant = async () => {
        const url=`/rest/getRest`
        const Restaurant = await axiosRequest('get',url);
        return Restaurant;
    }
    const getRestaurantById = async (id) => {
        const url=`/rest/getRestById/${id}`
        const Restaurant = await axiosRequest('get',url);
        return Restaurant;
    }

    const updateRestaurant = async ( dataRestaurant) => {
            const url =`/rest/editRest`
            const data= dataRestaurant
        const Restaurant = await axiosRequest('patch',url,data);
        return Restaurant;
    }
    const deleteRestaurant = async (id) => {
        const url=`/rest/deleteRest/${id}`
        const Restaurant = await axiosRequest('delete',url);
        return Restaurant;
    }



    return (
        <RestaurantContext.Provider value={{ currentRestaurant,updateCurrentRestaurant,login,logOut, register,getRestaurant, getAllRestaurant,getRestaurantById, updateRestaurant, deleteRestaurant }}>
            {children}
        </RestaurantContext.Provider>
    )
}











