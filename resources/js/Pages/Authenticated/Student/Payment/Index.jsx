import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

const Index = ({ payments, student }) => {
    return (
        <AuthLayout>
            <div className="container mx-auto p-4">
                <Head title="Daftar Pembayaran" />
                <h1 className="text-2xl font-bold mb-4 text-center">Riwayat Pembayaran</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border-b p-4 text-left text-gray-600">ID Pembayaran</th>
                                <th className="border-b p-4 text-left text-gray-600">Jumlah</th>
                                <th className="border-b p-4 text-left text-gray-600">Metode Pembayaran</th>
                                <th className="border-b p-4 text-left text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors`}>
                                    <td className="border-b p-4">{payment.id}</td>
                                    <td className="border-b p-4">{payment.amount}</td>
                                    <td className="border-b p-4">{payment.payment_method}</td>
                                    <td className="border-b p-4">{payment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Index;
