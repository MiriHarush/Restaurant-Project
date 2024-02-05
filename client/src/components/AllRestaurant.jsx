import { useNavigate } from 'react-router-dom';
import * as RestaurantContext from '../context/Restaurant.context';
import React, { useContext, useState, useEffect } from 'react';
import NavBar from './NavBar';


const Restaurants = () => {

    const { getAllRestaurant, updateCurrentRestaurant } = useContext(RestaurantContext.RestaurantContext);

    const [AllRestaurant, setAllRestaurant] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const RestaurantData = await getAllRestaurant();
            setAllRestaurant(RestaurantData.result);
        }
        fetchData();
    }, [])

    const goToRest = (restaurant) => {
        // updateCurrentRestaurant(restaurant);
        navigate("/restaurant", { state: restaurant._id });
    }
    return (
        <>
            <NavBar />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3">
                {AllRestaurant.map((restaurant) => (
                    <div
                        key={restaurant.id}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-2xl transition duration-300 border border-yellow-600 hover:bg-yellow-600/5" >
                            <img src={restaurant.profileImage} alt={`Profile of ${restaurant.name}`} className="w-full h-auto mt-1 rounded-lg " onClick={() => goToRest(restaurant)} />
                        <h2 className="text-xl font-semibold text-yellow-600 pt-2">{restaurant.name}</h2>
                        <p className="text-yellow-600 pt-1 "> <strong>Full Address: </strong>{restaurant.fullAdress}</p>
                        {/* <p className="text-gray-600">Phone: {restaurant.phone}</p>
                        <p className="text-gray-600">Email: {restaurant.email}</p>
                        <p className="text-gray-600">Activity Time:</p>
                        <ul className="list-disc ml-6">
                            {restaurant.activityTime.map((index) => (
                                <li key={index.day}>
                                    <strong>{index.day}: </strong>
                                    {index.hours && index.hours[0] && (
                                        <>
                                          
                                            <span>   {index.hours[0].openHour} - {index.hours[0].closeHour}</span>
                                            {index.hours[0].description && (
                                                <span> {index.hours[0].description}</span>
                                            )}
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul> */}

                    </div>
                ))}
            </div>
        </>
    );
}

export default Restaurants;