import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Create an asynchronous function POST to handle POST 
// request with parameters request and response.
export async function POST(req: Request) {

    try {
      console.log("Received request to /api/gemini-ai");
        // Access your API key by creating an instance of GoogleGenerativeAI we'll call it GenAI
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY environment variable is not set.");
        }
        const genAI = new GoogleGenerativeAI(apiKey)

        // Ininitalise a generative model
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

        // Retrieve the data we recieve as part of the request body
        const data = await req.json()

        // Define a prompt varibale
        const prompt = data.body

        // Pass the prompt to the model and retrieve the output
        const result = await model.generateContent(prompt)
        const response = result.response;
        const output =  response.text();

        // Send the llm output as a server reponse object
        return NextResponse.json({ output: output })
    } catch (error) {
        console.error(error)
    }
}