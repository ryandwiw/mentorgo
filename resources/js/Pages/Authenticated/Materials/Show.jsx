import { Link } from "@inertiajs/react";
import React from "react";


const Show = ({ material }) => {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">{material.title}</h1>
            <p className="mb-4">{material.content}</p>
            <p className="font-medium mb-2"><strong>Format:</strong> {material.format}</p>
            <p className="font-medium mb-2"><strong>Subjects:</strong></p>
            <ul className="list-disc list-inside mb-4">
                {material.subjects.map(subject => (
                    <li key={subject.id} className="text-gray-700">{subject.name}</li>
                ))}
            </ul>
            <Link
                href={route('materials.index')}
                className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
            >
                Back to Materials
            </Link>
        </div>
    );
};

export default Show;
