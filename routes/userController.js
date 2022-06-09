const User = require("../models/user");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

exports.findOneUser = async (req, res) => {
  console.log("params: ", req.params.id);
  await User.findById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log("Error: ", error);
      res.json(data);
    });
};

exports.findAllUsers = async (req, res) => {
  await User.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log("Error: ", error);
      res.json(data);
    });
};

exports.register = async (req, res) => {
  console.log("Body: ", {...req.body, password: '***'});
  const data = req.body;
  data.password = await argon2.hash(data.password);
  const newUser = new User(data);

  await newUser.save((error) => {
    if (error) {
      res.status(500).json({ msg: "Ooops, something happened with the server" });
      console.log(error);
    } else {
      res.status(200).json({ msg: "Your data has been saved!!!" });
    }
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  try {
    if(!user) {
      throw new Error(`user ${username} not found`);
    }
    const passwordVerified = await argon2.verify(user.password, password);
    if(!passwordVerified) {
      throw new Error(`password of user ${username} incorrect`);
    }
    
    // AUTHORIZATION 1:)
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      "secretKey"
    );

    return res.json({ status: "ok", user: token });
  } catch(err) {
    console.error(err);
    return res.status(400).json({ status: "error" });
  }
};

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id).exec((error, deletedItem) => {
    if (error) {
      res.send(error);
    }
    return res.json(deletedItem);
  });
};

exports.update = async (req, res) => {
  if(req.body.user.password) {
    req.body.user.password = await argon2.hash(req.body.user.password);
  } 
  User.findByIdAndUpdate(req.params.id, req.body.user, { new: true }, (error, updatedData) => {
    if (error) {
      console.log("error" + error);
    } else {
      console.log("data" + req.params);
    }
  });
};
