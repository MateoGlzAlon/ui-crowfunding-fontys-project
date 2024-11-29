"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import PageFrame from "@/components/PageFrame";
import { DonorsList } from "@/components/DonorsList";
import ProjectImageCarousel from "@/components/ProjectImageCarousel";
import { ProjectProgressBar } from "@/components/ProjectProgressBar";
import NumberTicker from "@/components/magicui/number-ticker";
import fetchProjectData from "@/components/fetchComponents/fetchProjectData";
import PaymentButton from "@/components/PaymentButton";
import TokenManager from "@/app/apis/TokenManager";
import getUserDataForProjectPageGET from "@/components/fetchComponents/getUserDataForProjectPageGET";

const ProjectDetails = ({ params }) => {
    const { projectId } = params;

    const [projectData, setProjectData] = useState(null);
    const [creatorData, setCreatorData] = useState(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [projectResponse, creatorResponse] = await Promise.all([
                    fetchProjectData(projectId),
                    getUserDataForProjectPageGET(projectId),
                ]);

                setProjectData(projectResponse);
                setCreatorData(creatorResponse);
            } catch (error) {
                console.error("Error fetching data:", error);
                router.push("/error"); // Navigate to an error page if needed
            } finally {
                setLoading(false);
            }
        };

        if (projectId) fetchData();
    }, [projectId, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center">
                    <LoadingSpinner message="Loading project data..." />
                </div>
            </div>
        );
    }

    if (!projectData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl font-semibold">Project not found</p>
            </div>
        );
    }

    const { name, description, images, moneyRaised, fundingGoal } = projectData;

    return (
        <PageFrame>
            <div className="px-6">
                <h1 className="font-bold text-4xl tracking-wide py-10 px-16">{name}</h1>

                <div className="flex flex-wrap lg:flex-nowrap h-[500px]">
                    {/* Project Images */}
                    <div className="flex-shrink-0 lg:w-2/3 px-10">
                        <ProjectImageCarousel projectImages={images} />
                    </div>

                    {/* Funding Progress and Payment Section */}
                    <div className="flex flex-col items-center justify-center lg:w-1/3 border shadow-lg rounded-3xl px-4">
                        <div className="w-full flex p-4">
                            <div className="w-1/3">
                                <ProjectProgressBar moneyRaised={moneyRaised} fundingGoal={fundingGoal} />
                            </div>
                            <div className="w-2/3 flex flex-col items-center justify-center text-center overflow-hidden">
                                <p className="text-2xl font-bold">
                                    <NumberTicker value={moneyRaised} />€ raised
                                </p>
                                <p className="text-2xl font-thin">{fundingGoal} € goal</p>
                            </div>
                        </div>
                        <PaymentButton />
                        <DonorsList projectId={projectId} />
                    </div>
                </div>

                <div className="px-16">
                    {/* Creator Information */}
                    {creatorData && (
                        <div className="w-2/3">
                            <div className="border-y-4 border-gray-200 mr-10 my-6 py-4 flex items-center gap-4">
                                <div className="w-1/5 flex items-center justify-center">
                                    <img
                                        src={creatorData.profilePicture || "/placeholder.png"}
                                        alt="Creator"
                                        className="h-20 w-20 object-cover rounded-3xl"
                                    />
                                </div>
                                <div className="w-4/5 flex items-center justify-start">
                                    <p className="text-xl">
                                        Project was created by {creatorData.name || "Unknown"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Project Description */}
                    <div className="w-2/3">
                        <h2 className="text-3xl font-bold tracking-wide py-10">About</h2>
                        <p className="text-2xl font-light text-justify">{description}</p>
                    </div>
                </div>
            </div>
        </PageFrame>
    );
};

const LoadingSpinner = ({ message }) => (
    <div className="flex flex-col items-center">
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
        <p className="mt-4 text-xl font-semibold">{message}</p>
    </div>
);

export default ProjectDetails;
