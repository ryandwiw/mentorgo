import React from 'react'

const Jumbotron = () => {
    return (
        <div>
            <section class="bg-white px-4 py-8 antialiased dark:bg-gray-900 md:py-16">
                <div class="mx-auto grid max-w-screen-xl rounded-lg bg-gray-50 p-4 dark:bg-gray-800 md:p-8 lg:grid-cols-12 lg:gap-8 lg:p-16 xl:gap-16">

                    <div class="lg:col-span-12 text-center ">
                        <h2 class="text-3xl font-extrabold text-gray">Explore Our Products</h2>
                    </div>

                    <div class="lg:col-span-4 flex flex-col items-center">
                        <a href="#">
                            <img class="mb-2 h-44 w-44 dark:hidden sm:h-24 sm:w-24 md:h-56 md:w-56" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-components.svg" alt="peripherals" />
                        </a>
                        <p class="text-center text-gray">Product 1 </p>
                        <p class="text-center text-gray mt-2">Sign up for your free NEFA Wallet on web, iOS or Android and follow our easy process to set up your profile</p>
                    </div>

                    <div class="lg:col-span-4 flex flex-col items-center">
                        <a href="#">
                            <img class="mb-2 h-44 w-44 dark:hidden sm:h-24 sm:w-24 md:h-56 md:w-56" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-components.svg" alt="peripherals" />
                        </a>
                        <p class="text-center text-gray">Product 2 </p>
                        <p class="text-center text-gray mt-2">Sign up for your free NEFA Wallet on web, iOS or Android and follow our easy process to set up your profile</p>

                    </div>

                    <div class="lg:col-span-4 flex flex-col items-center">
                        <a href="#">
                            <img class="mb-2 h-44 w-44 dark:hidden sm:h-24 sm:w-24 md:h-56 md:w-56" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-components.svg" alt="peripherals" />
                        </a>
                        <p class="text-center text-gray">Product 3 </p>
                        <p class="text-center text-gray mt-2">Sign up for your free NEFA Wallet on web, iOS or Android and follow our easy process to set up your profile</p>

                    </div>

                </div>
            </section>



        </div>
    )
}

export default Jumbotron
