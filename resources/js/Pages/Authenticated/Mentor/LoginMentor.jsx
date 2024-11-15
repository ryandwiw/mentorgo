import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/AuthenticatedLayout/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';

export default function LoginMentor() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('mentor.login'));
    };

    return (
        <GuestLayout>
            <Head title="Login Mentor" />
            <div className="bg-slate-50 p-8 rounded-lg shadow-lg max-w-lg mx-auto w-full">
                <Link href={route('landing.page')} className="block md:hidden text-sm text-blue-500 hover:underline mb-4">
                    &larr; Kembali
                </Link>
                <form onSubmit={submit} >

                    <h1 className="text-gray-800 font-bold text-3xl mb-2 text-center">
                        Hello <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">Mentor!</span>
                    </h1>
                    <p className="text-sm font-normal text-gray-600 mb-6 text-center">Welcome Back</p>

                    <div className="mb-4">
                        <InputLabel htmlFor="email" value="Email Address" />
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="pl-2 outline-none border-none w-full ml-2"
                                placeholder="Email Address"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="password" value="Password" />
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <TextInput
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={data.password}
                                className="pl-2 outline-none border-none w-full ml-2"
                                placeholder="Password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2">
                                {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                            </button>
                        </div>
                        <InputError message={errors.password} className="mt-2" />
                    </div>
                    <div className='flex'>
                        <Link href="#" className="text-sm text-blue-500 hover :underline cursor-pointer mb-4">
                            Forgot Password?
                        </Link>
                    </div>

                    <button className="flex items-center justify-center mt-3 w-48 mx-auto bg-indigo-600 py-2 rounded-2xl text-white font-semibold mb-4" disabled={processing}>
                        Login
                    </button>

                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="px-4 text-gray-500">Or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="mb-4">
                        <a href={route('mentor.login.google')} className="flex items-center justify-center w-48 mx-auto text-center bg-green-500 py-2 rounded-2xl text-white font-semibold mb-4">
                            <FaGoogle className="mr-2" /> Login with Google
                        </a>
                    </div>

                    <div className="mt-4">
                        <Link
                            href={route('mentor.register')}
                            className="text-sm text-gray-600 underline hover:text-gray-900"
                        >
                            Don't have an account? Register
                        </Link>
                    </div>

                </form>
            </div>
        </GuestLayout>
    );
}
