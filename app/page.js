'use client'
import React, { useState } from 'react';
import Axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const submitres = async () => {
    try {
      const response = await fetch('http://4.227.178.188:3001/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        // Handle non-successful responses (e.g., HTTP status code is not in the 200-299 range)
        const errorData = await response.json();
        console.error('Error:', errorData.message);
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (err) {
      console.error('Error:', err.message);
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="px-8 py-6 mt-4 text-left bg-gray-800 shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-white">Sign up</h3>
        <form action="">
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="Name">
                <span className="text-sm text-gray-300">Name</span>
                <input
                  type="text"
                  placeholder="Name"
                  id="Name"
                  onChange={(e)=>{setname(e.target.value)}}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 bg-gray-700 text-white"
                />
              </label>
            </div>
            <div className="mt-4">
              <label className="block">
                <span className="text-sm text-gray-300">Email</span>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => { setemail(e.target.value) }}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 bg-gray-700 text-white"
                />
              </label>
            </div>
            <div className="mt-4">
              <label className="block">
                <span className="text-sm text-gray-300">Password</span>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => { setpassword(e.target.value) }}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 bg-gray-700 text-white"
                />
              </label>
            </div>
            <div className="flex justify-center items-center mt-4">
              <button onClick={ submitres} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-400 focus:outline-none focus:bg-purple-400">
                Sign up
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-300">New to the project?</p>
              <Link href="/login">
                <button className="px-6 py-2 my-3 leading-5 text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-400 focus:outline-none focus:bg-purple-400">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
