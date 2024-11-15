import React from 'react';

const Notification = ({ isOpen, toggleDropdown, notifications }) => {
    return (
        <>
            <button
                type="button"
                onClick={toggleDropdown}
                className="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
                <span className="sr-only">View notifications</span>
                <svg
                    aria-hidden="true"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                </svg>
            </button>

            <div className={`${isOpen ? 'block' : 'hidden'} absolute right-0 top-full mt-1 overflow-y-auto max-h-[80vh] z-50 w-[380px] text-base list-none bg-white divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600 rounded-xl`}>
                <div
                    className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300"
                >
                    Notifications
                </div>
                <div>
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <a
                                key={index}
                                href="#"
                                className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                            >
                                <div className="flex-shrink-0">
                                    <img
                                        className="w-11 h-11 rounded-full"
                                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                                        alt="Avatar"
                                    />
                                    <div
                                        className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white dark:border-gray-700"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="w-3 h-3 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="pl-3 w-full">
                                    <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                        <span className="font-semibold text-gray-900 dark:text-white mr-1">{notification.title}</span>
                                        {notification.message}
                                    </div>
                                    <div className="text-xs font-medium text-primary-600 dark:text-primary-500">
                                        {notification.time}
                                    </div>
                                </div>
                            </a>
                        ))
                    ) : (
                        <div className="py-3 px-4 text-center text-gray-500">
                            No notifications available.
                        </div>
                    )}
                </div>
                <a
                    href="#"
                    className="block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:underline"
                >
                    <div className="inline-flex items-center">
                        <svg
                            aria-hidden="true"
                            className="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                            <path
                                fillRule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        View all
                    </div>
                </a>
            </div>
        </>
    );
};

export default Notification;
