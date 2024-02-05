import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LogIn from './LogIn'

// import Restaurant from './Restaurant';
//  const Roters = () => {
//   return (
//    <Routes>
//     <Route path='/login' element={<LogIn/>}/>
//     {/* <Route path='/restaurant' element={<Restaurant/>}/> */}
//     <Route path='/restaurants' element={<Restaurant />} />

//    </Routes>
//   )
// }
//  export default Roters;

// import Restaurant from './Restaurant';
import Restaurants from './AllRestaurant';
import Restaurant from './Restaurant';
import Signup from './SignUp';
import RestaurantManger from './RestaurantManger';
import UpdateRestauran from './UpdateRestaurant';

const Routers = () => {
    return (
        <Routes>
            <Route path='/login' element={<LogIn />} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/' element={<Restaurants />} />
            <Route path='/restaurant' element={<Restaurant />} />
            <Route path='/restaurantManger' element={<RestaurantManger/>} />
            <Route path='/updateRestaurant' element={<UpdateRestauran/>} />
        </Routes>
    );
};

export default Routers;
