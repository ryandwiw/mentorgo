import { Link } from '@inertiajs/react';
import React from 'react'

const Application = ({ isOpen, toggleDropdown, user, userType, mentor }) => {

    if (!user) return null;

    return (
        <>
            <button
                onClick={toggleDropdown}
                type="button"
                className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
                <span className="sr-only">View apps</span>
                <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
            </button>

            <div className={`${isOpen ? 'block' : 'hidden'} absolute right-0 top-full mt-1 overflow-y-auto max-h-[80vh] z-50 w-[380px] text-base list-none bg-white divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600 rounded-xl`}>
                <div
                    className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300"
                >
                    Apps
                </div>
                <div className="grid grid-cols-3 gap-4 p-4">

                    {/* <a
                        href="#"
                        className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                    >
                        <svg
                            aria-hidden="true"
                            className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <div className="text-sm text-gray-900 dark:text-white">Inbox</div>
                    </a> */}
                    <a
                        href={route(`${userType}.show`, { slug: user.slug })}
                        className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                    >
                        <svg
                            aria-hidden="true"
                            className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <div className="text-sm text-gray-900 dark:text-white">
                            Profile
                        </div>
                    </a>
                    <Link
                        href={route(`${userType}.setting`)}
                        className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                    >
                        <svg
                            aria-hidden="true"
                            className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <div className="text-sm text-gray-900 dark:text-white">
                            Settings
                        </div>
                    </Link>

                    {/* <a
                        href="#"
                        className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                    >
                        <svg
                            aria-hidden="true"
                            className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path>
                            <path
                                fillRule="evenodd"
                                d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <div className="text-sm text-gray-900 dark:text-white">
                            Products
                        </div>
                    </a> */}

                    {/* <a
                        href="#"
                        className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                    >
                        <svg
                            aria-hidden="true"
                            className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <div className="text-sm text-gray-900 dark:text-white">
                            Billing
                        </div>
                    </a> */}
                    <a
                        href="#"
                        className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                    >
                        <svg
                            aria-hidden="true"
                            className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            ></path>
                        </svg>
                        <div className="text-sm text-gray-900 dark:text-white">
                            <Link
                                href={route(`${userType}.logout`)}
                                method="post"
                                as="button"

                            >
                                Sign out
                            </Link>
                        </div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Application
