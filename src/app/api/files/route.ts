import connectMongo from "@/utilities/db/connect-mongo";
import File, { CreateFile } from "@/utilities/db/file.schema";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body: CreateFile = await req.json();

    if (body) {
      const file = await File.insertMany(body);

      return NextResponse.json(
        { file, message: "Your file has been created" },
        { status: HttpStatusCode.Created }
      );
    }

    return NextResponse.json(
      { message: "Product name is missing" },
      { status: HttpStatusCode.BadRequest }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
