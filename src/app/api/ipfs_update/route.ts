import connectMongo from "@/utilities/db/connect-mongo";
import IPFS, { IIPFS } from "@/utilities/db/ipfs.schema";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body: IIPFS = await req.json();

    if (body) {
      const file = await IPFS.findOne({
        cid: body.cid,
      });

      if (!file) {
        return NextResponse.json(
          { message: "File not found" },
          { status: HttpStatusCode.NotFound }
        );
      }

      Object.assign(file, body);

      await file.save();

      return NextResponse.json(
        {
          data: {
            file,
            message: "Your ipfs has been update",
          },
        },
        { status: HttpStatusCode.Created }
      );
    }

    return NextResponse.json(
      { message: "something went wrong" },
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
