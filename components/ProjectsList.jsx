import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DATA } from '@/app/data';
import { useRouter } from 'next/navigation'

import fetchProjectListData from '@/components/fetchComponents/fetchProjectListData';

const ProjectsList = ({ title, endpoint }) => {
    const [projects, setProjects] = useState([]);
    const router = useRouter(); // Initialize the router

    useEffect(() => {
        const fetchData = async () => {
            console.log(`Fetching projects from endpoint: ${endpoint}`);
            const data = await fetchProjectListData(endpoint);
            setProjects(data);
        };

        fetchData();
    }, []);


    function handleProjectClick(id) {
        router.push(`/projects/${id}`); // Use router.push to navigate programmatically
    }

    return (
        <div className="mb-10 bg-white">
            <div className="container">
                <h2 className="text-3xl font-bold mb-6 ">{title}</h2>

                <div className="flex flex-wrap justify-start">
                    {Array.isArray(projects) && projects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => router.push(`/projects/${project.id}`)}
                            className="block cursor-pointer bg-transparent p-3 w-full sm:w-full md:w-1/3 lg:w-1/5 transform transition hover:scale-105 hover:bg-slate-100 rounded-lg"
                        >
                            <img
                                src={project.imageCover}
                                alt={project.name}
                                className="w-full h-48 object-cover rounded-lg overflow-hidden"
                            />
                            <p>{format(new Date(project.dateCreated), 'dd/MM/yyyy')}</p>
                            <div className="w-full bg-gray-300 rounded-full h-2.5 mt-4">
                                <div
                                    className="bg-green-500 h-2.5 rounded-full"
                                    style={{
                                        width: `${project.moneyRaised >= project.fundingGoal
                                            ? '100%'
                                            : `${(project.moneyRaised / project.fundingGoal) * 100}%`
                                            }`,
                                    }}
                                ></div>
                            </div>
                            <h3 className="text-base font-bold mt-4">{project.name}</h3>
                            <p className="text-sm text-gray-700 mt-2">
                                ${project.moneyRaised} raised of ${project.fundingGoal}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsList;
