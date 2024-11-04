import React from 'react'

const Logo = () => {
    return (
        <a href="#" className="flex items-center justify-between mr-4">
            <img
                src="https://flowbite.s3.amazonaws.com/logo.svg"
                className="mr-3 h-8"
                alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MentorGo</span>
        </a>
    )
}

export default Logo
