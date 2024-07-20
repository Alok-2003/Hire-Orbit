"use server";

import connectToDb from "@/database";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

export async function createProfileAction(formData, pathToRevaliadate) {
  await connectToDb();
  await Profile.create(formData);
  revalidatePath(pathToRevaliadate);
}

export async function fetchProfileAction(id){
    await connectToDb();
    const result = await Profile.findOne({userId: id})

    return JSON.parse(JSON.stringify(result));
}
