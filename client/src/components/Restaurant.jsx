import React, { useContext, useState, useEffect } from 'react'
import { RestaurantContext } from '../context/Restaurant.context'
import { OrderContext } from '../context/Order.context';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faUser, faCheck, faClock } from '@fortawesome/free-solid-svg-icons'
const today = new Date().toISOString().split('T')[0];

const Restaurant = () => {
    const location = useLocation();
    const restId = location.state;
    const { currentRestaurant, getRestaurantById } = useContext(RestaurantContext);
    const { getTablesAvailable, addOrder } = useContext(OrderContext)
    const [restaurant, setRestaurant] = useState('');
    const [availabilityMessage, setAvailabilityMessage] = useState('');
    const [availavleTable, setAvailavleTable] = useState(null);
    const [proceedWithBooking, setProceedWithBooking] = useState(false);

    const [successMessage, setSuccessMessage] = useState('');
    useEffect(() => {

        const fetchData = async () => {
            const restaurantDetails = await getRestaurantById(restId);
            setRestaurant(restaurantDetails.result);

        };
        fetchData();
    }, []);

    const handleTableBooking = async (dateOrder, timeOrder, numberPeople) => {

        try {
            const response = await getTablesAvailable(
                restId,
                timeOrder,
                dateOrder,
                numberPeople
            );
            if (response.result == "There is no free table" || response.result == "The desired time is not within the restaurant's opening hours" || response.result == "The restaurant is not open on the day you chose") {
                setAvailabilityMessage(response.result)
                setProceedWithBooking(false)
            }
            else if (response.success) {
                setAvailabilityMessage('Table is available! You can proceed with the booking.');
                setAvailavleTable(response.result)
                setProceedWithBooking(true);
            } else {
                setAvailabilityMessage('Sorry, no table available for the specified time and date.');
                setProceedWithBooking(false);
            }
        } catch (error) {
            console.error('Error checking table availability:', error);
            setAvailabilityMessage('Error checking table availability. Please try again later.');
            setProceedWithBooking(false);
        }
    };

    const order = async (nameUser, phoneUser) => {
        const nameOrder = {
            tableNum: availavleTable._id,
            dateOrder: date.value,
            timeOrder: time.value,
            nameUser,
            phoneUser
        }
        // const newOrder = await addOrder(nameOrder)
        // console.log("newOrder",newOrder);
        try {
            // Assuming addOrder returns a successful response
            const newOrder = await addOrder(nameOrder);
            setProceedWithBooking(false);
            setAvailabilityMessage(null)
            // Set success message
            setSuccessMessage('Order placed successfully!');
        } catch (error) {
            // Handle error if necessary
            console.error('Error placing order:', error);
        }
    }

    return (
        <>
            <NavBar />

            <div className='bg-yellow-600 '>
                <div className='relative mb-4'>
                    <img
                        src={restaurant?.profileImage}
                        alt={`Profile of ${restaurant?.name}`}
                        className=" w-full h-72 object-cover opacity-75"
                    />
                </div>
                <div className="absolute  top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 text-white text-center bg-yellow-600/50 rounded-lg ">
                    <h2 className="text-5xl font-semibold p-2 text-center">{restaurant?.name}</h2>
                </div>

                <div className="bg-white shadow-md rounded-md p-8 max-w-screen-md mx-auto mt-8 w-6/12 text-yellow-600 opacity-85  ">
                    {/* <div className="flex items-center space-x-4"> */}
                    <div className='flex justify-between space-x-4'>
                        <div >
                            <p className="text-yellow-600"> <strong>Phone:</strong> {restaurant?.phone}</p>
                            <p className="text-yellow-600"> <strong>Email:</strong> {restaurant?.email}</p>
                            <p className="text-yellow-600"><strong>Full Address:</strong> {restaurant?.fullAdress}</p>
                        </div>
                        <div>
                            <p className="text-yellow-600">Activity Time:</p>
                            {/* <ul className="list-disc"> */}
                            {restaurant.activityTime?.map((index) => (
                                <p key={index.day}>
                                    <strong>{index.day}: </strong>
                                    {index.hours && index.hours[0] && (
                                        <span> {index.hours[0].openHour} - {index.hours[0].closeHour}</span>
                                    )}
                                    {index.hours[0].description && (
                                        <span>  {index.hours[0].description}</span>
                                    )}
                                </p>
                            ))}
                            {/* </ul> */}
                        </div>
                    </div>
                    {/* </div> */}

                    <div className="mt-8 ">
                        <label htmlFor="reservationDate">Reservation Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            min={today}
                            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-600  focus:border-2"
                        />

                        <label htmlFor="reservationTime" className="mt-4">Reservation Time:</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-600  focus:border-2"
                        />

                        <label htmlFor="numberOfPeople" className="mt-4">Number of People:</label>
                        <input
                            type="number"
                            id="numberOfPeople"
                            name="numberOfPeople"
                            min={1}
                            max={restaurant.maxChair}
                            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-600  focus:border-2"
                        />

                        <button
                            onClick={() => handleTableBooking(date.value, time.value, numberOfPeople.value)}
                            className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-500"
                        >
                            Check Availability
                        </button>
                        <p className="mt-2 text-gray-600">{availabilityMessage}</p>

                        {proceedWithBooking && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold mb-2 ">Booking Details</h3>
                                <label htmlFor="nameUser " className='mb-2'> <FontAwesomeIcon icon={faUser} /> Name:</label>
                                <input
                                    type="text"
                                    id="nameUser"
                                    placeholder="Enter your name"
                                    className="block w-full p-2 border border-gray-300 rounded mt-1 mb-1"
                                />

                                <label htmlFor="phoneNumber" className="mt-1 "><FontAwesomeIcon icon={faPhone} />   Phone Number: </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    placeholder="Enter your phone number"
                                    className="block w-full p-2 border border-gray-300 rounded mt-1"
                                />

                                <button
                                    onClick={() => order(nameUser.value, phoneNumber.value)}
                                    className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-500"
                                >
                                    Submit Booking
                                </button>

                            </div>
                        )}
                        {successMessage && (
                            <div className="mt-4 text-gray-600">
                                {successMessage}
                            </div>
                        )}
                    </div>
                </div>

            </div>
            {/* <img src={restaurant?.profileImage} alt={`Profile of ${restaurant?.name}`} className="w-full h-auto mt-4" />
            <h2 className="text-xl font-semibold mb-2">{restaurant?.name}</h2>
            <p className="text-gray-600">Phone: {restaurant?.phone}</p>
            <p className="text-gray-600">Email: {restaurant?.email}</p>
            <p className="text-gray-600">Full Address: {restaurant?.fullAdress}</p>
            <p className="text-gray-600">Activity Time:</p>
            <ul className="list-disc ml-6">
                {restaurant.activityTime?.map(( index) => (
                    <li key={index.day}>
                        <strong>{index.day}: </strong>
                        {index.hours && index.hours[0]&&(
                            <span> {index.hours[0].openHour} - {index.hours[0].closeHour}</span>
                        )}
                        {index.hours[0].description && (
                            <span>  {index.hours[0].description}</span>
                        )}
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <label htmlFor="reservationDate">Reservation Date:</label>
                <input
                    type="date"
                    id="date"
                    name='date'
                />
                <br />
                <label htmlFor="reservationTime">Reservation Time:</label>
                <input
                    type="time"
                    id="time"
                    name='time'
                />
                <br />
                <label htmlFor="numberOfPeople">Number of People:</label>
                <input
                    type="number"
                    id="numberOfPeople"
                    name='numberOfPeople'
                    min={1}
                />
                <br />
                <button onClick={() => handleTableBooking(date.value, time.value, numberOfPeople.value)}>Check Availability</button>
                <p>{availabilityMessage}</p>

                {proceedWithBooking && (
                    <div>
                        <h3>Booking Details</h3>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="nameUser" placeholder="Enter your name" />
                        <br />
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input type="tel" id="phoneNumber" placeholder="Enter your phone number" />
                        <br />
                        <button onClick={() => order(nameUser.value, phoneNumber.value)}>Submit Booking</button>
                    </div>
                )}
            </div> */}
        </>
    );
};

export default Restaurant;
