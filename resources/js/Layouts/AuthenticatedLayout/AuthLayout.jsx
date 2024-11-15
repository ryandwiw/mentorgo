import Aside from '@/Components/Auth/Aside';
import Navbar from '@/Components/Auth/Navbar';
import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';

const AuthLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { student, mentor, admin } = usePage().props || {};

    const user = student || mentor || admin;
    const userType = student ? 'student' : mentor ? 'mentor' : 'admin';


    const [notifications, setNotifications] = useState([]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Contoh fungsi untuk menambah notifikasi
    const addNotification = (notification) => {
        setNotifications((prev) => [...prev, notification]);
    };


    return (
        <div className='antialiased bg-gray-50 dark:bg-gray-900'>
            <Navbar
                toggleSidebar={toggleSidebar}
                user={user}
                userType={userType}
                mentor={mentor}
                notifications={notifications}
                admin={admin}
            />
            <Aside isOpen={isSidebarOpen} user={user} userType={userType} mentor={mentor} admin={admin} />
            <main className='p-4 md:ml-64 h-auto pt-20'>
                {children}
            </main>
        </div>
    );
};

export default AuthLayout;
