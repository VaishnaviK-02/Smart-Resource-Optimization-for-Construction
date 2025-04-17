"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Bot, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [chatLoading, setChatLoading] = useState(false)
  const [chatResponse, setChatResponse] = useState("")
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "assistant", content: string }[]>([])
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when chat history changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatHistory])

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return
    
    // Add user message to chat history
    const userMessage = chatInput.trim()
    setChatHistory(prev => [...prev, { role: "user", content: userMessage }])
    setChatInput("")
    setChatLoading(true)
    
    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      // Add assistant response to chat history
      setChatHistory(prev => [...prev, { role: "assistant", content: data.response }])
      setChatResponse(data.response)
    } catch (error) {
      console.error("Error:", error)
      toast.error("Failed to get response from AI")
      setChatResponse("Sorry, I couldn't process your request at this time.")
    } finally {
      setChatLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`rounded-full h-14 w-14 shadow-lg ${
            isOpen 
              ? "bg-red-500 hover:bg-red-600" 
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
          >
            <CardHeader className="pb-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <span>Code Brigade Assistant</span>
                </CardTitle>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                  Code Brigade
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              <div 
                ref={chatContainerRef}
                className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[350px]"
              >
                {chatHistory.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 p-4">
                    <Bot className="h-12 w-12 mb-4 text-blue-500" />
                    <h3 className="text-lg font-medium mb-2">AI Construction Assistant</h3>
                    <p className="text-sm">
                      Ask me anything about your construction projects, resource optimization, or scheduling.
                    </p>
                  </div>
                ) : (
                  chatHistory.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user" 
                            ? "bg-blue-600 text-white" 
                            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))
                )}
                
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask anything..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={chatLoading || !chatInput.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {chatLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 