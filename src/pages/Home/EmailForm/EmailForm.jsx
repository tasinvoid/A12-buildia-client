import React, { useState } from 'react';

const EmailForm = () => {
    // State to manage form input values
    const [formData, setFormData] = useState({
        from: '',
        subject: '',
        text: '',
    });

    // State to manage the feedback message
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSending, setIsSending] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsSending(true);

        try {
            const response = await fetch('http://localhost:3000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            setIsSending(false);

            if (response.ok) {
                setMessage(result.message);
                setIsSuccess(true);
                setFormData({
                    from: '',
                    subject: '',
                    text: '',
                });
            } else {
                setMessage(result.message || 'An unknown error occurred.');
                setIsSuccess(false);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setMessage('Could not connect to the server. Please try again later.');
            setIsSuccess(false);
            setIsSending(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center ">
            <div className="p-8 rounded-lg shadow-lg w-full max-w-lg bg-gray-800 bg-opacity-80 backdrop-blur-sm border border-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-400">Send an Email</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="from" className="block text-gray-300">Your Email</label>
                        <input
                            type="email"
                            id="from"
                            name="from"
                            value={formData.from}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 rounded-md bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-gray-300">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 rounded-md bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="text" className="block text-gray-300">Message</label>
                        <textarea
                            id="text"
                            name="text"
                            value={formData.text}
                            onChange={handleChange}
                            rows="5"
                            required
                            className="w-full px-4 py-2 mt-1 rounded-md bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={isSending}
                        className="w-full px-4 py-2 font-bold text-gray-100 bg-indigo-600 rounded-md hover:bg-indigo-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSending ? 'Sending...' : 'Send Email'}
                    </button>
                </form>

                {message && (
                    <div
                        className={`mt-4 p-3 text-sm rounded-md border ${
                            isSuccess
                                ? 'bg-green-500 text-gray-100 border-green-600 bg-opacity-20'
                                : 'bg-red-500 text-gray-100 border-red-600 bg-opacity-20'
                        }`}
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmailForm;