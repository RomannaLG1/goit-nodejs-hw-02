const { User } = require("../../models");
const gravatar = require("gravatar");
const { Conflict } = require("http-errors");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email: ${email} in use`);
  }
  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, password, avatarURL });
  newUser.setPassword(password);
  newUser.save();
  res.status(201).json({
    status: "success",
    code: 201,
    message: `User with e-mail: ${email} created`,
    data: {
      user: {
        email,
        password,
        avatarURL,
      },
    },
  });
};

module.exports = register;
