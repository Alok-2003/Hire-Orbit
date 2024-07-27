import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col space-y-3">
      {/* <Skeleton className="min-h-[100vh] h-full w-full bg-red-500  " /> */}
      <div className="bg-green-500 min-h-[100vh] flex justify-center items-center ">
        <h1 className="text-5xl">Loading...</h1>
      </div>
    </div>
  );
}
