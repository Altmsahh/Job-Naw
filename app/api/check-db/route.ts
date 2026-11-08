import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

export async function GET() {
  const envCheck = {
    hasMongoUri: !!process.env.MONGODB_URI,
    hasAuthSecret: !!process.env.BETTER_AUTH_SECRET,
    hasAuthUrl: !!process.env.BETTER_AUTH_URL,
    hasPublicAuthUrl: !!process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    nodeEnv: process.env.NODE_ENV,
  };

  try {
    const conn = await connectDB();
    return NextResponse.json({
      status: "ok",
      database: "connected successfully",
      readyState: conn.connection.readyState,
      env: envCheck,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        errorName: error.name,
        errorMessage: error.message,
        env: envCheck,
      },
      { status: 500 }
    );
  }
}

