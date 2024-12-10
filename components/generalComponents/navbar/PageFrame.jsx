// PageFrame.js
import React from "react";
import Navbar from "./Navbar";

function PageFrame({ children }) {
    return (
        <main>
            <Navbar />

            <div className="mx-6 pt-16">
                {children}
            </div>
        </main>
    );
}

export default PageFrame;
