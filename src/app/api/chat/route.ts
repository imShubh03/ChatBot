import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { searchDocuments } from "@/lib/vector-store"

export const runtime = "nodejs"

export async function POST(req: Request) {
    try {
        const { messages, cdp } = await req.json()

        // Get the latest user message
        const latestMessage = messages[messages.length - 1]

        // Search for relevant documents based on the user's query
        const searchResults = await searchDocuments(latestMessage.content, cdp)

        // Create a context from the search results
        const context = searchResults.map((doc) => `Source: ${doc.metadata.source}\n${doc.pageContent}`).join("\n\n")

        // Initialize the Gemini API
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "")
        const model = genAI.getGenerativeModel({ model: "gemini-pro" })

        // Create a system prompt with the context
        const systemPrompt = `
You are a helpful support agent for Customer Data Platforms (CDPs). Your job is to answer "how-to" questions about the following CDPs:
- Segment
- mParticle
- Lytics
- Zeotap

Use ONLY the following information to answer the user's question. If the information provided doesn't answer the question, say you don't have enough information and suggest they check the official documentation.

CONTEXT:
${context}

When answering:
1. Be concise and clear
2. Provide step-by-step instructions when applicable
3. Mention which CDP you're referring to in your answer
4. If asked about comparisons between CDPs, only compare based on the information provided
5. If the question is not related to CDPs, politely explain that you can only answer questions about the supported CDPs
6. For advanced or complex questions, provide detailed explanations and consider multiple aspects of the problem
7. Handle variations in question phrasing and terminology by focusing on the core intent of the question
`

        // Create the chat history
        const chatHistory = messages.slice(0, -1).map((msg: { role: string; content: any }) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
        }))

        // Start a chat session
        const chat = model.startChat({
            history: chatHistory,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
            },
        })

        // Generate a response
        const result = await chat.sendMessage(`${systemPrompt}\n\nUser question: ${latestMessage.content}`)
        const response = result.response.text()

        // Return the response
        return new Response(response)
    } catch (error) {
        console.error("Error in chat route:", error)
        return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 })
    }
}

