import React from 'react';

const Header = () => {
    return (
        <section class="bg-gray-50 dark:bg-gray-800 p-5">
            <div class="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">

                <div class="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                    <div class="text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Work with tools you
                            <span class='bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent mx-3 '>already</span>
                            use
                        </h2>
                        <img class="w-full mb-4 rounded-lg lg:mb-0 lg:hidden flex" src="./assets/images/feature-1.png" alt="dashboard feature image" />
                        <p class="mb-8 font-light lg:text-xl">Deliver great service experiences fast - without the complexity of traditional ITSM solutions.</p>
                        <ul role="list" class="py-6 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                            <li class="flex space-x-3">

                                <svg class="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">Continuous integration and deployment</span>
                            </li>
                            <li class="flex space-x-3">

                                <svg class="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">Development workflow</span>
                            </li>
                            <li class="flex space-x-3">

                                <svg class="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">Knowledge management</span>
                            </li>
                        </ul>
                        <div className="-mt-3 ">
                            <a href={route('student.login')} class="text-blue-500 border border-blue-600 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-6 lg:px-8 py-3 lg:py-3.5 sm:mr-2 lg:mr-0 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-800">Get Started</a>
                        </div>

                    </div>
                    <img class="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex" src="./assets/images/feature-1.png" alt="dashboard feature image" />
                </div>

                <div class="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16 py-5">
                    <img class="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex" src="./assets/images/feature-2.png" alt="feature image 2" />
                    <div class="text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">We invest in the world’s potential</h2>
                        <img class="w-full mb-4 rounded-lg lg:mb-0 lg:hidden flex" src="./assets/images/feature-1.png" alt="dashboard feature image" />
                        <p class="mb-8 font-light lg:text-xl">Deliver great service experiences fast - without the complexity of traditional ITSM solutions.</p>

                        <ul role="list" class="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                            <li class="flex space-x-3">

                                <svg class="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">Dynamic reports and dashboards</span>
                            </li>
                            <li class="flex space-x-3">

                                <svg class="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">Templates for everyone</span>
                            </li>
                            <li class="flex space-x-3">

                                <svg class="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">Development workflow</span>
                            </li>

                        </ul>
                        <p class="font-light lg:text-xl">Deliver great service experiences fast - without the complexity of traditional ITSM solutions.</p>
                        <div className="py-10 ">
                            <a href={route('mentor.login')} class="text-blue-500 border border-blue-600 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-6 lg:px-8 py-3 lg:py-3.5 sm:mr-2 lg:mr-0 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-800">Get Started</a>
                        </div>
                    </div>
                </div>

                <div class="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16 lg:px-24 py-4 ">
                    <div class="text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Work with tools you already use
                        </h2>
                        <img class="w-full mb-4 rounded-lg lg:mb-0 lg:hidden flex" src="./assets/images/feature-1.png" alt="dashboard feature image" />
                        <ul role="list" class="py-6 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                            <li class="flex space-x-3">
                                <svg class="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                <div class="flex flex-col">
                                    <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">Continuous integration and deployment</span>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">NEFA is a licensed New York trust company that undergoes regular bank exams and is subject to the cybersecurity audits conducted by the New York Department of Financial Services. Learn more about our commitment to security.</p>
                                </div>
                            </li>
                            <li class="flex space-x-3">
                                <svg class="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                <div class="flex flex-col">
                                    <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">Development workflow</span>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">NEFA is a licensed New York trust company that undergoes regular bank exams and is subject to the cybersecurity audits conducted by the New York Department of Financial Services. Learn more about our commitment to security.</p>
                                </div>
                            </li>
                            <li class="flex space-x-3">
                                <svg class="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                <div class="flex flex-col">
                                    <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">Knowledge management</span>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">NEFA is a licensed New York trust company that undergoes regular bank exams and is subject to the cybersecurity audits conducted by the New York Department of Financial Services. Learn more about our commitment to security.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <img class="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex" src="./assets/images/feature-1.png" alt="dashboard feature image" />
                </div>

            </div>
        </section>
    );
}

export default Header;
