import pkg from "express";
const { req, res, next } = pkg;

//Create Profile
export const createProfile = async (req, res, next) => {
  try {
    const { userId, bio, resumeUrl } = req.body;
    console.log(req.body);
    await ProfileService.create({
      userId,
      bio,
      resumeUrl
    });
    res.json({
      userId,
      bio,
      resumeUrl
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      next(console.log("Invalid Request", error));
    } else {
      next(console.log("Internal Server Error", error));
    }
  }
};
