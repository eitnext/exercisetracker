const Exercise = require("../models/exerciseModel");
const User = require("../models/userModel");

exports.createExercise = async (req, res) => {
  try {
    const { _id } = req.params;
    const { description, duration, date } = req.body;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: `user wiht the id ${_id} do not exist!!!🚫`,
      });
    }
    const exercise = new Exercise({
      userID: _id,
      date: date ||  new Date().toDateString(),
      description,
      duration,
    });

    await exercise.save();

    const data = await Exercise.findById(exercise.id)
      .select("-_id -__v")
      .populate({
        path: "userID",
        select: "-__v",
      });

    res.status(200).json({
      _id: data.userID._id,
      username: data.userID.username ,
      date: data.date,
      duration: data.duration,
      description: data.description
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      error,
    });
  }
};
