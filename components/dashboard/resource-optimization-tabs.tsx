"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react"

// Mock data for resource optimization
const materialsOptimization = [
  {
    id: 1,
    resource: "Concrete Usage",
    change: "-15%",
    impact: "high",
    description: "Optimized mix design can reduce concrete usage by 15%",
    type: "reduction",
    project: "Office Tower Phase 1",
  },
  {
    id: 2,
    resource: "Steel Allocation",
    change: "+8%",
    impact: "medium",
    description: "Reallocate steel from Project A to Project C",
    type: "efficiency",
    project: "Residential Complex",
  },
  {
    id: 3,
    resource: "Timber Sourcing",
    change: "-22%",
    impact: "high",
    description: "Switch to local sustainable timber sources",
    type: "reduction",
    project: "All Projects",
  },
  {
    id: 4,
    resource: "Insulation Materials",
    change: "-10%",
    impact: "medium",
    description: "Use higher R-value insulation to reduce quantity needed",
    type: "reduction",
    project: "Shopping Mall",
  },
]

const laborOptimization = [
  {
    id: 1,
    resource: "Skilled Labor",
    change: "-8%",
    impact: "medium",
    description: "Redistribute skilled workers across projects based on critical path",
    type: "efficiency",
    project: "All Projects",
  },
  {
    id: 2,
    resource: "Overtime Hours",
    change: "-20%",
    impact: "high",
    description: "Optimize scheduling to reduce overtime requirements",
    type: "reduction",
    project: "Highway Extension",
  },
  {
    id: 3,
    resource: "Specialized Crews",
    change: "+15%",
    impact: "high",
    description: "Increase specialized crews for complex tasks to improve quality and speed",
    type: "efficiency",
    project: "Office Tower Phase 1",
  },
]

const equipmentOptimization = [
  {
    id: 1,
    resource: "Heavy Machinery",
    change: "-12%",
    impact: "high",
    description: "Share equipment between nearby project sites",
    type: "efficiency",
    project: "Highway Extension",
  },
  {
    id: 2,
    resource: "Tool Inventory",
    change: "-5%",
    impact: "low",
    description: "Implement tool tracking system to reduce losses",
    type: "reduction",
    project: "All Projects",
  },
  {
    id: 3,
    resource: "Equipment Idle Time",
    change: "-25%",
    impact: "high",
    description: "Optimize equipment scheduling to minimize idle time",
    type: "efficiency",
    project: "Residential Complex",
  },
]

export function ResourceOptimizationTabs() {
  const [activeTab, setActiveTab] = useState("materials")

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-green-500">High Impact</Badge>
      case "medium":
        return <Badge className="bg-blue-500">Medium Impact</Badge>
      case "low":
        return <Badge className="bg-gray-500">Low Impact</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getChangeIcon = (type: string) => {
    switch (type) {
      case "reduction":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      case "efficiency":
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      case "risk":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      default:
        return null
    }
  }

  const getActiveData = () => {
    switch (activeTab) {
      case "materials":
        return materialsOptimization
      case "labor":
        return laborOptimization
      case "equipment":
        return equipmentOptimization
      default:
        return []
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Optimization</CardTitle>
        <CardDescription>AI-powered recommendations for resource optimization</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="materials" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="labor">Labor</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {getActiveData().map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader className="pb-2 flex flex-row justify-between items-start">
                    <CardTitle className="text-sm">{item.resource}</CardTitle>
                    {getChangeIcon(item.type)}
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-lg font-bold">{item.change}</div>
                      {getImpactBadge(item.impact)}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                    <div className="text-xs text-gray-400">Project: {item.project}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                View All Recommendations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

