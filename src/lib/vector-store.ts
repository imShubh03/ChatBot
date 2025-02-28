import { createClient } from "@supabase/supabase-js"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "")
const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" })

interface SearchResult {
    id: string
    content: string
    metadata: {
        source: string
        cdp: string
        title: string
    }
    similarity: number
    pageContent: string
}

export async function searchDocuments(query: string, cdpFilter = "all", limit = 5): Promise<SearchResult[]> {
    try {
        // Create the embedding for the query using Gemini
        const embeddingResult = await embeddingModel.embedContent({
            content: { role: "user", parts: [{ text: query }] }
        })
        const embedding = embeddingResult.embedding.values

        // Prepare the query
        let matchQuery = supabase.rpc("match_documents", {
            query_embedding: embedding,
            match_threshold: 0.5,
            match_count: limit,
        })

        // Apply CDP filter if specified
        if (cdpFilter !== "all") {
            matchQuery = matchQuery.eq("metadata->>cdp", cdpFilter)
        }

        // Execute the query
        const { data: documents, error } = await matchQuery

        if (error) {
            console.error("Error searching documents:", error)
            return []
        }

        return documents || []
    } catch (error) {
        console.error("Error in searchDocuments:", error)
        return []
    }
}

