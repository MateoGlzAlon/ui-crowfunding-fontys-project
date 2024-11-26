import React, { useState, useEffect } from "react";
import getAllProjectsGET from "@/components/fetchComponents/getAllProjectsGET";
import { useRouter } from 'next/navigation';

export default function ProjectFilterTable() {
    const [projects, setProjects] = useState([]);
    const router = useRouter(); // Initialize the router

    useEffect(() => {
        const fetchData = async () => {
            console.log(`Getting all projects for the table`);
            const data = await getAllProjectsGET();
            setProjects(data);
            console.log("The projects are: ", data);
        };

        fetchData();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 6;

    // Pagination Logic
    const lastProjectIndex = currentPage * projectsPerPage;
    const firstProjectIndex = lastProjectIndex - projectsPerPage;
    const currentProjects = projects.slice(firstProjectIndex, lastProjectIndex);

    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Helper to truncate text
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };

    return (
        <div className="mb-1 py-8">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold mb-8 text-center">
                    Project Listings
                </h2>

                <div className="flex justify-end gap-4 mb-8">
                    <p>Filters</p>
                    <select className="p-2 border border-gray-300 rounded-md shadow-sm">
                        <option value="default">Order By</option>
                        <option value="date">Date</option>
                        <option value="goal">Goal</option>
                    </select>
                    <select className="p-2 border border-gray-300 rounded-md shadow-sm">
                        <option value="default">Filter by Percentage Funded</option>
                        <option value="0-25">0-25%</option>
                        <option value="25-50">25-50%</option>
                        <option value="50-75">50-75%</option>
                        <option value="75-100">75-100%</option>
                    </select>
                    <select className="p-2 border border-gray-300 rounded-md shadow-sm">
                        <option value="default">Filter by Type</option>
                        <option value="Education">Education</option>
                        <option value="Environment">Environment</option>
                        <option value="Animal Welfare">Animal Welfare</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentProjects.map((project) => (
                        <div
                            key={project.id}
                            className="flex flex-col rounded-lg p-6 bg-white 
                                        hover:shadow-xl transition-transform duration-300 ease-in-out
                                        hover:scale-105 hover:bg-slate-100"
                            onClick={() => router.push(`/projects/${project.id}`)}
                        >
                            <div className="w-full mb-4 rounded-md overflow-hidden">
                                <img
                                    src={project.images[0]}
                                    alt={project.name}
                                    className="w-full h-64 object-fill object-center"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    {truncateText(project.description, 100)}
                                </p>
                            </div>

                            <div className="w-full bg-gray-300 rounded-full h-2.5 mb-[1rem]">
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

                            <div className="flex justify-between items-center mt-auto">
                                <p className="text-lg font-bold text-blue-600">
                                    {project.moneyRaised} € raised
                                </p>
                                <p className="text-sm text-gray-500">
                                    of {project.fundingGoal} €
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center mt-8">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`px-6 py-2 rounded-md ${currentPage === 1
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                    >
                        Prev
                    </button>
                    <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-6 py-2 rounded-md ${currentPage === totalPages
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
