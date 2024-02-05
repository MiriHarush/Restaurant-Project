import React, { useContext, useEffect, useState } from 'react';
import { RestaurantContext } from '../context/Restaurant.context';
import { TableContext } from '../context/Table.context';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../context/Order.context';
import NavBar from './NavBar';
import Order from './Order';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'

const RestaurantManger = () => {
    const { currentRestaurant, getRestaurant, updateRestaurant, deleteRestaurant, logOut } = useContext(RestaurantContext);
    const { getAllTable, addTable, deleteTable, updateTable } = useContext(TableContext);
    const { getAllOrders } = useContext(OrderContext)
    const [restaurant, setRestaurant] = useState('');
    const [allTable, setAllTable] = useState([]);
    const [newTable, setNewTable] = useState({ chairNum: 0 });
    const [updatedChairNum, setUpdatedChairNum] = useState(0);
    const [editingTableId, setEditingTableId] = useState(null);
    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {

        const fetchData = async () => {
            const restaurantDetails = await getRestaurant();
            setRestaurant(restaurantDetails.result);
            const tables = await getAllTable();
            setAllTable(tables.result);
            const allOrder = await getAllOrders();
            setOrders(allOrder.result);

        };
        fetchData();
    }, []);

    const handleDeleteRestaurant = async (restId) => {
        try {
            await deleteRestaurant(restId);
            setAllTable((prevRest) => prevRest.filter(rest => rest._id !== restId));
            logOut()
            navigate('/')
        } catch (error) {
            console.error('Error deleting restaurant:', error);
        }
    };


    const handleAddTable = async () => {
        try {
            const addedTable = await addTable(newTable);
            setAllTable((prevTables) => [...prevTables, addedTable.result]);
            window.location.reload()
        } catch (error) {
            console.error('Error adding table:', error);
        }
    };

    const handleUpdateButtonClick = (tableId, currentChairNum) => {
        setEditingTableId(tableId);
        setUpdatedChairNum(currentChairNum);
    };
    const handleUpdateTable = async (tableId) => {
        try {
            await updateTable(tableId, { chairNum: updatedChairNum });
            setEditingTableId(null);
            setAllTable((prevTables) =>
                prevTables.map((table) => (table._id === tableId ? { ...table, chairNum: updatedChairNum } : table))
            );
        } catch (error) {
            console.error('Error updating table:', error);
        }
    };

    const handleDeleteTable = async (tableId) => {
        try {
            await deleteTable(tableId);
            setAllTable((prevTables) => prevTables.filter(table => table._id !== tableId));
        } catch (error) {
            console.error('Error deleting table:', error);
        }
    };

    return (
        <>
            <NavBar />


            {/* <img src={restaurant?.profileImage} alt={`Profile of ${restaurant?.name}`} className="w-full h-auto mt-4" />
            <h2 className="text-xl font-semibold mb-2">{restaurant?.name}</h2>
            <p className="text-gray-600">Phone: {restaurant?.phone}</p>
            <p className="text-gray-600">Email: {restaurant?.email}</p>
            <p className="text-gray-600">Full Address: {restaurant?.fullAdress}</p>
            <p className="text-gray-600">Activity Time:</p>
            <ul className="list-disc ml-6">
                {restaurant.activityTime?.map((day, index) => (
                    <li key={index}>
                        <strong>{day.day}</strong>
                        {day.hours && (
                            <span> {day.hours.openHour} - {day.hours.closeHour}</span>
                        )}
                        {day.description && (
                            <span> - {day.description}</span>
                        )}
                    </li>
                ))}
            </ul> */}

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

                <div className="bg-white shadow-2xl shadow-gray-700 rounded-md p-8 max-w-screen-md mx-auto mt-8 w-11/12 text-yellow-600 opacity-85  ">
                    {/* <div className="flex items-center space-x-4"> */}
                    <div className='flex justify-between space-x-4'>
                        <div >
                            <p className="text-yellow-600"> <strong>Phone:</strong> {restaurant?.phone}</p>
                            <p className="text-yellow-600"> <strong>Email:</strong> {restaurant?.email}</p>
                            <p className="text-yellow-600"><strong>Full Address:</strong> {restaurant?.fullAdress}</p>
                            <br />
                            <br />

                            {/* <button onClick={() => handleDeleteRestaurant(restaurant?._id)}className="mt-2 text-yellow-600  text-lg" >
                                <FontAwesomeIcon icon={faTrash} /> Delete your Restaurant

                            </button>
                            <br />
                            <button onClick={() => { navigate("/updateRestaurant") }} className="text-yellow-600 mb-1 text-lg"><FontAwesomeIcon icon={faPenToSquare} /> Update your Restaurant </button> */}
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



                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 ">
                        {allTable.map((table, index) => (
                            <div key={index} className="bg-white p-4 shadow-md rounded-md border border-yellow-600">
                                <h3 className="text-lg font-semibold mb-2">Table {table.tableNum}</h3>
                                <p className="text-gray-600">Chairs: {table.chairNum}</p>
                                {editingTableId === table._id ? (
                                    <div className="mt-2">
                                        <label className="block text-sm font-medium text-yellow-600">
                                            Update Chairs Number:
                                        </label>
                                        <input
                                            type="number"
                                            value={updatedChairNum}
                                            onChange={(e) => setUpdatedChairNum(e.target.value)}
                                            className="mt-1 p-2 border rounded-md w-full"
                                        />
                                        <button
                                            onClick={() => handleUpdateTable(table._id)}
                                            className="mt-2 bg-yellow-600 text-white p-2 rounded-md"
                                        >
                                            Update Chairs
                                        </button>
                                    </div>
                                ) : (

                                    <button
                                        onClick={() => handleUpdateButtonClick(table._id, table.chairNum)}
                                        className="mt-2 mr-3 bg-yellow-600 text-white p-2 rounded-md"
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                )}

                                <button
                                    onClick={() => handleDeleteTable(table._id)}
                                    className="mt-2 bg-yellow-600 text-white p-2 rounded-md"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>

                        ))}
                    </div>


                    {newTable && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Chairs Number:
                            </label>
                            <input
                                type="number"
                                min={1}
                                max={restaurant.maxChair}
                                value={newTable.chairNum}
                                onChange={(e) => setNewTable({ ...newTable, chairNum: e.target.value })}
                                className="mt-1 p-2 border rounded-md w-4/12 mr-3"
                            />
                            <button onClick={handleAddTable} className="mt-2 bg-yellow-600 text-white p-2 rounded-md"> <FontAwesomeIcon icon={faPlus} />Add Table</button>
                        </div>
                    )}

                    <h3 className="text-2xl mt-10"> <strong>Your reserved tables:</strong></h3>
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-4 ">


                        {orders?.map((order) => {
                            if (restaurant.tableArr.includes(order.tableNum)) {

                                return <Order order={order} />
                            }
                        })}
                    </div>

                    <button onClick={() => handleDeleteRestaurant(restaurant?._id)} className="mt-9 text-yellow-600  text-lg" >
                        <FontAwesomeIcon icon={faTrash} /> Delete your Restaurant

                    </button>
                    <br />
                    <button onClick={() => { navigate("/updateRestaurant") }} className="text-yellow-600 mb-1 text-lg"><FontAwesomeIcon icon={faPenToSquare} /> Update your Restaurant </button>
                </div>
            </div>

        </>
    );
};

export default RestaurantManger;
