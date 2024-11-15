import React from "react";
import { StarIcon } from '@heroicons/react/24/solid';

const CourseCard = () => {
    return (
        <div id="courses">
            <div className='bg-white m-3 p-4 shadow-courses rounded-2xl max-w-sm mx-auto'>
                <div className="relative rounded-3xl">
                    <img src='/assets/courses/courseone.png' alt="course image" width={389} height={262} className="m-auto clipPath" />
                    <div className="absolute right-5 -bottom-2 bg-ultramarine rounded-full p-6">
                        <a href="URL_TUJUAN" className="text-white uppercase text-center text-sm font-medium block">
                            Ikuti <br /> Kelas</a>
                    </div>
                </div>

                <div className="px-3">
                    <h4 className='text-2xl font-bold pt-6 text-black'>Full Stack Modern</h4>
                    <h4 className='text-2xl font-bold pt-1 text-black'>Javascript</h4>

                    <div>
                        <h3 className='text-base font-bold pt-6 opacity-75'>Laila Wulandari</h3>
                    </div>

                    <div>
                        <h3 className='text-base font-normal opacity-75'>Politeknik Negeri Jember</h3>
                    </div>

                    <div className="flex justify-between items-center py-6">
                        <div className="flex gap-4">
                            <h3 className="text-red text-22xl font-medium">4.7</h3>
                            <div className="flex">
                                <StarIcon className="h-5 w-5 text-gold" />
                                <StarIcon className="h-5 w-5 text-gold" />
                                <StarIcon className="h-5 w-5 text-gold" />
                                <StarIcon className="h-5 w-5 text-gold" />
                                <StarIcon className="h-5 w-5 text-gold" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-3xl font-medium">Rp30.000</h3>
                        </div>
                    </div>

                    <hr style={{ color: "#C4C4C4" }} />

                    <div className="flex justify-between pt-6">
                        <div className="flex gap-4">
                            <img src={'/assets/courses/book-open.svg'} alt="kelas" width={24} height={24} className="inline-block m-auto" />
                            <h3 className="text-base font-medium text-black opacity-75">5 Kelas</h3>
                        </div>
                        <div className="flex gap-4">
                            <img src={'/assets/courses/users.svg'} alt="siswa" width={24} height={24} className="inline-block m-auto" />
                            <h3 className="text-base font-medium text-black opacity-75">12 Siswa</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;

// import React from "react";
// import { StarIcon } from '@heroicons/react/24/solid';

// const CourseList = () => {
//     const courses = [
//         {
//             heading: 'Full Stack Modern',
//             heading2: 'Javascript',
//             name: "Laila Wulandari",
//             asal: 'Politeknik Negeri Jember',
//             imgSrc: '/assets/courses/courseone.png',
//             students: 12,
//             classes: 5,
//             price: '30.000',
//             rating: 4.7,
//         },
//         {
//             heading: 'Data Science',
//             heading2: 'Python',
//             name: "John Doe",
//             asal: 'Universitas XYZ',
//             imgSrc: '/assets/courses/coursetwo.png',
//             students: 20,
//             classes: 8,
//             price: '50.000',
//             rating: 4.5,
//         }
//     ];

//     return (
//         <div id="courses" className="flex flex-wrap justify-center">
//             {courses.map((course, index) => (
//                 <div key={index} className='bg-white m-3 p-4 shadow-courses rounded-2xl max-w-sm'>
//                     <div className="relative rounded-3xl">
//                         <img src={course.imgSrc} alt="course image" width={389} height={262} className="m-auto clipPath" />
//                         <div className="absolute right-5 -bottom-2 bg-ultramarine rounded-full p-6">
//                             <a href="URL_TUJUAN" className="text-white uppercase text-center text-sm font-medium block">
//                                 Ikuti <br /> Kelas</a>
//                         </div>
//                     </div>

//                     <div className="px-3">
//                         <h4 className='text-2xl font-bold pt-6 text-black'>{course.heading}</h4>
//                         <h4 className='text-2xl font-bold pt-1 text-black'>{course.heading2}</h4>

//                         <div>
//                             <h3 className='text-base font-bold pt-6 opacity-75 '>{course.name}</h3>
//                         </div>

//                         <div>
//                             <h3 className='text-base font-normal opacity-75'>{course.asal}</h3>
//                         </div>

//                         <div className="flex justify-between items-center py-6">
//                             <div className="flex gap-4">
//                                 <h3 className="text-red text-22xl font-medium">{course.rating}</h3>
//                                 <div className="flex">
//                                     <StarIcon className="h-5 w-5 text-gold" />
//                                     <StarIcon className="h-5 w-5 text-gold" />
//                                     <StarIcon className="h-5 w-5 text-gold" />
//                                     <StarIcon className="h-5 w-5 text-gold" />
//                                     <StarIcon className="h-5 w-5 text-gold" />
//                                 </div>
//                             </div>
//                             <div>
//                                 <h3 className="text-3xl font-medium">Rp{course.price}</h3>
//                             </div>
//                         </div>

//                         <hr style={{ color: "#C4C4C4" }} />

//                         <div className="flex justify-between pt-6">
//                             <div className="flex gap-4">
//                                 <img src={'/assets/courses/book-open.svg'} alt="kelas" width={24} height={24} className="inline-block m-auto" />
//                                 <h3 className="text-base font-medium text-black opacity-75">{course.classes} Kelas</h3>
//                             </div>
//                             <div className="flex gap-4">
//                                 <img src={'/assets/courses/users.svg'} alt="siswa" width={24} height={24} className="inline-block m-auto" />
//                                 <h3 className="text-base font-medium text-black opacity-75">{course.students} Siswa</h3>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default CourseList;
