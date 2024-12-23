import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function PageFrame({ children }) {
    return (
        <main>
            <Navbar />

            <div className="mx-6 pt-16">
                {children}
            </div>

            <Footer />
        </main>
    );
}

export default PageFrame;
