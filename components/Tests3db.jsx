import React, { useState } from 'react';
import { uploadFile } from '@/components/UploadImage'; // Adjust path as needed

export default function Tests3db() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [testMessage, setTestMessage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setErrorMessage(null);
        setTestMessage(null);

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
            const result = await uploadFile(selectedFile);
            alert(result.message);
            setSelectedFile(null);
            setPreview(null);
        } catch (error) {
            console.error('File upload failed:', error);
            setErrorMessage(error.message || 'An unexpected error occurred.');
        } finally {
            setIsUploading(false);
        }
    };

    const testUploadFile = async () => {
        if (!selectedFile) {
            setErrorMessage('Please select a file to test upload!');
            return;
        }

        setErrorMessage(null);
        setTestMessage(null);

        try {
            const result = await uploadFile(selectedFile);
            setTestMessage(result.message);
        } catch (error) {
            console.error('Test upload failed:', error);
            setTestMessage(error.message || 'An unexpected error occurred during test upload.');
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
                    <p className="text-gray-700 font-medium">Preview:</p>
                    <img
                        src={preview}
                        alt="Preview"
                        className="mt-2 h-96 border rounded-md"
                    />
                </div>
            )}
            {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
            {testMessage && <p className="mt-2 text-green-500">{testMessage}</p>}

            <button
                onClick={handleFileUpload}
                className={`mt-4 w-full py-2 px-4 rounded-md focus:outline-none focus:ring 
                ${isUploading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                disabled={isUploading}
            >
                {isUploading ? 'Uploading...' : 'Upload'}
            </button>

            <button
                onClick={testUploadFile}
                className="mt-4 w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md focus:outline-none focus:ring"
            >
                Test Upload
            </button>
        </div>
    );
}
