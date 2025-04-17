"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import {
  BarChart3,
  Calendar,
  Clock,
  Download,
  HardHat,
  Home,
  Layers,
  LineChart,
  Menu,
  Plus,
  Settings,
  User,
  X,
  Bell,
  Search,
  Moon,
  Sun,
  FileText,
  Upload,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ResourceAllocationChart } from "@/components/dashboard/resource-allocation-chart"
import { ProjectStatusList } from "@/components/dashboard/project-status-list"
import { ResourceOptimizationTabs } from "@/components/dashboard/resource-optimization-tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { NewProjectDialog } from "@/components/dashboard/new-project-dialog"
import { ExportReportDialog } from "@/components/dashboard/export-report-dialog"
import { NotificationsDialog } from "@/components/dashboard/notifications-dialog"
import { useRouter } from 'next/navigation'
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import { format } from "date-fns"
import { AIChatbot } from "@/components/dashboard/ai-chatbot"

export default function DashboardPage() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const { signOut } = useAuth()
  const [projects, setProjects] = useState([
    {
      id: 'office-tower-phase-1',
      title: 'Office Tower Phase 1'
    },
    {
      id: 'residential-complex',
      title: 'Residential Complex'
    },
    {
      id: 'highway-extension',
      title: 'Highway Extension'
    },
    {
      id: 'bangalore-tech-park',
      title: 'Bangalore Tech Park'
    },
    {
      id: 'hyderabad-metro',
      title: 'Hyderabad Metro Extension'
    },
    {
      id: 'pune-smart-city',
      title: 'Pune Smart City Hub'
    },
    {
      id: 'mumbai-waterfront',
      title: 'Mumbai Waterfront Development'
    }
  ]);

  // Load projects on mount
  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      const parsedProjects = JSON.parse(storedProjects);
      // Merge with existing projects, avoiding duplicates
      const mergedProjects = [...projects];
      parsedProjects.forEach((newProject: any) => {
        if (!mergedProjects.find(p => p.id === newProject.id)) {
          mergedProjects.push({
            id: newProject.id,
            title: newProject.title
          });
        }
      });
      setProjects(mergedProjects);
    }
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [dateRange, setDateRange] = useState("Apr 2025")

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('Failed to sign out. Please try again.')
    }
  }

  const handleDashboardExport = () => {
    // Prepare dashboard data for export
    const dashboardData = {
      projects: projects.map(project => ({
        id: project.id,
        title: project.title,
        // Add any other project data you want to export
      })),
      exportedAt: new Date().toISOString(),
      filter: activeFilter,
      dateRange
    };

    // Convert to JSON
    const jsonContent = JSON.stringify(dashboardData, null, 2);

    // Create and download the file
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-export-${format(new Date(), 'yyyy-MM-dd')}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <Sidebar className="border-r border-gray-200">
          <SidebarHeader className="border-b border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <HardHat className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold">CODE_BRIGADE</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive>
                      <Link href="/dashboard">
                        <Home className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/analytics">
                        <BarChart3 className="h-4 w-4" />
                        <span>Analytics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/schedule">
                        <Calendar className="h-4 w-4" />
                        <span>Schedule</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/resources">
                        <Layers className="h-4 w-4" />
                        <span>Resources</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/documents">
                        <FileText className="h-4 w-4" />
                        <span>Documents</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Projects</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {projects.map((project) => (
                    <SidebarMenuItem key={project.id}>
                      <SidebarMenuButton asChild>
                        <Link href={`/dashboard/projects/${project.id}`}>
                          <span>{project.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setIsNewProjectDialogOpen(true)}>
                      <Plus className="h-4 w-4" />
                      <span>Add New Project</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-gray-200 p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/profile">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 px-4 md:px-6">
            <SidebarTrigger />
            <div className="flex items-center gap-2 md:hidden">
              <Button variant="outline" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
              <div className="flex items-center gap-2">
                <HardHat className="h-5 w-5 text-blue-600" />
                <span className="text-lg font-bold">CODE_BRIGADE</span>
              </div>
            </div>

            <div className="relative hidden md:flex w-full max-w-sm items-center">
              <Search className="absolute left-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search projects, resources..."
                className="w-full rounded-md border border-gray-200 bg-white pl-8 shadow-none"
              />
            </div>

            <div className="ml-auto flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hidden md:flex"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex"
                onClick={() => setIsExportDialogOpen(true)}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>

              <Button variant="outline" size="icon" className="relative" onClick={() => setIsNotificationsOpen(true)}>
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  3
                </span>
              </Button>

              <Button
                size="sm"
                className="hidden md:flex bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsNewProjectDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-10 w-10">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-sm">
                      <span className="font-semibold text-lg">CB</span>
                    </div>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                      <span className="font-semibold text-lg">CB</span>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">CODE_BRIGADE</p>
                      <p className="text-xs leading-none text-muted-foreground">admin@codebrigade.com</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="cursor-pointer">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button onClick={handleLogout} className="w-full text-left cursor-pointer text-red-600 hover:text-red-700">
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="grid gap-4 p-4 md:gap-8 md:p-6">
            <DashboardHeader
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              dateRange={dateRange}
              setDateRange={setDateRange}
            />

            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                    <LineChart className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-xs text-gray-500">+2 from last month</p>
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
                    <CardTitle className="text-sm font-medium">Resource Utilization</CardTitle>
                    <BarChart3 className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">78%</div>
                    <Progress value={78} className="mt-2" />
                    <p className="mt-1 text-xs text-gray-500">+5% from last month</p>
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
                    <CardTitle className="text-sm font-medium">Delay Reduction</CardTitle>
                    <Clock className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">32%</div>
                    <Progress value={32} className="mt-2" />
                    <p className="mt-1 text-xs text-gray-500">+12% from last quarter</p>
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
                    <CardTitle className="text-sm font-medium">Carbon Footprint</CardTitle>
                    <Layers className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">-18%</div>
                    <p className="text-xs text-green-500 font-medium">Reduced by 18% from baseline</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Main Dashboard Content */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              {/* Resource Allocation Chart */}
              <motion.div
                className="col-span-full lg:col-span-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ResourceAllocationChart />
              </motion.div>

              {/* Project Status */}
              <motion.div
                className="col-span-full lg:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ProjectStatusList />
              </motion.div>

              {/* Resource Optimization */}
              <motion.div
                className="col-span-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <ResourceOptimizationTabs />
              </motion.div>
            </div>

            {/* Add the AI Chatbot component */}
            <AIChatbot />
          </main>
        </div>
      </div>

      {/* Dialogs */}
      <ExportReportDialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen} />

      <NewProjectDialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen} />

      <NotificationsDialog open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen} />
    </SidebarProvider>
  )
}

