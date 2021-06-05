const { User } = require('../models/user');

module.exports.getUser = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).send(await user);
  } catch (err) {
    console.log(err);
  }
};
