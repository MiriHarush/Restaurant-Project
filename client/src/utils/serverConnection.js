import axios from 'axios';

const handleServerError = (error) => {
  console.error('Server error:', error);
  return { success: false, error };
};


export const axiosRequest = async (method, myUrl, data) => {
  const token = localStorage.getItem('RestToken');

  const authorization = `Bearer ${token}`;
  const baseUrl = 'http://localhost:3000'


  const config = {
    headers: {
      'Authorization': authorization,
    },
    method,
    url: baseUrl + myUrl,
    data
  };
  console.log("config", config);
  try {
    const response = await axios(config);
    console.log('Data from server:', response.data);
    return { success: true, result: response.data };
  } catch (error) {
    return handleServerError(error);
  }
};
