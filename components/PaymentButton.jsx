import { useState, useEffect } from "react";
import PaymentTransact from "./PaymentTransact.jsx";

export default function PaymentButton({ projectId }) {
    const [moneyAmount, setMoneyAmount] = useState("");
    const [backerName, setBackerName] = useState("");
    // Payment handler function
    async function handlePayment() {

    }

    return (
        <div className="flex items-center space-x-2 mt-2 w-full pb-3">
            <button
                className="w-1/5 px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none h-full"
                onClick={handlePayment}
            >
                Pay
            </button>

            <input
                id="inputBackerName"
                type="text"
                value={backerName}
                onChange={(e) => setBackerName(e.target.value)}
                placeholder="Enter backer name"
                min="0"
                className="w-2/5 h-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
                id="inputMoneyAmount"
                type="number"
                value={moneyAmount}
                onChange={(e) => setMoneyAmount(e.target.value)}
                placeholder="Enter amount"
                step="0.1"
                min="0"
                className="w-2/5 h-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>
    );
}
