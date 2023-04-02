const Collection = require("./mongo");
const express = require ('express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');  
const config = require('./config') 
const cors = require("cors");
const { validateSignup} = require("./validator");
const app = express();
// const bcrypt = require("bcrypt")
// const User = require("./modal/Data")
// const { findOne } = require("./model/user")


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
const port = 4001


// login page

// app.get("/",cors(),(req,res)=>{

// })


// app.post("/login",async(req,res)=>{
//   const {email, password} = req.body

//   try{
//   const user = await Collection.find({email});
//   if (!user){
//     return res.status(404).json({message:"user not found"});
//   }

//   //compare the with the password in the database
//   const isMatch = await bcrypt.compare(password,user.password);
//   if(!isMatch) {
//     return res.status(401).json({message:"invalid password"})
//   }

//   //authentication successful, create a token and return it
//   const token = jwt.sign({id: user_id}.process.env.JWT_SECRRET);
//   res.json({message:"Logged in successful",token:token});
// } catch(err){
//   console.error(err);
//   res.status(500).json({message:"Server error"});
// }
//   // const user = collection.find(user=> user.name = req.body.name)
//   // if (user == null) {
//   //   return res.status(400).json("Cannot find user")
//   // }
//   // try{
//   //   if(await bcrypt.compare(req.body.password, user.password)) {
//   //       res.status(201).json("success")
//   //   } else {
//   //       res.send("not allowed")
//   //   }
//   // } catch{
//   //   res.status(500).json("message: server error")
//   // }


//     // try {
//     //     // const user = await collection.findOne({email: email});
//     //     const users =  await collection.findOne({email});
//     // // const login = bcrypt.compare(password, user.password)
//     //     console.log(users);
//     //     console.log("login successful");
//     //     res.status(201).json({message: " User logged in"})
              
//     // }
//     //  catch (error) {
//     //     console.log(error.message);
//     //     res.status(404).json({message: "NOT FOUND"});
//     // }
// })


//  app.post("/signup",async(req,res)=>{


// const {error, value} = validateSignup(req.body);

// if (error) {
//     console.log(error);
//     return res.send(error.details);
// }
// const { name, email, password } = req.body
// const hashPassword = await bcrypt.hash(password,12);
// console.log(name,email,password);
// // res.status(201).json({message: "signup successfull"})
// console.log('hi');
// try {
//    const users =  await Collection.create({ name, email, password: hashPassword });
//     console.log(users);
//     res.status(201).json({message: "Successfully Created"});
// }

// catch (error) {
// console.log(error.message);
// res.status(405).json({message: "INVALID INPUT"});
// }

// })



//new login and signup code





// Signup endpoint
app.post('/signup', (req, res) => {

  const {error, value} = validateSignup(req.body);

  if (error) {
      console.log(error);
      return res.send(error.details);
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  Collection.findOne({ email })
    .then(user => {
      if (user) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = bcrypt.hashSync(password, 12);
      const newUser = new Collection({
        name,
        email,
        password: hashedPassword
      });

      newUser.save()
        .then(() => res.status(201).json({ message: 'User created successfully' }))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
   
  }
  

  Collection.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
       
      } 
    
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' })
      
      
      }

       const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });
      return res.status(200).json({ token });
      // console.log("token generated", token);

     
         res.status(201).json({message:"Logged in successful"});
         console.log("login successful")
       
    })

    .catch(err => console.log(err));
});

app.listen(port,()=>{
    console.log (`app is listen to  ${port }`);
 })
 