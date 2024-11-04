import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-gradient-to-t from-blue-200 to-teal-200 w-full lg:p-10 z-20 relative p-0">
            <nav className="border-gray-200 py-3 dark:bg-gray-900 ">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                    <a href="#" className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-9" alt="low Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">MentorGo</span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="mobile-menu-2"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                            <svg className={`hidden w-6 h-6 ${isOpen ? 'block' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                        <div className="hidden lg:block lg:ml-4 space-x-3">
                            <a href={route('student.login')} className="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-6 lg:px-6 py-3 lg:py-3 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white focus:outline-none dark:focus:ring-blue-800">
                                Login
                            </a>
                            <a href={route('student.register')} className="text-white border bg-blue-600 hover:bg-white hover:text-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-6 lg:px-6 py-3 lg:py-3 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white focus:outline-none dark:focus:ring-blue-800">
                                Register
                            </a>
                        </div>
                    </div>
                    <div className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 sm:border sm:border-white-300 sm:rounded-lg lg:border-0">
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Company</a>
                            </li>

                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Features</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Team</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                            </li>
                            <div className={`flex flex-row justify-center space-x-2 mt-4 lg:hidden`}>
                                <a href={route('student.login')} className="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-4 py-2 w-auto max-w-xs text-center dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white focus:outline-none dark:focus:ring-blue-800">
                                    Login
                                </a>
                                <a href={route('student.register')} className="text-white border bg-blue-600 hover:bg-white-600 hover:text-blue focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-4 py-2 w-auto max-w-xs text-center dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white focus:outline-none dark:focus:ring-blue-800">
                                    Register
                                </a>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
            <section class=" dark:bg-gray-900 p-4 mt-11">
                <div class="grid max-w-screen-xl px-4 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12 lg:px-12 ">
                    <div class="mr-auto place-self-center lg:col-span-7">
                        <h4 className="font-extrabold max-w-2xl mb-4 md:text-xl xl:text-xl">
                            Lets Register
                        </h4>
                        <h1 class="font-roboto max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">
                            The World
                        </h1>
                        <h1 class="font-roboto max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
                            Building digital
                        </h1>
                        <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">This free and open-source landing page template was built using the utility classes from <a href="https://tailwindcss.com" class="hover:underline">Tailwind CSS</a> and based on the components from the <a href="https://flowbite.com/docs/getting-started/introduction/" class="hover:underline">Flowbite Library</a> and the <a href="https://flowbite.com/blocks/" class="hover:underline">Blocks System</a>.</p>
                        <div class="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                            <a href={route('student.login')} class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-6 lg:px-8 py-3 lg:py-3.5 sm:mr-2 lg:mr-0 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-800">Download</a>
                            <a href={route('student.register')} class="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-6 lg:px-8 py-3 lg:py-3.5 sm:mr-2 lg:mr-0 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white focus:outline-none dark:focus:ring-blue-800">Register</a>
                        </div>
                    </div>
                    <div class="hidden lg:mt-3 lg:col-span-5 lg:flex ">
                        <img src="assets/images/hero.png" alt="hero image" />
                    </div>
                </div>
            </section>
        </header>
    );
};

export default Navbar;
