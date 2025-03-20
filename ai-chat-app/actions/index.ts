'use server';
import OpenAI from "openai";
import { Message } from "@/components/Chatbot/chatbot"; // Ensure this path is correct
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Ensure API key exists
if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OpenAI API key! Set OPENAI_API_KEY in your .env file.");
}

// Initialize OpenAI instance
const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

/**
 * Handles chat completion requests to OpenAI's API.
 * @param chatMessages - Array of chat messages from the user.
 * @returns Response from OpenAI's chat completion API.
 */
export async function chatCompletion(chatMessages: Message[]) {
    console.log("🟢 Incoming messages:", chatMessages);

    // Ensure chat messages are correctly formatted
    const chat: OpenAI.Chat.ChatCompletionMessageParam[] = [
        { role: "system", content: "You are a helpful assistant." },
        ...chatMessages.map(msg => ({
            role: msg.role === "user" || msg.role === "assistant" ? msg.role : "user",
            content: msg.content
        }))
    ];

    try {
        // Send request to OpenAI API
        const completion = await openAI.chat.completions.create({
            model: "gpt-3.5-turbo", // Ensure correct model version
            messages: chat,
            temperature: 0.7, // Adjust for more/less randomness
            max_tokens: 1000 // Limit response length
        });

        console.log("✅ ChatGPT Response:", completion.choices[0]?.message);
        
        // Return first response choice, ensuring it exists
        return completion.choices[0]?.message || { role: "assistant", content: "No response available." };
    } catch (error) {
        console.error("❌ Error fetching completion:", error);

        // Assert error type
        if ((error as any).code === 'insufficient_quota') {
            return { role: "assistant", content: "Quota exceeded. Please check your OpenAI plan." };
        }

        throw new Error("Failed to fetch response from OpenAI API.");
    }
}
