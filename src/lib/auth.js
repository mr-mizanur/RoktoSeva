import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "./db";


const client = await clientPromise;

export const auth = betterAuth({

  database: mongodbAdapter(client.db("roktoseva")), 
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      bloodGroup: { type: "string", required: true },
      district: { type: "string", required: true },
      upazila: { type: "string", required: true },
      role: { type: "string", defaultValue: "donor" },
      status: { type: "string", defaultValue: "active" },
    }
  }
});