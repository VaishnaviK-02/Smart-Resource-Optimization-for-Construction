"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data for resource allocation
const resourceAllocationData = [
  {
    name: "Office Tower",
    concrete: 1200,
    steel: 800,
    timber: 400,
    labor: 2000,
    equipment: 1500,
  },
  {
    name: "Residential",
    concrete: 900,
    steel: 600,
    timber: 700,
    labor: 1800,
    equipment: 1200,
  },
  {
    name: "Highway",
    concrete: 2000,
    steel: 1200,
    timber: 100,
    labor: 1500,
    equipment: 2200,
  },
  {
    name: "Shopping Mall",
    concrete: 800,
    steel: 500,
    timber: 300,
    labor: 1200,
    equipment: 900,
  },
]

// Mock data for resource distribution
const resourceDistributionData = [
  { name: "Concrete", value: 4900 },
  { name: "Steel", value: 3100 },
  { name: "Timber", value: 1500 },
  { name: "Labor", value: 6500 },
  { name: "Equipment", value: 5800 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export function ResourceAllocationChart() {
  const [chartView, setChartView] = useState("bar")

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Resource Allocation</CardTitle>
          <CardDescription>Current allocation across active projects</CardDescription>
        </div>
        <Tabs defaultValue="bar" value={chartView} onValueChange={setChartView} className="w-[200px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bar">Bar</TabsTrigger>
            <TabsTrigger value="pie">Pie</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {chartView === "bar" ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={resourceAllocationData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="concrete" fill="#0088FE" />
                <Bar dataKey="steel" fill="#00C49F" />
                <Bar dataKey="timber" fill="#FFBB28" />
                <Bar dataKey="labor" fill="#FF8042" />
                <Bar dataKey="equipment" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={resourceDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {resourceDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

