"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import Link from "next/link"

// Default projects if no projects exist in localStorage
const defaultProjects = [
  {
    id: "office-tower-phase-1",
    title: "Office Tower Phase 1",
    progress: 75,
    status: "on-track",
    dueDate: "2025-06-15",
    budget: "₹42 Cr",
    budgetStatus: "on-budget",
    supervisor: "Rajesh Kumar",
    teamMembers: [
      { name: "Priya Sharma", role: "Project Manager", department: "Construction" },
      { name: "Amit Patel", role: "Site Engineer", department: "Civil" },
      { name: "Neha Gupta", role: "Architect", department: "Design" },
      { name: "Vikram Singh", role: "Quality Inspector", department: "Quality" }
    ],
    resources: {
      materials: [
        { name: "Steel", quantity: "2500 tons", status: "In Stock" },
        { name: "Cement", quantity: "15000 bags", status: "In Stock" },
        { name: "Glass Panels", quantity: "5000 sq ft", status: "Ordered" }
      ],
      equipment: [
        { name: "Tower Crane", quantity: "2", status: "Operational" },
        { name: "Concrete Pump", quantity: "3", status: "Operational" },
        { name: "Excavator", quantity: "2", status: "Maintenance" }
      ]
    },
    milestones: [
      { title: "Foundation Complete", date: "2024-12-15", status: "Completed" },
      { title: "Structural Work", date: "2025-03-30", status: "In Progress" },
      { title: "Interior Finishing", date: "2025-05-15", status: "Pending" }
    ]
  },
  {
    id: "residential-complex",
    title: "Residential Complex",
    progress: 45,
    status: "delayed",
    dueDate: "2025-08-30",
    budget: "₹68 Cr",
    budgetStatus: "under",
    supervisor: "Meera Reddy",
    teamMembers: [
      { name: "Arjun Nair", role: "Project Manager", department: "Construction" },
      { name: "Sanya Verma", role: "Civil Engineer", department: "Civil" },
      { name: "Karthik Iyer", role: "MEP Engineer", department: "MEP" },
      { name: "Divya Rao", role: "Safety Officer", department: "Safety" }
    ],
    resources: {
      materials: [
        { name: "Bricks", quantity: "500000", status: "In Stock" },
        { name: "Steel Bars", quantity: "1800 tons", status: "In Stock" },
        { name: "Tiles", quantity: "25000 sq ft", status: "Ordered" }
      ],
      equipment: [
        { name: "Mobile Crane", quantity: "1", status: "Operational" },
        { name: "Concrete Mixer", quantity: "4", status: "Operational" },
        { name: "Scaffolding", quantity: "1000 sq ft", status: "In Stock" }
      ]
    },
    milestones: [
      { title: "Site Preparation", date: "2024-11-30", status: "Completed" },
      { title: "Foundation Work", date: "2025-02-15", status: "In Progress" },
      { title: "Superstructure", date: "2025-06-30", status: "Pending" }
    ]
  },
  {
    id: "highway-extension",
    title: "Highway Extension",
    progress: 90,
    status: "on-track",
    dueDate: "2025-04-20",
    budget: "₹125 Cr",
    budgetStatus: "over",
    supervisor: "Suresh Menon",
    teamMembers: [
      { name: "Anita Desai", role: "Project Manager", department: "Highways" },
      { name: "Rahul Joshi", role: "Road Engineer", department: "Civil" },
      { name: "Deepak Malhotra", role: "Surveyor", department: "Survey" },
      { name: "Lakshmi Priya", role: "Environmental Officer", department: "Environment" }
    ],
    resources: {
      materials: [
        { name: "Asphalt", quantity: "8000 tons", status: "In Stock" },
        { name: "Concrete", quantity: "12000 cubic meters", status: "In Stock" },
        { name: "Steel Reinforcement", quantity: "3000 tons", status: "In Stock" }
      ],
      equipment: [
        { name: "Road Roller", quantity: "3", status: "Operational" },
        { name: "Asphalt Paver", quantity: "2", status: "Operational" },
        { name: "Excavator", quantity: "4", status: "Operational" }
      ]
    },
    milestones: [
      { title: "Earthwork Complete", date: "2024-12-30", status: "Completed" },
      { title: "Base Layer", date: "2025-02-28", status: "Completed" },
      { title: "Final Layer", date: "2025-04-15", status: "In Progress" }
    ]
  }
]

export function ProjectStatusList() {
  const [projects, setProjects] = useState(defaultProjects)

  useEffect(() => {
    // Load projects from localStorage
    const storedProjects = localStorage.getItem('projects')
    if (storedProjects) {
      const parsedProjects = JSON.parse(storedProjects)
      // Merge with default projects, avoiding duplicates
      const mergedProjects = [...defaultProjects]
      parsedProjects.forEach((newProject: any) => {
        if (!mergedProjects.find(p => p.id === newProject.id)) {
          mergedProjects.push({
            ...newProject,
            progress: newProject.completion || 0,
            status: getProjectStatus(newProject.completion || 0),
            budgetStatus: 'on-budget' // Default for new projects
          })
        }
      })
      setProjects(mergedProjects)
    }
  }, [])

  const getProjectStatus = (progress: number) => {
    if (progress >= 90) return 'on-track'
    if (progress >= 60) return 'on-track'
    if (progress >= 30) return 'delayed'
    return 'at-risk'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'on-track':
        return <Badge className="bg-green-500">On Track</Badge>
      case 'delayed':
        return <Badge className="bg-amber-500">Delayed</Badge>
      case 'at-risk':
        return <Badge className="bg-red-500">At Risk</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getBudgetStatusBadge = (status: string) => {
    switch (status) {
      case 'under':
        return (
          <Badge variant="outline" className="border-green-500 text-green-600">
            Under Budget
          </Badge>
        )
      case 'over':
        return (
          <Badge variant="outline" className="border-red-500 text-red-600">
            Over Budget
          </Badge>
        )
      case 'on-budget':
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-600">
            On Budget
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Project Status</CardTitle>
        <CardDescription>Current status of active projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <Link 
                  href={`/dashboard/projects/${project.id}`}
                  className="font-medium hover:text-blue-600 transition-colors"
                >
                  {project.title}
                </Link>
                {getStatusBadge(project.status)}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                <div className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  Due: {new Date(project.dueDate).toLocaleDateString()}
                </div>
                <div>{project.progress}%</div>
              </div>
              <Progress value={project.progress} className="h-2" />
              <div className="flex justify-between items-center mt-2">
                <div className="text-sm">Budget: {project.budget}</div>
                {getBudgetStatusBadge(project.budgetStatus)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
          Refresh Projects
        </Button>
      </CardFooter>
    </Card>
  )
}

