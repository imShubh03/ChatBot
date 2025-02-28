import { processDocuments } from "../lib/document-loader"
import * as path from "path"

// Set the path to the documents directory
const docsDir = path.join(process.cwd(), "docs")

// Process the documents
processDocuments(docsDir)
    .then(() => {
        console.log("Document ingestion complete")
        process.exit(0)
    })
    .catch((error) => {
        console.error("Error during document ingestion:", error)
        process.exit(1)
    })

