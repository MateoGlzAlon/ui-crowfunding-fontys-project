"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { DATA } from '@/app/data';
import createProjectPOST from '@/components/fetchComponents/POST/createProjectPOST';
import PageFrame from '@/components/generalComponents/navbar/PageFrame';
import { useRouter } from 'next/navigation'
import TokenManager from '@/app/apis/TokenManager';


function CreateProjectPage() {

    const router = useRouter()

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        type: '',
        dateCreated: '',
        fundingGoal: '',
        //TO-DO: use userId
        userId: '',
    });

    const [images, setImages] = useState([])

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
        setImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = { ...formData, dateCreated: new Date().toISOString(), userId: TokenManager.getClaims().userId };


        try {

            const res = await createProjectPOST(updatedFormData, images);

            router.push(`/projects/${res}`);
        } catch (error) {
            console.error('Error creating project with data:', updatedFormData, error);
        }

        console.log(updatedFormData);
    };

    return (
        <PageFrame>
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
                                {DATA.projectTypes.map((item) => (
                                    <option value={item} key={item}>
                                        {item}
                                    </option>
                                ))}

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
        </PageFrame>
    );
}

export default CreateProjectPage;
