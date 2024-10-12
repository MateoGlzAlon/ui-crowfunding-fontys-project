"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { DATA } from '@/app/data';
import PageFrame from '@/components/PageFrame';
import { DonorsList } from '@/components/DonorsList';



import Image from 'next/image';
import ProjectImageCarousel from '@/components/ProjectImageCarousel';
import { ProjectProgressBar } from '@/components/ProjectProgressBar';

const ProjectDetails = ({ params }) => {
    const projectId = params.projectId;
    const router = useRouter();

    const [project, setProject] = useState(null);
    const [donations, setDonations] = useState(null);


    useEffect(() => {
        const fetchProject = async () => {
            if (projectId) {
                try {
                    const response = await axios.get(`${DATA.origin}/projects/${projectId}`);
                    setProject(response.data);
                    console.log(response.data); // Log the fetched project data
                } catch (error) {
                    console.error("Failed to fetch project data:", error);
                }
            }
        };

        fetchProject();

    }, [projectId]);



    if (!project) {
        return <p>Loading project data...</p>;
    }

    return (
        <PageFrame>
            <div className='font-bold text-4xl tracking-wide py-10 px-16'>
                {project.name}
            </div>

            <div className="flex flex-wrap lg:flex-nowrap h-[600px]">
                <div className="flex-shrink-0 lg:w-2/3 items-center align-middle px-16">
                    <ProjectImageCarousel projectImages={project.images} className="h-full w-auto" />
                </div>

                <div className="flex flex-col items-center justify-center flex-grow w-full lg:w-1/3 border shadow-lg rounded-3xl">
                    <div className="w-full  flex flex-row p-4">
                        <div className="flex items-center justify-start w-1/3 ">
                            <ProjectProgressBar moneyRaised={project.moneyRaised} fundingGoal={project.fundingGoal} className="" />
                        </div>
                        <div className="w-2/3 flex flex-col items-center justify-center">
                            <p className="text-3xl font-bold ">{project.moneyRaised} € raised</p>
                            <p className="text-2xl font-thin">{project.fundingGoal} € goal</p>
                        </div>
                    </div>

                    <DonorsList projectId={projectId} />
                </div>
            </div>

            <pre>Project:<br />{JSON.stringify(project, null, 2)}</pre>


        </PageFrame>
    );
};

export default ProjectDetails;
