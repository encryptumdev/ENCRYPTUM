import connectMongo from "@/utilities/db/connect-mongo";
import IPFS, { IIPFS } from "@/utilities/db/ipfs.schema";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body: IIPFS = await req.json();

    if (body) {
      const ipfs = await IPFS.find({
        address: body.address,
      }).sort("-createdAt");

      return NextResponse.json(
        {
          data: {
            list: ipfs,
            message: "Your ipfs has been loaded",
          },
        },
        {
          status: HttpStatusCode.Ok,
        }
      );
    }

    return NextResponse.json(
      { message: "Something went wrong" },
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
