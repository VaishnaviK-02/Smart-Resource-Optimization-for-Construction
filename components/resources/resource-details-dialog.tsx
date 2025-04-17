"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Package,
  Wrench,
  Users,
  Building,
  MapPin,
  IndianRupee,
  Calendar,
  Loader2,
  Trash2,
  Edit,
  Save,
} from "lucide-react"

interface ResourceDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  resource: any
  resourceType: string
}

export function ResourceDetailsDialog({ open, onOpenChange, resource, resourceType }: ResourceDetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    ...resource,
  })

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "adequate":
        return <Badge className="bg-green-500">Adequate</Badge>
      case "low":
        return <Badge className="bg-amber-500">Low Stock</Badge>
      case "critical":
        return <Badge className="bg-red-500">Critical</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case "excellent":
        return <Badge className="bg-green-500">Excellent</Badge>
      case "good":
        return <Badge className="bg-blue-500">Good</Badge>
      case "fair":
        return <Badge className="bg-amber-500">Fair</Badge>
      case "poor":
        return <Badge className="bg-red-500">Poor</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
      // In a real app, you would update the resource data here
    }, 1500)
  }

  const handleDelete = () => {
    setIsDeleting(true)

    // Simulate API call
    setTimeout(() => {
      setIsDeleting(false)
      onOpenChange(false)
      // In a real app, you would delete the resource here
    }, 1500)
  }

  const getResourceIcon = () => {
    switch (resourceType) {
      case "materials":
        return <Package className="h-5 w-5 text-blue-500" />
      case "equipment":
        return <Wrench className="h-5 w-5 text-blue-500" />
      case "labor":
        return <Users className="h-5 w-5 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            {getResourceIcon()}
            <span className="ml-2">{resource.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Common fields for all resource types */}
          <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <div className="font-medium text-right text-gray-500">Category:</div>
            {isEditing ? (
              <Input
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="col-span-1"
              />
            ) : (
              <div>{resource.category}</div>
            )}
          </div>

          <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <div className="font-medium text-right text-gray-500">Quantity:</div>
            {isEditing ? (
              <Input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleChange("quantity", Number.parseInt(e.target.value))}
                className="col-span-1"
              />
            ) : (
              <div>
                {resource.quantity} {resourceType === "materials" ? resource.unit : "Units"}
              </div>
            )}
          </div>

          <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <div className="font-medium text-right text-gray-500">Availability:</div>
            <div className="w-full">
              <Progress value={(resource.available / resource.quantity) * 100} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{resource.available} available</span>
                <span>{resource.allocated} allocated</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <div className="font-medium text-right text-gray-500">Location:</div>
            {isEditing ? (
              <Input
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="col-span-1"
              />
            ) : (
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                {resource.location}
              </div>
            )}
          </div>

          {/* Material specific fields */}
          {resourceType === "materials" && (
            <>
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="font-medium text-right text-gray-500">Supplier:</div>
                {isEditing ? (
                  <Input
                    value={formData.supplier}
                    onChange={(e) => handleChange("supplier", e.target.value)}
                    className="col-span-1"
                  />
                ) : (
                  <div className="flex items-center">
                    <Building className="mr-2 h-4 w-4 text-gray-500" />
                    {resource.supplier}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="font-medium text-right text-gray-500">Unit Cost:</div>
                {isEditing ? (
                  <Input
                    type="number"
                    value={formData.cost}
                    onChange={(e) => handleChange("cost", Number.parseInt(e.target.value))}
                    className="col-span-1"
                  />
                ) : (
                  <div className="flex items-center">
                    <IndianRupee className="mr-2 h-4 w-4 text-gray-500" />
                    {formatCurrency(resource.cost)} per {resource.unit}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="font-medium text-right text-gray-500">Status:</div>
                {isEditing ? (
                  <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                    <SelectTrigger className="col-span-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adequate">Adequate</SelectItem>
                      <SelectItem value="low">Low Stock</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div>{getStatusBadge(resource.status)}</div>
                )}
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="font-medium text-right text-gray-500">Last Updated:</div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                  {resource.lastUpdated}
                </div>
              </div>
            </>
          )}

          {/* Equipment specific fields */}
          {resourceType === "equipment" && (
            <>
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="font-medium text-right text-gray-500">Condition:</div>
                {isEditing ? (
                  <Select value={formData.condition} onValueChange={(value) => handleChange("condition", value)}>
                    <SelectTrigger className="col-span-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div>{getConditionBadge(resource.condition)}</div>
                )}
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="font-medium text-right text-gray-500">Daily Rate:</div>
                {isEditing ? (
                  <Input
                    type="number"
                    value={formData.dailyRate}
                    onChange={(e) => handleChange("dailyRate", Number.parseInt(e.target.value))}
                    className="col-span-1"
                  />
                ) : (
                  <div className="flex items-center">
                    <IndianRupee className="mr-2 h-4 w-4 text-gray-500" />
                    {formatCurrency(resource.dailyRate)} per day
                  </div>
                )}
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="font-medium text-right text-gray-500">Operator:</div>
                {isEditing ? (
                  <Input
                    value={formData.operator}
                    onChange={(e) => handleChange("operator", e.target.value)}
                    className="col-span-1"
                  />
                ) : (
                  <div>{resource.operator}</div>
                )}
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="font-medium text-right text-gray-500">Maintenance:</div>
                <div className="text-sm">
                  <div>Last: {resource.lastMaintenance}</div>
                  <div>Next: {resource.nextMaintenance}</div>
                </div>
              </div>
            </>
          )}

          {/* Labor specific fields */}
          {resourceType === "labor" && (
            <>
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="font-medium text-right text-gray-500">Supervisor:</div>
                {isEditing ? (
                  <Input
                    value={formData.supervisor}
                    onChange={(e) => handleChange("supervisor", e.target.value)}
                    className="col-span-1"
                  />
                ) : (
                  <div>{resource.supervisor}</div>
                )}
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="font-medium text-right text-gray-500">Daily Wage:</div>
                {isEditing ? (
                  <Input
                    type="number"
                    value={formData.dailyWage}
                    onChange={(e) => handleChange("dailyWage", Number.parseInt(e.target.value))}
                    className="col-span-1"
                  />
                ) : (
                  <div className="flex items-center">
                    <IndianRupee className="mr-2 h-4 w-4 text-gray-500" />
                    {formatCurrency(resource.dailyWage)} per worker
                  </div>
                )}
              </div>
            </>
          )}

          {isEditing && (
            <div className="grid grid-cols-[120px_1fr] items-start gap-4">
              <div className="font-medium text-right text-gray-500">Notes:</div>
              <Textarea placeholder="Add notes or comments about this resource..." rows={3} />
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
                Edit Resource
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

