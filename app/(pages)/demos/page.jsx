"use client";
import CreateDemoprojects from "@/components/createDemoProjects";
import CreateDemoUsers from "@/components/createDemoUsers";
import CreateDemoPayments from "@/components/createDemoPayments";
import CreateDemoProjectImages from "@/components/createDemoProjectImages";
import Tests3db from "@/components/tests3db";

const { default: PageFrame } = require("@/components/PageFrame");



function Demo() {

    return (
        <PageFrame>
            <div className="mt-20">

                <Tests3db />

                <CreateDemoUsers />

                <CreateDemoprojects />

                <CreateDemoPayments />

                <CreateDemoProjectImages />

            </div>
        </PageFrame>
    );
}
export default Demo;