"use client";

import { useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import JobApplicants from "../job-applicants";

function RecruiterJobCard({ jobItem, jobApplications }) {
  const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
  const [
    showCurrentCandidateDetailsModal,
    setShowCurrentCandidateDetailsModal,
  ] = useState(false);

  return (
    <div>
      <CommonCard
        icon={<JobIcon />}
        title={jobItem?.title}
        footerContent={
          <Button
            onClick={() => setShowApplicantsDrawer(true)}
            className=" dark:bg-[#fffa27] disabled:opacity-55 flex h-11 items-center justify-center px-5"
            
          >
            Applicants
          </Button>
        }
      />
    </div>
  );
}

export default RecruiterJobCard;
