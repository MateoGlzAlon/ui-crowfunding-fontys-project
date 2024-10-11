import React, { useState } from "react"; // Import React and useState first
import axios from 'axios';
import { DATA } from "@/app/data";


function CreateDemoPayments() {
    const [paymentData, setPaymentData] = useState(null); // State to hold the payment data
    const [paymentId, setPaymentId] = useState(''); // State to hold the payment ID from input
    const [error, setError] = useState(null); // State to hold error messages

    // Fetch all payments
    function getAllPayments() {
        setError(null); // Reset error state before fetching
        axios
            .get(`${DATA.origin}/payments`)
            .then((res) => {
                setPaymentData(res.data); // Update state with fetched data
            })
            .catch((error) => {
                console.error("Error fetching payments:", error);
                setError("Error fetching payments. Please try again."); // Set error message
            });
    }

    // Fetch specific payment by ID
    function getSpecificPayment() {
        if (paymentId) {
            setError(null); // Reset error state before fetching
            axios
                .get(`${DATA.origin}/payments/${paymentId}`)
                .then((res) => {
                    setPaymentData(res.data);
                })
                .catch((error) => {
                    console.error("Error fetching specific payment:", error);
                    setError("Error fetching specific payment. Please check the ID and try again."); // Set error message
                });
        } else {
            setError("Payment ID is required"); // Set error message if paymentId is empty
        }
    }



    async function createFakePayments() {
        const fakeRepo = [
            {
                "projectId": "1",
                "backerEmail": "emilyjohnson@example.com",
                "amountFunded": 50.0,
                "paymentDate": "2024-09-25T14:15:00"
            },
            {
                "projectId": "1",
                "backerEmail": "emilyjohnson@example.com",
                "amountFunded": 75.5,
                "paymentDate": "2024-09-26T10:30:00"
            },
            {
                "projectId": "1",
                "backerEmail": "michaelbrown@example.com",
                "amountFunded": 100.0,
                "paymentDate": "2024-09-27T09:45:00"
            },
            {
                "projectId": "1",
                "backerEmail": "michaelbrown@example.com",
                "amountFunded": 150.0,
                "paymentDate": "2024-09-28T11:00:00"
            },
            {
                "projectId": "1",
                "backerEmail": "sophiadavis@example.com",
                "amountFunded": 200.0,
                "paymentDate": "2024-09-29T12:15:00"
            },
            {
                "projectId": "1",
                "backerEmail": "jameswilson@example.com",
                "amountFunded": 80.0,
                "paymentDate": "2024-09-30T13:30:00"
            },
            {
                "projectId": "1",
                "backerEmail": "sophiadavis@example.com",
                "amountFunded": 60.0,
                "paymentDate": "2024-10-01T14:45:00"
            },
            {
                "projectId": "1",
                "backerEmail": "jameswilson@example.com",
                "amountFunded": 90.0,
                "paymentDate": "2024-10-02T15:00:00"
            },
            {
                "projectId": "1",
                "backerEmail": "jameswilson@example.com",
                "amountFunded": 110.0,
                "paymentDate": "2024-10-03T16:20:00"
            },
            {
                "projectId": "2",
                "backerEmail": "jameswilson@example.com",
                "amountFunded": 125.0,
                "paymentDate": "2024-10-04T17:40:00"
            }
        ]

        const allResponses = []; // Array to hold all responses


        for (const payment of fakeRepo) {
            try {
                const res = await axios.post(`${DATA.origin}/payments`, payment); // Post each payment individually
                allResponses.push(res.data); // Push response to allResponses
            } catch (error) {
                console.error("Error creating payment:", error);
                setError("Error creating fake payments"); // Set error message
            }
        }

        setPaymentData(allResponses); // Update paymentData with all responses
    }



    function deleteSpecificPayment() {
        if (paymentId) {
            axios
                .delete(`${DATA.origin}/payments/${paymentId}`)
                .then((res) => {
                    setPaymentData(res.data);
                })
                .catch((error) => {
                    console.error("Error deleting specific payment:", error);
                    setError("Error deleting specific payment. Please check the ID and try again.");
                });
        } else {
            setError("Payment ID is required");
        }
    }




    return (
        <div className="border-2 border-black m-10 p-5">
            <h2 className="text-4xl font-bold">Payments</h2>

            <button className="border-2 border-black m-6 p-5" onClick={createFakePayments}>
                Create fake payments
            </button>

            <button className="border-2 border-black m-6 p-5" onClick={getAllPayments}>
                Get all payments
            </button>

            <button className="border-2 border-black m-6 p-5" onClick={getSpecificPayment}>
                Get specific payment
            </button>

            <button className="border-2 border-black m-6 p-5" onClick={deleteSpecificPayment}>
                Delete specific payment
            </button>



            <input
                type="text"
                placeholder="Enter payment ID"
                value={paymentId}
                onChange={(e) => setPaymentId(e.target.value)}
                className="border-2 border-black m-10 p-5"
            />

            <pre className="border-2 border-black m-10 p-9" id="axios-test">
                {error ? (
                    <span className="text-red-500">{error}</span> // Show error message
                ) : paymentData ? (
                    JSON.stringify(paymentData, null, 2)
                ) : (
                    "No data yet."
                )}
            </pre>
        </div>
    );
}

export default CreateDemoPayments;
