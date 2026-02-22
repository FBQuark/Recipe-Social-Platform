import App from "./src/App.js";

import User from "./src/schemas/account/User.js";
import Admin from "./src/schemas/account/Admin.js";

//User SignUp Endpoint
App.post('/createUser', async(req, res) => {
    console.log(`SignUp Attempt Recieved: ${req.body.email}`);
    try {
        const { username, email, password } = req.body;
        User.exists({username: username}).then(async(result) => {
            if(Object.is(result, null)) { //no user exists
                const date_created = new Date(); //get date when recipe was created
                const status = "unverified"; //users account status
                const measurement = "imperial";

                const newUser = new User({username, email, password_hash: password, date_created, status, measurement});
                await newUser.save()

                console.log(`New User Created: ${newUser}`)
                res.status(201).send({message: "New User Created"});
            } else {
                console.log(`Username: ${username} already exists`);
                res.status(400).send({message: "User already exists"});
            }
        });

    } catch(err) {
        console.log(`Error during signup: ${err}`);
        res.status(500).send(err);
    }
});

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