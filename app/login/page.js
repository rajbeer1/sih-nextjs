'use client'
import React,{useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import Link from 'next/link'; // Import Link from Next.js



export default function LoginPage() {
  const router = useRouter();
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
  const submitRes = async () => {
    try {
      const response = await axios.post(
        'http://4.227.178.188:3001/auth/login',
        {
          email,
          password,
        }
      );
      
      console.log(response.data);
    setCookie('token', response.data.token, 7);

    router.push('/home');
      
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="px-8 py-6 mt-4 text-left bg-gray-800 shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-white">Login</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="Email">
                <span className="text-sm text-gray-300">Email</span>
                <input
                  type="email"
                  placeholder="Email"
                  id="Email"
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
              <button onClick={ submitRes} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-400 focus:outline-none focus:bg-purple-400">
                Login
              </button>
            </div>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-300">Already a user?</p>
          <Link href="/">
            <button className="px-6 py-2 my-3 leading-5 text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-400 focus:outline-none focus:bg-purple-400">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
