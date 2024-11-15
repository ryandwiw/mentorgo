import Slider from "react-slick";
import React, { Component } from "react";


// CAROUSEL DATA

const postData = [
    {
        profession: 'Bahasa Inggris',
        name: 'Moh. Kholid Assyauqy',
        asal: 'Politeknik Negeri Malang',
        imgSrc: '/assets/mentor/user3.png',
    },
    {
        profession: 'UI/UX Designer',
        name: 'Satria Cahya Ramadhan',
        asal: 'Universitas Negeri Malang',
        imgSrc: '/assets/mentor/user1.png',
    },
    {
        profession: 'Ekonomi',
        name: 'Marlita Wulansari ',
        asal: 'Universitas Negeri Yogyakarta',
        imgSrc: '/assets/mentor/user2.png',
    },
    {
        profession: 'Fullstack Javascript',
        name: 'Laila Wulandari',
        asal: 'Politeknik Negeri Jember',
        imgSrc: '/assets/mentor/user3.png',
    },
    {
        profession: 'Bahasa Inggris',
        name: 'Fathin Amalina ',
        asal: 'Universitas Brawijaya',
        imgSrc: '/assets/mentor/user2.png',
    },
    {
        profession: 'Komputasi dan Jaringan Komputer',
        name: 'Miftachul Ulum',
        asal: 'Universitas Negeri Malang',
        imgSrc: '/assets/mentor/user1.png',
    },
];

// CAROUSEL SETTINGS

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "flex", justifyContent: "center", position: 'absolute', alignItems: "center", background: "#D5EFFA", padding: "28px", borderRadius: "30px", border: "1px solid #1A21BC" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "flex", justifyContent: "center", alignItems: "center", background: "#D5EFFA", padding: "28px", borderRadius: "30px", border: "1px solid #1A21BC" }}
            onClick={onClick}
        />
    );
}

export default class MultipleItems extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            autoplay: false,
            speed: 4000,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            autoplaySpeed: 4500,
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
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 530,
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
            <div className="py-10 sm:py-24 bg-paleblue" id="mentor">
                <div className='mx-auto max-w-2xl lg:max-w-7xl sm:py-4 px-4 lg:px-8 relative'>
                    <h2 className="lh-82 text-midnightblue text-4xl md:text-55xl text-center md:text-start font-semibold">Terhubung Langsung dengan Mentor</h2>

                    <Slider {...settings}>
                        {postData.map((items, i) => (
                            <div key={i}>
                                <div className='m-3 py-14 md:my-10 text-center'>
                                    <div className="relative">
                                        <img src={items.imgSrc} alt="user-image" width={306} height={0} className="inline-block m-auto" />
                                        <div className="absolute right-[84px] bottom-[102px] bg-white rounded-full p-4">
                                            <img src={'/assets/mentor/linkedin.svg'} alt="linkedin-image" width={25} height={24} />
                                        </div>
                                    </div>

                                    <div className="-mt-10">
                                        <h3 className='text-2xl font-semibold text-lightblack'>{items.name}</h3>
                                        <h4 className='text-lg font-normal text-lightblack pt-2 opacity-50'>{items.asal}</h4>
                                        <h4 className='text-lg font-semibold text-lightblack opacity-50'>{items.profession}</h4>
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
