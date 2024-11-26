"use client";
import { useEffect, useState } from "react";
import getProjectsCreatedByUserGET from "@/components/fetchComponents/getProjectsCreatedByUserGET";
import TokenManager from "@/app/apis/TokenManager";
import getSpecificUserById from "@/components/fetchComponents/getSpecificUserByIdGET";

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState(null); // Initialize as null to handle conditional rendering
    const userId = TokenManager.getClaims()?.userId;

    useEffect(() => {
        const fetchProjectsData = async () => {
            if (userId) {
                console.log(`Fetching projects for user ID: ${userId}`);
                const data = await getProjectsCreatedByUserGET(userId);
                setProjects(data || []); // Fallback to an empty array if no projects are returned
            }
        };

        const fetchUserData = async () => {
            if (userId) {
                const data = await getSpecificUserById(userId);
                setUser(data || {}); // Fallback to an empty object if no user data is returned
            }
        };

        fetchUserData();
        fetchProjectsData();
    }, [userId]);

    const paymentsMade = [
        {
            id: 1,
            title: "Clean Water Initiative",
            owner: "Michael Brown",
            description: "Providing access to clean water for underserved communities.",
            contributed: 50,
        },
        {
            id: 2,
            title: "Animal Shelter Renovation",
            owner: "Sophia Davis",
            description: "Improving living conditions for rescued animals in the city shelter.",
            contributed: 30,
        },
    ];

    if (!user) {
        // Render a loading state until the user data is fetched
        return <div className="text-center py-20">Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            {/* Profile Header */}
            <div className="flex items-center border-b pb-6">
                <div className="w-24 h-24 rounded-full bg-gray-300 flex-shrink-0"></div>
                <div className="ml-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {isEditing ? (
                            <input
                                className="border border-gray-300 rounded px-2 py-1"
                                defaultValue={user.name || ""}
                            />
                        ) : (
                            user.name || "No Name Provided"
                        )}
                    </h1>
                    <p className="text-gray-600">
                        Email:{" "}
                        {isEditing ? (
                            <input
                                className="border border-gray-300 rounded px-2 py-1"
                                defaultValue={user.email || ""}
                            />
                        ) : (
                            user.email || "No Email Provided"
                        )}
                    </p>
                    <p className="text-gray-600">
                        Member since: {user.memberSince || "Unknown"}
                    </p>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {isEditing ? "Save" : "Edit"}
                </button>
            </div>

            {/* Grid for Projects and Payments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
                {/* List of Projects Created */}
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Projects Created</h2>
                    <div className="space-y-4">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="flex items-center border rounded-lg p-4 bg-gray-50"
                            >
                                <div className="w-20 h-20 bg-gray-300 rounded-lg mr-4"></div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {project.name}
                                    </h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-gray-800">{project.moneyRaised}€</p>
                                    <p className="text-gray-600">of {project.fundingGoal}€</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* List of Payments Made */}
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Payments Made</h2>
                    <div className="space-y-4">
                        {paymentsMade.map((payment) => (
                            <div
                                key={payment.id}
                                className="flex items-center border rounded-lg p-4 bg-gray-50"
                            >
                                <div className="w-20 h-20 bg-gray-300 rounded-lg mr-4"></div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {payment.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        <strong>Owner:</strong> {payment.owner}
                                    </p>
                                    <p className="text-gray-600">{payment.description}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-gray-800">
                                        {payment.contributed}€
                                    </p>
                                    <p className="text-gray-600">contributed</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
