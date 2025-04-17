"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, Clock, Info } from "lucide-react"

interface NotificationsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Resource Shortage Alert",
    message: "Concrete supply for Office Tower Phase 1 is running low. Please address within 48 hours.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "update",
    title: "Schedule Updated",
    message: "The schedule for Highway Extension has been updated with new milestones.",
    time: "Yesterday",
    read: false,
  },
  {
    id: 3,
    type: "alert",
    title: "Budget Overrun",
    message: "Residential Complex project is currently 8% over budget. Review required.",
    time: "2 days ago",
    read: false,
  },
  {
    id: 4,
    type: "info",
    title: "New Optimization Suggestion",
    message: "AI has identified potential savings in equipment allocation across projects.",
    time: "3 days ago",
    read: true,
  },
  {
    id: 5,
    type: "update",
    title: "Resource Allocation Updated",
    message: "Labor resources have been redistributed based on critical path analysis.",
    time: "1 week ago",
    read: true,
  },
]

export function NotificationsDialog({ open, onOpenChange }: NotificationsDialogProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [notificationsList, setNotificationsList] = useState(notifications)

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return notificationsList.filter((n) => !n.read)
      case "alerts":
        return notificationsList.filter((n) => n.type === "alert")
      case "updates":
        return notificationsList.filter((n) => n.type === "update")
      default:
        return notificationsList
    }
  }

  const markAllAsRead = () => {
    setNotificationsList((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const markAsRead = (id: number) => {
    setNotificationsList((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "update":
        return <Info className="h-5 w-5 text-blue-500" />
      case "info":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Notifications</DialogTitle>
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          </div>
          <DialogDescription>Stay updated on your projects and resources</DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 overflow-hidden flex flex-col"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              <Badge className="ml-1 bg-red-500 text-white" variant="secondary">
                {notificationsList.filter((n) => !n.read).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="flex-1 overflow-auto mt-4 -mx-6 px-6">
            <div className="space-y-4">
              {getFilteredNotifications().length > 0 ? (
                getFilteredNotifications().map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${notification.read ? "bg-white" : "bg-blue-50 border-blue-100"}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">No notifications found</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

