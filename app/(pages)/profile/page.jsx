"use client";

import { useEffect, useState } from "react";
import getProjectsCreatedByUserGET from "@/components/fetchComponents/getProjectsCreatedByUserGET";
import TokenManager from "@/app/apis/TokenManager";
import getSpecificUserById from "@/components/fetchComponents/getSpecificUserByIdGET";
import getPaymentsMadeByUserGET from "@/components/fetchComponents/getPaymentsMadeByUserGET";
import { format } from 'date-fns';
import PageFrame from "@/components/PageFrame";


export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [projects, setProjects] = useState([]);
    const [payments, setPayments] = useState([]);
    const [user, setUser] = useState(null);
    const userId = TokenManager.getClaims()?.userId;

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;

            try {
                const [userData, userProjects, userPayments] = await Promise.all([
                    getSpecificUserById(userId),
                    getProjectsCreatedByUserGET(userId),
                    getPaymentsMadeByUserGET(userId),
                ]);

                setUser(userData || {});
                setProjects(userProjects || []);
                setPayments(userPayments || []);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    if (!user) {
        return <div className="text-center py-20">Loading...</div>;
    }

    return (
        <PageFrame>
            <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
                {/* Profile Header */}
                <div className="flex items-center border-b pb-6">
                    <div className="w-24 h-24 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                        <img src={user.profilePicture || "/placeholder.jpg"} alt="Profile" />
                    </div>
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
                    {/* Projects Section */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Projects Created</h2>
                        <div className="space-y-4">
                            {projects.length > 0 ? (
                                projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="flex items-center border rounded-lg p-4 bg-gray-50"
                                    >
                                        <div className="w-20 h-20 bg-gray-300 rounded-lg mr-4 overflow-hidden">
                                            <img
                                                src={project.images?.[0] || "/placeholder.jpg"}
                                                className="h-full object-cover"
                                                alt="Project"
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
                                            <p className="text-gray-600">
                                                of {project.fundingGoal}€
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">No projects created yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Payments Section */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Payments Made</h2>
                        <div className="space-y-4">
                            {payments.length > 0 ? (
                                payments.map((payment) => (
                                    <div
                                        key={payment.id}
                                        className="flex items-center border rounded-lg p-4 bg-gray-50"
                                    >

                                        <div className="w-20 h-20 bg-gray-300 rounded-lg mr-4 overflow-hidden">
                                            <img
                                                src={payment.projectCoverImage}
                                                className="h-full object-cover"
                                                alt="Project"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {payment.projectName}
                                            </h3>
                                            <p className="text-gray-600">
                                                <strong>Owner: </strong> {payment.projectOwnerName}
                                                {format(new Date(payment.paymentDate), 'dd/MM/yyyy')}
                                            </p>
                                            <p className="text-gray-600">{payment.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-gray-800">
                                                {payment.amountFunded}€
                                            </p>
                                            <p className="text-gray-600">contributed</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">No payments made yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PageFrame>
    );
}
