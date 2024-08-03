"use server";

import connectToDb from "@/database";
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

const stripe = require("stripe")(
  "sk_test_51P8df2SFHl4FUgYNrSZEssgVgmmi1WXHkcV7RvktUkLCnlStytF1d4IhWcrbVemRghEOZfK4NHB6w9Rkta030Pne00TjALhCUh"
);

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
export async function fetchJobsForCandidateAction(filterParams = {}) {
  await connectToDb();
  let updatedParams = {};
  Object.keys(filterParams).forEach((filterKey) => {
    updatedParams[filterKey] = { $in: filterParams[filterKey].split(",") };
  });
  console.log(updatedParams, "updatedParams");
  const result = await Job.find(
    filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {}
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

//update job application
export async function updateJobApplicationAction(data, pathToRevalidate) {
  await connectToDb();
  const {
    recruiterUserID,
    name,
    email,
    candidateUserID,
    status,
    jobID,
    _id,
    jobAppliedDate,
  } = data;
  await Application.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      recruiterUserID,
      name,
      email,
      candidateUserID,
      status,
      jobID,
      jobAppliedDate,
    },
    { new: true }
  );
  revalidatePath(pathToRevalidate);
}

//get candidate detAils by candidate ID
export async function getCandidateDetailsByIDAction(currentCandidateID) {
  await connectToDb();
  const result = await Profile.findOne({ userId: currentCandidateID });

  return JSON.parse(JSON.stringify(result));
}

//create filter categories
export async function createFilterCategoryAction() {
  await connectToDb();
  const result = await Job.find({});

  return JSON.parse(JSON.stringify(result));
}

//update profile action
export async function updateProfileAction(data, pathToRevalidate) {
  await connectToDb();
  const {
    userId,
    role,
    email,
    isPremiumUser,
    memberShipType,
    memberShipStartDate,
    memberShipEndDate,
    recrutierInfo,
    candidateInfo,
    _id,
  } = data;
  console.log(data);
  const updatedProfile= await Profile.findOneAndUpdate(
    {
      _id:_id,
    },
    {
      userId,
      role,
      email,
      isPremiumUser,
      memberShipType,
      memberShipStartDate,
      memberShipEndDate,
      recrutierInfo,
      candidateInfo,
    },
    { new: true }
  );
  console.log('Updated Proile:', updatedProfile);
  revalidatePath(pathToRevalidate);
}

//create stripe price id based on tier selection
export async function createPriceIdAction(data) {
  const session = await stripe.prices.create({
    currency: "inr",
    unit_amount: data?.amount * 100,
    recurring: {
      interval: "year",
    },
    product_data: {
      name: "Premium Plan",
    },
  });

  return {
    success: true,
    id: session?.id,
  };
}

//create payment logic
export async function createStripePaymentAction(data) {
  console.log(data);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: data?.lineItems,
    mode: "subscription",
    success_url: `${process.env.URL}/membership` + "?status=success",
    cancel_url: `${process.env.URL}/membership` + "?status=cancel",
    // customer_email: data?.email,  // capture customer email
    metadata: {
      customer_name: "Alok", // capture customer name
      customer_address: "Blank address", // capture customer address
    },
  });

  return {
    success: true,
    id: session?.id,
  };
}
