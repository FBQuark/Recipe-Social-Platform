import App from "../App.js";
import User from "../schemas/account/User.js";
import Admin from "../schemas/account/Admin.js";

App.post('/Login', async(req, res) => {
  console.log(`Login Attempt Recieved: ${req.body.username}`);
  try {
    const user = await User.findOne({username: req.body.username, password_hash: req.body.password});
    if(!user) { //user doesn't exist
      console.log(`User: ${req.body.username} does not exist or Password: ${req.body.password} is not correct`);
      res.status(400).send({message: "Username or Password is incorrect"});
    }

    const admin = await Admin.findOne({user_id: user._id});
    if(admin) { //user logging in is an admin
      console.log("Admin is logging in");
      res.status(202).send({message: "Admin is logging in", username: req.body.username});
    } else { //normal user is logging in
      console.log(`${req.body.username} is logging in`);
      res.status(201).send({message: `${req.body.username} is logging in`, username: req.body.username})
    }
  } catch(err) {
    console.log(`Error during login: ${err}`);
    res.status(500).send(err);
  }
});