import React from "react";
import { DATA } from "@/app/data";

export default function Footer() {
    return (
        <footer className="bg-gray-100 border-t mt-12">
            <div className="container mx-auto py-6 text-center text-sm">
                <div className="flex justify-center space-x-6">
                    <a
                        href={DATA.gitHubRepository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        GitHub Repository
                    </a>
                    <a
                        href={DATA.creatorWeb}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        Author web
                    </a>
                    <a
                        href={DATA.documentation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        Documentation
                    </a>
                </div>
                <p className="mt-4 text-gray-500">
                    © {new Date().getFullYear()} RaiseHub. All rights reserved.
                </p>
            </div>
        </footer>
    )
}