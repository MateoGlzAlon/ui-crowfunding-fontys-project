"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { DATA } from '@/app/data';
import PageFrame from '@/components/PageFrame';
import { DonorsList } from '@/components/DonorsList';



import Image from 'next/image';
import ProjectImageCarousel from '@/components/ProjectImageCarousel';

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

            <div className="flex flex-wrap lg:flex-nowrap">
                <div className="flex-shrink-0 lg:w-2/3 items-center align-middle px-16">
                    <ProjectImageCarousel projectImages={project.images} className="h-full w-auto" />
                </div>

                <div className="flex-grow w-full lg:w-1/3 border-black border-2">
                    <DonorsList projectId={projectId} />
                </div>
            </div>

            <pre className='border-2 border-pink-800'>Project:<br />{JSON.stringify(project, null, 2)}</pre>


        </PageFrame>
    );
};

export default ProjectDetails;
