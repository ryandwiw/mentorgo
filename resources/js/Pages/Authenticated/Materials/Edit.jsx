import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

// resources/js/Pages/Materials/Edit.jsx

const Edit = ({ material, subjects }) => {
    const { data, setData, put, processing } = useForm({
        mentor_id: material.mentor_id || null,
        subject_ids: material.subject_ids || [], // Ambil subject_ids dari material
        title: material.title,
        content: material.content,
        format: material.format,
    });

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('materials.update', material.id));
    };


    const handleFileChange = (e) => {
        setData('file', e.target.files[0]);
    };

    const handleSubjectChange = (subjectId) => {
        const currentIndex = data.subject_ids.indexOf(subjectId);
        const newSubjectIds = [...data.subject_ids];

        if (currentIndex === -1) {
            newSubjectIds.push(subjectId);
        } else {
            newSubjectIds.splice(currentIndex, 1);
        }

        setData('subject_ids', newSubjectIds);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Edit Material</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Subjects (optional)</label>
                    <button
                        id="dropdownBgHoverButton"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                        type="button"
                    >
                        Dropdown checkbox
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    {/* Dropdown menu */}
                    {dropdownOpen && (
                        <div className="z-10 w-48 bg-white rounded-lg shadow">
                            <ul className="p-3 space-y-1 text-sm text-gray-700">
                                {subjects.map(subject => (
                                    <li key={subject.id}>
                                        <div className="flex items-center p-2 rounded hover:bg-gray-100">
                                            <input
                                                id={`checkbox-subject-${subject.id}`}
                                                type="checkbox"
                                                value={subject.id}
                                                checked={data.subject_ids.includes(subject.id.toString())}
                                                onChange={() => handleSubjectChange(subject.id.toString())}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <label htmlFor={`checkbox-subject-${subject.id}`} className="w-full ms-2 text-sm font-medium text-gray-900">
                                                {subject.name}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>
                <div>
                    <label>File</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray -700">Format</label>
                    <select
                        value={data.format}
                        onChange={(e) => setData('format', e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="video">Video</option>
                        <option value="pdf">PDF</option>
                        <option value="link">Link</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 disabled:opacity-50"
                >
                    Update Material
                </button>
            </form>
        </div>
    );
};

export default Edit;
