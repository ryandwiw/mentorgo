import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

const Create = ({ subjects }) => {
    const { data, setData, post } = useForm({
        title: '',
        content: '',
        format: '',
        file: 'null',
        subject_id: [],
    });

    const handleFileChange = (e) => {
        setData('file', e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('materials.store'));
    };

    return (
        <div>
            <h1>Create Material</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} required />
                </div>
                <div>
                    <label>Content</label>
                    <textarea value={data.content} onChange={e => setData('content', e.target.value)} required></textarea>
                </div>
                <div>
                    <label>Format</label>
                    <select value={data.format} onChange={e => setData('format', e.target.value)} required>
                        <option value="">Select Format</option>
                        <option value="video">Video</option>
                        <option value="pdf">PDF</option>
                        <option value="link">Link</option>
                    </select>
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
                    <label>Subject</label>
                    <select value={data.subject_id} onChange={e => setData('subject_id', e.target.value)} required>
                        <option value="">Select Subject</option>
                        {subjects.map(subject => (
                            <option key={subject.id} value={subject.id}>{subject.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Create Material</button>
            </form>
        </div>
    );
};

export default Create;
