import React, { useState } from 'react';

const LastSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-800 lg:p-5 ">
            <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-8 p-5 lg:p-16 ">
                    <div className="text-gray-500 sm:text-lg dark:text-gray-400 w-full lg:w-1/2 ">
                        <h2 className="mb-4 text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
                            Support
                        </h2>
                        <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white pb-5'>
                            Frequently asked questions
                        </h2>
                        <img class="w-full mb-4 rounded-lg lg:mb-0 lg:hidden flex" src="./assets/images/feature-1.png" alt="dashboard feature image" />
                        <div id="accordion-collapse">
                            {[
                                {
                                    question: "What is MentorGo?",
                                    answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos sequi, eligendi veritatis corporis architecto beatae doloremque. Aut, eveniet ea facere nostrum doloremque"
                                },
                                {
                                    question: "Is there available?",
                                    answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos sequi, eligendi veritatis corporis architecto beatae doloremque. Aut, eveniet ea facere nostrum doloremque."
                                },
                                {
                                    question: "What are the differences?",
                                    answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos sequi, eligendi veritatis corporis architecto beatae doloremque. Aut, eveniet ea facere nostrum doloremque"
                                }
                            ].map((item, index) => (
                                <div key={index} className="border-b border-gray-200">
                                    <h2 id={`accordion-collapse-heading-${index}`}>
                                        <button
                                            type="button"
                                            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 gap-3"
                                            onClick={() => handleToggle(index)}
                                            aria-expanded={openIndex === index}
                                            aria-controls={`accordion-collapse-body-${index}`}>
                                            <span>{item.question}</span>
                                            <svg className={`w-3 h-3 transition-transform duration-200 ${openIndex === index ? 'rotate-0' : 'rotate-180'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                                            </svg>
                                        </button>
                                    </h2>
                                    <div
                                        id={`accordion-collapse-body-${index}`}
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40' : 'max-h-0'}`}
                                        aria-labelledby={`accordion-collapse-heading-${index}`}>
                                        <div className="p-5">
                                            <p className="mb-2 text-gray-500">{item.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                        <img class="w-2/5 px-auto mx-auto mb-4 rounded-lg lg:mb-0 lg:flex hidden" src="./assets/images/feature-1.png" alt="dashboard feature image" />
                    {/* <img className="w-full mb-4 rounded-lg lg:mb-0 lg:w-2/5 px-auto mx-auto" src="./assets/images/feature-1.png" alt="dashboard feature image" /> */}
                </div>
            </div>
            <div className='flex justify-center'>
                <button
                    onClick={scrollToTop}
                    className="my-7 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200">
                    Kembali ke Atas
                </button>
            </div>
        </section>
    );
}

export default LastSection;
