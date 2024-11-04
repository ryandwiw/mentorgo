import React from 'react';
import { Link } from '@inertiajs/react';

const ModalCheck = ({ isOpen, onClose, user, role }) => {
    if (!isOpen) return null;

    const editProfileUrl = role === 'mentor'
        ? route('mentor.show', { slug: user.slug })
        : route('student.show', { slug: user.slug });

    return (
        <div id="readProductModal" tabIndex="-1" aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-xl h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                        <div className="text-lg text-gray-900 md:text-xl dark:text-white">
                            <h3 className="font-semibold">Profile Incomplete</h3>
                        </div>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <p className="mb-4 text-gray-500 dark:text-gray-400">
                        Mohon Mengisi Data Diri Terlebih Dahulu di Pengaturan sebelum anda bisa mengakses Layanan Kami
                    </p>
                    <div className="flex justify-end">
                        <Link
                            href={editProfileUrl}
                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2"
                        >
                            Edit Profile
                        </Link>
                        <button onClick={onClose} className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalCheck;
