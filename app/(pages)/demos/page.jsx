"use client";
import CreateDemoprojects from "@/components/createDemoProjects";
import CreateDemoUsers from "@/components/createDemoUsers";
import Base64Transformer from "@/components/Base64Transformer"
import CreateDemoPayments from "@/components/createDemoPayments";

const { default: PageFrame } = require("@/components/PageFrame");



function Demo() {

    return (
        <PageFrame>
            <div className="mt-20">
                <CreateDemoUsers />

                <CreateDemoprojects />

                <CreateDemoPayments />
            </div>
        </PageFrame>
    );
}
export default Demo;