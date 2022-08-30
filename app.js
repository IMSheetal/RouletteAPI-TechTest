require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./model/user");
const auth = require("./middleware/auth");
const Account = require("./model/account");

const app = express();

app.use(express.json({ limit: "50mb" }));

app.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

  
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(422).send("All input is required");
    } else {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "5hr",
          }
        );
        user.token = token;
        user.save(function (err, user) {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json(user);
          }
        });
      } else {
        res.status(401).send("Invalid Input");
      }
    }
  } catch (err) {
    console.log(err);
  }
});
app.get("/logout", auth, async (req, res) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  const user = await User.findOne({ token });
  user.token = 1;
  user.save(function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json("logged out successfully");
    }
  });
});

app.post("/home", auth, async(req, res) => {
  const { user_id } = req.body;
  const userProfile = await User.findOne({ user_id });
res.status(200).json(userProfile);
});
app.post("/bettingHistory", auth, async(req, res) => {
  const { user_id } = req.body;
  const userAccountHistory = await Account.find({ user_id });
res.status(200).json(userAccountHistory);
});

app.post("/createbet", auth, async(req, res) => {
  var betAmount = parseInt(req.body.betAmount);
  const { betColor, betType, betNumber, winner,user_id } = req.body;
  let total = 0;
  const betstatus = 1;
  if (betNumber === winner) {
  
    if ( betNumber && betType && betColor || betNumber && betType || betNumber && betColor) {
      total = parseInt(betAmount +  betAmount * 36);
    } else {
      total = betAmount * 36;     
    }
    const account = await Account.create({
      user_id:user_id,
      amountWin:total,
      betAmount:betAmount,
      betstatus:1,
    });  
      res.status(200).json("Won the game");
  }
 
});

module.exports = app;
