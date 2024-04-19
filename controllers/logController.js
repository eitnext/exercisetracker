const Exercise = require("../models/exerciseModel");
const User = require("../models/userModel");
const Log = require("../models/logModel");

 

exports.getLog = async (req, res) => {
  try {
    const { limit, from, to } = req.query;

    const fromEl = new Date(from).getTime();
    const toEl = new Date(to).getTime();

    const { _id } = req.params;
    const user = await User.findById(_id);

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: `user with the id ${_id} do not exist!!🚫`,
      });
    }
    let exercises = await Exercise.find({ userID: user.id });

    if (fromEl || toEl) {
      exercises = exercises.filter((el) => {
        if (fromEl && toEl) {
          return (
            new Date(el.date).getTime() >= fromEl &&
            new Date(el.date).getTime() <= toEl
          );
        } else if (fromEl && !toEl) {
          return new Date(el.date).getTime() >= fromEl;
        } else if (!fromEl && toEl) {
          return new Date(el.date).getTime() <= toEl;
        }
      });
    }

    const log = new Log({ count: exercises.length });

    user.logID = log.id;
    user.log = exercises;

    await user.save();
    await log.save();

    const data = await User.findById(user.id)
      .select("-__v")
      .populate({
        path: "logID",
        select: "-_id count",
      })
      .populate({
        path: "exerciseID",
        select: "-_id description duration date",
      })
      .populate({
        path: "log",
        select: "-_id description duration date",
        perDocumentLimit: limit,
      });

    if (from && to) {
     return res.json({
        _id: data.id,
        username: data.username,
        from: new Date(from).toDateString(),
        to: new Date(to).toDateString(),
        count: data.logID.count,
        log: data.log,
      });
    } else if (from && !to) {
   return   res.json({
        _id: data.id,
        username: data.username,
        from: new Date(from).toDateString(),
        count: data.logID.count,
        log: data.log,
      });
    } else if (!from && to) {
     return res.json({
        _id: data.id,
        username: data.username,
        to: new Date(to).toDateString(),
        count: data.logID.count,
        log: data.log,
      });
    }

    res.json({
      _id: data.id,
      username: data.username,
      count: data.logID.count,
      log: data.log,
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
