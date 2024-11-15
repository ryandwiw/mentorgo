import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Mengimpor ikon bintang

const StarRating = ({ rating, setRating, className }) => {
    const stars = Array(5).fill(0);

    return (
        <div className="flex space-x-1">
            {stars.map((_, index) => (
                <button
                    key={index}
                    type="button"
                    className={` ${className} focus:outline-none`}
                    onClick={() => setRating(index + 1)}
                >
                    {rating > index ? <FaStar className="text-yellow-300" /> : <FaRegStar className="text-gray-300" />}
                </button>
            ))}
        </div>
    );
};

export default StarRating;
