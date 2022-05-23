const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { deleteOne } = require("../models/user");

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

// exports.findOneUser = async (req, res) => {
//   const oneUser = await User.findById(req.params.id);
//   res.send({ data: oneUser });
// };

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
  console.log("Body: ", req.body);
  const data = req.body;
  const newUser = new User(data);

  // . save()
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
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  // AUUTHORIZATION 1:)

  if (user) {
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      "secretKey"
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
};

// exports.update = (req, res) => {
//   User.findByIdAndUpdate(req.params.id).exec((error, item) => {
//     alert(item);
//     if (error) {
//       res.send(error);
//     }
//     return res.json(item);
//   });
// };

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id).exec((error, deletedItem) => {
    if (error) {
      res.send(error);
    }
    return res.json(deletedItem);
  });
};

exports.update = async (req, res) => {
  //mb req.body.id

  User.findByIdAndUpdate(req.params.id, req.body.user, { new: true }, (error, updatedData) => {
    if (error) {
      console.log("error" + error);
    } else {
      console.log("data" + req.params);
    }
  });
};
