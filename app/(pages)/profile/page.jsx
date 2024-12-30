"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import getProjectsCreatedByUserGET from "@/components/fetchComponents/GET/getProjectsCreatedByUserGET";
import getSpecificUserById from "@/components/fetchComponents/GET/getSpecificUserByIdGET";
import getPaymentsMadeByUserGET from "@/components/fetchComponents/GET/getPaymentsMadeByUserGET";
import getTotalPaymentsGET from "@/components/fetchComponents/GET/getTotalPaymentsGET";
import TokenManager from "@/app/apis/TokenManager";
import PageFrame from "@/components/generalComponents/pageFrame/PageFrame";
import { useRouter } from "next/navigation";
import { uploadFile } from "@/components/awsComponents/UploadImage";
import updateProfilePicture from "@/components/fetchComponents/POST/updateProfilePicturePOST";
import { format } from "date-fns";

export default function Profile() {
    const [projects, setProjects] = useState([]);
    const [payments, setPayments] = useState([]);
    const [totalPayments, setTotalPayments] = useState(0);
    const [timeFilter, setTimeFilter] = useState("This_month");
    const [user, setUser] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [userId, setUserId] = useState(null);
    const fileInputRef = useRef(null);
    const router = useRouter();

    // Fetch User ID from Token
    useEffect(() => {
        if (typeof window !== "undefined") {
            const claims = TokenManager.getClaims();
            setUserId(claims?.userId || null);
        }
    }, []);

    // Fetch User Data
    const fetchUserData = useCallback(async () => {
        if (!userId) return;

        try {
            const [userData, userProjects] = await Promise.all([
                getSpecificUserById(userId),
                getProjectsCreatedByUserGET(userId),
            ]);

            const userPayments = await getPaymentsMadeByUserGET(userId, timeFilter);
            const userTotalPayments = await getTotalPaymentsGET(userId, timeFilter);

            setUser(userData || {});
            setProjects(userProjects || []);
            setPayments(userPayments || []);
            setTotalPayments(userTotalPayments || 0);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }, [userId, timeFilter]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    // Handle File Change for Profile Picture
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file));
            setShowConfirmation(true);
        }
    };

    // Upload Profile Picture
    const handleAccept = async () => {
        try {
            const uploadedFile = await uploadFile(selectedFile);
            if (uploadedFile?.url) {
                await updateProfilePicture(user.id, uploadedFile.url);
                setUser((prev) => ({ ...prev, profilePicture: uploadedFile.url }));
            } else {
                console.warn("File upload failed.");
            }
        } catch (error) {
            console.error("Error uploading profile picture:", error);
        }
        setShowConfirmation(false);
    };

    // Handle Time Filter Change
    const handleFilterChange = (e) => {
        setTimeFilter(e.target.value);
    };

    if (!user) {
        return <div className="text-center py-20">Loading...</div>;
    }

    return (
        <PageFrame>
            <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
                {/* Profile Header */}
                <div className="flex items-center border-b pb-6">
                    <div className="flex flex-col items-center w-1/5">
                        <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden">
                            <img
                                src={previewImage || user.profilePicture || "/profilePlaceholder.jpg"}
                                alt="Profile"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() => fileInputRef.current.click()}
                        >
                            Change
                        </button>
                        {showConfirmation && (
                            <div className="mt-4 bg-gray-100 p-4 rounded shadow-md text-center">
                                <p className="text-gray-800">
                                    You selected: <strong>{selectedFile?.name}</strong>
                                </p>
                                <div className="flex justify-center gap-4 mt-4">
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        onClick={handleAccept}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        onClick={() => setShowConfirmation(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="ml-6 w-4/5">
                        <h1 className="text-2xl font-bold text-gray-800">{user.name || "No Name Provided"}</h1>
                        <p className="text-gray-600">Email: {user.email || "No Email Provided"}</p>
                    </div>
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
                                        className="flex items-center border rounded-lg p-4 bg-gray-50 hover:cursor-pointer"
                                        onClick={() => router.push(`/projects/${project.id}`)}
                                    >
                                        <div className="w-20 h-20 bg-gray-300 rounded-lg mr-4 overflow-hidden">
                                            <img
                                                src={project.images?.[0] || "/placeholder.jpg"}
                                                alt="Project"
                                                className="h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-gray-800">{project.moneyRaised}€</p>
                                            <p className="text-gray-600">of {project.fundingGoal}€</p>
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
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Payments Made ({totalPayments}€)</h2>
                            <select
                                className="border px-4 py-2 rounded bg-gray-50"
                                value={timeFilter}
                                onChange={handleFilterChange}
                            >
                                <option value="This_month">This month</option>
                                <option value="This_year">This Year</option>
                                <option value="All_time">All Time</option>
                            </select>
                        </div>
                        <div className="space-y-4">
                            {payments.length > 0 ? (
                                payments.map((payment) => (
                                    <div
                                        key={payment.id}
                                        className="flex items-center border rounded-lg p-4 bg-gray-50 hover:cursor-pointer"
                                        onClick={() => router.push(`/projects/${payment.projectId}`)}
                                    >
                                        <div className="w-20 h-20 bg-gray-300 rounded-lg mr-4 overflow-hidden">
                                            <img
                                                src={payment.projectCoverImage || "/placeholder.jpg"}
                                                alt="Project"
                                                className="h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-semibold text-gray-800">{payment.projectName}</h3>
                                            <p className="text-gray-600">
                                                <strong>Owner: </strong> {payment.projectOwnerName}
                                            </p>
                                            <p className="text-gray-600">
                                                {format(new Date(payment.paymentDate), "dd/MM/yyyy")}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-gray-800">{payment.amountFunded}€</p>
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
