const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
require("./config/db");
const User = require("./config/user");
const Product = require("./config/products");
// const Admin = require("./config/admin");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/img", express.static("./uploads"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
const Jwt = require("jsonwebtoken");
const secretKey = "my-secret";

app.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const user = new User(req.body);
    const result = await User.insertMany(user);
    Jwt.sign({ result }, secretKey, { expiresIn: "2h" }, (error, token) => {
      if (error) {
        res.send({ result: "something went wrong" });
      } else {
        res.json({
          result,
          token,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    try {
      let user = await User.findOne(req.body);
      if (user) {
        Jwt.sign({ user }, secretKey, { expiresIn: "2h" }, (error, token) => {
          if (error) {
            res.send({
              result: "please try again latter",
            });
          } else {
            res.send({
              user,
              token,
            });
          }
        });
      } else {
        res.send({ result: "No user found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ result: "An error occurred" });
    }
  } else {
    res.send({
      result: "please provide email & password",
    });
  }
});

let Admin = {
  email:"admin@gmail.com",
  password:"admin123"
}
app.post("/admin", (req, res) => {
  console.log(req.body.email )
  console.log( req.body.password )
  console.log(Admin,"admin")
  try {
    // const user = Admin.findOne(req.body);
    if (req.body.email === Admin.email && req.body.password === Admin.password) {
      Jwt.sign({ Admin }, secretKey, { expiresIn: "2h" }, (error, token) => {
        if (error) {
          res.send({
            result: "please try again latter",
          });
        } else {
          res.send({
            Admin,
            token
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "An error occurred" });
  }
});

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

app.post("/add", verifyToken, upload.single("image"), (req, res) => {
  console.log("img", req.file);
  console.log("body", req.body);
  try {
    const { name, price, quality, quantity } = req.body;
    const image = req.file.filename;

    const product = { image, name, price, quality, quantity };
    const result = Product.insertMany(product);
    // res.send(result);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "An error occurred" });
  }
});

app.get("/show", verifyToken, async (req, res) => {
  try {
    const user = await Product.find(req.body);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "An error occurred" });
  }
});



app.get("/showw", async (req, res) => {
  try {
    const user = await Product.find(req.body);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "An error occurred" });
  }
});

app.delete("/product/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.deleteOne({ _id: req.params.id });
    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "An error occurred" });
  }
});

app.get("/product/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "An error occurred" });
  }
});

app.post("/product/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "An error occurred" });
  }
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];

    Jwt.verify(token, secretKey, (error, success) => {
      if (error) {
        res.send("Please provide valid token  ");
      } else {
        next();
      }
    });
  } else {
    res.status(500).send("Please add token with headers.");
  }
}

app.listen(4000, () => {
  console.log("server is running on port : 4000");
});
