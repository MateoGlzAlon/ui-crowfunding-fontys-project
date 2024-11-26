"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { DATA } from '@/app/data';
import createProjectPOST from '@/components/fetchComponents/createProjectPOST';

function CreateProjectPage() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        type: '',
        dateCreated: '',
        fundingGoal: '',
        userEmail: '',
        userEmail: "admin@example.com",
        images: [
            "https://placehold.co/600x400?text=new.1",
            "https://placehold.co/600x400?text=new.2",
            "https://placehold.co/600x400?text=new.3"
        ]

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 3) {
            alert('You can upload up to 3 images only.');
            return;
        }
        setFormData((prevData) => ({ ...prevData, images: files.map((file) => file.name) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = { ...formData, dateCreated: new Date().toISOString() };

        try {

            const res = await createProjectPOST(updatedFormData);

        } catch (error) {
            console.error('Error creating project with data:', updatedFormData, error);
        }

        console.log(updatedFormData);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center mb-6">Create a New Project</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold">Project name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="Enter project name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="Describe your project"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">Category</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="Education">Education</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Environment">Environment</option>
                            <option value="Community">Community</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="Enter project location"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">Funding Goal</label>
                        <input
                            type="number"
                            name="fundingGoal"
                            value={formData.fundingGoal}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="Enter fundraising goal"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">Project Images (Up to 3)</label>
                        <input
                            type="file"
                            name="images"
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none"
                            accept="image/*"
                            multiple
                            required
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
                        >
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateProjectPage;
