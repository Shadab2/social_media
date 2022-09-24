const User = require("../model/user");
const Post = require("../model/post");
const bcrypt = require("bcrypt");
const router = require("express").Router();

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId == req.params.id || req.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (e) {
        req.status(500).send();
        console.log(e);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      if (!user) return res.status(404).json("No such user");
      res.status(200).send("Account has been sucessfully updated");
    } catch (e) {
      console.log(e);
      res.status(500).send({});
    }
  } else {
    res.status(403).json("You can update only your account");
  }
});

// delete a user
router.delete("/:id", async (req, res) => {
  if (req.body.userId == req.params.id || req.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send("Account has been sucessfully removed");
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  } else {
    res.status(403).json("You can modify only your account");
  }
});

//get freinds
router.get("/freinds/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const freinds = await Promise.all(
      user.following.map((freindId) => {
        return User.findById(freindId);
      })
    );
    const freindList = freinds.map(({ _id, username, profilePicture }) => ({
      _id,
      username,
      profilePicture,
    }));
    res.status(200).send(freindList);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

//follow a user
router.put("/follow/:id", async (req, res) => {
  if (req.params.id === req.body.userId)
    return res.status(403).json("Invalid option");
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (!currentUser || !userToFollow)
      return res
        .status(404)
        .send("Current user or User to follow doesn't exist");
    if (currentUser.following.includes(userToFollow._id))
      return res.status(300).json("User already followed");

    await currentUser.updateOne({ $push: { following: req.params.id } });
    await userToFollow.updateOne({ $push: { followers: req.body.userId } });
    res.status(200).json("Successfuly followed");
  } catch (e) {
    console.log(e);
    res.status(500).json({});
  }
});

//unfollow a user
router.put("/unfollow/:id", async (req, res) => {
  if (req.params.id === req.body.userId)
    return res.status(403).json("Invalid option");
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (!currentUser || !userToFollow) {
      res.status(404).send("Current user or User to unfollow doesn't exist");
      return;
    }
    if (!currentUser.following.includes(userToFollow._id))
      return res.status(300).json("You don't follow this user");

    await currentUser.updateOne({ $pull: { following: req.params.id } });
    await userToFollow.updateOne({ $pull: { followers: req.body.userId } });
    res.status(200).json("Successfuly Unfollowed");
  } catch (e) {
    console.log(e);
    res.status(500).json({});
  }
});

router.post("/upload/profile", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (user) {
      await user.updateOne({ profilePicture: req.body.profilePicture });
      return res.status(200).json("file sucessfully added");
    }
    return res.status(404).json("No such user");
  } catch (e) {
    res.status(404).json({});
  }
});

router.get("/search", async (req, res) => {
  try {
    const allUsers = await User.find({});
    const { name } = req.query;
    const users = allUsers.filter((user) =>
      user.username.toLowerCase().includes(name.toLowerCase())
    );
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
