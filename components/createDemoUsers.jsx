import React, { useState } from "react"; // Import React and useState first
import axios from 'axios';
import { DATA } from "@/app/data";
import TokenManager from "@/app/apis/TokenManager";

function CreateDemoUsers() {
    const [userData, setUserData] = useState(null); // State to hold the user data
    const [userId, setUserId] = useState(''); // State to hold the user ID from input
    const [error, setError] = useState(null); // State to hold error messages

    // Fetch all users
    function getAllUsers() {
        setError(null); // Reset error state before fetching
        axios
            .get(`${DATA.origin}/users`, {
                headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
            })
            .then((res) => {
                setUserData(res.data); // Update state with fetched data
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                setError("Error fetching users. Please try again."); // Set error message
            });
    }

    // Fetch specific user by ID
    function getSpecificUser() {
        if (userId) {
            setError(null); // Reset error state before fetching
            axios
                .get(`${DATA.origin}/users/${userId}`,
                    {
                        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
                    }
                )
                .then((res) => {
                    setUserData(res.data);
                })
                .catch((error) => {
                    console.error("Error fetching specific user:", error);
                    setError("Error fetching specific user. Please check the ID and try again."); // Set error message
                });
        } else {
            setError("User ID is required"); // Set error message if userId is empty
        }
    }



    async function createFakeUsers() {
        const fakeRepo = [
            {
                "name": "Matthew Stone",
                "email": "user@example.com",
                "password": "pass_1",
                "role": "user",
                "profilePicture": "https://avatar.iran.liara.run/public"
            },
            {
                "name": "Emily Johnson",
                "email": "emilyjohnson@example.com",
                "password": "pass_2",
                "role": "user",
                "profilePicture": "https://avatar.iran.liara.run/public"
            },
            {
                "name": "Michael Brown",
                "email": "michaelbrown@example.com",
                "password": "pass_3",
                "role": "user",
                "profilePicture": "https://avatar.iran.liara.run/public"
            },
            {
                "name": "Sophia Davis",
                "email": "sophiadavis@example.com",
                "password": "pass_4",
                "role": "user",
                "profilePicture": "https://avatar.iran.liara.run/public"
            },
            {
                "name": "James Wilson",
                "email": "jameswilson@example.com",
                "password": "pass_5",
                "role": "user",
                "profilePicture": "https://avatar.iran.liara.run/public"
            },
            {
                "name": "The Admin",
                "email": "admin@example.com",
                "password": "pass_6",
                "role": "admin",
                "profilePicture": "https://avatar.iran.liara.run/public"
            }
        ];

        const allResponses = []; // Array to hold all responses

        for (const user of fakeRepo) {
            try {
                const res = await axios.post(`${DATA.origin}/users`,
                    user,
                ); // Post each user individually
                allResponses.push(res.data); // Push response to allResponses
            } catch (error) {
                console.error("Error creating user:", error);
                setError("Error creating fake users"); // Set error message
            }
        }

        setUserData(allResponses); // Update userData with all responses
    }



    function deleteSpecificUser() {
        if (userId) {
            axios
                .delete(`${DATA.origin}/users/${userId}`,
                    {
                        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
                    })
                .then((res) => {
                    setUserData(res.data);
                })
                .catch((error) => {
                    console.error("Error deleting specific user:", error);
                    setError("Error deleting specific user. Please check the ID and try again.");
                });
        } else {
            setError("User ID is required");
        }
    }




    return (
        <div className="border-2 border-black m-10 p-5">
            <h2 className="text-4xl font-bold">Users</h2>

            <button className="border-2 border-black m-10 p-5" onClick={createFakeUsers}>
                Create fake users
            </button>

            <button className="border-2 border-black m-10 p-5" onClick={getAllUsers}>
                Get all users
            </button>

            <button className="border-2 border-black m-10 p-5" onClick={getSpecificUser}>
                Get specific user
            </button>

            <button className="border-2 border-black m-10 p-5" onClick={deleteSpecificUser}>
                Delete specific user
            </button>



            <input
                type="text"
                placeholder="Enter user ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="border-2 border-black m-10 p-5"
            />

            <pre className="border-2 border-black m-10 p-9" id="axios-test">
                {error ? (
                    <span className="text-red-500">{error}</span> // Show error message
                ) : userData ? (
                    JSON.stringify(userData, null, 2)
                ) : (
                    "No data yet."
                )}
            </pre>
        </div>
    );
}

export default CreateDemoUsers;
