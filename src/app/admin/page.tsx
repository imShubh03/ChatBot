"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function AdminPage() {
    const [isIngesting, setIsIngesting] = useState(false)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const handleIngestDocuments = async () => {
        try {
            setIsIngesting(true)
            setMessage("")
            setError("")

            const response = await fetch("/api/ingest", {
                method: "POST",
            })

            const data = await response.json()

            if (data.success) {
                setMessage(data.message)
            } else {
                setError(data.error || "An error occurred during ingestion")
            }
        } catch (err) {
            setError("Failed to ingest documents")
            console.error(err)
        } finally {
            setIsIngesting(false)
        }
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Document Ingestion</CardTitle>
                        <CardDescription>Process and ingest CDP documentation into the vector database</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            This will process all documentation files in the /docs directory and store them in the vector database for
                            retrieval.
                        </p>
                        {message && <div className="bg-green-50 text-green-700 p-3 rounded-md mb-4">{message}</div>}
                        {error && <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">{error}</div>}
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleIngestDocuments} disabled={isIngesting}>
                            {isIngesting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Ingest Documents"
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

