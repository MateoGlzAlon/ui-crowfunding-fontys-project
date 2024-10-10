import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DATA } from '@/app/data';

const ProjectsList = ({ title, endpoint }) => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjects();
    });

    function getProjects() {
        axios.get(`${DATA.origin}/projects/${endpoint}`)
            .then((res) => {
                setProjects(res.data); // Update state with fetched data
            })
            .catch((error) => {
                console.error(`Error fetching projects in (${endpoint}):`, error);
            });
    }



    return (
        <div className="mb-10 bg-white ">
            <div className="container ">
                <h2 className="text-3xl font-bold mb-6 mt-10">{title}</h2>

                <div className="flex flex-wrap justify-start">
                    {projects.map((project) => (
                        <a
                            key={project.id}
                            href={`/projects/${project.id}`}
                            className="block bg-transparent p-3 w-full sm:w-full md:w-1/3 lg:w-1/5 transform transition hover:scale-105 hover:bg-slate-100 rounded-lg"
                        >
                            <img
                                src={project.images[0].startsWith('data:') ? project.images[0] : `${project.images[0]}`}
                                alt={project.name}
                                className="w-full h-48 object-cover rounded-lg  overflow-hidden" /> {/* border-slate-500 border-[0.5px] */}
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
                        </a>
                    ))}
                </div>


            </div>
        </div>
    );
};

export default ProjectsList;