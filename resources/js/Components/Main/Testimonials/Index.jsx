import Slider from "react-slick";
import React, { Component } from "react";
import { StarIcon } from '@heroicons/react/24/solid';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// CAROUSEL DATA

const postData = [
    {
        name: "Muhammad Aulia Rizky",
        profession: 'Politeknik Negeri Malang',
        comment: 'Pengalaman saya menggunakan layanan ini sangat luar biasa, mentor yang saya temui sangat membantu dalam memahami materi kuliah.',
        imgSrc: '/assets/testimonial/user.svg',
    },
    {
        name: "Laila Wulandari",
        profession: 'Politeknik Negeri Jember',
        comment: 'Sangat puas dengan kualitas mentoring yang diberikan. Mentor sangat sabar dan menjelaskan materi dengan cara yang mudah dimengerti.',
        imgSrc: '/assets/mentor/user2.png',
    },
    {
        name: "Titi Dwi Kusuma ",
        profession: 'UIN Sunan Kalijaga Yogyakarta',
        comment: 'Layanan ini sangat membantu saya dalam memahami topik-topik yang sulit. Saya merasa lebih percaya diri setelah mengikuti sesi mentoring.',
        imgSrc: '/assets/mentor/user3.png',
    },
    {
        name: "Ahmad Ridho",
        profession: 'Universitas Negeri Malang',
        comment: 'Mentor yang saya dapat sangat berkompeten dan komunikatif. Pengalaman yang sangat positif dan bermanfaat.',
        imgSrc: '/assets/mentor/user1.png',
    },
    {
        name: "Nabila Luthfia Azmi",
        profession: 'Universitas Negeri Malang',
        comment: 'Sangat puas dengan proses pembelajaran yang fleksibel. Mentor memberikan penjelasan yang sangat jelas dan membantu saya mencapai tujuan akademik.',
        imgSrc: '/assets/mentor/user2.png',
    },
    {
        name: "Azura",
        profession: 'UIN BANDUNG',
        comment: 'Mentor sangat membantu dalam menjawab pertanyaan saya dan memberikan penjelasan yang lebih dalam tentang materi yang saya pelajari.',
        imgSrc: '/assets/mentor/user3.png',
    },

];

// CAROUSEL SETTINGS

export default class MultipleItems extends Component {
    render() {
        const settings = {
            dots: true,
            dotsClass: "slick-dots",
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 2,
            arrows: false,
            autoplay: false,
            speed: 500,
            autoplaySpeed: 2000,
            cssEase: "linear",
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 800,
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
            <div className="pt-40 pb-10 sm:pb-32 lg:py-32" id="testimonial">
                <div className='mx-auto max-w-7xl sm:py-4 lg:px-8'>
                    <Slider {...settings}>
                        {postData.map((items, i) => (
                            <div key={i}>
                                <div className={`bg-white m-4 p-5 my-20 relative ${i % 2 ? 'middleDiv' : 'testimonial-shadow'}`}>
                                    <div className="absolute top-[-45px]">
                                        <img src={items.imgSrc} alt={items.name} width={100} height={100} className="inline-block" />
                                    </div>
                                    <h4 className='text-base font-normal text-darkgray my-4'>{items.comment}</h4>
                                    <hr style={{ color: "#D7D5D5" }} />
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className='text-lg font-medium text-darkbrown pt-4 pb-2'>{items.name}</h3>
                                            <h3 className='text-sm font-normal text-lightgray pb-2'>{items.profession}</h3>
                                        </div>
                                        <div className="flex">
                                            <StarIcon width={20} className="text-gold" />
                                            <StarIcon width={20} className="text-gold" />
                                            <StarIcon width={20} className="text-gold" />
                                            <StarIcon width={20} className="text-gold" />
                                            <StarIcon width={20} className="text-gold" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        );
    }
}
