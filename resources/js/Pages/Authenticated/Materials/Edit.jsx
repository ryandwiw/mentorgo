import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";

const Edit = ({ subjects, material }) => {
    const { data, setData, put, errors } = useForm({
        title: material.title,
        content: material.content,
        format: material.format,
        file: null, // You may want to handle the file differently
        subject_id: material.subject_id,
        link: material.link,
        mentor_id: material.mentor_id || '', // Assuming mentor_id can be null
    });

    const handleFileChange = (e) => {
        setData('file', e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        put(route('materials.update', material.id)); // Assuming you have a route for updating materials
    };

    useEffect(() => {
        // If you want to do any specific logic when the component mounts or updates
    }, [material]);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Edit Material</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={e => setData('title', e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    {errors.title && <p className="text-red-500">{errors.title}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                        value={data.content}
                        onChange={e => setData('content', e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    ></textarea>
                    {errors.content && <p className="text-red-500">{errors.content}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Format ( Opsional )</label>
                    <select
                        value={data.format}
                        onChange={e => setData('format', e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="">Select Format</option>
                        <option value="video">Video</option>
                        <option value="pdf">PDF</option>
                        <option value="link">Link</option>
                    </select>
                    {errors.format && <p className="text-red-500">{errors.format}</p>}
                </div>
                {data.format !== 'link' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">File ( Opsional )</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        {errors.file && <p className="text-red-500">{errors.file}</p>}
                    </div>
                )}
                {data.format === 'link' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Link</label>
                        <input
                            type="text"
                            value={data.link}
                            onChange={e => setData('link', e.target.value)}
                            placeholder="Enter your link"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        {errors.link && <p className="text-red-500">{errors.link}</p>}
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <select
                        value={data.subject_id}
                        onChange={e => setData('subject_id', e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="">Select Subject</option>
                        {subjects.map(subject => (
                            <option key={subject.id} value={subject.id}>{subject.name}</option>
                        ))}
                    </select>
                    {errors.subject_id && <p className="text-red-500">{errors.subject_id}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Update Material
                </button>
            </form>
        </div>
    );
};

export default Edit;
