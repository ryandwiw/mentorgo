<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Student;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Student::create([
            'slug' => 'azka-kasmito-putra',
            'name' => 'Azka Kasmito Putra',
            'email' => 'azka.putra@mail.com',
            'password' => bcrypt('12345678'),
            'bio' => 'Mahasiswa di Politeknik Negeri Malang, berfokus pada bidang teknologi.',
            'asal' => 'Politeknik Negeri Malang',
            'profile_picture' => null,
            'location' => null,
            'google_id' => null,
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ]);

        Student::create([
            'slug' => 'muhammad-aulia-rizky',
            'name' => 'Muhammad Aulia Rizky',
            'email' => 'muhammad.rizky@mail.com',
            'password' => bcrypt('12345678'),
            'bio' => 'Mahasiswa Politeknik Negeri Malang, berfokus pada bidang elektronika.',
            'asal' => 'Politeknik Negeri Malang',
            'profile_picture' => null,
            'location' => null,
            'google_id' => null,
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ]);

        Student::create([
            'slug' => 'rama-dhani',
            'name' => 'Rama Dhani',
            'email' => 'rama.dhani@mail.com',
            'password' => bcrypt('12345678'),
            'bio' => 'Mahasiswa Universitas Muhammadiyah Malang, berfokus pada manajemen dan bisnis.',
            'asal' => 'Universitas Muhammadiyah Malang',
            'profile_picture' => null,
            'location' => null,
            'google_id' => null,
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ]);

        Student::create([
            'slug' => 'tanya-priska-firdaus',
            'name' => 'Tanya Priska Firdaus',
            'email' => 'tanya.firdaus@mail.com',
            'password' => bcrypt('12345678'),
            'bio' => 'Mahasiswa Universitas Negeri Surabaya, berfokus pada ilmu pendidikan.',
            'asal' => 'Universitas Negeri Surabaya',
            'profile_picture' => null,
            'location' => null,
            'google_id' => null,
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ]);

        Student::create([
            'slug' => 'pasha',
            'name' => 'Pasha',
            'email' => 'pasha@mail.com',
            'password' => bcrypt('12345678'),
            'bio' => 'Mahasiswa Politeknik Negeri Malang, berfokus pada ilmu komputer.',
            'asal' => 'Politeknik Negeri Malang',
            'profile_picture' => null,
            'location' => null,
            'google_id' => null,
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ]);

        Student::create([
            'slug' => 'ali',
            'name' => 'Ali',
            'email' => 'ali@mail.com',
            'password' => bcrypt('12345678'),
            'bio' => 'Mahasiswa Politeknik Elektronika Negeri Surabaya, berfokus pada elektronik.',
            'asal' => 'Politeknik Elektronika Negeri Surabaya',
            'profile_picture' => null,
            'location' => null,
            'google_id' => null,
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ]);

        Student::create([
            'slug' => 'chalimatus-sadiyah',
            'name' => 'Chalimatus Sa\'diyah',
            'email' => 'chalimatus.sadiyah@mail.com',
            'password' => bcrypt('12345678'),
            'bio' => 'Mahasiswa Universitas Negeri Malang, berfokus pada pendidikan dan sains.',
            'asal' => 'Universitas Negeri Malang',
            'profile_picture' => null,
            'location' => null,
            'google_id' => null,
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ]);

        Student::create([
            'slug' => 'anisah',
            'name' => 'ANISAH',
            'email' => 'anisah@mail.com',
            'password' => bcrypt('12345678'),
            'bio' => 'Mahasiswa di Universitas Negeri Malang, fokus pada psikologi dan sosiologi.',
            'asal' => 'Universitas Negeri Malang',
            'profile_picture' => null,
            'location' => null,
            'google_id' => null,
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ]);

        Student::create([
            'slug' => 'bagus-kharisma-putra',
            'name' => 'Bagus Kharisma Putra',
            'email' => 'bagus.putra@mail.com',
            'password' => bcrypt('12345678'),
            'bio' => 'Mahasiswa di Universitas Negeri Malang, berfokus pada studi hukum.',
            'asal' => 'Universitas Negeri Malang',
            'profile_picture' => null,
            'location' => null,
            'google_id' => null,
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ]);
    }
}
