const Exercise = require("../models/exerciseModel");
const User = require("../models/userModel");

const isValidDate = (date) => {
     return !isNaN(new Date(date))
}
 

exports.createExercise = async (req, res) => {
  try {
    const { _id } = req.params;
    let { description, duration, date } = req.body;
    
    if(!date){
        date = new Date().toDateString()
    }else if(!isValidDate(date)){
        return res.status(401).json({
            status: 'fail',
            message: 'please input a valid date'
        })
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: `user wiht the id ${_id} do not exist!!!🚫`,
      });
    }
 

    const exercise = new Exercise({
      date: new Date(date).toDateString(),
      description,
      duration,
    });


    user.exerciseID = exercise.id;

    await user.save();
    await exercise.save();

    const data = await User.find({ exerciseID: exercise.id })
      .select("-__v")
      .populate({
        path: "exerciseID",
        select: "-__v -_id",
      });

    res.status(200).json({
      _id: data[0]._id,
      username: data[0].username,
      date: data[0].exerciseID.date,
      duration: data[0].exerciseID.duration,
      description: data[0].exerciseID.description,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      error,
    });
  }
};
