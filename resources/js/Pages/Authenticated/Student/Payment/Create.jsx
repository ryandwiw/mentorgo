import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

const Create = ({ booking }) => {
    const { data, setData, post, processing, errors } = useForm({
        booking_id: booking.id,
        amount: booking.total_price,
        payment_method: 'credit_card',
    });

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

                        <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Billing Information</h4>

                            <dl>
                                <dt className="text-base font-medium text-gray-900 dark:text-white">Mentoring Session</dt>
                                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">{booking.mentoring_session?.title}</dd>
                            </dl>

                            <dl>
                                <dt className="text-base font-medium text-gray-900 dark:text-white">Tipe Sesi</dt>
                                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">{booking.mentoring_session?.session_type}</dd>
                            </dl>

                            <dl>
                                <dt className="text-base font-medium text-gray-900 dark:text-white">Booking ID</dt>
                                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">{booking.id}</dd>
                            </dl>

                            <dl>
                                <dt className="text-base font-medium text-gray-900 dark:text-white">Total Amount</dt>
                                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">{formatRupiah(booking.total_price)}</dd>
                            </dl>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                                <select
                                    value={data.payment_method}
                                    onChange={e => setData('payment_method', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 hover:border-blue-500"
                                    required
                                >
                                    <option value="credit_card">Credit Card</option>
                                    <option value="e-wallet">E-Wallet</option>
                                    <option value="bank_transfer">Bank Transfer</option>
                                </select>
                                {errors.payment_method && <div className="text-red-500 mt-1 text-sm">{errors.payment_method}</div>}
                            </div>

                            <div className="flex justify-center gap-4 sm:flex sm:items-center">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`w-auto max-w-xs rounded-lg border border-gray-200 bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover :text-white dark:focus:ring-gray-700 transition duration-200 transform hover:scale-105 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {processing ? 'Processing ...' : 'Bayar'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </AuthLayout>
    );
}

export default Create;
