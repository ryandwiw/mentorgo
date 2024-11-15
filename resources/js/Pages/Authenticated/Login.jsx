import GuestLayout from '@/Layouts/AuthenticatedLayout/GuestLayout'
import { Link } from '@inertiajs/react'
import React, { useState } from 'react'

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <GuestLayout>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Sign in to Flowbite
                </h2>
                <form className="mt-8 space-y-6" action="#">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <div className="relative">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-600 dark:text-gray-400"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                                {passwordVisible ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                        <div className="ms-3 text-sm">
                            <label htmlFor="remember" className="font-medium text-gray-500 dark:text-gray-400">Remember this device</label>
                        </div>
                        <a href="#" className="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Lost Password?</a>
                    </div>
                    <button type="submit" className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                        Not registered yet?
                        <Link className="text-blue-600 hover:underline dark:text-blue-500" href={route('registerr')}>
                            Create Account
                        </Link>
                    </div>
                </form>
            </div>
        </GuestLayout>
    )
}

export default Login
