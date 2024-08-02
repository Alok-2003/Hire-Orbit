"use server";

import connectToDb from "@/database";
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

//create profile action
export async function createProfileAction(formData, pathToRevaliadate) {
  await connectToDb();
  await Profile.create(formData);
  revalidatePath(pathToRevaliadate);
}

export async function fetchProfileAction(id) {
  await connectToDb();
  const result = await Profile.findOne({ userId: id });

  return JSON.parse(JSON.stringify(result));
}

//create job action

export async function postNewJobAction(formData, pathToRevalidate) {
  await connectToDb();
  await Job.create(formData);
  revalidatePath(pathToRevalidate);
}

//fetch job action
//recruiter
export async function fetchJobsForRecruiterAction(id) {
  await connectToDb();
  const result = await Job.find({ recruiterId: id });

  return JSON.parse(JSON.stringify(result));
}
//candidate
export async function fetchJobsForCandidateAction(
  // filterParams = {}
) {
  await connectToDb();
  // let updatedParams = {};
  // Object.keys(filterParams).forEach((filterKey) => {
  //   updatedParams[filterKey] = { $in: filterParams[filterKey].split(",") };
  // });
  // console.log(updatedParams, "updatedParams");
  const result = await Job.find(
    // filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {}
  );

  return JSON.parse(JSON.stringify(result));
}

//create job application

export async function createJobApplicationAction(data, pathToRevalidate) {
  await connectToDb();
  await Application.create(data);
  revalidatePath(pathToRevalidate);
}

//fetch job applications - candidate
export async function fetchJobApplicationsForCandidate(candidateID) {
  await connectToDb();
  const result = await Application.find({ candidateUserID: candidateID });

  return JSON.parse(JSON.stringify(result));
}

//fetch job applications - recruiter

export async function fetchJobApplicationsForRecruiter(recruiterID) {
  await connectToDb();
  const result = await Application.find({ recruiterUserID: recruiterID });

  return JSON.parse(JSON.stringify(result));
}


//get candidate detAils by candidate ID
export async function getCandidateDetailsByIDAction(currentCandidateID) {
  await connectToDb();
  const result = await Profile.findOne({ userId: currentCandidateID });

  return JSON.parse(JSON.stringify(result));
}