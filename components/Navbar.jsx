import Image from "next/image";
import Link from "next/link";

import { DATA } from "@/app/data";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TokenManager from "@/app/apis/TokenManager";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [tokenLogin, setTokenLogin] = useState(""); // State for token
    const [claims, setClaims] = useState(null); // State for claims
    const router = useRouter();

    // Function to check and set the login token and claims
    function checkLoginToken() {
        const token = TokenManager.getAccessToken(); // Retrieve the token
        setTokenLogin(token || ""); // Set the token in state
        const decodedClaims = TokenManager.getClaims(); // Retrieve claims
        setClaims(decodedClaims); // Set claims in state
    }

    // Fetch token and claims on component mount
    useEffect(() => {
        checkLoginToken();
    }, []);

    return (
        <nav className="fixed inset-x-0 z-[9999] h-16 border-b border-slate-500 bg-white mb-12">
            <div className="container flex h-full items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src={DATA.logoColor} alt="Logo" width={40} height={40} />
                        <span className="text-xl font-bold">{DATA.projectName}</span>
                    </Link>

                    <button
                        type="button"
                        onClick={() => router.push("/demos")}
                        className="border-2 border-black rounded-lg p-2 m-5"
                    >
                        DEMOS
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push("https://docs-raisehub.vercel.app/intro")}
                        className="border-2 border-black rounded-lg p-2 m-5"
                    >
                        DOCS
                    </button>

                    <button
                        type="button"
                        onClick={checkLoginToken} // Call function to update token and claims
                        className="border-2 border-black rounded-lg p-2 m-5"
                    >
                        TOKEN
                    </button>

                    {/* Input field to display the token */}
                    <input
                        type="text"
                        value={tokenLogin || ""} // Display tokenLogin state
                        placeholder="Token login"
                        readOnly // Make the input readonly
                        className="border-2 border-gray-300 rounded-lg p-2"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    {claims ? (<>
                        <Button
                            onClick={() => router.push("/createProject")}
                            className="font-semibold w-32"
                        >
                            Create project
                        </Button>

                        <Button
                            onClick={() => router.push("/profile")}
                            className="font-semibold w-32 rounded-full"
                        >
                            Profile
                        </Button>
                    </>
                    ) : (
                        <>
                            <Button
                                variant="outline"
                                onClick={() => router.push("/register")}
                                className="font-semibold w-32 border-black"
                            >
                                Register
                            </Button>
                            <Button
                                variant="default"
                                onClick={() => router.push("/login")}
                                className="font-semibold w-32"
                            >
                                Log in
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
