import { Link } from "@inertiajs/react";

const Newsletter = () => {
    return (
        <>
            {/* <div className="mx-auto max-w-2xl md:max-w-7xl sm:rounded-3xl testimonialbg"> */}
            <div className="mx-auto max-w-2xl md:max-w-7xl sm:rounded-3xl">
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-12 xl:gap-x-8">

                    <div className="col-span-12 bg-imagee">
                        <div className="mb-10 mt-24 lg:mx-64 lg:my-24">
                            <h3 className="text-4xl md:text-55xl text-center font-semibold text-white mb-3">Daftarkan diri kamu!</h3>
                            <h3 className="text-base font-normal opacity-75 text-white text-center mb-8">
                                Dapatkan pengalaman dan bimbingan sebaya <br /> dengan terhubung banya orang diluar sana.
                            </h3>

                            <div>
                                <div className="relative flex justify-center items-center pt-5 lg:pt-0">
                                    <Link
                                        href={route('student.login')}
                                        className=" p-8 lg:p-8 text-lg font-semibold text-ultramarine bg-white hover:bg-midnightblue hover:text-white active:bg-ultramarine active:text-white rounded-full focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                                    >
                                        Daftar
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>


    )
}

export default Newsletter;
