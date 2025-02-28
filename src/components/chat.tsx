"use client"

import { useChat } from "ai/react"
import { useState } from "react"
import { Bot, User, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ReactMarkdown from "react-markdown"

export function Chat() {
    const [cdp, setCdp] = useState<string>("all")

    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: "/api/chat",
        body: {
            cdp,
        },
        onError: (error) => {
            console.error(error)
        },
    })

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>CDP Support Agent</CardTitle>
                <CardDescription>Ask how-to questions about Customer Data Platforms</CardDescription>
                <div className="flex items-center space-x-2 mt-2">
                    <span className="text-sm text-muted-foreground">Filter by CDP:</span>
                    <Select value={cdp} onValueChange={setCdp}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select CDP" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All CDPs</SelectItem>
                            <SelectItem value="segment">Segment</SelectItem>
                            <SelectItem value="mparticle">mParticle</SelectItem>
                            <SelectItem value="lytics">Lytics</SelectItem>
                            <SelectItem value="zeotap">Zeotap</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
                {messages.length === 0 && (
                    <div className="text-center text-muted-foreground py-6">
                        <p>Ask a question to get started</p>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                            <Button
                                variant="outline"
                                onClick={() =>
                                    handleInputChange({ target: { value: "How do I set up a new source in Segment?" } } as any)
                                }
                            >
                                How do I set up a new source in Segment?
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() =>
                                    handleInputChange({ target: { value: "How can I create a user profile in mParticle?" } } as any)
                                }
                            >
                                How can I create a user profile in mParticle?
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() =>
                                    handleInputChange({ target: { value: "How do I build an audience segment in Lytics?" } } as any)
                                }
                            >
                                How do I build an audience segment in Lytics?
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() =>
                                    handleInputChange({ target: { value: "How can I integrate my data with Zeotap?" } } as any)
                                }
                            >
                                How can I integrate my data with Zeotap?
                            </Button>
                        </div>
                    </div>
                )}
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex items-start gap-4 p-4 rounded-lg",
                            message.role === "user" ? "bg-muted" : "bg-background border",
                        )}
                    >
                        <div className="flex-shrink-0 mt-1">
                            {message.role === "user" ? (
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                    <User className="h-5 w-5" />
                                </div>
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                                    <Bot className="h-5 w-5" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="font-medium">{message.role === "user" ? "You" : "CDP Support Agent"}</div>
                            <div className="prose prose-sm max-w-none">
                                <ReactMarkdown>{message.content}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                    <Input
                        placeholder="Ask a question about CDPs..."
                        value={input}
                        onChange={handleInputChange}
                        className="flex-1"
                    />
                    <Button type="submit" disabled={isLoading || !input.trim()}>
                        Send
                    </Button>
                </form>
            </CardFooter>
        </Card>
    )
}

