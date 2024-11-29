import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { DATA } from "@/app/data";
import { Button } from "@/components/ui/button";
import TokenManager from "@/app/apis/TokenManager";
import ProfileButton from "@/components/profileButton";

export default function Navbar() {
    const [tokenLogin, setTokenLogin] = useState(""); // State for token
    const [claims, setClaims] = useState(null); // State for claims
    const router = useRouter();

    // Function to check and set the login token and claims
    const checkLoginToken = () => {
        const token = TokenManager.getAccessToken(); // Retrieve the token
        const decodedClaims = TokenManager.getClaims(); // Retrieve claims
        setTokenLogin(token || ""); // Set the token in state
        setClaims(decodedClaims || null); // Set claims in state
    };

    // Fetch token and claims on component mount
    useEffect(() => {
        checkLoginToken(); // Initial check
        const interval = setInterval(() => {
            checkLoginToken(); // Periodic check for updates
        }, 1000); // Check every second
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <nav className="fixed inset-x-0 z-[9999] h-16 border-b border-slate-500 bg-white mb-12">
            <div className="container flex h-full items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src={DATA.logoColor} alt="Logo" width={40} height={40} />
                        <span className="text-xl font-bold">{DATA.projectName}</span>
                    </Link>

                    <Link href="/demos">
                        <button className="border-2 border-black rounded-lg p-2 m-5">DEMOS</button>
                    </Link>

                    <a
                        href="https://docs-raisehub.vercel.app/intro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-black rounded-lg p-2 m-5"
                    >
                        DOCS
                    </a>


                </div>
                <div className="flex items-center space-x-4">
                    {claims ? (


                        <>

                            <Button
                                onClick={() => router.push("/createProject")}
                                className="font-semibold w-32"
                            >
                                Create project
                            </Button>

                            <ProfileButton />

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
