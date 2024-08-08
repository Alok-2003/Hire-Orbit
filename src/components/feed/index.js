"use client";

import { Fragment, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { CirclePlus, Heart } from "lucide-react";
import { Input } from "../ui/input";
import { createClient } from "@supabase/supabase-js";
import { createFeedPostAction, updateFeedPostAction } from "@/actions";

const supabaseClient = createClient(
  "https://nnlmhyuccbvpycvuvjum.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ubG1oeXVjY2J2cHljdnV2anVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwNzYxNTgsImV4cCI6MjAzNzY1MjE1OH0.TeyfCG82cBw2y63q9j_7nklEto8djOVC5zx2TDEpDrU"
);

function Feed({ user, profileInfo, allFeedPosts }) {
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [formData, setFormData] = useState({
    imageURL: "",
    heading: "",
    content: "",
  });
  const [imageData, setImageData] = useState(null);

  function handleFileOnChange(event) {
    event.preventDefault();
    setImageData(event.target.files[0]);
  }

  function handleFetchImagePublicUrl(getData) {
    const { data } = supabaseClient.storage
      .from("job-board-public")
      .getPublicUrl(getData.path);

    if (data)
      setFormData({
        ...formData,
        imageURL: data.publicUrl,
      });
  }

  async function handleUploadImageToSupabase() {
    const sanitizedFileName = imageData?.name.replace(/\s+/g, '_');
    const { data, error } = await supabaseClient.storage
      .from("job-board-public")
      .upload(`/public/${sanitizedFileName}`, imageData, {
        cacheControl: "3600",
        upsert: false,
      });
console.log(data)
    if (data) handleFetchImagePublicUrl(data);
  }

  useEffect(() => {
    if (imageData) handleUploadImageToSupabase();
  }, [imageData]);

  async function handleSaveFeedPost() {
    await createFeedPostAction(
      {
        userId: user?.id,
        userName:
          profileInfo?.candidateInfo?.name || profileInfo?.recrutierInfo?.name,
        heading: formData?.heading,
        content: formData?.content,
        image: formData?.imageURL,
        likes: [],
      },
      "/feed"
    );

    setFormData({
      imageURL: "",
      heading: "",
      content: "",
    });
  }

  async function handleUpdateFeedPostLikes(getCurrentFeedPostItem) {
    let cpyLikesFromCurrentFeedPostItem = [...getCurrentFeedPostItem.likes];
    const index = cpyLikesFromCurrentFeedPostItem.findIndex(
      (likeItem) => likeItem.reactorUserId === user?.id
    );

    if (index === -1)
      cpyLikesFromCurrentFeedPostItem.push({
        reactorUserId: user?.id,
        reactorUserName:
          profileInfo?.candidateInfo?.name || profileInfo?.recrutierInfo?.name,
      });
    else cpyLikesFromCurrentFeedPostItem.splice(index, 1);

    getCurrentFeedPostItem.likes = cpyLikesFromCurrentFeedPostItem;
    await updateFeedPostAction(getCurrentFeedPostItem, "/feed");
  }

  console.log(formData)
  return (
    <Fragment>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-baseline justify-between dark:border-white border-b pb-6 pt-24">
          <h1 className="dark:text-white text-4xl font-bold tracking-tight text-gray-900">
            Explore Feed
          </h1>
          <div className="flex items-center">
            <Button
              onClick={() => setShowPostDialog(true)}
              className="flex h-11 items-center justify-center px-5"
            >
              Add New Post
            </Button>
          </div>
        </div>
        <div className="py-12">
          <div className="container m-auto p-0 flex flex-col gap-5 text-gray-700">
            {allFeedPosts && allFeedPosts.length > 0 ? (
              allFeedPosts.map((feedPostItem) => (
                <div
                  key={feedPostItem._id}
                  className="group relative -mx-4 p-6 rounded-3xl bg-gray-100 hover:bg-white hover:shadow-2xl cursor-auto shadow-2xl shadow-transparent gap-8 flex"
                >
                  <div className="sm:w-2/6 rounded-3xl overflow-hidden transition-all duration-500 group-hover:rounded-xl">
                    <img
                      src={feedPostItem?.image}
                      alt="Post"
                      className="h-80 w-full object-cover object-top transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="sm:p-2 sm:pl-0 sm:w-4/6">
                    <span className="mt-4 mb-2 inline-block font-medium text-gray-500 sm:mt-0">
                      {feedPostItem?.userName}
                    </span>
                    <h3 className="mb-6 text-4xl font-bold text-gray-900">
                      {feedPostItem?.heading}
                    </h3>
                    <h3 className="mb-6 text-2xl text-gray-900">
                      {feedPostItem?.content}
                    </h3>
                    <div className="flex gap-5">
                      <Heart
                        size={25}
                        fill={
                          feedPostItem?.likes?.length > 0
                            ? "#000000"
                            : "#ffffff"
                        }
                        className="cursor-pointer"
                        onClick={() => handleUpdateFeedPostLikes(feedPostItem)}
                      />
                      <span className="font-semibold text-xl">
                        {feedPostItem?.likes?.length}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1>No posts found!</h1>
            )}
          </div>
        </div>
      </div>
      <Dialog
        open={showPostDialog}
        onOpenChange={() => {
          setShowPostDialog(false);
          setFormData({
            heading: "",
            content: "",
            imageURL: "",
          });
        }}
      >
        <DialogContent className="h-[550px]">
          <Textarea
            name="heading"
            value={formData?.heading}
            onChange={(event) =>
              setFormData({
                ...formData,
                heading: event.target.value,
              })
            }
            placeholder="Heading"
            className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 h-[200px] text-[28px]"
          />
          <Textarea
            name="content"
            value={formData?.content}
            onChange={(event) =>
              setFormData({
                ...formData,
                content: event.target.value,
              })
            }
            placeholder="Content"
            className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 h-[200px] text-[28px]"
          />

          <div className="flex gap-5 items-center justify-between">
            <Label for="imageURL">
              <CirclePlus />
              <Input
                onChange={handleFileOnChange}
                className="hidden"
                id="imageURL"
                type="file"
              />
            </Label>
            <Button
              onClick={handleSaveFeedPost}
              disabled={formData?.imageURL === ""}
              className="flex w-40 h-11 items-center justify-center px-5 disabled:opacity-65"
            >
              Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default Feed;
