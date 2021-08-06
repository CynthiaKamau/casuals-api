const router = require('express').Router();
const {User, loginValidation, registrationValidation} = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


router.post('/register', async (req,res) => {

    let { error } = registrationValidation(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }

        const salt = await bcrypt.genSalt(10);
        const hashpwd = await bcrypt.hash(req.body.password, salt);

        await User.create({

            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            role_id: req.body.role_id,
            status: req.body.status,
            password: hashpwd
        }).then( response => res.status(201).json({
                message: "User Created Successfully",
                success: true})
        .catch( error => res.status(500).json(error.errors[0].message)));
    

});

router.post('/login', async (req,res) => {

    let { error } = loginValidation(req.body);

    if(error) {

        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ where : { phone_number: req.body.phone_number} });

    if(!user) return res.status(400).send('Phone number does not exsist');

    //check if password is correct
    const validPwd = await bcrypt.compare(req.body.password, user.password);

    if(!validPwd) return res.status(400).send('Invalid Password');

    //create and assign token
    const token = jwt.sign({id: user.id, phone_number: user.phone_number, email: user.email, role_id: user.role_id, first_name: user.first_name, last_name: user.last_name}, process.env.SECRET_KEY);
    res.header('auth-token', token).send(token);

});

router.post('/profile', async (req, res) => {
    

});

module.exports = router;