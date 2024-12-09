"use client";

import { useEffect, useState, useRef } from "react";
import getProjectsCreatedByUserGET from "@/components/fetchComponents/GET/getProjectsCreatedByUserGET";
import TokenManager from "@/app/apis/TokenManager";
import getSpecificUserById from "@/components/fetchComponents/GET/getSpecificUserByIdGET";
import getPaymentsMadeByUserGET from "@/components/fetchComponents/GET/getPaymentsMadeByUserGET";
import { format } from "date-fns";
import PageFrame from "@/components/PageFrame";
import { useRouter } from 'next/navigation';
import { uploadFile } from "@/components/UploadImage";
import updateProfilePicture from "@/components/fetchComponents/POST/updateProfilePicturePOST";


export default function Profile() {
    const [projects, setProjects] = useState([]);
    const [payments, setPayments] = useState([]);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const fileInputRef = useRef(null);
    const router = useRouter();

    // Retrieve userId on the client side
    useEffect(() => {
        if (typeof window !== "undefined") {
            const claims = TokenManager.getClaims();
            setUserId(claims?.userId || null);
        }
    }, []);

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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file)); // Show a preview of the uploaded file
            setShowConfirmation(true); // Show confirmation dialog
        }
    };

    const handleAccept = async () => {
        console.log("Accepted");

        try {
            const uploadedFile = await uploadFile(selectedFile); // Await the upload
            if (uploadedFile && uploadedFile.url) {
                console.log("File uploaded successfully! URL:", uploadedFile.url);

                console.log("userId es33: ", userId);

                await updateProfilePicture(userId, uploadedFile.url);
            } else {
                console.warn(`File upload failed for file: ${file.name}`);
            }
        } catch (error) {
            console.error("Error uploading profile picture:", error);
        }

        setShowConfirmation(false); // Close the confirmation dialog
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

                        {/* Confirmation Message */}
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
                        <h1 className="text-2xl font-bold text-gray-800">
                            {user.name || "No Name Provided"}
                        </h1>
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
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {payment.projectName}
                                            </h3>
                                            <p className="text-gray-600">
                                                <strong>Owner: </strong> {payment.projectOwnerName}
                                            </p>
                                            <p className="text-gray-600">
                                                {format(new Date(payment.paymentDate), "dd/MM/yyyy")}
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
