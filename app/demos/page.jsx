"use client";
import CreateDemoprojects from "@/components/createDemoProjects";
import CreateDemoUsers from "@/components/createDemoUsers";
import Base64Transformer from "@/components/Base64Transformer"

const { default: PageFrame } = require("@/components/PageFrame");



function Demo() {

    return (
        <PageFrame>
            <div className="mt-20">
                <CreateDemoUsers />

                <CreateDemoprojects />

                <Base64Transformer />
            </div>
        </PageFrame>
    );
}
export default Demo;