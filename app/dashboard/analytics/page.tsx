"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  BarChart,
  Calendar,
  Download,
  Filter,
  LineChart,
  TrendingDown,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Box,
  CloudRain,
  AlertTriangle,
  ArrowLeft,
  Mail,
  Phone,
  FileText,
  Bot,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { format } from "date-fns"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Link from "next/link"
import { toast } from "sonner"

// Mock data for analytics
const resourceUsageData = [
  { month: "Jan", concrete: 400000, steel: 240000, timber: 180000, labor: 320000, equipment: 280000 },
  { month: "Feb", concrete: 420000, steel: 220000, timber: 160000, labor: 340000, equipment: 260000 },
  { month: "Mar", concrete: 380000, steel: 250000, timber: 190000, labor: 310000, equipment: 290000 },
  { month: "Apr", concrete: 410000, steel: 230000, timber: 170000, labor: 330000, equipment: 270000 },
  { month: "May", concrete: 390000, steel: 260000, timber: 200000, labor: 300000, equipment: 300000 },
  { month: "Jun", concrete: 430000, steel: 270000, timber: 210000, labor: 350000, equipment: 310000 },
]

const budgetPerformanceData = [
  { month: "Jan", planned: 10000000, actual: 9800000 },
  { month: "Feb", planned: 22000000, actual: 21500000 },
  { month: "Mar", planned: 35000000, actual: 37000000 },
  { month: "Apr", planned: 47000000, actual: 49000000 },
  { month: "May", planned: 58000000, actual: 61000000 },
  { month: "Jun", planned: 70000000, actual: 72000000 },
]

const carbonEmissionsData = [
  { month: "Jan", emissions: 120, target: 130 },
  { month: "Feb", emissions: 115, target: 125 },
  { month: "Mar", emissions: 130, target: 120 },
  { month: "Apr", emissions: 110, target: 115 },
  { month: "May", emissions: 105, target: 110 },
  { month: "Jun", emissions: 100, target: 105 },
]

const resourceDistributionData = [
  { name: "Concrete", value: 35 },
  { name: "Steel", value: 25 },
  { name: "Timber", value: 15 },
  { name: "Labor", value: 15 },
  { name: "Equipment", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

// Add new mock data for AI predictions
const workerShortageData = [
  { month: "Jan", required: 120, available: 100, shortage: 20 },
  { month: "Feb", required: 130, available: 110, shortage: 20 },
  { month: "Mar", required: 140, available: 115, shortage: 25 },
  { month: "Apr", required: 150, available: 120, shortage: 30 },
  { month: "May", required: 160, available: 130, shortage: 30 },
  { month: "Jun", required: 170, available: 140, shortage: 30 },
]

const resourceShortageData = [
  { resource: "Concrete", current: 4500, required: 5000, shortage: 500 },
  { resource: "Steel", current: 2800, required: 3000, shortage: 200 },
  { resource: "Timber", current: 1500, required: 1800, shortage: 300 },
  { resource: "Equipment", current: 45, required: 50, shortage: 5 },
]

const weatherImpactData = [
  { date: "2024-01-15", temperature: 28, rainfall: 0, impact: "Low" },
  { date: "2024-01-16", temperature: 30, rainfall: 0, impact: "Low" },
  { date: "2024-01-17", temperature: 25, rainfall: 20, impact: "Medium" },
  { date: "2024-01-18", temperature: 22, rainfall: 35, impact: "High" },
  { date: "2024-01-19", temperature: 20, rainfall: 15, impact: "Medium" },
]

const riskAssessmentData = [
  { project: "Office Tower", workerRisk: "Medium", resourceRisk: "Low", weatherRisk: "High" },
  { project: "Residential Complex", workerRisk: "High", resourceRisk: "Medium", weatherRisk: "Medium" },
  { project: "Highway Extension", workerRisk: "Low", resourceRisk: "High", weatherRisk: "Low" },
]

// Add new interfaces for project-specific data
interface ProjectPredictionData {
  current: {
    required: number
    available: number
    shortage: number
  }
  prediction: {
    nextMonth: number
    trend: "increasing" | "decreasing" | "stable"
  }
  criticalRoles: string[]
}

interface ProjectResourceData {
  [key: string]: {
    current: number
    required: number
    shortage: number
  }
}

interface WeatherData {
  date: string
  temperature: number
  rainfall: number
  impact: "High" | "Medium" | "Low"
  affectedActivities?: string[]
}

// Add new mock data for project-specific predictions
const projectWorkerShortageData: Record<string, ProjectPredictionData> = {
  "Office Tower": {
    current: { required: 150, available: 120, shortage: 30 },
    prediction: { nextMonth: 35, trend: "increasing" },
    criticalRoles: ["Electricians", "Plumbers", "Carpenters"]
  },
  "Residential Complex": {
    current: { required: 200, available: 180, shortage: 20 },
    prediction: { nextMonth: 25, trend: "stable" },
    criticalRoles: ["Masons", "Painters", "Electricians"]
  },
  "Highway Extension": {
    current: { required: 300, available: 250, shortage: 50 },
    prediction: { nextMonth: 60, trend: "increasing" },
    criticalRoles: ["Heavy Equipment Operators", "Surveyors", "Engineers"]
  }
}

const projectResourceShortageData: Record<string, ProjectResourceData> = {
  "Office Tower": {
    "Concrete": { current: 4500, required: 5000, shortage: 500 },
    "Steel": { current: 2800, required: 3000, shortage: 200 },
    "Timber": { current: 1500, required: 1800, shortage: 300 },
    "Equipment": { current: 45, required: 50, shortage: 5 }
  },
  "Residential Complex": {
    "Concrete": { current: 6000, required: 6500, shortage: 500 },
    "Steel": { current: 3500, required: 4000, shortage: 500 },
    "Timber": { current: 2000, required: 2200, shortage: 200 },
    "Equipment": { current: 60, required: 65, shortage: 5 }
  },
  "Highway Extension": {
    "Concrete": { current: 8000, required: 8500, shortage: 500 },
    "Steel": { current: 4500, required: 5000, shortage: 500 },
    "Timber": { current: 2500, required: 2800, shortage: 300 },
    "Equipment": { current: 80, required: 85, shortage: 5 }
  }
}

const projectWeatherImpactData: Record<string, WeatherData[]> = {
  "Office Tower": [
    { date: "2024-01-15", temperature: 28, rainfall: 0, impact: "Low", affectedActivities: ["Foundation Work", "Steel Erection"] },
    { date: "2024-01-16", temperature: 30, rainfall: 0, impact: "Low", affectedActivities: ["Concrete Pouring", "Steel Erection"] },
    { date: "2024-01-17", temperature: 25, rainfall: 20, impact: "Medium", affectedActivities: ["Exterior Work", "Landscaping"] }
  ],
  "Residential Complex": [
    { date: "2024-01-15", temperature: 28, rainfall: 0, impact: "Low", affectedActivities: ["Foundation Work", "Steel Erection"] },
    { date: "2024-01-16", temperature: 30, rainfall: 0, impact: "Low", affectedActivities: ["Concrete Pouring", "Steel Erection"] },
    { date: "2024-01-17", temperature: 25, rainfall: 20, impact: "Medium", affectedActivities: ["Exterior Work", "Landscaping"] }
  ],
  "Highway Extension": [
    { date: "2024-01-15", temperature: 28, rainfall: 0, impact: "Low", affectedActivities: ["Earthwork", "Paving"] },
    { date: "2024-01-16", temperature: 30, rainfall: 0, impact: "Low", affectedActivities: ["Earthwork", "Paving"] },
    { date: "2024-01-17", temperature: 25, rainfall: 20, impact: "High", affectedActivities: ["Earthwork", "Paving", "Drainage"] }
  ]
}

// Add alert system interface and mock data
interface Alert {
  id: string
  type: "worker" | "resource" | "weather" | "risk"
  severity: "high" | "medium" | "low"
  message: string
  project: string
  timestamp: string
  status: "active" | "resolved"
  actionRequired: boolean
  to: string
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "worker",
    severity: "high",
    message: "Critical shortage of electricians in Office Tower project",
    project: "Office Tower",
    timestamp: "2024-01-15T10:00:00Z",
    status: "active",
    actionRequired: true,
    to: "jaishi120@gmail.com"
  },
  {
    id: "2",
    type: "resource",
    severity: "medium",
    message: "Concrete supply running low in Residential Complex",
    project: "Residential Complex",
    timestamp: "2024-01-15T11:30:00Z",
    status: "active",
    actionRequired: true,
    to: "jaishi120@gmail.com"
  },
  {
    id: "3",
    type: "weather",
    severity: "high",
    message: "Heavy rainfall predicted for Highway Extension project",
    project: "Highway Extension",
    timestamp: "2024-01-15T12:00:00Z",
    status: "active",
    actionRequired: true,
    to: "jaishi120@gmail.com"
  }
]

// Create a reusable email sending function for all components
const sendEmailAlert = async (recipient: string, subject: string, message: string, entity: string) => {
  try {
    console.log("Sending email alert to:", recipient);
    
    // In a production app, you would connect to an email service API here
    // Simulate API call delay and success
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Show success notification
    toast.success(`Alert sent to ${recipient}`, {
      description: `${entity} has been notified about the issue.`
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    toast.error("Failed to send email. Please try again.", {
      description: "There was an issue contacting the email service."
    });
  }
};

// Update the AlertSystem component with proper email functionality
const AlertSystem = ({ alerts }: { alerts: Alert[] }) => {
  const handleSendEmail = async (alert: Alert) => {
    const message = `
      Priority: ${alert.severity.toUpperCase()}
      Project: ${alert.project}
      Issue: ${alert.message}
      Time: ${format(new Date(alert.timestamp), "MMM dd, yyyy HH:mm")}
      Status: ${alert.status}
      Action Required: ${alert.actionRequired ? "Yes" : "No"}
      
      This is an automated alert from the Construction Resource Management System.
      Please take necessary action as required.
      
      Contact Project Supervisor: +916366250838
    `;
    
    await sendEmailAlert(
      "jaishi120@gmail.com", 
      `URGENT ALERT: ${alert.type.toUpperCase()} - ${alert.project}`, 
      message, 
      "Supervisor"
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Active Alerts</h3>
      <div className="space-y-2">
        {alerts.map((alert) => (
          <Card key={alert.id} className={`border-l-4 ${
            alert.severity === "high" ? "border-l-red-600" :
            alert.severity === "medium" ? "border-l-amber-600" :
            "border-l-blue-600"
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      alert.severity === "high" ? "destructive" :
                      alert.severity === "medium" ? "default" :
                      "secondary"
                    }>
                      {alert.type.toUpperCase()}
                    </Badge>
                    <span className="font-medium">{alert.project}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(new Date(alert.timestamp), "MMM dd, yyyy HH:mm")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Contact Options
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleSendEmail(alert)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Email Supervisor
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => window.location.href = 'tel:+916366250838'}>
                        <Phone className="mr-2 h-4 w-4" />
                        Call Supervisor
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {alert.actionRequired && (
                    <Badge variant="destructive">Action Required</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Update the handleContactSupervisor function with the correct phone number
const handleContactSupervisor = (project: string, method: 'email' | 'phone') => {
  if (method === 'email') {
    window.location.href = 'mailto:jaishi120@gmail.com';
    toast.success(`Opening email client to contact supervisor for ${project}`);
  } else {
    window.location.href = 'tel:+916366250838';
    toast.success(`Calling supervisor for ${project}`);
  }
};

// Update type definitions
type ResourceData = {
  current: number;
  required: number;
  shortage: number;
}

type ProjectResourceData = {
  [key: string]: ResourceData;
}

type WeatherData = {
  date: string;
  temperature: number;
  rainfall: number;
  impact: string;
  affectedActivities?: string[];
}

type ProjectWeatherData = {
  [key: string]: WeatherData[];
}

type ResourceShortageItem = {
  resource: string;
  current: number;
  required: number;
  shortage: number;
}

// Add new interfaces for detailed tracking
interface WorkerDelay {
  project: string
  date: string
  category: string
  impact: "High" | "Medium" | "Low"
  duration: number
  reason: string
  affectedTasks: string[]
  mitigationStatus: string
}

// Add mock data for detailed tracking
const workerDelays: WorkerDelay[] = [
  {
    project: "Office Tower",
    date: "2024-01-15",
    category: "Skilled Labor",
    impact: "High",
    duration: 48,
    reason: "Shortage of certified welders",
    affectedTasks: ["Steel beam installation", "Structural connections"],
    mitigationStatus: "Recruiting additional welders from neighboring states"
  },
  {
    project: "Residential Complex",
    date: "2024-01-16",
    category: "General Labor",
    impact: "Medium",
    duration: 24,
    reason: "Unexpected worker absence",
    affectedTasks: ["Concrete pouring", "Site preparation"],
    mitigationStatus: "Reallocating workers from non-critical tasks"
  },
  {
    project: "Highway Extension",
    date: "2024-01-17",
    category: "Equipment Operators",
    impact: "High",
    duration: 72,
    reason: "Equipment operator certification delays",
    affectedTasks: ["Heavy machinery operation", "Earthwork"],
    mitigationStatus: "Fast-tracking certification process"
  }
]

// Add resource delays interface and mock data
interface ResourceDelay {
  project: string
  date: string
  resource: string
  impact: "High" | "Medium" | "Low"
  duration: number
  reason: string
  affectedAreas: string[]
  mitigationPlan: string
}

const resourceDelays: ResourceDelay[] = [
  {
    project: "Office Tower",
    date: "2024-01-15",
    resource: "Concrete",
    impact: "High",
    duration: 72,
    reason: "Supply chain disruption due to manufacturing plant maintenance",
    affectedAreas: ["Foundation work", "Column construction", "Floor slabs"],
    mitigationPlan: "Sourcing alternative suppliers and adjusting construction sequence"
  },
  {
    project: "Residential Complex",
    date: "2024-01-16",
    resource: "Steel",
    impact: "Medium",
    duration: 48,
    reason: "Transportation delay due to regional logistics issues",
    affectedAreas: ["Structural framework", "Reinforcement bars"],
    mitigationPlan: "Alternative routing and expedited shipping arranged"
  },
  {
    project: "Highway Extension",
    date: "2024-01-17",
    resource: "Heavy Equipment",
    impact: "High",
    duration: 96,
    reason: "Equipment breakdown and delayed replacement parts",
    affectedAreas: ["Earthwork", "Road base preparation", "Drainage installation"],
    mitigationPlan: "Rental of temporary equipment and adjusted work schedule"
  }
]

// Add weather delays interface and mock data
interface WeatherDelay {
  project: string
  date: string
  condition: string
  severity: "High" | "Medium" | "Low"
  duration: number
  affectedAreas: string[]
  impact: string
  mitigationPlan: string
}

const weatherDelays: WeatherDelay[] = [
  {
    project: "Office Tower",
    date: "2024-01-15",
    condition: "Heavy Rain",
    severity: "High",
    duration: 48,
    affectedAreas: ["Open excavation", "Concrete work", "External facades"],
    impact: "Foundation work delayed, potential schedule impact of 2 days",
    mitigationPlan: "Installing temporary weather protection, adjusting work sequence"
  },
  {
    project: "Residential Complex",
    date: "2024-01-16",
    condition: "High Winds",
    severity: "Medium",
    duration: 24,
    affectedAreas: ["Crane operations", "External scaffolding"],
    impact: "Crane operations suspended, material lifting delayed",
    mitigationPlan: "Rescheduling non-critical lifts, focusing on ground-level work"
  },
  {
    project: "Highway Extension",
    date: "2024-01-17",
    condition: "Extreme Heat",
    severity: "High",
    duration: 36,
    affectedAreas: ["Asphalt paving", "Concrete work"],
    impact: "Reduced working hours, material setting time affected",
    mitigationPlan: "Night shift implementation, using rapid-setting materials"
  }
]

// Add detailed risk assessment interface and mock data
interface DetailedRiskAssessment {
  project: string
  riskType: "Worker" | "Resource" | "Weather" | "Financial" | "Schedule"
  severity: "High" | "Medium" | "Low"
  probability: "High" | "Medium" | "Low"
  impact: string
  description: string
  mitigationPlan: string
  contingencyPlan: string
  owner: string
}

const detailedRiskAssessments: DetailedRiskAssessment[] = [
  {
    project: "Office Tower",
    riskType: "Worker",
    severity: "High",
    probability: "Medium",
    impact: "Critical delay in structural work, potential cost overrun of 8%",
    description: "Shortage of certified welders for high-rise structural connections",
    mitigationPlan: "Early recruitment, premium pay rates, training program acceleration",
    contingencyPlan: "Partnerships with third-party contractors, adjusted sequencing of work",
    owner: "HR Manager"
  },
  {
    project: "Office Tower",
    riskType: "Weather",
    severity: "High",
    probability: "High",
    impact: "Foundation work delays, potential 2-week schedule impact",
    description: "Monsoon season expected to cause heavy rainfall during excavation phase",
    mitigationPlan: "Weather protection systems, drainage improvements, schedule adjustments",
    contingencyPlan: "24/7 operations during dry periods, additional water pumping equipment",
    owner: "Site Manager"
  },
  {
    project: "Residential Complex",
    riskType: "Resource",
    severity: "Medium",
    probability: "Medium",
    impact: "Potential 10-day delay in exterior cladding installation",
    description: "Supply chain disruption for specialized facade materials",
    mitigationPlan: "Early procurement, alternative supplier identification, buffer stock",
    contingencyPlan: "Temporary alternatives, phased completion strategy",
    owner: "Procurement Manager"
  },
  {
    project: "Highway Extension",
    riskType: "Financial",
    severity: "High",
    probability: "Medium",
    impact: "Potential 15% cost overrun on overall project budget",
    description: "Unexpected soil conditions requiring additional treatment and stabilization",
    mitigationPlan: "Comprehensive geotechnical survey, value engineering, budget reallocation",
    contingencyPlan: "Phased execution with performance-based funding, scope adjustments",
    owner: "Project Director"
  },
  {
    project: "Highway Extension",
    riskType: "Schedule",
    severity: "Medium",
    probability: "High",
    impact: "2-month delay in project completion",
    description: "Utility relocation complications with multiple service providers",
    mitigationPlan: "Early coordination, comprehensive survey, dedicated utility liaison",
    contingencyPlan: "Night work, weekend shifts, parallel work streams",
    owner: "Planning Manager"
  }
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("1m")
  const [projectFilter, setProjectFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState("")
  const [weatherData, setWeatherData] = useState<any>(null)
  const [weatherLoading, setWeatherLoading] = useState(false)
  const [weatherError, setWeatherError] = useState<string | null>(null)
  const [placeName, setPlaceName] = useState("")
  const API_KEY = "27716b5ecb1ca2b464ded800b055eacb"
  const [selectedProjectWeather, setSelectedProjectWeather] = useState<string | null>(null)

  const fetchWeatherData = async (place: string) => {
    setWeatherLoading(true)
    setWeatherError(null)
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API_KEY}&units=metric`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data')
      }
      
      const data = await response.json()
      setWeatherData(data)
      
      // Update project weather impact data
      if (selectedProject) {
        const projectData = projectWeatherImpactData[selectedProject]
        if (projectData) {
          // Calculate weather impact based on current conditions
          const impact = calculateWeatherImpact(data)
          projectData.weatherData.push({
            date: new Date().toISOString(),
            temperature: data.main.temp,
            rainfall: data.rain?.['1h'] || 0,
            impact: impact,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            description: data.weather[0].description
          })
          
          // Keep only last 7 days of data
          if (projectData.weatherData.length > 7) {
            projectData.weatherData.shift()
          }
        }
      }
    } catch (error) {
      setWeatherError(error instanceof Error ? error.message : 'Failed to fetch weather data')
    } finally {
      setWeatherLoading(false)
    }
  }

  const calculateWeatherImpact = (weatherData: any): string => {
    const temp = weatherData.main.temp
    const humidity = weatherData.main.humidity
    const windSpeed = weatherData.wind.speed
    const rain = weatherData.rain?.['1h'] || 0

    let impactScore = 0

    // Temperature impact (ideal range: 15-25°C)
    if (temp < 5 || temp > 35) impactScore += 3
    else if (temp < 10 || temp > 30) impactScore += 2
    else if (temp < 15 || temp > 25) impactScore += 1

    // Humidity impact (ideal range: 40-60%)
    if (humidity < 20 || humidity > 80) impactScore += 2
    else if (humidity < 30 || humidity > 70) impactScore += 1

    // Wind impact (threshold: 10 m/s)
    if (windSpeed > 15) impactScore += 3
    else if (windSpeed > 10) impactScore += 2
    else if (windSpeed > 5) impactScore += 1

    // Rain impact
    if (rain > 10) impactScore += 3
    else if (rain > 5) impactScore += 2
    else if (rain > 0) impactScore += 1

    // Determine impact level
    if (impactScore >= 7) return "High"
    if (impactScore >= 4) return "Medium"
    return "Low"
  }

  const handleOptimize = async () => {
    setLoading(true)
    try {
      console.log("Sending optimization request...")
      const response = await fetch("http://127.0.0.1:5000/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project: currentProject || "all",
          timeRange: timeRange
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log("Received optimization response:", data)
      
      // Check if data has a response property, otherwise use the entire data object
      if (data.response) {
        setOutput(data.response)
      } else {
        // If the server doesn't return a response property, use the entire data object
        setOutput(JSON.stringify(data, null, 2))
      }
      
      toast.success("Optimization completed successfully")
    } catch (error: any) {
      console.error("Optimization error:", error)
      toast.error(`Failed to get optimization data: ${error.message || "Unknown error"}`)
      setOutput("Error: Unable to fetch optimization data. Please check if the backend server is running and properly configured.")
    } finally {
      setLoading(false)
    }
  }

  // Get current project data based on filter
  const getCurrentProjectData = () => {
    if (projectFilter === "all") return null
    const projectName = projectFilter === "office" ? "Office Tower" :
                       projectFilter === "residential" ? "Residential Complex" :
                       projectFilter === "highway" ? "Highway Extension" : null
    return projectName
  }

  const currentProject = getCurrentProjectData()

  const handleExportAnalytics = () => {
    // Prepare the analytics data
    const exportData = {
      resourceUsage: resourceUsageData,
      budgetPerformance: budgetPerformanceData,
      timeRange,
      projectFilter,
      exportedAt: new Date().toISOString()
    };

    // Convert to CSV format
    const csvContent = [
      // Headers
      ['Month', 'Concrete', 'Steel', 'Timber', 'Labor', 'Equipment', 'Planned Budget', 'Actual Budget'].join(','),
      // Data rows
      ...resourceUsageData.map(row => {
        const budgetRow = budgetPerformanceData.find(b => b.month === row.month) || { planned: 0, actual: 0 };
        return [
          row.month,
          row.concrete,
          row.steel,
          row.timber,
          row.labor,
          row.equipment,
          budgetRow.planned,
          budgetRow.actual
        ].join(',');
      })
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-export-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Analytics</h2>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  {timeRange === "1m"
                    ? "Last Month"
                    : timeRange === "3m"
                      ? "Last 3 Months"
                      : timeRange === "6m"
                        ? "Last 6 Months"
                        : "Last Year"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Time Range</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTimeRange("1m")}>Last Month</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange("3m")}>Last 3 Months</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange("6m")}>Last 6 Months</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange("1y")}>Last Year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  {projectFilter === "all"
                    ? "All Projects"
                    : projectFilter === "office"
                      ? "Office Tower"
                      : projectFilter === "residential"
                        ? "Residential Complex"
                        : projectFilter === "highway"
                          ? "Highway Extension"
                          : projectFilter === "bangalore"
                            ? "Bangalore Tech Park"
                            : projectFilter === "hyderabad"
                              ? "Hyderabad Metro"
                              : projectFilter === "pune"
                                ? "Pune Smart City"
                                : projectFilter === "mumbai"
                                  ? "Mumbai Waterfront"
                                  : "Shopping Mall"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter Projects</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setProjectFilter("all")}>All Projects</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setProjectFilter("office")}>Office Tower</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setProjectFilter("residential")}>Residential Complex</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setProjectFilter("highway")}>Highway Extension</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setProjectFilter("bangalore")}>Bangalore Tech Park</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setProjectFilter("hyderabad")}>Hyderabad Metro</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setProjectFilter("pune")}>Pune Smart City</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setProjectFilter("mumbai")}>Mumbai Waterfront</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setProjectFilter("mall")}>Shopping Mall</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" onClick={handleExportAnalytics}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {currentProject ? `${currentProject} - AI Prediction and Alert System` : "AI Prediction and Alert System"}
          </h2>
          <p className="text-muted-foreground">
            {currentProject 
              ? `Real-time monitoring and predictive analytics for ${currentProject}`
              : "Real-time monitoring and predictive analytics for all projects"}
          </p>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-card border">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="workers">Workers</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="weather">Weather</TabsTrigger>
              <TabsTrigger value="risks">Risks</TabsTrigger>
              <TabsTrigger value="api-data">API Data</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-foreground">Total Budget</CardTitle>
                      <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">₹216 Cr</div>
                      <div className="flex items-center mt-1">
                        <Badge className="bg-green-500 text-white">
                          <ArrowUpRight className="mr-1 h-3 w-3" />
                          +2.5%
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-2">from last month</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-foreground">Resource Efficiency</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">78.3%</div>
                      <div className="flex items-center mt-1">
                        <Badge className="bg-green-500 text-white">
                          <ArrowUpRight className="mr-1 h-3 w-3" />
                          +4.2%
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-2">from last quarter</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-foreground">Schedule Variance</CardTitle>
                      <LineChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">-3.2%</div>
                      <div className="flex items-center mt-1">
                        <Badge className="bg-amber-500 text-white">
                          <ArrowDownRight className="mr-1 h-3 w-3" />
                          +1.5%
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-2">from last month</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-foreground">Carbon Reduction</CardTitle>
                      <TrendingDown className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">18.7%</div>
                      <div className="flex items-center mt-1">
                        <Badge className="bg-green-500 text-white">
                          <ArrowUpRight className="mr-1 h-3 w-3" />
                          +2.1%
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-2">from baseline</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Main Charts */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
                {/* Resource Usage Trends */}
                <motion.div className="col-span-full lg:col-span-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Resource Usage Trends</CardTitle>
                      <CardDescription>Monthly resource consumption across all projects</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsLineChart data={resourceUsageData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="concrete" stroke="#0088FE" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="steel" stroke="#00C49F" />
                            <Line type="monotone" dataKey="timber" stroke="#FFBB28" />
                            <Line type="monotone" dataKey="labor" stroke="#FF8042" />
                            <Line type="monotone" dataKey="equipment" stroke="#8884d8" />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Resource Distribution */}
                <motion.div
                  className="col-span-full lg:col-span-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Resource Distribution</CardTitle>
                      <CardDescription>Percentage breakdown of resource allocation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={resourceDistributionData}
                              cx="50%"
                              cy="50%"
                              labelLine={true}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={120}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {resourceDistributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Budget Performance */}
                <motion.div
                  className="col-span-full lg:col-span-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Budget Performance</CardTitle>
                      <CardDescription>Planned vs. actual budget expenditure</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={budgetPerformanceData}
                            margin={{
                              top: 10,
                              right: 30,
                              left: 0,
                              bottom: 0,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="planned" stackId="1" stroke="#8884d8" fill="#8884d8" />
                            <Area type="monotone" dataKey="actual" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Carbon Emissions */}
                <motion.div
                  className="col-span-full lg:col-span-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Carbon Emissions</CardTitle>
                      <CardDescription>Actual vs. target carbon emissions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart
                            data={carbonEmissionsData}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="emissions" fill="#FF8042" name="Actual Emissions" />
                            <Bar dataKey="target" fill="#00C49F" name="Target Emissions" />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Active Alerts */}
              <AlertSystem alerts={alerts} />
            </TabsContent>

            <TabsContent value="workers">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Worker Shortage Analysis</CardTitle>
                    <CardDescription>Real-time tracking of labor delays and shortages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={currentProject ? 
                          (projectWorkerShortageData[currentProject] && projectWorkerShortageData[currentProject].current 
                            ? [projectWorkerShortageData[currentProject].current]
                            : workerShortageData
                          ) : workerShortageData} 
                          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="required" stroke="#6366f1" name="Required Workers" />
                          <Line type="monotone" dataKey="available" stroke="#10b981" name="Available Workers" />
                          <Line type="monotone" dataKey="shortage" stroke="#ef4444" name="Shortage" />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Active Labor Delays</CardTitle>
                    <CardDescription>Current labor-related delays and mitigation status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(currentProject 
                        ? workerDelays.filter(delay => delay.project === currentProject)
                        : workerDelays).map((delay, index) => (
                        <div key={index} className="p-4 rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{delay.project}</h4>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(delay.date), "MMM dd, yyyy")}
                              </p>
                            </div>
                            <Badge variant={
                              delay.impact === "High" ? "destructive" :
                              delay.impact === "Medium" ? "default" :
                              "secondary"
                            }>
                              {delay.impact} Impact
                            </Badge>
                          </div>
                          <div className="grid gap-2">
                            <div>
                              <span className="text-sm font-medium">Category:</span>
                              <span className="text-sm ml-2">{delay.category}</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium">Duration:</span>
                              <span className="text-sm ml-2">{delay.duration} hours</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium">Reason:</span>
                              <span className="text-sm ml-2">{delay.reason}</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium">Affected Tasks:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {delay.affectedTasks.map((task, i) => (
                                  <Badge key={i} variant="outline">{task}</Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium">Mitigation Status:</span>
                              <span className="text-sm ml-2">{delay.mitigationStatus}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    Contact Supervisor
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => {
                                    const message = `
                                      Project: ${delay.project}
                                      Issue: Worker shortage - ${delay.category}
                                      Impact: ${delay.impact}
                                      Reason: ${delay.reason}
                                      Affected Tasks: ${delay.affectedTasks.join(', ')}
                                      
                                      This is an automated notification from the Construction Resource Management System.
                                      Please take necessary action as required.
                                    `;
                                    sendEmailAlert("jaishi120@gmail.com", `ALERT: Worker Shortage - ${delay.project}`, message, "Supervisor");
                                  }}>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Email Supervisor
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => {
                                    window.location.href = 'tel:+916366250838';
                                    toast.success(`Calling supervisor for ${delay.project}`);
                                  }}>
                                    <Phone className="mr-2 h-4 w-4" />
                                    Call Supervisor
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Allocation Analysis</CardTitle>
                  <CardDescription>Current resource distribution and shortage analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={resourceDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {resourceDistributionData.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"][index % 5]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-base font-medium">Resource Availability</h3>
                      {Object.entries(currentProject ? projectResourceShortageData[currentProject] : resourceShortageData).map(([resource, data]: [string, any]) => (
                        <div key={resource} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{resource}</span>
                            <span className="text-sm text-muted-foreground">
                              {data.current}/{data.required}
                            </span>
                          </div>
                          <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${(data.current / data.required) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Active Resource Delays</CardTitle>
                  <CardDescription>Current resource-related delays and mitigation status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(currentProject 
                      ? resourceDelays.filter(delay => delay.project === currentProject)
                      : resourceDelays).map((delay, index) => (
                      <div key={index} className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{delay.project}</h4>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(delay.date), "MMM dd, yyyy")}
                            </p>
                          </div>
                          <Badge variant={
                            delay.impact === "High" ? "destructive" :
                            delay.impact === "Medium" ? "default" :
                            "secondary"
                          }>
                            {delay.impact} Impact
                          </Badge>
                        </div>
                        <div className="grid gap-2">
                          <div>
                            <span className="text-sm font-medium">Resource:</span>
                            <span className="text-sm ml-2">{delay.resource}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Duration:</span>
                            <span className="text-sm ml-2">{delay.duration} hours</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Reason:</span>
                            <span className="text-sm ml-2">{delay.reason}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Affected Areas:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {delay.affectedAreas.map((area, i) => (
                                <Badge key={i} variant="outline">{area}</Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Mitigation Plan:</span>
                            <span className="text-sm ml-2">{delay.mitigationPlan}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  Contact Supervisor
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => {
                                  const message = `
                                    Project: ${delay.project}
                                    Resource: ${delay.resource}
                                    Impact: ${delay.impact}
                                    Reason: ${delay.reason}
                                    Affected Areas: ${delay.affectedAreas.join(', ')}
                                    
                                    This is an automated notification from the Construction Resource Management System.
                                    Please take necessary action as required.
                                  `;
                                  sendEmailAlert("jaishi120@gmail.com", `ALERT: Resource Shortage - ${delay.project}`, message, "Supervisor");
                                }}>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Email Supervisor
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                  window.location.href = 'tel:+916366250838';
                                  toast.success(`Calling supervisor for ${delay.project}`);
                                }}>
                                  <Phone className="mr-2 h-4 w-4" />
                                  Call Supervisor
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weather">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Weather Impact Analysis</CardTitle>
                    <CardDescription>
                      {currentProject 
                        ? `Weather conditions and impact assessment for ${currentProject}`
                        : "Overall weather impact assessment"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(currentProject ? projectWeatherImpactData[currentProject] : weatherImpactData).map((day) => (
                        <div key={day.date} className="p-4 rounded-lg border">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{format(new Date(day.date), "MMM dd, yyyy")}</span>
                                <Badge variant={
                                  day.impact === "High" ? "destructive" :
                                  day.impact === "Medium" ? "default" :
                                  "secondary"
                                }>
                                  {day.impact} Impact
                                </Badge>
                              </div>
                              <div className="mt-2 text-sm text-muted-foreground">
                                <span className="mr-4">Temperature: {day.temperature}°C</span>
                                <span>Rainfall: {day.rainfall}mm</span>
                              </div>
                              {day.affectedActivities && (
                                <div className="mt-2 text-sm">
                                  <span className="font-medium">Affected Activities:</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {day.affectedActivities.map((activity) => (
                                      <Badge key={activity} variant="outline">{activity}</Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Active Weather Delays</CardTitle>
                    <CardDescription>Current weather-related delays and mitigation status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(currentProject 
                        ? weatherDelays.filter(delay => delay.project === currentProject)
                        : weatherDelays).map((delay, index) => (
                        <div key={index} className="p-4 rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{delay.project}</h4>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(delay.date), "MMM dd, yyyy")}
                              </p>
                            </div>
                            <Badge variant={
                              delay.severity === "High" ? "destructive" :
                              delay.severity === "Medium" ? "default" :
                              "secondary"
                            }>
                              {delay.severity} Severity
                            </Badge>
                          </div>
                          <div className="grid gap-2">
                            <div>
                              <span className="text-sm font-medium">Weather Condition:</span>
                              <span className="text-sm ml-2">{delay.condition}</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium">Duration:</span>
                              <span className="text-sm ml-2">{delay.duration} hours</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium">Affected Areas:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {delay.affectedAreas.map((area, i) => (
                                  <Badge key={i} variant="outline">{area}</Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium">Impact:</span>
                              <span className="text-sm ml-2">{delay.impact}</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium">Mitigation Plan:</span>
                              <span className="text-sm ml-2">{delay.mitigationPlan}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    Contact Supervisor
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => {
                                    const message = `
                                      Project: ${delay.project}
                                      Weather Condition: ${delay.condition}
                                      Severity: ${delay.severity}
                                      Impact: ${delay.impact}
                                      Affected Areas: ${delay.affectedAreas.join(', ')}
                                      
                                      This is an automated notification from the Construction Resource Management System.
                                      Please take necessary action as required.
                                    `;
                                    sendEmailAlert("jaishi120@gmail.com", `ALERT: Weather Impact - ${delay.project}`, message, "Supervisor");
                                  }}>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Email Supervisor
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => {
                                    window.location.href = 'tel:+916366250838';
                                    toast.success(`Calling supervisor for ${delay.project}`);
                                  }}>
                                    <Phone className="mr-2 h-4 w-4" />
                                    Call Supervisor
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Weather Forecast Integration</CardTitle>
                    <CardDescription>Real-time weather data and project impact analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter place name (e.g., Mumbai, London)"
                          className="flex-1 px-3 py-2 border rounded-md"
                          value={placeName}
                          onChange={(e) => setPlaceName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && placeName.trim()) {
                              fetchWeatherData(placeName.trim())
                            }
                          }}
                        />
                        <Button 
                          onClick={() => {
                            if (placeName.trim()) {
                              fetchWeatherData(placeName.trim())
                            }
                          }}
                          disabled={!placeName.trim() || weatherLoading}
                        >
                          {weatherLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Loading...
                            </>
                          ) : (
                            'Get Weather'
                          )}
                        </Button>
                      </div>

                      {weatherLoading ? (
                        <div className="flex justify-center items-center p-8">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <p className="ml-2 text-muted-foreground">Loading weather data...</p>
                        </div>
                      ) : weatherError ? (
                        <div className="p-4 text-center text-destructive">
                          <p>{weatherError}</p>
                          <Button 
                            variant="outline" 
                            className="mt-4"
                            onClick={() => {
                              if (placeName.trim()) {
                                fetchWeatherData(placeName.trim())
                              }
                            }}
                          >
                            Retry
                          </Button>
                        </div>
                      ) : weatherData ? (
                        <div className="grid gap-4">
                          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                            <CardContent className="p-6">
                              <div className="text-center">
                                <h3 className="text-2xl font-bold mb-2">{weatherData.name}, {weatherData.sys.country}</h3>
                                <div className="flex items-center justify-center gap-2 mb-4">
                                  <img 
                                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                    alt={weatherData.weather[0].description}
                                    className="w-16 h-16"
                                  />
                                  <span className="text-4xl font-bold">{Math.round(weatherData.main.temp)}°C</span>
                                </div>
                                <p className="text-lg capitalize mb-4">{weatherData.weather[0].description}</p>
                                
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="text-center">
                                    <p className="text-sm text-muted-foreground">Humidity</p>
                                    <p className="text-xl font-semibold">{weatherData.main.humidity}%</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-sm text-muted-foreground">Wind Speed</p>
                                    <p className="text-xl font-semibold">{weatherData.wind.speed} m/s</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-sm text-muted-foreground">Feels Like</p>
                                    <p className="text-xl font-semibold">{Math.round(weatherData.main.feels_like)}°C</p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {selectedProject && projectWeatherImpactData[selectedProject] && (
                            <Card>
                              <CardHeader>
                                <CardTitle>Project Weather Impact Analysis</CardTitle>
                                <CardDescription>Weather impact on {selectedProject}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="grid gap-4">
                                  <div className="h-[200px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <LineChart data={projectWeatherImpactData[selectedProject].weatherData}>
                                        <XAxis 
                                          dataKey="date" 
                                          tickFormatter={(date) => format(new Date(date), "MMM dd")}
                                        />
                                        <YAxis yAxisId="left" />
                                        <YAxis yAxisId="right" orientation="right" />
                                        <Tooltip 
                                          content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                              const data = payload[0].payload
                        return (
                                                <div className="bg-background p-4 rounded-lg shadow-lg border">
                                                  <p className="font-medium">{format(new Date(data.date), "MMM dd, yyyy")}</p>
                                                  <p>Temperature: {data.temperature}°C</p>
                                                  <p>Humidity: {data.humidity}%</p>
                                                  <p>Wind Speed: {data.windSpeed} m/s</p>
                                                  <p>Impact: {data.impact}</p>
                                                </div>
                                              )
                                            }
                                            return null
                                          }}
                                        />
                                        <Legend />
                                        <Line
                                          yAxisId="left"
                                          type="monotone"
                                          dataKey="temperature"
                                          stroke="#2563eb"
                                          name="Temperature (°C)"
                                        />
                                        <Line
                                          yAxisId="right"
                                          type="monotone"
                                          dataKey="humidity"
                                          stroke="#16a34a"
                                          name="Humidity (%)"
                                        />
                                      </LineChart>
                                    </ResponsiveContainer>
                                  </div>

                                  <div className="grid grid-cols-3 gap-4">
                                    <Card>
                            <CardContent className="p-4">
                              <div className="text-center">
                                          <p className="text-sm text-muted-foreground">Current Impact</p>
                                          <Badge 
                                            className="mt-2" 
                                            variant={
                                              projectWeatherImpactData[selectedProject].weatherData[projectWeatherImpactData[selectedProject].weatherData.length - 1].impact === "High" ? "destructive" :
                                              projectWeatherImpactData[selectedProject].weatherData[projectWeatherImpactData[selectedProject].weatherData.length - 1].impact === "Medium" ? "default" :
                                              "secondary"
                                            }
                                          >
                                            {projectWeatherImpactData[selectedProject].weatherData[projectWeatherImpactData[selectedProject].weatherData.length - 1].impact}
                                          </Badge>
                              </div>
                            </CardContent>
                          </Card>
                                    <Card>
                                      <CardContent className="p-4">
                                        <div className="text-center">
                                          <p className="text-sm text-muted-foreground">Affected Activities</p>
                                          <p className="text-xl font-semibold">
                                            {projectWeatherImpactData[selectedProject].weatherData[projectWeatherImpactData[selectedProject].weatherData.length - 1].affectedActivities?.length || 0}
                                          </p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardContent className="p-4">
                                        <div className="text-center">
                                          <p className="text-sm text-muted-foreground">Risk Level</p>
                                          <Badge 
                                            className="mt-2" 
                                            variant={
                                              projectWeatherImpactData[selectedProject].weatherData[projectWeatherImpactData[selectedProject].weatherData.length - 1].impact === "High" ? "destructive" :
                                              projectWeatherImpactData[selectedProject].weatherData[projectWeatherImpactData[selectedProject].weatherData.length - 1].impact === "Medium" ? "default" :
                                              "secondary"
                                            }
                                          >
                                            {projectWeatherImpactData[selectedProject].weatherData[projectWeatherImpactData[selectedProject].weatherData.length - 1].impact === "High" ? "Critical" :
                                             projectWeatherImpactData[selectedProject].weatherData[projectWeatherImpactData[selectedProject].weatherData.length - 1].impact === "Medium" ? "Moderate" :
                                             "Low"}
                                          </Badge>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      ) : (
                        <div className="p-4 text-center">
                          <p className="text-muted-foreground mb-4">Enter a place name to view weather data</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="risks">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessment Dashboard</CardTitle>
                  <CardDescription>Comprehensive risk analysis across all projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {(currentProject 
                      ? riskAssessmentData.filter(risk => risk.project === currentProject) 
                      : riskAssessmentData).map((project) => (
                      <div key={project.project} className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold">{project.project}</h4>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Worker Risk</span>
                              <Badge variant={
                                project.workerRisk === "High" ? "destructive" :
                                project.workerRisk === "Medium" ? "default" :
                                "secondary"
                              }>
                                {project.workerRisk}
                              </Badge>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div
                                className={`h-full rounded-full ${
                                  project.workerRisk === "High" ? "bg-red-600" :
                                  project.workerRisk === "Medium" ? "bg-amber-600" :
                                  "bg-emerald-600"
                                }`}
                                style={{
                                  width: project.workerRisk === "High" ? "100%" :
                                         project.workerRisk === "Medium" ? "66%" :
                                         "33%"
                                }}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Resource Risk</span>
                              <Badge variant={
                                project.resourceRisk === "High" ? "destructive" :
                                project.resourceRisk === "Medium" ? "default" :
                                "secondary"
                              }>
                                {project.resourceRisk}
                              </Badge>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div
                                className={`h-full rounded-full ${
                                  project.resourceRisk === "High" ? "bg-red-600" :
                                  project.resourceRisk === "Medium" ? "bg-amber-600" :
                                  "bg-emerald-600"
                                }`}
                                style={{
                                  width: project.resourceRisk === "High" ? "100%" :
                                         project.resourceRisk === "Medium" ? "66%" :
                                         "33%"
                                }}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Weather Risk</span>
                              <Badge variant={
                                project.weatherRisk === "High" ? "destructive" :
                                project.weatherRisk === "Medium" ? "default" :
                                "secondary"
                              }>
                                {project.weatherRisk}
                              </Badge>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div
                                className={`h-full rounded-full ${
                                  project.weatherRisk === "High" ? "bg-red-600" :
                                  project.weatherRisk === "Medium" ? "bg-amber-600" :
                                  "bg-emerald-600"
                                }`}
                                style={{
                                  width: project.weatherRisk === "High" ? "100%" :
                                         project.weatherRisk === "Medium" ? "66%" :
                                         "33%"
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Risk Assessments</CardTitle>
                  <CardDescription>Specific risks and mitigation strategies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(currentProject 
                      ? detailedRiskAssessments.filter(risk => risk.project === currentProject)
                      : detailedRiskAssessments).map((risk, index) => (
                      <div key={index} className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{risk.project}</h4>
                              <Badge>
                                {risk.riskType} Risk
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={
                              risk.severity === "High" ? "destructive" :
                              risk.severity === "Medium" ? "default" :
                              "secondary"
                            }>
                              {risk.severity} Severity
                            </Badge>
                            <Badge variant={
                              risk.probability === "High" ? "destructive" :
                              risk.probability === "Medium" ? "default" :
                              "secondary"
                            }>
                              {risk.probability} Probability
                            </Badge>
                          </div>
                        </div>
                        <div className="grid gap-2 mt-3">
                          <div>
                            <span className="text-sm font-medium">Description:</span>
                            <p className="text-sm mt-1">{risk.description}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Impact:</span>
                            <p className="text-sm mt-1">{risk.impact}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Mitigation Plan:</span>
                            <p className="text-sm mt-1">{risk.mitigationPlan}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Contingency Plan:</span>
                            <p className="text-sm mt-1">{risk.contingencyPlan}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Risk Owner:</span>
                            <p className="text-sm mt-1">{risk.owner}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  Contact Risk Owner
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => {
                                  window.location.href = 'mailto:jaishi120@gmail.com';
                                  toast.success(`Opening email client to contact ${risk.owner}`);
                                }}>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Email {risk.owner}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                  window.location.href = 'tel:+916366250838';
                                  toast.success(`Calling ${risk.owner}`);
                                }}>
                                  <Phone className="mr-2 h-4 w-4" />
                                  Call {risk.owner}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api-data" className="space-y-4">
              <div className="grid gap-4">
                {/* AI Optimization Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5" />
                      AI Construction Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleOptimize} 
                          disabled={loading}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        >
                          {loading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Bot className="mr-2 h-4 w-4" />
                          )}
                          Run AI Optimization
                        </Button>
                      </div>

                      {loading && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex justify-center items-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="text-center">
                            <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-500" />
                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Analyzing construction data with AI...</p>
                          </div>
                        </motion.div>
                      )}

                      {output && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="space-y-6"
                        >
                          {/* Project Estimation Card */}
                          <Card className="border-l-4 border-l-blue-500 overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">Project Estimation</CardTitle>
                                <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30">
                                  5000 sq ft Commercial Building
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="p-6">
                              <div className="grid gap-6 md:grid-cols-2">
                                {/* Material Requirements Chart */}
                                <motion.div
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: 0.2 }}
                                  className="space-y-4"
                                >
                                  <h3 className="text-lg font-medium">Material Requirements</h3>
                                  <div className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <RechartsBarChart
                                        data={[
                                          { name: "Concrete", value: 500 },
                                          { name: "Steel", value: 200 }
                                        ]}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                      >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                                          {[
                                            { name: "Concrete", value: 500 },
                                            { name: "Steel", value: 200 }
                                          ].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={`hsl(${210 + index * 30}, 70%, 60%)`} />
                                          ))}
                                        </Bar>
                                      </RechartsBarChart>
                                    </ResponsiveContainer>
                                  </div>
                                </motion.div>

                                {/* Labor & Duration Chart */}
                                <motion.div
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: 0.3 }}
                                  className="space-y-4"
                                >
                                  <h3 className="text-lg font-medium">Labor & Duration</h3>
                                  <div className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <RechartsBarChart
                                        data={[
                                          { name: "Labor Hours", value: 3450 },
                                          { name: "Project Days", value: 39 }
                                        ]}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                      >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]}>
                                          {[
                                            { name: "Labor Hours", value: 3450 },
                                            { name: "Project Days", value: 39 }
                                          ].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={`hsl(${160 + index * 30}, 70%, 60%)`} />
                                          ))}
                                        </Bar>
                                      </RechartsBarChart>
                                    </ResponsiveContainer>
                                  </div>
                                </motion.div>
                              </div>

                              {/* Environmental Impact */}
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="mt-6 space-y-4"
                              >
                                <div className="flex items-center gap-2">
                                  <h3 className="text-lg font-medium">Environmental Impact</h3>
                                  <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30">
                                    CO2 Emissions
                                  </Badge>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                                    <CardContent className="p-4">
                                      <div className="flex items-center gap-2 mb-2">
                                        <CloudRain className="h-5 w-5 text-green-500" />
                                        <h4 className="font-medium">CO2 Emissions</h4>
                                      </div>
                                      <p className="text-2xl font-bold">450 tons</p>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">Estimated carbon footprint</p>
                                    </CardContent>
                                  </Card>
                                  <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                                    <CardContent className="p-4">
                                      <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                                        <h4 className="font-medium">Delay Risk</h4>
                                      </div>
                                      <p className="text-2xl font-bold">Moderate</p>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">3-4 days potential rain delays</p>
                                    </CardContent>
                                  </Card>
                                </div>
                              </motion.div>
                            </CardContent>
                          </Card>

                          {/* Optimization Plan Card */}
                          <Card className="border-l-4 border-l-indigo-500 overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">Optimization Plan</CardTitle>
                                <Badge variant="outline" className="bg-indigo-100 dark:bg-indigo-900/30">
                                  AI Recommendations
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="p-6">
                              <div className="grid gap-6 md:grid-cols-2">
                                {/* Schedule Optimization */}
                                <motion.div
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: 0.2 }}
                                  className="space-y-4"
                                >
                                  <h3 className="text-lg font-medium">Schedule Optimization</h3>
                                  <div className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <RechartsBarChart
                                        data={[
                                          { name: "Standard Schedule", value: 39 },
                                          { name: "Optimized Schedule", value: 21 }
                                        ]}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                      >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]}>
                                          {[
                                            { name: "Standard Schedule", value: 39 },
                                            { name: "Optimized Schedule", value: 21 }
                                          ].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={`hsl(${270 + index * 30}, 70%, 60%)`} />
                                          ))}
                                        </Bar>
                                      </RechartsBarChart>
                                    </ResponsiveContainer>
                                  </div>
                                </motion.div>

                                {/* Resource Allocation */}
                                <motion.div
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: 0.3 }}
                                  className="space-y-4"
                                >
                                  <h3 className="text-lg font-medium">Resource Allocation</h3>
                                  <div className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <RechartsPieChart>
                                        <Pie
                                          data={[
                                            { name: "Labor", value: 40 },
                                            { name: "Materials", value: 30 },
                                            { name: "Equipment", value: 20 },
                                            { name: "Other", value: 10 }
                                          ]}
                                          cx="50%"
                                          cy="50%"
                                          labelLine={true}
                                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                          outerRadius={80}
                                          fill="#8884d8"
                                          dataKey="value"
                                        >
                                          {[
                                            { name: "Labor", value: 40 },
                                            { name: "Materials", value: 30 },
                                            { name: "Equipment", value: 20 },
                                            { name: "Other", value: 10 }
                                          ].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                          ))}
                                        </Pie>
                                        <Tooltip />
                                      </RechartsPieChart>
                                    </ResponsiveContainer>
                                  </div>
                                </motion.div>
                              </div>

                              {/* Optimization Details */}
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="mt-6 space-y-4"
                              >
                                <div className="flex items-center gap-2">
                                  <h3 className="text-lg font-medium">Optimization Details</h3>
                                  <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900/30">
                                    Implementation Plan
                                  </Badge>
                                </div>
                                <div className="grid gap-4 md:grid-cols-3">
                                  <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
                                    <CardContent className="p-4">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="h-5 w-5 text-indigo-500" />
                                        <h4 className="font-medium">Shift Schedule</h4>
                                      </div>
                                      <p className="text-sm">Two shifts per day for 3 weeks</p>
                                    </CardContent>
                                  </Card>
                                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                                    <CardContent className="p-4">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Box className="h-5 w-5 text-purple-500" />
                                        <h4 className="font-medium">Material Order</h4>
                                      </div>
                                      <p className="text-sm">Stagger steel delivery over 2 weeks</p>
                                    </CardContent>
                                  </Card>
                                  <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
                                    <CardContent className="p-4">
                                      <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="h-5 w-5 text-pink-500" />
                                        <h4 className="font-medium">Delay Mitigation</h4>
                                      </div>
                                      <p className="text-sm">Prioritize indoor work due to forecasted rain</p>
                                    </CardContent>
                                  </Card>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                  <Card className="bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20">
                                    <CardContent className="p-4">
                                      <div className="flex items-center gap-2 mb-2">
                                        <CloudRain className="h-5 w-5 text-rose-500" />
                                        <h4 className="font-medium">Emission Plan</h4>
                                      </div>
                                      <p className="text-sm">Use recycled steel + low-carbon concrete</p>
                                    </CardContent>
                                  </Card>
                                  <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
                                    <CardContent className="p-4">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Users className="h-5 w-5 text-red-500" />
                                        <h4 className="font-medium">Labor Availability</h4>
                                      </div>
                                      <p className="text-sm">27 available laborers, 16 days of labor time</p>
                                    </CardContent>
                                  </Card>
                                </div>
                              </motion.div>
                            </CardContent>
                          </Card>

                          {/* Weather Impact Card */}
                          <Card className="border-l-4 border-l-green-500 overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">Weather Impact</CardTitle>
                                <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30">
                                  Forecast
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="p-6">
                              <div className="grid gap-6 md:grid-cols-2">
                                {/* Weather Forecast Chart */}
                                <motion.div
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: 0.2 }}
                                  className="space-y-4"
                                >
                                  <h3 className="text-lg font-medium">Weather Forecast</h3>
                                  <div className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <RechartsLineChart
                                        data={[
                                          { day: "Mon", temperature: 22, rainfall: 0 },
                                          { day: "Tue", temperature: 24, rainfall: 0 },
                                          { day: "Wed", temperature: 23, rainfall: 5 },
                                          { day: "Thu", temperature: 21, rainfall: 10 },
                                          { day: "Fri", temperature: 20, rainfall: 15 },
                                          { day: "Sat", temperature: 22, rainfall: 5 },
                                          { day: "Sun", temperature: 25, rainfall: 0 }
                                        ]}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                      >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="day" />
                                        <YAxis yAxisId="left" />
                                        <YAxis yAxisId="right" orientation="right" />
                                        <Tooltip />
                                        <Legend />
                                        <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#10b981" name="Temperature (°C)" />
                                        <Line yAxisId="right" type="monotone" dataKey="rainfall" stroke="#3b82f6" name="Rainfall (mm)" />
                                      </RechartsLineChart>
                                    </ResponsiveContainer>
                                  </div>
                                </motion.div>

                                {/* Impact Assessment */}
                                <motion.div
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: 0.3 }}
                                  className="space-y-4"
                                >
                                  <h3 className="text-lg font-medium">Impact Assessment</h3>
                                  <div className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <RechartsBarChart
                                        data={[
                                          { name: "Low Impact", value: 4 },
                                          { name: "Medium Impact", value: 2 },
                                          { name: "High Impact", value: 1 }
                                        ]}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                      >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]}>
                                          {[
                                            { name: "Low Impact", value: 4 },
                                            { name: "Medium Impact", value: 2 },
                                            { name: "High Impact", value: 1 }
                                          ].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={`hsl(${160 - index * 30}, 70%, 60%)`} />
                                          ))}
                                        </Bar>
                                      </RechartsBarChart>
                                    </ResponsiveContainer>
                                  </div>
                                </motion.div>
                              </div>

                              {/* Weather Details */}
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="mt-6 space-y-4"
                              >
                                <div className="flex items-center gap-2">
                                  <h3 className="text-lg font-medium">Weather Details</h3>
                                  <Badge variant="outline" className="bg-emerald-100 dark:bg-emerald-900/30">
                                    Broken Clouds
                                  </Badge>
                                </div>
                                <div className="grid gap-4 md:grid-cols-3">
                                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                                    <CardContent className="p-4">
                                      <div className="flex items-center gap-2 mb-2">
                                        <CloudRain className="h-5 w-5 text-green-500" />
                                        <h4 className="font-medium">Current Condition</h4>
                                      </div>
                                      <p className="text-sm">Broken clouds with minimal impact</p>
                                    </CardContent>
                                  </Card>
                                  <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                                    <CardContent className="p-4">
                                      <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="h-5 w-5 text-emerald-500" />
                                        <h4 className="font-medium">Delay Risk</h4>
                                      </div>
                                      <p className="text-sm">Moderate risk of 3-4 days delay</p>
                                    </CardContent>
                                  </Card>
                                  <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20">
                                    <CardContent className="p-4">
                                      <div className="flex items-center gap-2 mb-2">
                                        <FileText className="h-5 w-5 text-teal-500" />
                                        <h4 className="font-medium">Recommendation</h4>
                                      </div>
                                      <p className="text-sm">Prioritize indoor work during forecasted rain</p>
                                    </CardContent>
                                  </Card>
                                </div>
                              </motion.div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

