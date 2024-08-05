import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  message: String,
  image: String,
  likes: [
    {
      reactorUserId: String,
      reactorUserName: String,
    },
  ],
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;
