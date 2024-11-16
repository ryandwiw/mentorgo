import AuthLayout from '@/Layouts/AuthenticatedLayout/AuthLayout'
import React from 'react'
import { FaQuestionCircle, FaUser, FaChalkboardTeacher, FaCalendarCheck, FaCreditCard, FaStar, FaHeadset } from 'react-icons/fa';

const Help = () => {
    return (
        <AuthLayout>
            <div className="help-page max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-100 to-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Halaman Bantuan untuk Siswa</h1>

                <section className="mb-6 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-2 flex items-center">
                        <FaQuestionCircle className="text-blue-600 mr-2" /> Panduan Pendaftaran
                    </h2>
                    <p className="text-gray-700">
                        <strong>Bagaimana cara mendaftar sebagai siswa?</strong><br />
                        Kunjungi halaman pendaftaran, isi formulir pendaftaran dengan informasi yang diperlukan, dan klik tombol "Daftar". Pastikan email yang digunakan valid untuk verifikasi.
                    </p>
                </section>

                <section className="mb-6 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-2 flex items-center">
                        <FaUser Edit className="text-blue-600 mr-2" /> Mengelola Profil
                    </h2>
                    <p className="text-gray-700">
                        <strong>Bagaimana cara mengubah informasi profil saya?</strong><br />
                        Masuk ke akun Anda, pergi ke halaman profil, dan klik "Edit Profil". Anda dapat memperbarui nama, foto profil, dan informasi lainnya.
                    </p>
                </section>

                <section className="mb-6 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-2 flex items-center">
                        <FaChalkboardTeacher className="text-blue-600 mr-2" /> Mencari Mentor
                    </h2>
                    <p className="text-gray-700">
                        <strong>Bagaimana cara mencari mentor?</strong><br />
                        Gunakan fitur pencarian untuk menemukan mentor berdasarkan subjek atau lokasi. Anda juga dapat melihat ulasan dan peringkat mentor untuk membantu keputusan Anda.
                    </p>
                </section>

                <section className="mb-6 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-2 flex items-center">
                        <FaCalendarCheck className="text-blue-600 mr-2" /> Menjadwalkan Sesi Mentoring
                    </h2>
                    <p className="text-gray-700">
                        <strong>Bagaimana cara menjadwalkan sesi mentoring?</strong><br />
                        Setelah menemukan mentor, pilih sesi yang tersedia dan klik "Pesan". Pilih waktu yang sesuai dan konfirmasi.
                    </p>
                </section>

                <section className="mb-6 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-2 flex items-center">
                        <FaCreditCard className="text-blue-600 mr-2" /> Pembayaran
                    </h2>
                    <p className="text-gray-700">
                        <strong>Apa metode pembayaran yang diterima?</strong><br />
                        Kami menerima pembayaran melalui kartu kredit, e-wallet, dan transfer bank. Pastikan untuk menyelesaikan pembayaran sebelum sesi dimulai.
                    </p>
                </section>

                <section className="mb-6 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-2 flex items-center">
                        <FaStar className="text-blue-600 mr-2" /> Memberikan Ulasan
                    </h2>
                    <p className="text-gray-700">
                        <strong>Bagaimana cara memberikan ulasan untuk mentor?</strong><br />
                        Setelah sesi mentoring selesai, Anda akan menerima opsi untuk memberikan rating dan komentar tentang pengalaman Anda.
                    </p>
                </section>

 <section className="mb-6 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-2 flex items-center">
                        <FaHeadset className="text-blue-600 mr-2" /> Dukungan Pelanggan
                    </h2>
                    <p className="text-gray-700">
                        <strong>Siapa yang harus dihubungi jika saya mengalami masalah?</strong><br />
                        Anda dapat menghubungi tim dukungan pelanggan melalui email di mentorgo@gmail.com.
                    </p>
                </section>
            </div>
        </AuthLayout>
    )
}

export default Help
