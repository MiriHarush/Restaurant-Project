import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RestaurantContext } from '../context/Restaurant.context';
import NavBar from './NavBar';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');

  const { login, updateCurrentRestaurant } = useContext(RestaurantContext)
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setEmailError('');
    setLoginError('');
  };

  const validateEmail = () => {
    const emailRegex = /\.(com|net|org)$/;

    if (!emailRegex.test(formData.email)) {
      setEmailError('Invalid email format. Must end with .com, .net, or .org');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail()) {
      return;
    }

    try {
      const restaurant = await login(formData);
      console.log('loginrest', restaurant);
      updateCurrentRestaurant(restaurant.result.existingRestaurant)
      navigate('/restaurantManger');
      window.onload()
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Email or password not correct');
    }
  };




  return (
    <>
      <NavBar />
      <div className='flex justify-center  '>
      <div className=" min-h-full  px-6 py-12 lg:px-8 shadow-lg shadow-yellow-600 m-5 w-8/12 text-yellow-600 border border-yellow-600">
        {/* <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img
          className="mx-auto h-10 w-auto"
          // src="https://images.pexels.com/photos/6061841/pexels-photo-6061841.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Your Company"
          /> */}

        {/* </div>  */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
          Log into your restaurant
        </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-yellow-600">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6">
               <strong>Email address:</strong>
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email" name='email'
                placeholder='Email address'
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                error={Boolean(emailError)}
                className="block w-full rounded-md border p-2 border-yellow-600  text-gray-900 shadow-sm  ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:border-yellow-600  focus:border-2 "
              />
            </div>
          </div>
          <br />
          <div>
            <div >
              <label htmlFor="password" className="block text-sm font-medium leading-6 ">
               <strong>Password:</strong> 
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password" name='password'
                placeholder='Password'
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400  focus:border-yellow-600 focus:outline-none"
              
                className="block w-full rounded-md border p-2 border-yellow-600  text-gray-900 shadow-sm  ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:border-yellow-600  focus:border-2 "
              />
            </div>
          </div>
          <br />
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5   text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}

            >
              Log in
            </button>
          </div>

        </div>
      </div></div>
    </>
  );
};

export default Login;
