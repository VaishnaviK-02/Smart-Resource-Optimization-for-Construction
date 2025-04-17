"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Search,
  Users,
  CheckCircle2,
  AlertTriangle,
  Clock4,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns"
import { NewTaskDialog } from "@/components/schedule/new-task-dialog"
import { TaskDetailsDialog } from "@/components/schedule/task-details-dialog"
import Link from "next/link"

// Mock data for schedule
const tasks = [
  {
    id: 1,
    title: "Foundation Inspection",
    project: "Lakshmi Tech Park",
    assignedTo: "Rajesh Kumar",
    startDate: new Date(2025, 3, 5),
    endDate: new Date(2025, 3, 7),
    status: "completed",
    priority: "high",
    completion: 100,
    description: "Complete inspection of foundation work and prepare report for client approval.",
  },
  {
    id: 2,
    title: "Steel Structure Installation",
    project: "Lakshmi Tech Park",
    assignedTo: "Vikram Singh",
    startDate: new Date(2025, 3, 8),
    endDate: new Date(2025, 3, 15),
    status: "in-progress",
    priority: "high",
    completion: 45,
    description: "Install main steel structure for floors 3-5 according to approved plans.",
  },
  {
    id: 3,
    title: "Electrical Wiring Phase 1",
    project: "Lakshmi Tech Park",
    assignedTo: "Anand Sharma",
    startDate: new Date(2025, 3, 12),
    endDate: new Date(2025, 3, 18),
    status: "not-started",
    priority: "medium",
    completion: 0,
    description: "Complete electrical wiring for basement and ground floor.",
  },
  {
    id: 4,
    title: "Concrete Pouring - Block B",
    project: "Ganga Residency",
    assignedTo: "Suresh Patel",
    startDate: new Date(2025, 3, 6),
    endDate: new Date(2025, 3, 8),
    status: "in-progress",
    priority: "high",
    completion: 75,
    description: "Pour concrete for Block B foundation and first floor slab.",
  },
  {
    id: 5,
    title: "Plumbing Installation",
    project: "Ganga Residency",
    assignedTo: "Amit Verma",
    startDate: new Date(2025, 3, 10),
    endDate: new Date(2025, 3, 16),
    status: "not-started",
    priority: "medium",
    completion: 0,
    description: "Install main plumbing lines for all residential units in Block A.",
  },
  {
    id: 6,
    title: "Asphalt Laying - Section 2",
    project: "Mumbai-Pune Highway Extension",
    assignedTo: "Rahul Gupta",
    startDate: new Date(2025, 3, 4),
    endDate: new Date(2025, 3, 9),
    status: "delayed",
    priority: "high",
    completion: 30,
    description: "Complete asphalt laying for section 2 (KM 45-60).",
  },
  {
    id: 7,
    title: "Interior Finishing - Food Court",
    project: "Ganesh Shopping Mall",
    assignedTo: "Priya Sharma",
    startDate: new Date(2025, 3, 7),
    endDate: new Date(2025, 3, 14),
    status: "in-progress",
    priority: "medium",
    completion: 60,
    description: "Complete interior finishing work for the food court area.",
  },
  {
    id: 8,
    title: "HVAC Installation - Phase 1",
    project: "Ganesh Shopping Mall",
    assignedTo: "Deepak Joshi",
    startDate: new Date(2025, 3, 15),
    endDate: new Date(2025, 3, 25),
    status: "not-started",
    priority: "high",
    completion: 0,
    description: "Install HVAC systems for ground and first floors.",
  },
]

export default function SchedulePage() {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<"day" | "week" | "month" | "list">("week")
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false)

  // Filter tasks based on current filter and search query
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      filter === task.status ||
      (filter === "today" && isSameDay(task.startDate, new Date())) ||
      (filter === "upcoming" && task.startDate > new Date())

    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Completed
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-blue-500">
            <Clock className="mr-1 h-3 w-3" /> In Progress
          </Badge>
        )
      case "not-started":
        return (
          <Badge className="bg-gray-500">
            <Clock4 className="mr-1 h-3 w-3" /> Not Started
          </Badge>
        )
      case "delayed":
        return (
          <Badge className="bg-red-500">
            <AlertTriangle className="mr-1 h-3 w-3" /> Delayed
          </Badge>
        )
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const handleTaskClick = (task: any) => {
    setSelectedTask(task)
    setIsTaskDetailsOpen(true)
  }

  // Generate week view data
  const weekStart = startOfWeek(date)
  const weekEnd = endOfWeek(date)
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

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
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Schedule</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setIsNewTaskDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                if (view === "day") {
                  setDate(addDays(date, -1))
                } else if (view === "week") {
                  setDate(addDays(date, -7))
                } else {
                  setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
                }
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => setDate(new Date())}>
              Today
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                if (view === "day") {
                  setDate(addDays(date, 1))
                } else if (view === "week") {
                  setDate(addDays(date, 7))
                } else {
                  setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
                }
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">
              {view === "day" && format(date, "d MMMM yyyy")}
              {view === "week" && `${format(weekStart, "d MMM")} - ${format(weekEnd, "d MMM yyyy")}`}
              {view === "month" && format(date, "MMMM yyyy")}
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <Tabs value={view} onValueChange={(v) => setView(v as any)}>
              <TabsList>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Calendar/Schedule View */}
        <Card>
          <CardContent className="p-0">
            {view === "day" && (
              <div className="p-4">
                <h3 className="font-medium mb-4">Tasks for {format(date, "EEEE, MMMM d, yyyy")}</h3>
                <div className="space-y-4">
                  {filteredTasks
                    .filter(
                      (task) =>
                        isSameDay(task.startDate, date) ||
                        isSameDay(task.endDate, date) ||
                        (task.startDate <= date && task.endDate >= date),
                    )
                    .map((task) => (
                      <div
                        key={task.id}
                        className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleTaskClick(task)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-gray-500">{task.project}</p>
                          </div>
                          {getStatusBadge(task.status)}
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <Users className="mr-1 h-3 w-3" />
                            {task.assignedTo}
                          </div>
                          <div className="text-sm text-gray-500">
                            <Clock className="inline mr-1 h-3 w-3" />
                            {format(task.startDate, "HH:mm")} - {format(task.endDate, "HH:mm")}
                          </div>
                        </div>
                      </div>
                    ))}
                  {filteredTasks.filter(
                    (task) =>
                      isSameDay(task.startDate, date) ||
                      isSameDay(task.endDate, date) ||
                      (task.startDate <= date && task.endDate >= date),
                  ).length === 0 && <div className="text-center py-8 text-gray-500">No tasks scheduled for this day</div>}
                </div>
              </div>
            )}

            {view === "week" && (
              <div className="p-4">
                <div className="grid grid-cols-7 gap-4">
                  {weekDays.map((day, index) => (
                    <div key={index} className="border rounded-md">
                      <div
                        className={`p-2 text-center font-medium ${isSameDay(day, new Date()) ? "bg-blue-100 text-blue-800" : "bg-gray-50"}`}
                      >
                        <div>{format(day, "EEE")}</div>
                        <div>{format(day, "d")}</div>
                      </div>
                      <div className="p-2 h-[300px] overflow-y-auto">
                        {filteredTasks
                          .filter(
                            (task) =>
                              isSameDay(task.startDate, day) ||
                              isSameDay(task.endDate, day) ||
                              (task.startDate <= day && task.endDate >= day),
                          )
                          .map((task) => (
                            <div
                              key={task.id}
                              className={`mb-2 p-2 rounded-md text-xs cursor-pointer ${
                                task.status === "completed"
                                  ? "bg-green-100 border-l-4 border-green-500"
                                  : task.status === "in-progress"
                                    ? "bg-blue-100 border-l-4 border-blue-500"
                                    : task.status === "delayed"
                                      ? "bg-red-100 border-l-4 border-red-500"
                                      : "bg-gray-100 border-l-4 border-gray-500"
                              }`}
                              onClick={() => handleTaskClick(task)}
                            >
                              <div className="font-medium truncate">{task.title}</div>
                              <div className="text-xs text-gray-600 truncate">{task.project}</div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {view === "month" && (
              <div className="p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  className="rounded-md border"
                  classNames={{
                    day_today: "bg-blue-100 text-blue-900 font-bold",
                  }}
                />
              </div>
            )}

            {view === "list" && (
              <div className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTasks.map((task) => (
                      <TableRow
                        key={task.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleTaskClick(task)}
                      >
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell>{task.project}</TableCell>
                        <TableCell>{task.assignedTo}</TableCell>
                        <TableCell>
                          {format(task.startDate, "dd MMM")} - {format(task.endDate, "dd MMM")}
                        </TableCell>
                        <TableCell>{getStatusBadge(task.status)}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              task.priority === "high"
                                ? "border-red-500 text-red-700"
                                : task.priority === "medium"
                                  ? "border-amber-500 text-amber-700"
                                  : "border-blue-500 text-blue-700"
                            }
                          >
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredTasks.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No tasks found matching your criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dialogs */}
        <NewTaskDialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen} />

        {selectedTask && (
          <TaskDetailsDialog open={isTaskDetailsOpen} onOpenChange={setIsTaskDetailsOpen} task={selectedTask} />
        )}
      </div>
    </div>
  )
}

