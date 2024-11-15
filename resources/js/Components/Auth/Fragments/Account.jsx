
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import StarRating from './Rating';

const Account = ({ isOpen, toggleDropdown, user, userType, mentor , admin }) => {
    // console.log('Account component rendered:', { user, userType, mentor });

    if (!user) return null;

    return (
        <>
            <button
                onClick={toggleDropdown}
                type="button"
                className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open user menu</span>
                <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={
                        user.profile_picture
                            ? `/storage/${user.profile_picture}`
                            : '/default-avatar.png'
                    }
                    alt={`${user.name}'s photo`}
                />
            </button>

            <div className={`${isOpen ? 'block' : 'hidden'} absolute right-0 top-full mt-1 overflow-y-auto max-h-[80vh] z-50 w-[280px] text-base list-none bg-white divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600 rounded-xl`}>
                <div
                    className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300"
                >
                    User Settings
                </div>
                <div className="py-3 px-4">
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                        {user.name}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                        {user.email}
                    </span>
                    {user.location && (
                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                            📍 {user.location}
                        </span>
                    )}

                </div>

                <ul className="py-1 text-gray-700 dark:text-gray-300">
                    <li>
                        <a
                            href={route(`${userType}.show`, { slug: user.slug })}
                            className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                        >
                            My Profile
                        </a>
                    </li>
                    <li>
                        <a
                            href={route(`${userType}.setting`)}
                            className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                        >
                            Settings
                        </a>
                    </li>
                    {mentor && (
                        <li>
                            <a
                                href=""
                                className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                            >
                                My Subjects
                            </a>
                        </li>
                    )}
                </ul>

                <ul className="py-1 text-gray-700 dark:text-gray-300">
                    <li>
                        <Link
                            href={route(`${userType}.logout`)}
                            method="post"
                            as="button"
                            className="block w-full text-left py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Sign out
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Account;
