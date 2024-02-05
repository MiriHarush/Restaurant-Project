import React, { useContext, useEffect, useState } from 'react'
import { OrderContext } from '../context/Order.context';

const Order = ({ order }) => {

  return (
    <>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 "> */}
       
          <div  className="bg-white p-4 shadow-md rounded-md  text-yellow-600 border border-yellow-600">
           
            <h4 className="text-xl font-semibold">Reservation Details</h4>
            <div className="mt-4">
              <p className=""> <strong> Date Order:</strong> {order.dateOrder.split('T')[0]}</p>
              <p className=""><strong>Time Order:</strong>  {order.timeOrder}</p>
              <p className=""><strong>Name:</strong>  {order.nameUser}</p>
              <p className=""><strong> Phone:</strong> {order.phoneUser}</p>
            </div>
            </div>
            {/* </div> */}

            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 ">
        <div  className="bg-white p-4 shadow-md rounded-md">
        <h4 className="text-xl font-semibold">Reservation Details</h4>
          <div className="mt-4">
            <p className="text-gray-600">Date Order: {order.dateOrder.split('T')[0]}</p>
            <p className="text-gray-600">Time Order: {order.timeOrder}</p>
            <p className="text-gray-600">Name: {order.nameUser}</p>
            <p className="text-gray-600">Phone: {order.phoneUser}</p>
          </div>
        </div>
      </div> */}

          </>
        )
}
        export default Order