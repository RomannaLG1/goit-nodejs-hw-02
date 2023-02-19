const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 3, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = favorite !== undefined ? { owner: _id, favorite } : { owner: _id };
  const result = await Contact.find(filter, "", { skip, limit: +limit }).populate(
    "owner",
    "_id email"
  );

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = listContacts;
