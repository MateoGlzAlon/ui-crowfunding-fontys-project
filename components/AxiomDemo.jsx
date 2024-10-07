import React, { useState } from 'react';
import axios from 'axios';

function AxiomDemo() {
    const [userData, setUserData] = useState(null); // Define state to hold the user data

    function getUsers() {
        axios
            .get('http://localhost:8080/users')
            .then((res) => {
                setUserData(res.data); // Update state with fetched data
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }

    return (
        <>
            <button className="border-2 border-black m-10 p-9" onClick={getUsers}>
                Click me!
            </button>

            <pre className="border-2 border-black m-10 p-9" id="axios-test">
                {userData ? JSON.stringify(userData, null, 2) : "No data yet."}
            </pre>
        </>
    );
}

export default AxiomDemo;
