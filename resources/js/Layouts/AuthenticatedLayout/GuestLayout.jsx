import { Link } from '@inertiajs/react';
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const AuthLayout = ({ children }) => {
    return (
        <div className="h-auto flex flex-col md:flex-row">
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center p-8">
                <div className="absolute top-4 left-4 text-white cursor-pointer transition-transform transform hover:scale-105">
                    <Link href={route('landing.page')} className="flex items-center space-x-1">
                        <FaExternalLinkAlt className="text-lg" />
                        <span className="text-sm font-semibold">Kembali</span>
                    </Link>
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-white font-bold text-4xl font-sans">MentorGo</h1>
                    <p className="text-white mt-1">The most popular peer-to-peer lending platform in SEA</p>
                    <div className="flex justify-content-center space-x-3 mt-3">
                        <Link href={route('student.login')} className="block w-28 text-center bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">
                            Student
                        </Link>
                        <Link href={route('mentor.login')} className="block w-28 text-center bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">
                            Mentor
                        </Link>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex w-full md:w-1/2 justify-center items-center bg-white p-8">
                {children}
            </div>

            <div className="flex md:hidden w-full h-full justify-center items-center bg-white p-8">
                {children}
            </div>
        </div>

    );
}

export default AuthLayout;
