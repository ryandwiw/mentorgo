import Slider from "react-slick";
import React from "react";
import { StarIcon } from '@heroicons/react/24/solid';
import { Link } from "@inertiajs/react";

const postData = [
    {
        heading: 'Full Stack Modern',
        heading2: 'Javascript',
        name: "Laila Wulandari",
        asal: 'Politeknik Negeri Jember',
        imgSrc: '/assets/courses/courseone.png',
        students: 12,
        classes: 5,
        price: '30.000',
        rating: 4.7,
    },
    {
        heading: 'Komputasi dalam ',
        heading2: 'Jaringan Komputer',
        name: "Miftachul Ulum",
        asal: 'Universitas Negeri Malang',
        imgSrc: '/assets/courses/coursefour.jpeg',
        students: 5,
        classes: 5,
        price: '30.000',
        rating: 4.9,
    },
    {
        heading: 'Design UI/UX',
        heading2: 'with Figma',
        name: "Satria Cahya Ramadhan",
        asal: 'Universitas Negeri Malang',
        imgSrc: '/assets/courses/coursethree.png',
        students: 5,
        classes: 3,
        price: '30.000',
        rating: 4.8,
    },
    {
        heading: 'Pengolahan Visualisasi Dataset',
        heading2: 'Menggunakan Excel ',
        name: "Maulidia Nur Azizah",
        asal: 'Universitas Jenderal Soedirman',
        imgSrc: '/assets/courses/coursenine.jpeg',
        students: 10,
        classes: 3,
        price: '30.000',
        rating: 4.7,
    },
    {
        heading: 'Bahasa Inggris',
        heading2: '(Review Penugasan)',
        name: "Fathin Amalina",
        asal: 'Universitas Brawijaya',
        imgSrc: '/assets/courses/coursefive.jpeg',
        students: 5,
        classes: 2,
        price: '30.000',
        rating: 4.7,
    },
    {
        heading: 'Ekonomi Keuangan dan ',
        heading2: 'Perbankan',
        name: "Marlita Wulansari",
        asal: 'Universitas Negeri Yogyakarta ',
        imgSrc: '/assets/courses/coursesix.png',
        students: 150,
        classes: 12,
        price: '30.000',
        rating: 4.7,
    },
];

// CAROUSEL SETTINGS
const MultipleItems = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: false,
        autoplay: false,
        speed: 500,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            }
        ]
    };

    return (
        <div id="courses">
            <div className='mx-auto max-w-7xl sm:py-8 px-4 lg:px-8 '>
                <div className="sm:flex justify-between items-center">
                    <h3 className="text-midnightblue text-4xl lg:text-55xl font-semibold mb-5 sm:mb-0">Bimbingan Mentoring Terpopuler</h3>
                    <Link href={route('student.login')} className="text-Blueviolet text-lg font-medium space-links">Cari bimbingan&nbsp;&gt;&nbsp;</Link>
                </div>

                <Slider {...settings}>
                    {postData.map((items, i) => (
                        <div key={i}>
                            <div className='bg-white m-3 px-3 pt-3 pb-12 my-20 shadow-courses rounded-2xl'>
                                <div className="relative rounded-3xl">
                                    <img src={items.imgSrc} alt="course image" width={389} height={262} className="m-auto clipPath" />
                                    <div className="absolute right-5 -bottom-2 bg-ultramarine rounded-full p-6">
                                        <a href={route('student.login')} className="text-white uppercase text-center text-sm font-medium block">
                                            Ikuti <br /> Kelas</a>
                                    </div>
                                </div>

                                <div className="px-3">
                                    <h4 className='text-2xl font-bold pt-6 text-black'>{items.heading}</h4>
                                    <h4 className='text-2xl font-bold pt-1 text-black'>{items.heading2}</h4>

                                    <div>
                                        <h3 className='text-base font-bold pt-6 opacity-75 '>{items.name}</h3>
                                    </div>

                                    <div>
                                        <h3 className='text-base font-normal opacity-75'>{items.asal}</h3>
                                    </div>

                                    <div className="flex justify-between items-center py-6">
                                        <div className="flex gap-4">
                                            <h3 className="text-red text-22xl font-medium">{items.rating}</h3>
                                            <div className="flex">
                                                <StarIcon className="h-5 w-5 text-gold" />
                                                <StarIcon className="h-5 w-5 text-gold" />
                                                <StarIcon className="h-5 w-5 text-gold" />
                                                <StarIcon className="h-5 w-5 text-gold" />
                                                <StarIcon className="h-5 w-5 text-gold" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-medium">Rp{items.price}</h3>
                                        </div>
                                    </div>

                                    <hr style={{ color: "#C4C4C4" }} />

                                    <div className="flex justify-between pt-6">
                                        <div className="flex gap-4">
                                            <img src={'/assets/courses/book-open.svg'} alt="kelas" width={24} height={24} className="inline-block m-auto" />
                                            <h3 className="text-base font-medium text-black opacity-75">{items.classes} Kelas</h3>
                                        </div>
                                        <div className="flex gap-4">
                                            <img src={'/assets/courses/users.svg'} alt="siswa" width={24} height={24} className="inline-block m-auto" />
                                            <h3 className="text-base font-medium text-black opacity-75">{items.students} Siswa</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default MultipleItems;
