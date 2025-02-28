import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { createClient } from "@supabase/supabase-js"
import type { Document } from "langchain/document"
import * as fs from "fs"
import * as path from "path"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "")
const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" })

interface DocumentMetadata {
    source: string
    cdp: string
    title: string
}

export async function processDocuments(docsDir: string) {
    try {
        // Get all CDPs
        const cdps = fs.readdirSync(docsDir).filter((file) => fs.statSync(path.join(docsDir, file)).isDirectory())

        for (const cdp of cdps) {
            const cdpDir = path.join(docsDir, cdp)
            const files = fs.readdirSync(cdpDir).filter((file) => file.endsWith(".md") || file.endsWith(".txt"))

            for (const file of files) {
                const filePath = path.join(cdpDir, file)
                const content = fs.readFileSync(filePath, "utf-8")
                const title = path.basename(file, path.extname(file))

                // Split the document into chunks
                const splitter = new RecursiveCharacterTextSplitter({
                    chunkSize: 1000,
                    chunkOverlap: 200,
                })

                const docs = await splitter.createDocuments([content], [{ source: filePath, cdp, title }])

                // Process each chunk
                for (const doc of docs) {
                    await processChunk(doc)
                }

                console.log(`Processed ${filePath}`)
            }
        }

        console.log("All documents processed successfully")
    } catch (error) {
        console.error("Error processing documents:", error)
    }
}

async function processChunk(doc: Document) {
    try {
        const metadata = doc.metadata as DocumentMetadata

        // Create embedding for the chunk using Gemini
        const embeddingResult = await embeddingModel.embedContent({
            content: { role: "user", parts: [{ text: doc.pageContent }] }
        })
        const embedding = embeddingResult.embedding.values

        // Store the chunk and its embedding in Supabase
        const { error } = await supabase.from("documents").insert({
            content: doc.pageContent,
            embedding,
            metadata: {
                source: metadata.source,
                cdp: metadata.cdp,
                title: metadata.title,
            },
        })

        if (error) {
            console.error("Error storing document:", error)
        }
    } catch (error) {
        console.error("Error processing chunk:", error)
    }
}

