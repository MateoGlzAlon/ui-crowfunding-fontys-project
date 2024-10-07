import React, { useState } from 'react';
import axios from 'axios';

function AxiomDemo() {
    const [userData, setUserData] = useState(null); // State to hold the user data
    const [userId, setUserId] = useState(''); // State to hold the user ID from input

    // Fetch all users
    function getAllUsers() {
        axios
            .get('http://localhost:8080/users')
            .then((res) => {
                setUserData(res.data); // Update state with fetched data
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }

    // Fetch specific user by ID
    function getSpecificUser() {
        if (userId) {
            axios
                .get(`http://localhost:8080/users/${userId}`)
                .then((res) => {
                    setUserData(res.data);
                })
                .catch((error) => {
                    console.error("Error fetching specific user:", error);
                });
        } else {
            console.error("User ID is required");
        }
    }

    return (
        <>
            <button className="border-2 border-black m-10 p-5" onClick={getAllUsers}>
                Get all users
            </button>

            <button className="border-2 border-black m-10 p-5" onClick={getSpecificUser}>
                Get specific user
            </button>

            <input
                type="text"
                placeholder="Enter user id"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="border-2 border-black m-10 p-5"
            />

            <pre className="border-2 border-black m-10 p-9" id="axios-test">
                {userData ? JSON.stringify(userData, null, 2) : "No data yet."}
            </pre>
        </>
    );
}

export default AxiomDemo;
