<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Mentor;

class MentorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Mentor::create([
            'slug' => 'miftachul-ulum',
            'name' => 'Miftachul Ulum',
            'email' => 'miftachul.ulum@mail.com',
            'password' => bcrypt('12345678'),
            'bio' => 'Seorang mentor dari Universitas Negeri Malang, berpengalaman di berbagai bidang.',
            'asal' => 'Universitas Negeri Malang',
            'profile_picture' => null,
            'subjects' => null,
            'rating' => 4,
            'google_id' => null,
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ]);

        Mentor::create([
            'slug' => 'satria-cahya-ramadhan',
            'name' => 'Satria Cahya Ramadhan',
            'email' => 'satria.ramadhan@mail.com',
            'password' => bcrypt('12345678'),
            'bio' => 'Mentor di Universitas Negeri Malang, berfokus pada mata pelajaran akademik.',
            'asal' => 'Universitas Negeri Malang',
            'profile_picture' => null,
            'subjects' => null,
            'rating' => 4,
            'google_id' => null,
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ]);

        Mentor::create([
            'slug' => 'raissa-araminta',
            'name' => 'Raissa Araminta',
            'email' => 'raissa.araminta@mail.com',
            'password' => bcrypt('12345678'),
            'bio' => 'Seorang mentor di Universitas Negeri Malang yang berfokus pada ilmu sosial.',
            'asal' => 'Universitas Negeri Malang',
            'profile_picture' => null,
            'subjects' => null,
            'rating' => 4,
            'google_id' => null,
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ]);

        Mentor::create([
            'slug' => 'ayu',
            'name' => 'Ayu',
            'email' => 'ayu@mail.com',
            'password' => bcrypt('12345678'),
            'bio' => 'Mentor yang berfokus pada seni dan humaniora dari Universitas Negeri Malang.',
            'asal' => 'Universitas Negeri Malang',
            'profile_picture' => null,
            'subjects' => null,
            'rating' => 4,
            'google_id' => null,
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ]);

        Mentor::create([
            'slug' => 'moh-kholid-assyauqy',
            'name' => 'Moh. Kholid Assyauqy',
            'email' => 'kholid.assyauqy@mail.com',
            'password' => bcrypt('12345678'),
            'bio' => 'Seorang mentor di Politeknik Negeri Malang, berpengalaman di bidang teknik.',
            'asal' => 'Politeknik Negeri Malang',
            'profile_picture' => null,
            'subjects' => null,
            'rating' => 4,
            'google_id' => null,
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ]);

        Mentor::create([
            'slug' => 'silvana-ovarista',
            'name' => 'Silvana Ovarista',
            'email' => 'silvana.ovarista@mail.com',
            'password' => bcrypt('12345678'),
            'bio' => 'Mentor di Universitas Negeri Malang yang berfokus pada biologi dan kimia.',
            'asal' => 'Universitas Negeri Malang',
            'profile_picture' => null,
            'subjects' => null,
            'rating' => 4,
            'google_id' => null,
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ]);

        Mentor::create([
            'slug' => 'tanayafh',
            'name' => 'Tanayafh',
            'email' => 'tanayafh@mail.com',
            'password' => bcrypt('12345678'),
            'bio' => 'Mentor berpengalaman di Universitas Negeri Malang, ahli di bidang ilmu alam.',
            'asal' => 'Universitas Negeri Malang',
            'profile_picture' => null,
            'subjects' => null,
            'rating' => 4,
            'google_id' => null,
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ]);

        Mentor::create([
            'slug' => 'vina',
            'name' => 'Vina',
            'email' => 'vina@mail.com',
            'password' => bcrypt('12345678'),
            'bio' => 'Mentor di Universitas Negeri Malang yang berfokus pada teknologi dan pendidikan.',
            'asal' => 'Universitas Negeri Malang',
            'profile_picture' => null,
            'subjects' => null,
            'rating' => 4,
            'google_id' => null,
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ]);

        Mentor::create([
            'slug' => 'yusuf-agung-rizky-afandi',
            'name' => 'Yusuf Agung Rizky Afandi',
            'email' => 'yusuf.afandi@mail.com',
            'password' => bcrypt('12345678'),
            'bio' => 'Seorang mentor yang berdedikasi dari Universitas Negeri Malang, fokus pada matematika.',
            'asal' => 'Universitas Negeri Malang',
            'profile_picture' => null,
            'subjects' => null,
            'rating' => 4,
            'google_id' => null,
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ]);

        Mentor::create([
            'slug' => 'ima',
            'name' => 'Ima',
            'email' => 'ima@mail.com',
            'password' => bcrypt('12345678'),
            'bio' => 'Mentor berpengalaman di Universitas Negeri Malang, ahli dalam sastra dan penulisan.',
            'asal' => 'Universitas Negeri Malang',
            'profile_picture' => null,
            'subjects' => null,
            'rating' => 4,
            'google_id' => null,
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ]);

        // Tambahkan mentor lainnya di sini...
    }
}
