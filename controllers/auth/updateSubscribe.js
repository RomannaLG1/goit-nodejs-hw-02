const { User } = require("../../models");
const { NotFound } = require("http-errors");
const updateSubscribe = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(_id, { subscription }, { new: true });
  if (!result) {
    throw new NotFound(`Contact with id = ${_id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateSubscribe;
