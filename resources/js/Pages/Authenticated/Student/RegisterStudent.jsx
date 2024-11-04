import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/AuthenticatedLayout/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

export default function RegisterStudent() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('student.register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register student" />
            <div className="bg-slate-50 p-8 rounded-lg shadow-lg max-w-lg mx-auto w-full">
                <Link href={route('landing.page')} className="block md:hidden text-sm text-blue-500 hover:underline mb-4">
                    &larr; Kembali
                </Link>
                <form onSubmit={submit} >
                    <h1 className="text-gray-800 font-bold text-3xl mb-2 text-center">
                        Register <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">as student</span>
                    </h1>
                    <p className="text-sm font-normal text-gray-600 mb-6 text-center">Create your account</p>

                    <div className="mb-4">
                        <InputLabel htmlFor="name" value="Name" />
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                            <FaUser className="text-gray-400" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="pl-3 outline-none border-none w-full ml-2"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="email" value="Email" />
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                            <FaEnvelope className="text-gray-400" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="pl-2 outline-none border-none w-full ml-2"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="password" value="Password" />
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                            <FaLock className="text-gray-400" />
                            <TextInput
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={data.password}
                                className="pl-2 outline-none border-none w-full ml-2"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2">
                                {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                            </button>
                        </div>
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                            <FaLock className="text-gray-400" />
                            <TextInput
                                id="password_confirmation"
                                type={showPasswordConfirmation ? "text" : "password"}
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="pl-2 outline-none border-none w-full ml-2"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <button type="button" onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)} className="ml-2">
                                {showPasswordConfirmation ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                            </button>
                        </div>
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="my-4 flex items-center justify-between">
                        <Link
                            href={route('student.login')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Already registered?
                        </Link>
                    </div>

                    <button className="flex items-center justify-center mt-3 w-48 mx-auto bg-indigo-600 py-2 rounded-2xl text-white font-semibold mb-4" disabled={processing}>
                        Register
                    </button>

                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="px-4 text-gray-500">Or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="mb-4">
                        <a href={route('student.login.google')} className="flex items-center justify-center w-48 mx-auto text-center bg-green-500 py-2 rounded-2xl text-white font-semibold mb-4">
                            <FaGoogle className="mr-2" /> With Google
                        </a>
                    </div>
                </form>
            </div>

        </GuestLayout>
    );
}
