import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import LoginValidations from '../../validations/LoginValidations';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    
    axios.defaults.withCredentials = true;
    const routeChange = () => {
        let path = `/users/register`;
        navigate(path);
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        await LoginValidations.validate({ email, password });

        try {
            const response = await axios.post('http://localhost:5000/users/login', {
                email, password
            });

            console.log(response);


            if (response.data.status === 'success') {
                const token = response.data.accesstoken;
                if (token) {
                    localStorage.setItem('jwttoken', token);
                    alert('Login Successful');
                    navigate('/home');
                }
            }
            else {
                console.log('Login unsuccessful:', response.data.message);
                alert('Please check your username and password');
            }

        } catch (e) {
            if (e.response) {
                console.log('Error during login:', e.response.data);
                console.log('Status code:', e.response.status);
            } else if (e.request) {

                console.log('Error during login: No response received');
            } else {
                console.log('Error during login:', e.message);
            }
        }


    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-sm"
            >
                <div className="flex flex-col space-y-4">
                    <p className="text-xl font-semibold text-center">Login</p>

                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            name="email"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
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

                    <div className="flex flex-col space-y-2">
                        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
                            Login
                        </button>
                        <p className="text-center text-sm text-gray-500">or</p>
                        <button
                            type="button"
                            onClick={routeChange}
                            className="bg-gray-200 text-gray-700 py-2 rounded"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default Login