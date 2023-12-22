// pages/login.js
import React from 'react';
import Link from 'next/link'; // Import Link from Next.js

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="px-8 py-6 mt-4 text-left bg-gray-800 shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-white">Login</h3>
        <form action="">
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="Email">
                <span className="text-sm text-gray-300">Email</span>
                <input
                  type="email"
                  placeholder="Email"
                  id="Email"
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
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 bg-gray-700 text-white"
                />
              </label>
            </div>
            <div className="flex justify-center items-center mt-4">
              <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-400 focus:outline-none focus:bg-purple-400">
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
