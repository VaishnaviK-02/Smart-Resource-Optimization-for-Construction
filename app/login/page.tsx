"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2, HardHat, Clock, BarChart3 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { signInWithGoogle, signInWithEmail } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      // Validate role selection
      if (!role) {
        toast.error('Please select your role')
        setIsLoading(false)
        return
      }
      
      // In a real app, you would pass the role to your auth function
      // Here we're just logging it for demonstration
      console.log(`Signing in with role: ${role}`)
      await signInWithEmail(email, password)
      
      router.push('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Failed to sign in. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      // Validate role selection
      if (!role) {
        toast.error('Please select your role')
        setIsLoading(false)
        return
      }
      
      // In a real app, you would pass the role to your auth function
      // Here we're just logging it for demonstration
      console.log(`Signing in with Google as role: ${role}`)
      await signInWithGoogle()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to sign in with Google. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - animated background */}
      <motion.div
        className="hidden lg:block lg:w-1/2 relative overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        ></motion.div>
        <motion.div 
          className="absolute inset-0 bg-black/50 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        ></motion.div>
        <motion.div 
          className="absolute inset-0 w-full h-full bg-cover bg-center z-[5]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop')"
          }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        ></motion.div>
        <div className="absolute inset-0 z-20 flex items-center justify-center p-12">
          <div className="text-white max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.h1 
                className="text-4xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >Welcome to CODE_BRIGADE</motion.h1>
              <motion.p 
                className="text-xl mb-8 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >Smart resource optimization for efficient construction management</motion.p>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                >
                  <div className="bg-blue-500/20 p-2 rounded-full">
                    <HardHat className="h-5 w-5 text-blue-400" />
                  </div>
                  <p className="text-white">AI-powered resource allocation</p>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                >
                  <div className="bg-blue-500/20 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-blue-400" />
                  </div>
                  <p className="text-white">Reduce project costs by up to ₹50 lakhs</p>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                >
                  <div className="bg-blue-500/20 p-2 rounded-full">
                    <BarChart3 className="h-5 w-5 text-blue-400" />
                  </div>
                  <p className="text-white">Real-time analytics dashboard</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Right side - login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 bg-gray-50 dark:bg-black">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card className="bg-white dark:bg-black border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Login</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEmailSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-900 dark:text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-gray-900 dark:text-white">Role</Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger id="role" className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="manager">Project Manager</SelectItem>
                        <SelectItem value="engineer">Engineer</SelectItem>
                        <SelectItem value="worker">Site Worker</SelectItem>
                        <SelectItem value="client">Client</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-gray-900 dark:text-white">Password</Label>
                      <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" className="border-gray-300 dark:border-gray-700" />
                    <Label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400">Remember me</Label>
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300 dark:border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-black px-2 text-gray-600 dark:text-gray-400">Or continue with</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800" onClick={handleGoogleSignIn} disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                  )}
                  Google
                </Button>
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

