import User from "@/models/User"; // Adjust the path as per your project structure
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const user = await User.findOne({ email }).exec();
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // Add your logic here for creating a session or token

        return NextResponse.json({ message: "Authentication successful" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}