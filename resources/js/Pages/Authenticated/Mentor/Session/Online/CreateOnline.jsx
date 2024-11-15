import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

const GoogleMeetForm = ({ bookingId }) => {
    const { data, setData, post, processing, errors } = useForm({
        google_meet_link: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('mentor.sessions.online.google-meet.store', bookingId));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="google_meet_link">Link Google Meet</label>
                <input
                    type="url"
                    id="google_meet_link"
                    value={data.google_meet_link}
                    onChange={(e) => setData('google_meet_link', e.target.value)}
                    required
                />
                {errors.google_meet_link && <div>{errors.google_meet_link}</div>}
            </div>
            <button type="submit" disabled={processing}>Simpan Link</button>
        </form>
    );
};

export default GoogleMeetForm;
