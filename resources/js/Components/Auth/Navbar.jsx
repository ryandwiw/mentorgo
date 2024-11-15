import React, { useEffect, useRef, useState } from 'react'
import ToggleButtonMobile from './Fragments/ToggleButtonMobile';
import SearchForm from './Fragments/SearchForm';
import Logo from './Fragments/Logo';
import Notification from './Fragments/Notification';
import Application from './Fragments/Application';
import Account from './Fragments/Account';

const Navbar = ({ toggleSidebar, user, userType, mentor , notifications , admin }) => {

    // console.log('Navbar props:', { user, userType, mentor });
    // console.log("Mentor data:", mentor);

    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (dropdown) => {
        if (openDropdown === dropdown) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(dropdown);
        }
    };

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
            <div className="flex flex-wrap justify-between items-center">
                <div className="flex justify-start items-center">
                    <ToggleButtonMobile toggleSidebar={toggleSidebar} />
                    <Logo />
                    <SearchForm />
                </div>
                <div className="flex items-center lg:order-2 relative" ref={dropdownRef}>
                    <Notification
                        isOpen={openDropdown === 'notification'}
                        toggleDropdown={() => toggleDropdown('notification')}
                        user={user} userType={userType} mentor={mentor}
                        notifications={notifications}
                    />
                    <Application
                        isOpen={openDropdown === 'apps'}
                        toggleDropdown={() => toggleDropdown('apps')}
                        user={user} userType={userType} mentor={mentor}
                    />
                    <Account
                        isOpen={openDropdown === 'account'}
                        toggleDropdown={() => toggleDropdown('account')}
                        user={user} userType={userType} mentor={mentor}

                    />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
