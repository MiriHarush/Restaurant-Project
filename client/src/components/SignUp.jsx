

import React, { useContext, useState } from 'react';
import { RestaurantContext } from '../context/Restaurant.context'
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faUser, faCheck, faX, faPlus } from '@fortawesome/free-solid-svg-icons'


const Signup = () => {
  const { register } = useContext(RestaurantContext);
  const navigate = useNavigate();

  const [valid, setValid] = useState({
    name: '',
    password: '',
    phone: '',
    email: '',
    maxChair: '',
    fullAdress: '',
    profileImage: ''
  })

  const [formData, setFormData] = useState({
    name: '',
    password: '',
    phone: '',
    email: '',
    maxChair: '',
    fullAdress: '',
    activityTime: [

      { day: 'sunday', hours: [{ openHour: '', closeHour: '', description: '', }] },
      { day: 'monday', hours: [{ openHour: '', closeHour: '', description: '', }] },
      { day: 'tuesday', hours: [{ openHour: '', closeHour: '', description: '', }] },
      { day: 'wednesday', hours: [{ openHour: '', closeHour: '', description: '', }] },
      { day: 'thursday', hours: [{ openHour: '', closeHour: '', description: '', }] },
      { day: 'friday', hours: [{ openHour: '', closeHour: '', description: '', }] },
      { day: 'saturday', hours: [{ openHour: '', closeHour: '', description: '', }] },
    ],
    profileImage: '',
  });

  const handleActivityTimeChange = (dayIndex, timeIndex, type, e) => {
    const updatedActivityTime = [...formData.activityTime];
    if (type === 'day') {
      updatedActivityTime[dayIndex][type] = e.target.value;
    } else {
      updatedActivityTime[dayIndex].hours[timeIndex][type] = e.target.value;
    }
    setFormData({ ...formData, activityTime: updatedActivityTime });
  };




  const handleAddTime = (dayIndex) => {
    const updatedActivityTime = [...formData.activityTime];
    updatedActivityTime[dayIndex].hours.push({ openHour: '', closeHour: '', description: '' });
    setFormData({ ...formData, activityTime: updatedActivityTime });
  };

  const handleRemoveTime = (dayIndex, timeIndex) => {
    const updatedActivityTime = [...formData.activityTime];
    updatedActivityTime[dayIndex].hours = updatedActivityTime[dayIndex].hours.filter(
      (_, index) => index !== timeIndex
    );
    setFormData({ ...formData, activityTime: updatedActivityTime });
  };




  // const handleChange = (field, e) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [field]: e.target.value,
  //   }));
  // };

  const handleChange = (field, e) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    // Add validation checks
    if (field === 'name') {
      setValid((prevValid) => ({
        ...prevValid,
        name: {
          valid: value.trim() !== '',
          error: value.trim() !== '' ? null : 'Name is required',
        },
      }));
    } else if (field === 'password') {
      setValid((prevValid) => ({
        ...prevValid,
        password: {
          valid: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(value),
          error: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(value)
            ? null
            : 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
        },
      }));
    } else if (field === 'phone') {
      setValid((prevValid) => ({
        ...prevValid,
        phone: {
          valid:  /^[0-9]{7,10}(-?[0-9]+)?$/.test(value),
          error:  /^[0-9]{7,10}(-?[0-9]+)?$/.test(value) ? null : 'Invalid phone number format',
        },
      }));
    } else if (field === 'email') {
      setValid((prevValid) => ({
        ...prevValid,
        email: {
          valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
          error: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email address',
        },
      }));
    } else if (field === 'fullAdress') {
      setValid((prevValid) => ({
        ...prevValid,
        fullAdress: {
          valid: value.trim() !== '',
          error: value.trim() !== '' ? null : 'Full address is required',
        },
      }));
    } else if (field === 'maxChair') {
      setValid((prevValid) => ({
        ...prevValid,
        maxChair: {
          valid: !isNaN(value) && parseInt(value) > 0,
          error: !isNaN(value) && parseInt(value) > 0 ? null : 'Invalid max chair value',
        },
      }));
    } else if (field === 'profileImage') {
      setValid((prevValid) => ({
        ...prevValid,
        profileImage: {
          valid: value.trim() !== '',
          error: value.trim() !== '' ? null : 'Profile image is required',
        },
      }));
    }
  };


  const descriptionClose = () => {
    formData.activityTime.map((day, index) => {
      if (day.hours.length === 1 && day.hours[0].openHour === '' && day.hours[0].closeHour === '') {
        const updatedActivityTime = [...formData.activityTime];
        updatedActivityTime[index].hours[0]["description"] = 'closed';
        setFormData({ ...formData, activityTime: updatedActivityTime });
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    descriptionClose()
    const restaurant = await register(formData);
    navigate('/login');
  };



  return (
    <>
      <NavBar />
      <div className='flex justify-center sm:flex  '>
        <div className=" min-h-full  px-6 py-12 lg:px-8 shadow-lg shadow-yellow-600 m-5 w-10/12 text-yellow-600 border border-yellow-600">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
            Create your restaurant
          </h2>

          <div className="mt-10 ">
            <form className="space-y-6" onSubmit={handleSubmit}>

              <div className='flex justify-between  flex-col sm:flex-row'>
                <div className='w-full sm:w-6/12'>

                  <div className="mb-4">
                    <label className="block  text-sm font-semibold mb-2">Name:</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e)}
                      className={`w-9/12 p-2 border  border-yellow-600 rounded focus:outline-none focus:border-yellow-600  focus:border-2 ${valid.name.error ? 'border-red-500' : ''
                        }`}
                    />
                    {valid.name.error && <p className="text-red-500">{valid.name.error}</p>}

                  </div>
                  <div className="mb-4">
                    <label className="block  text-sm font-semibold mb-2">Password:</label>
                    <input
                      type="password" value={formData.password}
                      onChange={(e) => handleChange("password", e)}
                      className="w-9/12 p-2 border  border-yellow-600 rounded focus:outline-none focus:border-yellow-600  focus:border-2"
                    />
                    {valid.password.error && <p className="text-red-500">{valid.password.error}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block  text-sm font-semibold mb-2">Phone:</label>
                    <input
                      type="tel"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e)}
                      className="w-9/12 p-2 border  border-yellow-600 rounded focus:outline-none focus:border-yellow-600  focus:border-2"
                    />
                    {valid.phone.error && <p className="text-red-500">{valid.phone.error}</p>}

                  </div>
                  <div className="mb-4">
                    <label className="block  text-sm font-semibold mb-2">Email:</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e)}
                      className="w-9/12 p-2 border  border-yellow-600 rounded focus:outline-none focus:border-yellow-600  focus:border-2"
                    />
                    {valid.email.error && <p className="text-red-500">{valid.email.error}</p>}

                  </div>
                  <div className="mb-4">
                    <label className="block  text-sm font-semibold mb-2">Full address:</label>
                    <input
                      type="text"
                      value={formData.fullAdress}
                      onChange={(e) => handleChange("fullAdress", e)}
                      className="w-9/12 p-2 border  border-yellow-600 rounded focus:outline-none focus:border-yellow-600  focus:border-2"
                    />
                    {valid.fullAdress.error && <p className="text-red-500">{valid.fullAdress.error}</p>}

                  </div>
                  <div className="mb-4">
                    <label className="block  text-sm font-semibold mb-2">max chair:</label>
                    <input
                      type="text"
                      value={formData.maxChair}
                      onChange={(e) => handleChange("maxChair", e)}
                      className="w-9/12 p-2 border  border-yellow-600 rounded focus:outline-none focus:border-yellow-600  focus:border-2"
                    />
                    {valid.maxChair.error && <p className="text-red-500">{valid.maxChair.error}</p>}

                  </div>
                  <div className="mb-4">
                    <label className="block  text-sm font-semibold mb-2">Profile image:</label>
                    <input
                      type="text"
                      value={formData.profileImage}
                      onChange={(e) => handleChange("profileImage", e)}
                      className="w-9/12 p-2 border border-yellow-600 rounded focus:outline-none focus:border-yellow-600  focus:border-2"
                    />
                    {valid.profileImage.error && <p className="text-red-500">{valid.profileImage.error}</p>}
                  </div>
                </div>
                <div >
                  <div className="mb-4  lg:w-full md:w-full sm:w-5/12">
                    {formData.activityTime.map((day, dayIndex) => (
                      <div key={day.day} className="mb-2 w-full">
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
                  disabled={!Object.values(valid).every((value) => value)}
                  className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{' '}
              <a href="/login" className="font-semibold leading-6 text-yellow-600 hover:text-yellow-500">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
