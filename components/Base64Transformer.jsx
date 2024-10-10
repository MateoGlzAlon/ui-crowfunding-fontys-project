import React, { useState } from "react";

function Base64Transformer() {
    const [imgs, setImgs] = useState(null); // Initialize state as null

    const handleChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) { // Check if a file is selected
            const data = new FileReader();
            data.addEventListener('load', () => {
                setImgs(data.result); // Set the Base64 string
                console.log(data.result);
            });

            data.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const copyToClipboard = () => {
        if (imgs) {
            navigator.clipboard.writeText(imgs) // Copy the Base64 string to the clipboard
                .then(() => {
                    alert("Base64 string copied to clipboard!"); // Confirmation alert
                })
                .catch(err => {
                    console.error("Failed to copy: ", err);
                });
        }
    };

    return (
        <div>
            <input type="file" onChange={handleChange} />
            {imgs && (
                <>
                    <button onClick={copyToClipboard} className="border-2 border-black p-2 mt-2">
                        Copy Base64 to Clipboard
                    </button>
                    <img src={imgs} alt="Preview" /> {/* Display image only if it exists */}
                    <p className="border-black border-2">
                        Base64: {imgs}
                    </p>

                </>
            )}


        </div>
    );
}

export default Base64Transformer;
