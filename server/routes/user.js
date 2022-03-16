const User = require("../model/user");
const bycrpt = require("bcrypt");
const router = require("express").Router();

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId == req.params.id || req.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bycrpt.genSalt(10);
        req.body.password = await bycrpt.hash(req.body.password, salt);
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
      return res.status(403).json("User already followed");

    await currentUser.updateOne({ $push: { following: req.params.id } });
    await userToFollow.updateOne({ $push: { followers: req.body.userId } });
    res.status(400).json("Successfuly followed");
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
    if (!currentUser || !userToFollow)
      return res
        .status(404)
        .send("Current user or User to unfollow doesn't exist");
    if (!currentUser.following.includes(userToFollow._id))
      return res.status(403).json("You don't follow this user");

    await currentUser.updateOne({ $pull: { following: req.params.id } });
    await userToFollow.updateOne({ $pull: { followers: req.body.userId } });
    res.status(400).json("Successfuly Unfollowed");
  } catch (e) {
    console.log(e);
    res.status(500).json({});
  }
});

module.exports = router;
