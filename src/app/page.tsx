import { Chat } from "@/components/chat"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">CDP Support Agent</h1>
        <p className="text-center mb-8 text-muted-foreground">
          Ask how-to questions about Segment, mParticle, Lytics, and Zeotap
        </p>
        <Chat />
      </div>
    </main>
  )
}

