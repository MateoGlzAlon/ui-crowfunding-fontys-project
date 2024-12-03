import getSignedURLAction from '@/components/S3Actions';
import React, { useState } from 'react';
import axios from 'axios';

const computeSHA256 = async (file) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    return hashHex;
};

export default function Tests3db() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const isClient = typeof window !== 'undefined'; // Ensure client-side rendering

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setErrorMessage(null);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            setErrorMessage('Please select a file to upload!');
            return;
        }

        setErrorMessage(null);
        setIsUploading(true);

        try {
            const checksum = await computeSHA256(selectedFile);
            const signedURLResult = await getSignedURLAction(selectedFile.type, selectedFile.size, checksum);
            if (signedURLResult.failure) {
                throw new Error(`Failed to fetch signed URL: ${signedURLResult.failure}`);
            }

            const url = signedURLResult.success.url;
            await axios.put(url, selectedFile, {
                headers: {
                    'Content-Type': selectedFile.type,
                },
            });

            alert('File uploaded successfully!');
            setSelectedFile(null);
            setPreview(null);
        } catch (error) {
            console.error('File upload failed:', error);
            if (axios.isAxiosError(error)) {
                setErrorMessage(`File upload failed: ${error.response?.data?.message || error.message}`);
            } else {
                setErrorMessage(error.message || 'An unexpected error occurred.');
            }
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="border-2 border-black m-10 p-5">
            <h2 className="text-xl font-bold text-gray-800">File Upload</h2>


            <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
            />
            {preview && (
                <div className="mt-4">
                    <p>{process.env.AWS_BUCKET_NAME}</p>
                    <p>{process.env.AWS_BUCKET_REGION}</p>
                    <p>{process.env.AWS_ACCESS_KEY}</p>
                    <p>{process.env.AWS_SECRET_ACCESS_KEY}</p>
                    <p className="text-gray-700 font-medium">Preview:</p>
                    <img
                        src={preview}
                        alt="Preview"
                        className="mt-2 h-96 border rounded-md"
                    />
                </div>
            )}
            {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
            <button
                onClick={handleFileUpload}
                className={`mt-4 w-full py-2 px-4 rounded-md focus:outline-none focus:ring 
                ${isUploading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                disabled={isUploading}
            >
                {isUploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
}
