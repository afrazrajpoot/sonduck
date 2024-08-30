import { connection } from "@/dbConfig/dbConfig";
// import Subscription from "@/models/Subscription";
import User from "@/models/User"; // Import the User model
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Subscription from "@/models/subscription";

connection();

export async function POST(req) {
  try {
    const { id } = await req.json();
    let objectId;
    try {
      objectId = new mongoose.Types.ObjectId(id);
    } catch (error) {
      return NextResponse.json({ success: false, message: "Invalid ID format" }, { status: 400 });
    }

    const subscription = await Subscription.findById(objectId);
    if (!subscription) {
      return NextResponse.json({ message: "Subscription not found" }, { status: 404 });
    }

    const populatedSubscription = await Subscription.findById(objectId).populate("userId");

    return NextResponse.json(
      { success: true, subscription: populatedSubscription },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "ID parameter is required" }, { status: 400 });
    }
    // The correct method is findOne, not findByOne
    const subscription = await Subscription.findById({ _id: id });
    if (!subscription) {
      return NextResponse.json({ message: "Subscription not found" }, { status: 404 });
    }
    subscription.downloadLimit -= 1;
    await subscription.save();
    return NextResponse.json({ success: true, subscription: subscription }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "userId parameter is required" }, { status: 400 });
    }
    const deletedSubscription = await Subscription.findByIdAndDelete({
      _id: id,
    });
    if (!deletedSubscription) {
      return NextResponse.json({ message: "Subscription not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        success: true,
        message: "Subscription deleted successfully",
        deletedSubscription,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
