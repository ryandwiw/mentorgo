// resources/js/Pages/admins/Settings.jsx
import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { Link } from '@inertiajs/react';
import { BiArrowBack } from 'react-icons/bi';
import { FaKey, FaLanguage, FaFileContract, FaTrash, FaSignOutAlt, FaChevronRight } from 'react-icons/fa';

export default function Settings({ admin }) {
    return (
        <AuthLayout>
            <div className="container mx-auto px-4 ">

                <Link
                    href={route('admin.dashboard')}
                    className="inline-flex items-center text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 mb-6"
                >
                    <BiArrowBack className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </Link>

                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    Account Settings
                </h1>


                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md p-6 mb-6 text-center">
                    <img
                        src={
                            admin.profile_picture
                                ? `/storage/${admin.profile_picture}`
                                : '/default-avatar.png'
                        }
                        alt="Profile"
                        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white"
                    />
                    <h2 className="text-2xl font-semibold text-white mb-2">
                        {admin.name}
                    </h2>
                    <p className="text-white opacity-90">
                        {admin.email}
                    </p>
                </div>


                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ">

                    <div >
                        <div href="" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <div className="flex items-center">
                                <FaKey className="w-6 h-6 text-gray-500 mr-3" />
                                <span className="text-lg font-medium text-gray-900 dark:text-white">Change Password</span>
                            </div>
                            <FaChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                        <div href="" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                            <div className="flex items-center">
                                <FaLanguage className="w-6 h-6 text-gray-500 mr-3" />
                                <span className="text-lg font-medium text-gray-900 dark:text-white">Change Language</span>
                            </div>
                            <FaChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                        <div href="" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                            <div className="flex items-center">
                                <FaFileContract className="w-6 h-6 text-gray-500 mr-3" />
                                <span className="text-lg font-medium text-gray-900 dark:text-white">Terms and Conditions</span>
                            </div>
                            <FaChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                    <Link href={route('admin.logout')} method="post" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex items-center">
                            <FaSignOutAlt className="w-6 h-6 text-gray-500 mr-3" />
                            <span className="text-lg font-medium text-gray-900 dark:text-white">Logout</span>
                        </div>
                        <FaChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>
                </div>
            </div>

        </AuthLayout>
    );
}
