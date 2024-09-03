

        const express = require('express');
        const mongoose = require('mongoose');
        const twilio = require('twilio');
        const router = express.Router();
        const User = require('../models/User');  

        const accountSid = process.env.accountSid;
        const authToken =  process.env.authToken;
        const twilioPhoneNumber =  process.env.twilioPhoneNumber;
        const client = twilio(accountSid, authToken);

      
        router.post('/send-otp', async (req, res) => {
        const { phoneNumber } = req.body;
        
        try {
          
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpires = new Date(Date.now() + 10 * 60 * 1000); 

    
            await User.findOneAndUpdate(
            { phoneNumber },
            { otp, otpExpires },
            { upsert: true, new: true }
            );

         
            await client.messages.create({
            body: `Your OTP is: ${otp}`,
            from: twilioPhoneNumber,
            to: phoneNumber
            });

            res.status(200).json({ message: 'OTP sent successfully' });
        } catch (error) {
            console.error('Send OTP error:', error);
            res.status(500).json({ message: 'Failed to send OTP' });
        }
        });

      
        router.post('/verify-otp', async (req, res) => {
        const { phoneNumber, otp } = req.body;

        try {
            const user = await User.findOne({ phoneNumber });

            if (!user) {
            return res.status(404).json({ message: 'User not found' });
            }

            if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
            }

            if (user.otpExpires < new Date()) {
            return res.status(400).json({ message: 'OTP has expired' });
            }

           
            user.otp = undefined;
            user.otpExpires = undefined;
            await user.save();

            res.status(200).json({ message: 'OTP verified successfully' });
        } catch (error) {
            console.error('Verify OTP error:', error);
            res.status(500).json({ message: 'Failed to verify OTP' });
        }
        });

        module.exports = router;
