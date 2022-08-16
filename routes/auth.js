const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const JWT_SECRET = 'adityaisakhatarnaakperson';
const fetchuser = require('../middleware/fetchuser');


// ROUTE 1 : create a user using : POST "/api/auth/". No login required
router.post('/createuser',
                [body('name','Enter a valid name').isLength({ min: 3 }),
                 body('email','Enter a valid password').isEmail(),
                 body('password','Password Must be atleast 5 characters').isLength({ min: 5 })
                ]
            ,async (req,res)=>{

    let success=false;
    // if there are errors in the user input return them using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    // check whether the user with same email exists already (return error if present)
    try
    {
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({success,error: 'Sorry a User with this email Already exists'})
        }

        // createing a scecured hash from password
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password,salt);
        
        // create user
        user = await User.create({
            name: req.body.name,
            password: secPassword,
            email : req.body.email
        })

        const data = {
            user : {
                id : user.id
            }
        }
        const authToken =  jwt.sign(data, JWT_SECRET);
        success=true;
        res.status(200).json({success,authToken});
        
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2 : Authenticating a user using : POST "/api/auth/login". No login required
router.post('/login',
[body('email','Enter a valid password').isEmail(),
 body('password','Password cannot be blank').exists()],async (req,res)=>{

    let success=false;
    // if there are errors in the user input return them using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    const {email,password} = req.body;

    try {
        let user = await User.findOne({email : email});
        if(!user){
            return res.status(400).json({success,error:"User with this email does not exist"});
        }   
        
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!password){
            return res.status(400).json({success,error:"Wrong Email or Password"});
        }
        const data = {
            user : {
                id : user.id
            }
        }
        const authToken =  jwt.sign(data, JWT_SECRET);
        success=true;;
        res.status(200).json({success,authToken});

    } catch(error){
        console.error(error.message);
        res.status(500).json("Internal Server Error");
    }          
})

// ROUTE 3 : GET Logged in user detail using : POST "/api/auth/getuser". login required 

router.post('/getuser',fetchuser,async (req,res)=>{

    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    
    } catch (error){
            console.error(error.message);
            res.status(500).send("Internal Server Error");
    }

})

module.exports = router;