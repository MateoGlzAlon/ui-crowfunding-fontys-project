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

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchProjectData(projectId);
            setProjectData(data);
        };

        if (projectId) fetchData();
    }, [projectId]);

    if (!projectData) return <p>Loading project data...</p>;

    // Example project value for display purposes
    const project = { ...projectData, moneyRaised: 8932.2567 };

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
