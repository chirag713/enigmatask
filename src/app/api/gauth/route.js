import { User } from "@/models/user";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'; // Correct import statement for jsonwebtoken
import { ConnectDb } from "@/helper/db";

ConnectDb();



export async function POST(req) {
 try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      // Update the name if provided in the request body
      if (req.body.name) {
        existingUser.name = req.body.name;
        await existingUser.save();
      }
      const token = jwt.sign({
        _id: existingUser.id,
        name: existingUser.name,
    }, process.env.JWT_KEY); // Provide the JWT_KEY for signing the token

    console.log(token);

    const response = NextResponse.json({
        message: "login success",
        success: true,
        user: existingUser,
    })

    response.cookies.set("authToken ", token, {
        expiresIn: "1d",
        httpOnly: true,
    })

    return response
    }
      const newUser = new User(req.body);
  
      // Save the user to the database
      await newUser.save();
  
      // Send a success response
      const token = jwt.sign({
        _id: newUser.id,
        name: newUser.name,
    }, process.env.JWT_KEY); // Provide the JWT_KEY for signing the token

    console.log(token);

    const response = NextResponse.json({
        message: "login success",
        success: true,
        user: newUser,
    })

    response.cookies.set("authToken ", token, {
        expiresIn: "1d",
        httpOnly: true,
    })

    return response
    

  
 } catch (error) {
  console.error(error);
        return NextResponse.json({
            message: error.message,
            success: false
        }, {
            status: 500
        });
 } 
}