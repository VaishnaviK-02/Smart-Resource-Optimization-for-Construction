"use client"

import { use, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Building, MapPin, Wrench, CheckSquare, Phone, Mail, Building2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// This would typically come from an API or database
const projectData = {
  'office-tower-phase-1': {
    title: 'Office Tower Phase 1',
    description: 'A modern 20-story office tower in the heart of downtown',
    status: 'In Progress',
    startDate: '2024-01-15',
    endDate: '2025-06-30',
    location: 'Downtown Business District',
    budget: '₹25 Cr',
    teamSize: 45,
    completion: 35,
  },
  'residential-complex': {
    title: 'Residential Complex',
    description: 'Luxury residential complex with 200 units and modern amenities',
    status: 'Planning',
    startDate: '2024-03-01',
    endDate: '2026-02-28',
    location: 'Suburban Area',
    budget: '₹40 Cr',
    teamSize: 60,
    completion: 15,
  },
  'highway-extension': {
    title: 'Highway Extension',
    description: 'Major highway extension project connecting two cities',
    status: 'Pending Approval',
    startDate: '2024-06-01',
    endDate: '2025-12-31',
    location: 'Interstate 101',
    budget: '₹75 Cr',
    teamSize: 120,
    completion: 0,
  },
  'bangalore-tech-park': {
    title: 'Bangalore Tech Park',
    description: 'State-of-the-art technology park with modern office spaces and innovation centers',
    status: 'In Progress',
    startDate: '2024-02-15',
    endDate: '2025-12-15',
    location: 'Whitefield, Bangalore',
    budget: '₹85 Cr',
    teamSize: 75,
    completion: 60,
  },
  'hyderabad-metro': {
    title: 'Hyderabad Metro Extension',
    description: 'Metro rail extension project connecting major business districts',
    status: 'In Progress',
    startDate: '2024-04-01',
    endDate: '2026-03-30',
    location: 'Hyderabad Metropolitan Region',
    budget: '₹150 Cr',
    teamSize: 200,
    completion: 35,
  },
  'pune-smart-city': {
    title: 'Pune Smart City Hub',
    description: 'Integrated smart city development with sustainable infrastructure',
    status: 'In Progress',
    startDate: '2024-03-15',
    endDate: '2025-11-20',
    location: 'Hinjewadi, Pune',
    budget: '₹95 Cr',
    teamSize: 90,
    completion: 50,
  },
  'mumbai-waterfront': {
    title: 'Mumbai Waterfront Development',
    description: 'Luxury waterfront development with residential and commercial spaces',
    status: 'Planning',
    startDate: '2024-07-01',
    endDate: '2026-06-15',
    location: 'Bandra, Mumbai',
    budget: '₹200 Cr',
    teamSize: 150,
    completion: 25,
  }
};

export default function ProjectPage({ params }: { params: { id: string } }) {
  const resolvedParams = use(params)
  const [project, setProject] = useState<any>(null)

  useEffect(() => {
    // Try to get project from projectData first
    const projectFromData = projectData[resolvedParams.id as keyof typeof projectData]
    if (projectFromData) {
      setProject({
        ...projectFromData,
        status: 'on-track',
        budgetStatus: 'on-budget',
        progress: projectFromData.completion,
        dueDate: projectFromData.endDate,
        supervisor: {
          name: "Rajesh Kumar",
          phone: "+91 98765 43210",
          email: "rajesh.kumar@codebrigade.com",
          department: "Project Management"
        },
        teamMembers: [
          { name: "Priya Sharma", role: "Project Manager", department: "Construction", contact: "+91 98765 43211" },
          { name: "Amit Patel", role: "Site Engineer", department: "Civil", contact: "+91 98765 43212" },
          { name: "Neha Gupta", role: "Architect", department: "Design", contact: "+91 98765 43213" },
          { name: "Vikram Singh", role: "Quality Inspector", department: "Quality", contact: "+91 98765 43214" }
        ],
        resources: {
          materials: [
            { 
              name: "Steel", 
              quantity: "2500 tons", 
              status: "In Stock",
              supplier: {
                name: "Tata Steel Ltd",
                contact: "+91 98765 43215",
                email: "orders@tatasteel.com",
                address: "Mumbai, Maharashtra"
              }
            },
            { 
              name: "Cement", 
              quantity: "15000 bags", 
              status: "In Stock",
              supplier: {
                name: "UltraTech Cement",
                contact: "+91 98765 43216",
                email: "sales@ultratech.com",
                address: "Bangalore, Karnataka"
              }
            },
            { 
              name: "Glass Panels", 
              quantity: "5000 sq ft", 
              status: "Ordered",
              supplier: {
                name: "Saint-Gobain Glass",
                contact: "+91 98765 43217",
                email: "orders@saintgobain.in",
                address: "Chennai, Tamil Nadu"
              }
            }
          ],
          equipment: [
            { 
              name: "Tower Crane", 
              quantity: "2", 
              status: "Operational",
              vendor: {
                name: "ACE Cranes",
                contact: "+91 98765 43218",
                email: "rentals@acecranes.com",
                address: "Delhi, NCR"
              }
            },
            { 
              name: "Concrete Pump", 
              quantity: "3", 
              status: "Operational",
              vendor: {
                name: "Schwing Stetter",
                contact: "+91 98765 43219",
                email: "support@schwing.co.in",
                address: "Chennai, Tamil Nadu"
              }
            },
            { 
              name: "Excavator", 
              quantity: "2", 
              status: "Maintenance",
              vendor: {
                name: "TATA Hitachi",
                contact: "+91 98765 43220",
                email: "service@tatahitachi.co.in",
                address: "Bangalore, Karnataka"
              }
            }
          ]
        },
        milestones: [
          { title: "Foundation Complete", date: "2024-12-15", status: "Completed" },
          { title: "Structural Work", date: "2025-03-30", status: "In Progress" },
          { title: "Interior Finishing", date: "2025-05-15", status: "Pending" }
        ]
      })
    } else {
      // If not in projectData, try localStorage
      const storedProjects = localStorage.getItem('projects')
      if (storedProjects) {
        const projects = JSON.parse(storedProjects)
        const foundProject = projects.find((p: any) => p.id === resolvedParams.id)
        setProject(foundProject)
      }
    }
  }, [resolvedParams.id])

  if (!project) {
    return <div className="flex items-center justify-center h-[50vh]">
      <div className="text-xl text-gray-500">Loading project details...</div>
    </div>
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
        return <Badge variant="outline" className="border-green-500 text-green-600">Under Budget</Badge>
      case 'over':
        return <Badge variant="outline" className="border-red-500 text-red-600">Over Budget</Badge>
      case 'on-budget':
        return <Badge variant="outline" className="border-blue-500 text-blue-600">On Budget</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

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
            <h2 className="text-3xl font-bold tracking-tight text-foreground">{project?.title}</h2>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2 text-foreground">{project.title}</h1>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
        </div>

        {/* Project Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Project Overview</CardTitle>
            <CardDescription>Key project information and metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center space-x-4">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium text-foreground">Status</div>
                  <div className="text-sm text-muted-foreground">
                    {getStatusBadge(project.status)}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Building className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium text-foreground">Timeline</div>
                  <div className="text-sm text-muted-foreground">
                    Due: {new Date(project.endDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium text-foreground">Budget</div>
                  <div className="text-sm text-muted-foreground">
                    {project.budget} {getBudgetStatusBadge(project.budgetStatus)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Members with Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Users className="h-5 w-5 mr-2" />
              Team Members
            </CardTitle>
            <CardDescription>Project team and roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-2 text-foreground">Supervisor</div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">{project.supervisor.name}</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 mr-2" />
                      <a href={`tel:${project.supervisor.phone}`} className="hover:text-blue-500 dark:hover:text-blue-400">
                        {project.supervisor.phone}
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="h-4 w-4 mr-2" />
                      <a href={`mailto:${project.supervisor.email}`} className="hover:text-blue-500 dark:hover:text-blue-400">
                        {project.supervisor.email}
                      </a>
                    </div>
                    <Badge variant="secondary">{project.supervisor.department}</Badge>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.teamMembers?.map((member: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="font-medium text-foreground">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.role}</div>
                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                      <Phone className="h-4 w-4 mr-2" />
                      <a href={`tel:${member.contact}`} className="hover:text-blue-500 dark:hover:text-blue-400">
                        {member.contact}
                      </a>
                    </div>
                    <Badge variant="secondary" className="mt-2">{member.department}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources with Supplier Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Wrench className="h-5 w-5 mr-2" />
              Resources
            </CardTitle>
            <CardDescription>Materials and equipment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3 text-foreground">Materials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.resources?.materials?.map((material: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="font-medium text-foreground">{material.name}</div>
                      <div className="text-sm text-muted-foreground">Quantity: {material.quantity}</div>
                      <Badge variant="outline" className="mt-2 mb-2">{material.status}</Badge>
                      <div className="border-t pt-2 mt-2">
                        <div className="font-medium text-sm text-foreground">Supplier Details</div>
                        <div className="text-sm text-muted-foreground">{material.supplier.name}</div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Phone className="h-4 w-4 mr-2" />
                          <a href={`tel:${material.supplier.contact}`} className="hover:text-blue-500 dark:hover:text-blue-400">
                            {material.supplier.contact}
                          </a>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Mail className="h-4 w-4 mr-2" />
                          <a href={`mailto:${material.supplier.email}`} className="hover:text-blue-500 dark:hover:text-blue-400">
                            {material.supplier.email}
                          </a>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Building2 className="h-4 w-4 mr-2" />
                          {material.supplier.address}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3 text-foreground">Equipment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.resources?.equipment?.map((equipment: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="font-medium text-foreground">{equipment.name}</div>
                      <div className="text-sm text-muted-foreground">Units: {equipment.quantity}</div>
                      <Badge variant="outline" className="mt-2 mb-2">{equipment.status}</Badge>
                      <div className="border-t pt-2 mt-2">
                        <div className="font-medium text-sm text-foreground">Vendor Details</div>
                        <div className="text-sm text-muted-foreground">{equipment.vendor.name}</div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Phone className="h-4 w-4 mr-2" />
                          <a href={`tel:${equipment.vendor.contact}`} className="hover:text-blue-500 dark:hover:text-blue-400">
                            {equipment.vendor.contact}
                          </a>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Mail className="h-4 w-4 mr-2" />
                          <a href={`mailto:${equipment.vendor.email}`} className="hover:text-blue-500 dark:hover:text-blue-400">
                            {equipment.vendor.email}
                          </a>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Building2 className="h-4 w-4 mr-2" />
                          {equipment.vendor.address}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <CheckSquare className="h-5 w-5 mr-2" />
              Milestones
            </CardTitle>
            <CardDescription>Project timeline and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.milestones?.map((milestone: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">{milestone.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Due: {new Date(milestone.date).toLocaleDateString()}
                    </div>
                  </div>
                  <Badge
                    className={
                      milestone.status === "Completed"
                        ? "bg-green-500"
                        : milestone.status === "In Progress"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }
                  >
                    {milestone.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>Project completion status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <div>Progress</div>
                <div>{project.completion}%</div>
              </div>
              <Progress value={project.completion} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Include the defaultProjects array here
const defaultProjects = [
  // ... (same as in project-status-list.tsx)
] 