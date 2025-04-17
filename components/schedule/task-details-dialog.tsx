"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  Clock,
  Users,
  Building,
  CheckCircle2,
  AlertTriangle,
  Clock4,
  Loader2,
  Trash2,
  Edit,
  Save,
} from "lucide-react"
import { format } from "date-fns"

interface TaskDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: any
}

export function TaskDetailsDialog({ open, onOpenChange, task }: TaskDetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [status, setStatus] = useState(task.status)
  const [completion, setCompletion] = useState(task.completion)
  const [notes, setNotes] = useState("")

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

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
      // In a real app, you would update the task data here
    }, 1500)
  }

  const handleDelete = () => {
    setIsDeleting(true)

    // Simulate API call
    setTimeout(() => {
      setIsDeleting(false)
      onOpenChange(false)
      // In a real app, you would delete the task here
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{task.title}</span>
            {getStatusBadge(status)}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <div className="font-medium text-right text-gray-500">Project:</div>
            <div className="flex items-center">
              <Building className="mr-2 h-4 w-4 text-gray-500" />
              {task.project}
            </div>
          </div>

          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <div className="font-medium text-right text-gray-500">Assigned To:</div>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-gray-500" />
              {task.assignedTo}
            </div>
          </div>

          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <div className="font-medium text-right text-gray-500">Timeline:</div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-gray-500" />
              {format(task.startDate, "dd MMM yyyy")} - {format(task.endDate, "dd MMM yyyy")}
            </div>
          </div>

          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <div className="font-medium text-right text-gray-500">Priority:</div>
            <div>
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
            </div>
          </div>

          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <div className="font-medium text-right text-gray-500">Description:</div>
            <div className="text-sm">{task.description}</div>
          </div>

          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <div className="font-medium text-right text-gray-500">Status:</div>
            {isEditing ? (
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div>{getStatusBadge(status)}</div>
            )}
          </div>

          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <div className="font-medium text-right text-gray-500">Completion:</div>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={completion}
                  onChange={(e) => setCompletion(Number.parseInt(e.target.value))}
                  className="flex-1"
                />
                <span>{completion}%</span>
              </div>
            ) : (
              <div className="w-full">
                <Progress value={completion} className="h-2" />
                <div className="text-right text-xs text-gray-500 mt-1">{completion}% complete</div>
              </div>
            )}
          </div>

          {isEditing && (
            <div className="grid grid-cols-[120px_1fr] items-start gap-4">
              <div className="font-medium text-right text-gray-500">Notes:</div>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes or comments about this task..."
                rows={3}
              />
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <div>
            {!isEditing && (
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </>
                )}
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Task
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

