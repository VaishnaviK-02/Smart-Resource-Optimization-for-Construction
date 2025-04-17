"use client"

import Link from "next/link"
import { ArrowRight, BarChart3, Calendar, Database, LineChart, Layers, Zap, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="absolute inset-0 w-full h-full">
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10"></div>
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/15 via-transparent to-transparent z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
          ></motion.div>
          
          {/* Main video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover scale-[1.02] z-[1]"
            style={{
              filter: "brightness(0.90) contrast(1.2) saturate(1.3)",
              transform: "scale(1.02)",
              transition: "transform 0.3s ease-out"
            }}
            onLoadedMetadata={(e) => {
              const video = e.target as HTMLVideoElement;
              video.playbackRate = 0.65;
            }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>

          {/* Overlay pattern for better text readability */}
          <div 
            className="absolute inset-0 z-[15] opacity-30"
            style={{
              backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.3) 100%),
                               linear-gradient(to bottom left, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)`,
              mixBlendMode: "multiply"
            }}
          ></div>
        </div>

        <div className="container relative z-20 px-6 md:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-16 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <motion.h1
                  className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Smart Resource Optimization for Construction
                </motion.h1>
                <motion.p
                  className="max-w-[600px] text-gray-200 md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  AI-powered solutions to optimize resource allocation, reduce delays, and lower costs in construction
                  projects.
                </motion.p>
              </div>
              <motion.div
                className="flex flex-col gap-2 min-[400px]:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href="/login">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative w-full max-w-[500px] aspect-video overflow-hidden rounded-xl border border-gray-200/20 bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-1 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg"></div>
                <img
                  alt="Dashboard Preview"
                  className="w-full h-full object-cover rounded-lg"
                  src="/image.png"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-28 lg:py-36 bg-white">
        <div className="container px-6 md:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Optimize Every Aspect of Your Construction Project
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our AI-powered platform provides comprehensive solutions for efficient resource management in
                construction.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <Database className="h-6 w-6 text-blue-600 mb-2" />
                  <CardTitle>Data Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Collect and process historical project data and real-time inputs for accurate resource planning.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <LineChart className="h-6 w-6 text-blue-600 mb-2" />
                  <CardTitle>Prediction Model</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    AI models forecast resource needs and potential delays, factoring in carbon emissions per resource
                    type.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <Zap className="h-6 w-6 text-blue-600 mb-2" />
                  <CardTitle>Optimization Engine</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Generate dynamic schedules and resource plans, adjusting quantities and timing to minimize costs.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <BarChart3 className="h-6 w-6 text-blue-600 mb-2" />
                  <CardTitle>Interactive Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Visualize timelines, resource distributions, risk alerts, and carbon impact metrics in real-time.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <Calendar className="h-6 w-6 text-blue-600 mb-2" />
                  <CardTitle>Seasonal Forecasting</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Enhanced forecasting models incorporating seasonal trends and supply chain lead times.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <Layers className="h-6 w-6 text-blue-600 mb-2" />
                  <CardTitle>Carbon Footprint Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Track and optimize your project's environmental impact with detailed carbon metrics.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-28 lg:py-36 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container px-6 md:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Ready to Optimize Your Construction Projects?
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join CODE_BRIGADE today and transform how you manage resources in your construction projects.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-blue-600 text-white hover:bg-blue-700 border-blue-500">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-16 md:py-28 lg:py-36 bg-white" id="contact">
        <div className="container px-6 md:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">Contact Us</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have questions? Our team is here to help you transform your construction project management.
              </p>
            </motion.div>
          </div>
          
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                  </motion.div>
                  <CardTitle>Call Us</CardTitle>
                  <CardDescription className="mt-2">
                    <a href="tel:+1234567890" className="text-blue-600 hover:text-blue-800">
                      +91-6366567890
                    </a>
                    <br />
                    Monday - Friday, 9am - 6pm IST
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                  </motion.div>
                  <CardTitle>Email Us</CardTitle>
                  <CardDescription className="mt-2">
                    <a href="mailto:contact@codebrigade.com" className="text-blue-600 hover:text-blue-800">
                      contact@codebrigade.com
                    </a>
                    <br />
                    We'll respond within 24 hours
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                  </motion.div>
                  <CardTitle>Visit Us</CardTitle>
                  <CardDescription className="mt-2">
                    CIT_NC<br />
                    Tech BANGALORE, 560001<br />
                    INDIA
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-slate-900">
        <div className="container px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white">CODE_BRIGADE</h4>
              <p className="text-sm text-white">
                Smart resource optimization for efficient construction management.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-white hover:text-blue-400">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-white hover:text-blue-400">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white hover:text-blue-400">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/blog" className="text-white hover:text-blue-400">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/documentation" className="text-white hover:text-blue-400">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-white hover:text-blue-400">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-white hover:text-blue-400">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-white hover:text-blue-400">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-white hover:text-blue-400">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
            <p className="text-white">© 2025 CODE_BRIGADE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

