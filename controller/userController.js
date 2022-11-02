const config  = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator");

const  userController = {
    userRegister:async(req,res)=>{
        try{
           console.log(req.body);
           const {name, email , password, phoneNumber} = req.body;
           if(!name ||!email || !password){
            return res.status(200).json({
                message:"These field Manadotry"
            });
        }
           
           const user = await User.findOne({email});
           if(user){
               return res.status(400).json({message:"User already exists"});
           }
           if(user == 0){
            return res.status(400).json({message:"User is not Active"}); 
           }
           const passwordhash = await bcrypt.hash(password,10);
           const newUser = new User({
               name:name,
               email:email,
               password:passwordhash,
               phoneNumber:phoneNumber
           });
           await newUser.save();
           return res.status(201).json({
               message:"User Registered Successfully",
               data:newUser
           });
        }catch(err){
            return res.status(500).json({err:err.message});
        }
    },

    userLogin:async(req,res)=>{
        try{
          console.log(req.body);
          const {email, password }  =req.body;
          const validate = validator.isEmail(email);
           if(!validate){
               return res.status(400).json({error:{message:"Invalid Email format"}});
           }
          
          const user = await User.findOne({email});
          if(!user){
              return res.status(400).json({error:{message:"User is not registered"}});
          }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({error:{password:"User password does not matched"}})
        }
        const accessToken  = jwt.sign({
            id:user._id,
        }, config.SECRET_KEY,{expiresIn:"5d"});
        return res.status(200).json({message:"User login Successfully", data:user,token:accessToken});
        }catch(err){
            return res.status(600).json({
                message:"Invalid credentials Error"
            });
        }
    },
    

    // get All user
   getUser:async(req,res)=>{
    try{
       const user = await User.find();
       console.log(user);
       return res.status(200).json({
           message:"Success",
           data:user
       });
    }catch(err){
      return res.status(500).json({err:err.message}); 
    }
 },

   // Delete User by Id
   deleteUserId:async(req,res)=>{
    try{
       const _id = req.params.id;
       const getUser = await User.findByIdAndDelete(_id,{set:true});
       return res.status(200).json({
           message:" deleted Successfully",
           data:getUser
       })
    }catch(err){
     return res.status(500).json({err:err.message}); 
    }
},
//// update user by id
updateUserById:async(req,res)=>{
    try{
       const _id = req.params.id;
       const updateUser = await User.findByIdAndUpdate(_id,req.body);
       return res.status(200).json({
           message:" Updated Successfully",
           data:updateUser
       })
    }catch(err){
     return res.status(500).json({err:err.message}); 
    }
},

}

module.exports = userController;
