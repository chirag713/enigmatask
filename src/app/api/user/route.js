import { ConnectDb } from "@/helper/db";
import { User } from "@/models/user";
// import { NextDataPathnameNormalizer } from "next/dist/server/future/normalizers/request/next-data";
import { NextResponse, userAgent } from "next/server";
import bcrypt from  "bcryptjs";

ConnectDb();

export async function GET(request) {
    let users = [];
    try {
        users = await User.find().select("-password");

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to create user",
            status: false
        })
    }


    return NextResponse.json(users);
}


export function DELETE(request) {

    return NextResponse.json({
        name: "Khusbu agrawal",
        phone: "9937973198",
        course: "Python"
    });
}


export async function POST(request) {



    // fetch user detail from request


    const { name, email, password } = await request.json();


    console.log(name , email , password);

    // create user object with user model

    const newuser = new User({
        name,
        email,
        password,
    })

    try {

        newuser.password= await bcrypt.hash(newuser.password ,parseInt(process.env.BCRYPT_SALT))

        console.log(newuser);


        // save the object to database 
        const creatednewuser = await newuser.save();

        const response = NextResponse.json(
            newuser,
            {
                status: 201,
            }
        )

        console.log("User succesfully created");

        return response;
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to create user",
            status: false
        },{
            status:500,
        })
    }
}