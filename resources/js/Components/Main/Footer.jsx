import { Link } from "@inertiajs/react";
import React from "react";

const socialLinks = [
    {
        imgSrc: '/assets/footer/facebook.svg',
        link: 'www.facebook.com',
        width: 10
    },
    {
        imgSrc: '/assets/footer/insta.svg',
        link: 'www.instagram.com',
        width: 14
    },
    {
        imgSrc: '/assets/footer/twitter.svg',
        link: 'www.twitter.com',
        width: 14
    },
];

const products = [
    {
        id: 1,
        section: "MentorGo",
        link: ['About', 'Courses', 'Mentor', 'Testimonial', 'Cara Pesan'],
    },
    {
        id: 2,
        section: "Contact",
        link: ['Help/FAQ']
    },
    {
        id: 3,
        section: "More",
        link: ['About', 'Courses', 'Mentor', 'Testimonial', 'Cara Pesan']
    }
];

const Footer = () => {
    return (
        <div className="mx-auto max-w-2xl sm:pt-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="my-12 grid grid-cols-1 gap-y-10 sm:grid-cols-6 lg:grid-cols-12">

                {/* COLUMN-1 */}
                <div className='sm:col-span-6 lg:col-span-5'>
                    <div className="flex flex-shrink-0 items-center border-right">
                        <img src="/assets/logo/logo.svg" alt="logo" width={214} height={66} />
                    </div>
                    <h3 className='text-xs font-medium text-gunmetalgray lh-160 mt-5 mb-4 lg:mb-16'>
                        Bimbingan mentoring sebaya untuk mendukung <br /> pembelajaran dan pengembangan mahasiswa.
                    </h3>
                    <div className='flex gap-4'>
                        {socialLinks.map((items, i) => (
                            <Link href={items.link} key={i}>
                                <div className="bg-white h-12 w-12 shadow-xl text-base rounded-full flex items-center justify-center footer-icons hover:bg-ultramarine">
                                    <img src={items.imgSrc} alt={items.imgSrc} width={items.width} height={2} className="sepiaa" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* COLUMN-2/3/4 */}
                {products.map((product) => (
                    <div key={product.id} className="sm:col-span-2">
                        <p className="text-black text-lg font-medium mb-9">{product.section}</p>
                        <ul>
                            {product.link.map((link, index) => (
                                <li key={index} className='mb-5'>
                                    <Link href="/" className="text-darkgray text-base font-normal mb-6 space-links">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

            </div>

            {/* All Rights Reserved */}
            <div className='py-10 md:flex items-center justify-between border-t border-t-gray-blue'>
                <h4 className='text-dark-red opacity-75 text-sm text-center md:text-start font-normal'>
                    @2024 | MentorGo | InspireEdu | Universitas Negeri Malang
                </h4>
                <div className="flex gap-5 mt-5 md:mt-0 justify-center md:justify-start">
                    <h4 className='text-dark-red opacity-75 text-sm font-normal'>
                        <Link href="/" target="_blank">Privacy policy</Link>
                    </h4>
                    <div className="h-5 bg-dark-red opacity-25 w-0.5"></div>
                    <h4 className='text-dark-red opacity-75 text-sm font-normal'>
                        <Link href="/" target="_blank">Terms & conditions</Link>
                    </h4>
                </div>
            </div>
        </div>
    );
}

export default Footer;
