const Banner = () => {
    return (
        <div id="home-section" className="bg-white">
            <div className="mx-auto max-w-7xl pt-20 sm:pb-24 px-6">
                <div className="grid grid-cols-1 space-x-1">
                    <div className="col-span-8 flex flex-col justify-evenly">
                        <h1 className="text-midnightblue text-5xl sm:text-6xl font-semibold text-center lg:text-start lg:pt-6">
                            MentorGo: Platform Mentoring Sebaya
                        </h1>
                        <h3 className="text-charcoal text-xl font-normal text-justify opacity-75 lg:pt-8">
                            Menghubungkan mahasiswa dengan mentor sebaya dari berbagai kampus dengan menyediakan layanan tutor online dan offline yang memungkinkan mahasiswa untuk menemukan mentor sesuai lokasi mereka. Tujuan dari MentorGo adalah untuk menjembatani kesenjangan antara kebutuhan pendidikan siswa dan terbatasnya kesempatan untuk bimbingan pribadi yang efektif.
                        </h3>

                        <h3 className="text-charcoal text-xl font-normal text-justify lg:text-start opacity-75 pt-5 lg:pt-4">
                            MentorGo Menjembatani mahasiswa dengan dua peran utama, diantaranya yaitu:
                        </h3>
                    </div>
                </div>

                {/* Tambahkan dua kolom berisikan teks berwarna biru di bawahnya */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
                    <div className="bg-ultramarine text-white p-10 rounded-3xl hover:bg-midnightblue transition duration-300">
                        <h4 className="text-xl font-medium">Mahasiswa sebagai Mentor</h4>
                        <p className="text-base font-light text-justify mt-2">
                            Mahasiswa yang memiliki keahlian atau pengalaman dan termotivasi untuk berbagi pengetahuan, sambil mendapatkan pengalaman mengajar serta penghasilan tambahan.
                        </p>
                    </div>
                    <div className="bg-ultramarine text-white p-10 rounded-3xl hover:bg-midnightblue transition duration-300">
                        <h4 className="text-xl font-medium">Mahasiswa sebagai Siswa</h4>
                        <p className="text-base font-light mt-2 text-justify">
                            Mahasiswa yang membutuhkan bimbingan online ataupun offline dan dapat menyesuaikan waktu luang dengan harga yang murah.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
