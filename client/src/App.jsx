import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
// import '/index.css'
import './index.css'; 

// import { Router } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './components/Routers'
import { RestaurantProvider } from './context/Restaurant.context';
import { OrderProvider } from './context/Order.context';
import { TableProvider } from './context/Table.context';

function App() {
  return (
    <RestaurantProvider>
      <TableProvider>
        <OrderProvider>
          <Router>
            <Routers />
          </Router>
        </OrderProvider>
      </TableProvider>
    </RestaurantProvider>
  )
}

export default App
