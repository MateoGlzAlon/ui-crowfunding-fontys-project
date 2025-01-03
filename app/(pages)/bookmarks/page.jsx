"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import getProjectsCreatedByUserGET from "@/components/fetchComponents/GET/getProjectsCreatedByUserGET";
import getSpecificUserById from "@/components/fetchComponents/GET/getSpecificUserByIdGET";
import TokenManager from "@/app/apis/TokenManager";
import PageFrame from "@/components/generalComponents/pageFrame/PageFrame";
import { useRouter } from "next/navigation";

export default function Bookmarks() {
    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const router = useRouter();

    const fetchUserData = useCallback(async () => {
        if (!userId) return;

        try {
            const [userData, userProjects] = await Promise.all([
                getSpecificUserById(userId),
                getProjectsCreatedByUserGET(userId),
            ]);

            setUser(userData || {});
            setProjects(userProjects || []);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }, [userId]);

    // Fetch User ID from Token
    useEffect(() => {
        if (typeof window !== "undefined") {
            const claims = TokenManager.getClaims();
            setUserId(claims?.userId || null);
            fetchUserData();
        }
    }, [fetchUserData]);

    // Add a check to make sure user data is available before rendering
    if (!user) {
        return <div>Loading...</div>; // or any other loading component you prefer
    }

    return (
        <PageFrame>
            <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
                {/* Profile Header */}
                <div className="flex items-center border-b pb-6">
                    <div className="flex flex-col items-center w-1/5">
                        <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden">
                            <img
                                src={user.profilePicture || "/profilePlaceholder.jpg"} // Fallback image if user.profilePicture is null or undefined
                                alt="Profile"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="ml-6 w-4/5">
                        <h1 className="text-2xl font-bold text-gray-800">{user.name || "No Name Provided"}</h1>
                        <p className="text-gray-600">Email: {user.email || "No Email Provided"}</p>
                    </div>
                </div>

                {Array.isArray(projects) && projects.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => router.push(`/projects/${project.id}`)}
                        id="project-card"
                        className="block cursor-pointer bg-transparent p-3 w-full sm:w-full md:w-1/3 lg:w-1/5 transform transition hover:scale-105 hover:bg-slate-100  rounded-lg"
                    >
                        <div className="w-full h-48 overflow-hidden rounded-lg">
                            <img
                                src={project.imageCover}
                                alt={project.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/*<p>{format(new Date(project.dateCreated), 'dd/MM/yyyy')}</p>*/}                            <div className="w-full bg-gray-300 rounded-full h-2.5 mt-4">
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
        </PageFrame>
    );
}
