import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout'
import React from 'react'
import { FaQuestionCircle, FaUser,  FaCalendarCheck, FaClipboardList, FaStar, FaHeadset } from 'react-icons/fa';

const Help = () => {
    return (
        <AuthLayout>
            <div className="help-page max-w-4xl mx-auto p-8 bg-gradient-to-r from-green-100 to-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center mb-8 text-green-600">Halaman Bantuan untuk Mentor</h1>

                <section className="mb-6 p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-2 flex items-center">
                        <FaQuestionCircle className="text-green-600 mr-2" /> Panduan Pendaftaran
                    </h2>
                    <p className="text-gray-700">
                        <strong>Bagaimana cara mendaftar sebagai mentor?</strong><br />
                        Kunjungi halaman pendaftaran mentor, isi formulir dengan informasi yang diperlukan, dan klik "Daftar". Pastikan untuk menyertakan informasi yang akurat tentang keahlian Anda.
                    </p>
                </section>

                <section className="mb-6 p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-2 flex items-center">
                        <FaUser Edit className="text-green-600 mr-2" /> Mengelola Profil
                    </h2>
                    <p className="text-gray-700">
                        <strong>Bagaimana cara memperbarui profil saya?</strong><br />
                        Masuk ke akun mentor Anda, pergi ke halaman profil, dan klik "Edit Profil". Anda dapat memperbarui bio, foto profil, dan subjek yang Anda ajarkan.
                    </p>
                </section>

                <section className="mb-6 p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-2 flex items-center">
                        <FaCalendarCheck className="text-green-600 mr-2" /> Menjadwalkan Sesi Mentoring
                    </h2>
                    <p className="text-gray-700">
                        <strong>Bagaimana cara menjadwalkan sesi mentoring?</strong><br />
                        Anda dapat membuat sesi baru di dashboard Anda. Tentukan waktu, durasi, dan tipe sesi (online/offline) lalu simpan.
                    </p>
                </section>

                <section className="mb-6 p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-2 flex items-center">
                        <FaClipboardList className="text-green-600 mr-2" /> Mengelola Bookings
                    </h2>
                    <p className="text-gray-700">
                        <strong>Bagaimana cara melihat dan mengelola booking?</strong><br />
                        Di dashboard, pilih "Booking". Anda akan melihat daftar sesi yang dipesan dan dapat mengelola statusnya.
                    </p>
                </section>

                <section className="mb-6 p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-2 flex items-center">
                        <FaStar className="text-green-600 mr-2" /> Rating dan Ulasan
                    </h2>
                    <p className="text-gray-700">
                        <strong>Bagaimana cara melihat rating dan ulasan saya?</strong><br />
                        Anda dapat melihat rating dan ulasan dari siswa di bagian "Ulasan" di dashboard Anda.
                    </p>
                </section>

                <section className="mb-6 p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-2 flex items-center">
                        <FaHeadset className="text-green-600 mr-2" /> Dukungan Pelanggan
                    </h2>
                    <p className="text-gray-700">
                        <strong>Siapa yang harus dihubungi jika saya mengalami masalah?</strong><br />
                        Anda dapat meng hubungi tim dukungan kami melalui email di mentorgo@gmail.com.
                    </p>
                </section>
            </div>
        </AuthLayout>
    )
}

export default Help
