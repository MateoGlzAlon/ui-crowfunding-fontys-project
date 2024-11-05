"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import PageFrame from '@/components/PageFrame';
import { DonorsList } from '@/components/DonorsList';
import ProjectImageCarousel from '@/components/ProjectImageCarousel';
import { ProjectProgressBar } from '@/components/ProjectProgressBar';
import NumberTicker from "@/components/magicui/number-ticker";
import fetchProjectData from '@/components/fetchComponents/fetchProjectData';

const ProjectDetails = ({ params }) => {
    const { projectId } = params;
    const router = useRouter();
    const [projectData, setProjectData] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true when fetching starts
            const data = await fetchProjectData(projectId);
            setProjectData(data);
            setLoading(false); // Set loading to false when fetching is done
        };

        if (projectId) fetchData();
    }, [projectId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center">
                    <div>
                        <svg
                            className="animate-spin h-12 w-12 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                    </div>
                    <p className="mt-4 text-xl font-semibold">Loading project data...</p>
                </div>
            </div>
        );
    }

    const project = { ...projectData, moneyRaised: 8932.2567 }; // Example project value for display purposes

    return (
        <PageFrame>
            <div className="px-6">
                <div className="font-bold text-4xl tracking-wide py-10 px-16">
                    {project.name}
                </div>

                <div className="flex flex-wrap lg:flex-nowrap h-[500px]">
                    <div className="flex-shrink-0 lg:w-2/3 px-10">
                        <ProjectImageCarousel projectImages={project.images} />
                    </div>

                    <div className="flex flex-col items-center justify-center lg:w-1/3 border shadow-lg rounded-3xl px-4">
                        <div className="w-full flex p-4">
                            <div className="w-1/3">
                                <ProjectProgressBar moneyRaised={project.moneyRaised} fundingGoal={project.fundingGoal} />
                            </div>
                            <div className="w-2/3 text-center">
                                <p className="text-2xl font-bold">
                                    <NumberTicker value={project.moneyRaised} />€ raised
                                </p>
                                <p className="text-2xl font-thin">{project.fundingGoal} € goal</p>
                            </div>
                        </div>
                        <DonorsList projectId={projectId} />
                    </div>
                </div>

                <div className="px-16">
                    <p className="text-3xl font-bold tracking-wide py-10">About</p>
                    <p className="text-2xl font-thin">{project.description}</p>
                </div>
            </div>
        </PageFrame>
    );
};

export default ProjectDetails;
