"use client"

import { useToast } from "@/hooks/use-toast"
import TokenManager from "@/app/apis/TokenManager"
import { useWebSocket } from "./WebSocketContext"

export function ToastComponent({ params }) {

    const { toast } = useToast()

    const { sendMessage } = useWebSocket();

    function handleToast() {

        console.log("hey, clicked")
        sendMessage({
            //TO-DO: Change to the project id
            "to": 1,
            "text": "test3",
        }
        )
    }

    return (
        <>

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleToast}>

                Show Toast
            </button >
        </>
    )
}
