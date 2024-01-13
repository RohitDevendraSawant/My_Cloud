const express = require("express");
const app = express();
const User = require("../models/User");
const router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const fetchuser = require('../middleware/fetchuser')
var jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");

const JWT_SECRET = process.env.JWT_SECRET

app.use(express.json());

//Route 1 : Create a User using: POST "/api/auth". Doesn't require Auth
router.post("/createUser", [
  body("name", "Name should be greatter than 3 characters.").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password should be greatter than 5 characters.").isLength({ min: 5 }),],
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false
      return res.status(400).json({ success, errors: errors.array() });
    }
    let user = await (User.findOne({ email: req.body.email }))
    if (user) {
      success = false
      return res.status(500).json({ success,error: "Sorry user with this email is already exists." })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })

    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET)
    success = true
    res.json({ success : success,authToken : authToken })
  });

// Route 2 : Authenticate a User using: POST "/api/auth/login". No login required
router.post("/login", [
  body("email", "Enter a valid email").isEmail(),
  body("password", "Enter password.").exists(),],
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const{email,password} = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ success, error: "please try to login with valid credentils." });
      }

      let passAuth = await bcrypt.compare(password, user.password);
      if (!passAuth) {
        return res.status(400).json({ success, error: "please try to login with valid credentils." })
      }
      const data = {
          user: {
            id: user.id
          }
        }
        const authToken =  jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authToken }); 

    } catch (error) {
      console.error(error.message);
    }

  });

// Route 3 : Fetching Users using: POST "/api/auth/fetchUsers". login required
router.post("/fetchUser", fetchuser, async (req, res) => {
    try{
      userID = req.user.id;
      const user = await User.findById(userID).select("-password");
      res.send(user)
      success = true
    } catch(error){
      console.error(error.message);
    }
  });


module.exports = router;
