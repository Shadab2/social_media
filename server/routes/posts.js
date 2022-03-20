const router = require("express").Router();
const Post = require("../model/post");
const User = require("../model/user");

//create a post
router.post("/", async (req, res) => {
  try {
    const newPost = await new Post(req.body);
    await newPost.save();
    res.status(200).json(newPost);
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

//update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("No  such post");
    if (post.userId !== req.body.userId)
      return res.status(404).json("you can update only your post");
    await post.updateOne({ $set: req.body });
    res.status(200).json("Post sucessfully update");
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("No  such post");
    if (post.userId !== req.body.userId)
      return res.status(404).json("you can delete only your post");
    await post.deleteOne();
    res.status(200).json("Post sucessfully deleted");
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

//like or dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("No such post");
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).send("post has been liked");
    } else {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).send("post has been disliked");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("No such post");
    return res.status(200).json(post);
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

//get timeline-post
router.get("/timeline/all/:id", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);
    if (!currentUser) return res.status(404).send("No such user");
    const userPosts = await Post.find({ userId: currentUser._id });
    const freindPosts = await Promise.all(
      currentUser.following.map((freindId) => {
        return Post.find({ userId: freindId });
      })
    );
    res.status(200).json(userPosts.concat(...freindPosts));
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
});

module.exports = router;
