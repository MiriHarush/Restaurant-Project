
import React, { useContext, useEffect, useState } from 'react';
import { RestaurantContext } from '../context/Restaurant.context'
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faUser, faCheck, faX, faPlus } from '@fortawesome/free-solid-svg-icons'


const UpdateRestauran = () => {
    const { getRestaurant, updateRestaurant } = useContext(RestaurantContext);
    const [curRestaurant, setCurRestaurant] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const restaurant = await getRestaurant();
            setCurRestaurant(restaurant.result)
        };
        fetchData();
    }, []);



    // const [curRestaurant, setCurRestaurant] = useState({
    //     name: '',
    //     password: '',
    //     phone: '',
    //     email: '',
    //     maxChair: '',
    //     fullAdress: '',
    //     activityTime: [

    //         { day: 'sunday', hours: [{ openHour: '', closeHour: '', description: '', }] },
    //         { day: 'monday', hours: [{ openHour: '', closeHour: '', description: '', }] },
    //         { day: 'tuesday', hours: [{ openHour: '', closeHour: '', description: '', }] },
    //         { day: 'wednesday', hours: [{ openHour: '', closeHour: '', description: '', }] },
    //         { day: 'thursday', hours: [{ openHour: '', closeHour: '', description: '', }] },
    //         { day: 'friday', hours: [{ openHour: '', closeHour: '', description: '', }] },
    //         { day: 'saturday', hours: [{ openHour: '', closeHour: '', description: '', }] },
    //     ],
    //     profileImage: '',
    // });

    const handleActivityTimeChange = (dayIndex, timeIndex, type, e) => {
        const updatedActivityTime = [...curRestaurant.activityTime];
        if (type === 'day') {
            updatedActivityTime[dayIndex][type] = e.target.value;
        } else {
            updatedActivityTime[dayIndex].hours[timeIndex][type] = e.target.value;
        }
        setCurRestaurant({ ...curRestaurant, activityTime: updatedActivityTime });
    };




    const handleAddTime = (dayIndex) => {
        const updatedActivityTime = [...curRestaurant.activityTime];
        updatedActivityTime[dayIndex].hours.push({ openHour: '', closeHour: '', description: '' });
        setCurRestaurant({ ...curRestaurant, activityTime: updatedActivityTime });
    };

    const handleRemoveTime = (dayIndex, timeIndex) => {
        const updatedActivityTime = [...curRestaurant.activityTime];
        updatedActivityTime[dayIndex].hours = updatedActivityTime[dayIndex].hours.filter(
            (_, index) => index !== timeIndex
        );
        setCurRestaurant({ ...curRestaurant, activityTime: updatedActivityTime });
    };




    const handleChange = (field, e) => {
        setCurRestaurant((prevData) => ({
         
            ...prevData,
            [field]: e.target.value,
        }));
    };

    const descriptionClose = () => {
        curRestaurant.activityTime.map((day, index) => {
            if (day.hours.length === 1 && day.hours[0].openHour === '' && day.hours[0].closeHour === '') {
                const updatedActivityTime = [...curRestaurant.activityTime];
                updatedActivityTime[index].hours[0]["description"] = 'closed';
                setCurRestaurant({ ...curRestaurant, activityTime: updatedActivityTime });
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        descriptionClose()
        const restaurant = await updateRestaurant(curRestaurant);
        navigate('/restaurantManger');
    };



    return (
        <>
            <NavBar />
            {/* <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 shadow m-5 w-8/12"> */}
          
          {curRestaurant&&( <div className='flex justify-center sm:flex  '>
                <div className=" min-h-full  px-6 py-12 lg:px-8 shadow-lg shadow-yellow-600 m-5 w-10/12 text-yellow-600 border border-yellow-600">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
                        Update your restaurant
                    </h2>

                    <div className="mt-10 ">
                        {/* <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"> */}
                        <form className="space-y-6" onSubmit={handleSubmit}>

                            <div className='flex justify-between flex-col sm:flex-row'>
                                <div className='w-full sm:w-6/12'>

                                    <div className="mb-4">
                                        <label className="block  text-sm font-semibold mb-2">Name:</label>
                                        <input
                                            type="text"
                                            value={curRestaurant.name}
                                            onChange={(e) => handleChange("name", e)}
                                            className="w-9/12 p-2  border  border-yellow-600 rounded focus:outline-none focus:border-yellow-600  focus:border-2"
                                        />
                                    </div>
                           
                                    <div className="mb-4">
                                        <label className="block  text-sm font-semibold mb-2">Phone:</label>
                                        <input
                                            type="tel"
                                            value={curRestaurant.phone}
                                            onChange={(e) => handleChange("phone", e)}
                                            className="w-9/12 p-2 border  border-yellow-600 rounded focus:outline-none focus:border-yellow-600  focus:border-2"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block  text-sm font-semibold mb-2">Email:</label>
                                        <input
                                            type="email"
                                            value={curRestaurant.email}
                                            onChange={(e) => handleChange("email", e)}
                                            className="w-9/12 p-2 border  border-yellow-600 rounded focus:outline-none focus:border-yellow-600  focus:border-2"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block  text-sm font-semibold mb-2">Full address:</label>
                                        <input
                                            type="text"
                                            value={curRestaurant.fullAdress}
                                            onChange={(e) => handleChange("fullAdress", e)}
                                            className="w-9/12 p-2 border  border-yellow-600 rounded focus:outline-none focus:border-yellow-600  focus:border-2"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block  text-sm font-semibold mb-2">max chair:</label>
                                        <input
                                            type="text"
                                            value={curRestaurant.maxChair}
                                            onChange={(e) => handleChange("maxChair", e)}
                                            className="w-9/12 p-2 border  border-yellow-600 rounded focus:outline-none focus:border-yellow-600  focus:border-2"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block  text-sm font-semibold mb-2">Profile image:</label>
                                        <input
                                            type="text"
                                            value={curRestaurant.profileImage}
                                            onChange={(e) => handleChange("profileImage", e)}
                                            className="w-9/12 p-2 border border-yellow-600 rounded focus:outline-none focus:border-yellow-600  focus:border-2"
                                        />
                                    </div>
                                </div>
                                <div >
                                    <div className="mb-4  lg:w-full md:w-full sm:w-5/12">
                                        {/* <label className="block  text-sm font-semibold mb-2">Activity time:</label> */}
                                        {curRestaurant.activityTime.map((day, dayIndex) => (
                                            <div key={day.day} className="mb-2  w-full">

                                                <label className='mb-20'> <strong>{day.day}</strong></label>

                                                {day.hours.map((time, timeIndex) => (
                                                    <div key={timeIndex} className="flex mt-3">
                                                        <label htmlFor="" className='mr-2'>open Hour:</label>
                                                        <input
                                                            type="time"
                                                            placeholder="Open Hour"
                                                            value={time.openHour}
                                                            onChange={(e) => handleActivityTimeChange(dayIndex, timeIndex, 'openHour', e)}
                                                            className="w-full p-2 border border-yellow-600 rounded mr-2 focus:outline-none focus:border-yellow-600  focus:border-2"
                                                        />
                                                        <label htmlFor="" className='mr-2'>Close Hour:</label>
                                                        <input
                                                            type="time"
                                                            placeholder="Close Hour"
                                                            value={time.closeHour}
                                                            onChange={(e) => handleActivityTimeChange(dayIndex, timeIndex, 'closeHour', e)}
                                                            className="w-full p-2 border border-y-yellow-600 rounded focus:outline-none focus:border-yellow-600  focus:border-2"
                                                        />

                                                        {timeIndex === day.hours.length - 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveTime(dayIndex, timeIndex)}
                                                                className="ml-2 px-2 py-1 "
                                                            >

                                                                <FontAwesomeIcon icon={faX} />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddTime(dayIndex)}
                                                    className="mt-2 px-2 py-1"
                                                >

                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>


                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    // className="w-full sm:w-auto px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-md bg-yellow-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Update Restaurant
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            )} 
        </>

    );
};

export default UpdateRestauran;
