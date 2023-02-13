const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getUsers = async (req, response) => {
  console.log(req.user);
  const userId = mongoose.Types.ObjectId(req.user.userId);
  const user = await User.findById(userId);

  const org = user.organisation.toString();
  console.log("org: ", org);

  if (org != null) {
    const resp = await User.find({ organisation: org })
      .then((users) => {
        console.log("getting users in org");
        //   console.log(users);
        response.status(200).send(users);
      })
      .catch((error) => {
        console.log(error);
        response.status(500).send(error);
      });
  } else {
    response.status(404).send("No users in org");
  }
};

exports.createUser = async (req, response) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        role: req.body.role,
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
      });

      user
        .save()
        .then((res) => {
          const payload = {
            userId: user._id,
            userEmail: user.email,
          };
          const token = jwt.sign(payload, "TOKEN", { expiresIn: "1h" });
          response.status(201).send({
            message: "User created successfully",
            id: user._id,
            email: user.email,
            token: token,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    .catch((error) => {
      response.status(500).send(error);
    });
};

exports.deleteUser = async (req, response) => {
  const id = req.params.id;

  const user = User.findByIdAndDelete(id)
    .then((res) => {
      console.log(res);
      response.status(200).send("User deleted");
    })
    .catch((error) => {
      response.status(404).send("User could not be deleted", error);
    });
};

exports.updateUser = async (req, response) => {
  const userId = mongoose.Types.ObjectId(req.params?.id);
  if (userId) {
    const user = await User.findByIdAndUpdate(userId, {
      name: req.body.name,
      role: req.body.role,
      organisation: req.body.organisation,
      email: req.body.email,
    })
      .then((res) => {
        response.status(200).send("User updated");
      })
      .catch((error) => {
        response
          .status(500)
          .send({ message: "User could not be updated", error });
      });
  } else {
    response.status(500).send({ message: "Please specify a user", error });
  }
};

exports.login = async (req, response) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(`attempt login ${email}`);

  const resp = User.findOne({ email: email })
    .then((user) => {
      console.log(user);
      bcrypt
        .compare(password, user.password)
        .then((res) => {
          const payload = {
            userId: user._id,
            userEmail: user.email,
          };
          console.log("Comparing password", res);
          if (!res) {
            return response.status(401).send({
              message: "Invalid password",
              error: error,
            });
          }
          const token = jwt.sign(payload, "TOKEN", { expiresIn: "1h" });
          console.log(token);
          response.status(200).send({
            message: "Login successful",
            id: user._id,
            email: user.email,
            token: token,
          });
        })
        .catch((error) => {
          response
            .status(401)
            .send({ message: "Invalid password", error: error });
        });
    })
    .catch((error) => {
      response.status(401).send({ message: "Invalid email", error: error });
    });

  return resp;
};

exports.auth = async (req, response, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "TOKEN");
    const user = decodedToken;
    req.user = user;
    next();
  } catch (error) {
    response.status(401).json({
      message: "Request not authorised",
      error: error,
    });
  }
};
