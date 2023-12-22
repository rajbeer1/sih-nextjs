'use client';
import React, { useState } from 'react';
import  axios  from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie =
      name +
      '=' +
      (encodeURIComponent(value) || '') +
      expires +
      '; path=/; Secure; SameSite=Strict;';
  }
const router = useRouter();
  const submitRes = async () => {
    try {
      const response = await axios.post(
        'http://4.227.178.188:3001/auth/signup',
        {
          name,
          email,
          password,
        }
      );

      console.log(response.data);
    
      setCookie('token', response.data.token, 7);
      
        router.push('/home');
      
      console.log("e")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="px-8 py-6 mt-4 text-left bg-gray-800 shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-white">Sign up</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mt-4">
            <div>
              <label className="block">
                <span className="text-sm text-gray-300">Name</span>
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 bg-gray-700 text-white"
                />
              </label>
            </div>
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={submitRes}
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-400 focus:outline-none focus:bg-purple-400"
              >
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
};

export default Home;
