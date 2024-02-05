import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RestaurantContext } from '../context/Restaurant.context';

const NavBar = () => {
    const token = localStorage.getItem('RestToken');
    const { logOut } = useContext(RestaurantContext);


    return (
        <nav className="bg-yellow-600 p-5 ">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold hover:font-medium">All Restaurants</Link>
                <div className="flex space-x-4">
                    {token ? (
                        <>
                   
                            <Link to="/restaurantManger" className="text-white text-lg hover:font-bold">Your Restaurant</Link>
                            <Link to="/" onClick={() => {logOut()}} className="text-white  text-lg hover:font-bold">Log Out</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white text-lg hover:font-bold">Log In</Link>
                            <Link to="/signup" className="text-white text-lg hover:font-bold">Create Your Restaurant</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
