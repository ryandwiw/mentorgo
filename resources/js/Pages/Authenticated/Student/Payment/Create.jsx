import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { FaCcVisa, FaWallet, FaCcMastercard, FaPaypal } from 'react-icons/fa';

const Create = ({ booking }) => {
    const { data, setData, post, processing, errors } = useForm({
        booking_id: booking.id,
        amount: booking.total_price,
        payment_method: 'credit_card',
    });

    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('student.payments.store'));
    };

    const formatRupiah = (amount) => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        });
        return formatter.format(amount);
    };

    const options = [
        { value: 'credit_card', label: 'Credit Card', icon: <FaCcVisa className="mr-2 text-blue-500" /> },
        { value: 'e-wallet', label: 'E-Wallet', icon: <FaWallet className="mr-2 text-green-500" /> },
        { value: 'bank_transfer', label: 'Bank Transfer', icon: <FaCcMastercard className="mr-2 text-red-500" /> },
        { value: 'paypal', label: 'PayPal', icon: <FaPaypal className="mr-2 text-yellow-500" /> },
    ];

    const handleSelect = (option) => {
        setData('payment_method', option.value);
        setIsOpen(false);
    };

    return (
        <AuthLayout>
            <section className="py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-3xl bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Order Summary</h2>
                        <Link
                            href={route('student.sessions.bookings.index')}
                            className="text-blue-500 hover:text-blue-600 transition duration-200 transform hover:scale-105"
                        >
                            Kembali ke Daftar
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit} className="mx-auto max-w-screen-xl px-4 2xl:px-0">

                        <div className="mt-6 space-y-6 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Billing Information</h4>

                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <h5 className="text-md font-semibold text-gray-800 dark:text-gray-200">Mentoring Session Details</h5>
                                <div className="mt-4 space-y-2">
                                    <dl className="flex justify-between">
                                        <dt className="text-base font-medium text-gray-900 dark:text-white">Session Title</dt>
                                        <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">{booking.mentoring_session?.title}</dd>
                                    </dl>
                                    <dl className="flex justify-between">
                                        <dt className="text-base font-medium text-gray-900 dark:text-white">Session Type</dt>
                                        <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">{booking.mentoring_session?.session_type}</dd>
                                    </dl>
                                </div>
                            </div>

                            <div className="bg-gray-100 shadow-lg rounded-lg p-6">
                                <h5 className="text-md font-semibold text-gray-800 dark:text-gray-200">Payment Summary</h5>
                                <div className="mt-4 space-y-2">
                                    <dl className="flex justify-between">
                                        <dt className="text-base font-medium text-gray-700 dark:text-white">Total Amount</dt>
                                        <dd className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-100">{formatRupiah(booking.total_price)}</dd>
                                    </dl>
                                    <dl className="flex justify-between">
                                        <dt className="text-sm font-light text-gray-500 dark:text-gray-400">Booking ID</dt>
                                        <dd className="mt-1 text-sm font-light text-gray-500 dark:text-gray-400">{booking.id}</dd>
                                    </dl>
                                </div>
                            </div>


                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                            <div className="relative mt-1">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="block w-full border border-gray-300 rounded-md p-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 hover:border-blue-500 flex items-center"
                                >
                                    {data.payment_method
                                        ? options.find(option => option.value === data.payment_method)?.icon
                                        : null}
                                    <span className="ml-2">
                                        {data.payment_method
                                            ? options.find(option => option.value === data.payment_method)?.label
                                            : 'Select Payment Method'}
                                    </span>
                                </button>
                                {isOpen && (
                                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
                                        {options.map(option => (
                                            <div
                                                key={option.value}
                                                onClick={() => handleSelect(option)}
                                                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                                            >
                                                {option.icon}
                                                <span className="ml-2">{option.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {errors.payment_method && <div className="text-red-500 mt-1 text-sm">{errors.payment_method}</div>}
                        </div>

                        <div className="flex justify-center gap-4 sm:flex sm:items-center">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`w-auto max-w-xs rounded-lg border border-gray-200 bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 transition duration-200 transform hover:scale-105 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {processing ? 'Processing ...' : 'Bayar'}
                            </button>
                        </div>
                </div>
            </form>
        </div>
            </section >
        </AuthLayout >
    );
}

export default Create;
