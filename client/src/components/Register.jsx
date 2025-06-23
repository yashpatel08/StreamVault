import React, { useState } from 'react';
import RegisterValidations from '../../validations/RegisterValidations';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { registerVersion } from 'firebase/app';


const Register = () => {

    const [fname, setFname] = useState([]);
    const [lname, setLname] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [phone, setPhone] = useState([]);
    const [address, setAddress] = useState([]);
    const navigate = useNavigate();

    const routeChange = () => {
        let path = `/users/login`;
        navigate(path);
    }


    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users/register', {
               firstName: fname,
               lastName: lname , 
               email, password,phone,address 
            })
                .then(result => console.log(result))
                .catch(err => console.log(err))

            routeChange();
        } catch (e) {
            console.log(e);
        }


    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <form
    onSubmit={handleSubmit}
    className="bg-white p-6 rounded shadow-md w-full max-w-md"
  >
    <div className="flex flex-col space-y-4">
      <p className="text-xl font-semibold text-center">Register</p>

      <div>
        <label className="block mb-1">First Name</label>
        <input
          name="firstName"
          type="text"
          onChange={(e) => setFname(e.target.value)}
          placeholder="Enter your first name"
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Last Name</label>
        <input
          name="lastName"
          type="text"
          onChange={(e) => setLname(e.target.value)}
          placeholder="Enter your last name"
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Email</label>
        <input
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Phone</label>
        <input
          name="phone"
          type="number"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter number"
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Address</label>
        <textarea
          name="address"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div className="flex flex-col space-y-2">
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Register
        </button>
        <p className="text-center text-sm text-gray-500">or</p>
        <button
          type="button"
          onClick={routeChange}
          className="bg-gray-200 text-gray-700 py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  </form>
</div>
    )
}

export default Register;