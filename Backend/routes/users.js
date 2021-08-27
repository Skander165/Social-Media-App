const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { json } = require("express");

//update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can update only your account!");
    }
  });

//delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been Deleted Successfully");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });

//get a user
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password, updatedAt, isAdmin, createdAt, ...other} = user._doc
        res.status(200).json(other)
    }catch(error) {
        return res.status(500).json(error)
    }
})
//follower user
router.put("/:id/follow", async (req, res) => {
    if(req.body.userId !== req.params.id) {

        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: {followers: req.body.userId}})
                await currentUser.updateOne({$push: {following: req.params.id}})
                res.status(200).json("User Has Been Followed")
            }
            else {
                res.status(200).json("You already follow this user")
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("You cant follow yourself")
    }
})

//unfollow user
router.put("/:id/unfollow", async (req, res) => {
    if(req.body.userId !== req.params.id) {

        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: {followers: req.body.userId}})
                await currentUser.updateOne({$pull: {following: req.params.id}})
                res.status(200).json("User Has Been Unfollowed")
            }
            else {
                res.status(200).json("You dont follow this user")
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("You cant unfollow yourself")
    }
})
module.exports = router;