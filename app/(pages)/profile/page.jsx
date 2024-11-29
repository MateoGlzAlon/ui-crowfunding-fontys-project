"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

import getProjectsCreatedByUserGET from "@/components/fetchComponents/getProjectsCreatedByUserGET";
import getPaymentsMadeByUserGETForProfile from "@/components/fetchComponents/getPaymentsMadeByUserForProfileGET";
import getSpecificUserById from "@/components/fetchComponents/getSpecificUserByIdGET";
import TokenManager from "@/app/apis/TokenManager";
import PageFrame from "@/components/PageFrame";

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [projects, setProjects] = useState([]);
    const [payments, setPayments] = useState([]);
    const [user, setUser] = useState(null);

    const userId = TokenManager.getClaims()?.userId;

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            try {
                const [userData, projectsData, paymentsData] = await Promise.all([
                    getSpecificUserById(userId),
                    getProjectsCreatedByUserGET(userId),
                    getPaymentsMadeByUserGETForProfile(userId),
                ]);

                setUser(userData || {});
                setProjects(projectsData || []);
                setPayments(paymentsData || []);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchData();
    }, [userId]);

    if (!user) {
        return <div className="text-center py-20">Loading...</div>;
    }

    return (

        <PageFrame>
            <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
                {/* Profile Header */}
                <header className="flex items-center border-b pb-6">
                    <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                        {user.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-gray-500">
                                No Image
                            </div>
                        )}
                    </div>
                    <div className="ml-6 flex-grow">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded px-2 py-1"
                                    defaultValue={user.name || ""}
                                />
                            ) : (
                                user.name || "No Name Provided"
                            )}
                        </h1>
                        <p className="text-gray-600">
                            <strong>Email:</strong>{" "}
                            {isEditing ? (
                                <input
                                    type="email"
                                    className="border border-gray-300 rounded px-2 py-1"
                                    defaultValue={user.email || ""}
                                />
                            ) : (
                                user.email || "No Email Provided"
                            )}
                        </p>
                        <p className="text-gray-600">
                            <strong>Member since:</strong> {user.memberSince || "Unknown"}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        {isEditing ? "Save" : "Edit"}
                    </button>
                </header>

                {/* Grid for Projects and Payments */}
                <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
                    {/* Projects Created Section */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Projects Created</h2>
                        {projects.length > 0 ? (
                            <div className="space-y-4">
                                {projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="flex items-center border rounded-lg p-4 bg-gray-50"
                                    >
                                        <div className="w-20 h-20 bg-gray-300 rounded-lg mr-4 overflow-hidden">
                                            <img
                                                src={project.images?.[0]}
                                                alt={project.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {project.name}
                                            </h3>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-gray-800">
                                                {project.moneyRaised}€
                                            </p>
                                            <p className="text-gray-600">of {project.fundingGoal}€</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No projects created yet.</p>
                        )}
                    </section>

                    {/* Payments Made Section */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Payments Made</h2>
                        {payments.length > 0 ? (
                            <div className="space-y-4">
                                {payments.map((payment) => (
                                    <div
                                        key={payment.id}
                                        className="flex items-center border rounded-lg p-4 bg-gray-50"
                                    >
                                        <div className="w-20 h-20 bg-gray-300 rounded-lg mr-4 overflow-hidden">
                                            <img
                                                src={payment.projectCoverImage}
                                                alt={payment.projectName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {payment.projectName}
                                            </h3>
                                            <p className="text-gray-600">
                                                <strong>Owner:</strong> {payment.projectOwnerName}
                                            </p>
                                            <p className="text-gray-600">
                                                {format(new Date(payment.paymentDate), "dd/MM/yyyy")}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-gray-800">
                                                {payment.amountFunded}€
                                            </p>
                                            <p className="text-gray-600">contributed</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No payments made yet.</p>
                        )}
                    </section>
                </main>
            </div>
        </PageFrame>
    );
}
