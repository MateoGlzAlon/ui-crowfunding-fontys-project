"use client";
import CreateDemoprojects from "@/components/createDemoProjects";
import CreateDemoUsers from "@/components/createDemoUsers";

const { default: PageFrame } = require("@/components/PageFrame");



function Demo() {

    return (
        <PageFrame>
            <div className="mt-20">
                <CreateDemoUsers />

                <CreateDemoprojects />
            </div>

        </PageFrame>
    );
}
export default Demo;