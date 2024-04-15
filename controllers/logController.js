const Exercise = require("../models/exerciseModel");
const User = require("../models/userModel");
const Log = require("../models/logModel");

exports.getLog = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: `user with the id ${_id} do not exist!!🚫`,
      });
    }
    const exercises = await Exercise.find({ userID: user.id }).select(
      "-__v -_id  -userID"
    );

    const newLog = await new Log({
      userID: _id,
      count: exercises.length,
      log: exercises,
    });

    await newLog.save();

    const data = await Log.findById(newLog.id).populate({
        path: 'userID',
        select: '-__v'
    });

    res.status(200).json({
      _id: data.userID._id,
      username: data.userID.username,
      count: data.count,
      log: data.log
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
      error,
    });
  }
};
