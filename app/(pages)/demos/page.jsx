"use client";
import CreateDemoprojects from "@/components/createDemoProjects";
import CreateDemoUsers from "@/components/createDemoUsers";
import CreateDemoPayments from "@/components/createDemoPayments";
import CreateDemoProjectImages from "@/components/createDemoProjectImages";

const { default: PageFrame } = require("@/components/PageFrame");



function Demo() {

    return (
        <PageFrame>
            <div className="mt-20">
                <CreateDemoUsers />

                <CreateDemoprojects />

                <CreateDemoPayments />

                <CreateDemoProjectImages />
            </div>
        </PageFrame>
    );
}
export default Demo;