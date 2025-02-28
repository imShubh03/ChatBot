import { NextResponse } from "next/server"
import { processDocuments } from "@/lib/document-loader"
import * as path from "path"

export const runtime = "nodejs"

export async function POST() {
    try {
        // Set the path to the documents directory
        const docsDir = path.join(process.cwd(), "docs")

        // Process the documents
        await processDocuments(docsDir)

        return NextResponse.json({ success: true, message: "Document ingestion complete" })
    } catch (error) {
        console.error("Error during document ingestion:", error)
        return NextResponse.json({ success: false, error: "Failed to ingest documents" }, { status: 500 })
    }
}

