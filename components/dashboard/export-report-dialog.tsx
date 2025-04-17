"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, FileDown, Loader2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

interface ExportReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExportReportDialog({ open, onOpenChange }: ExportReportDialogProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [reportType, setReportType] = useState("resource-allocation")
  const [fileFormat, setFileFormat] = useState("pdf")
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])

  const projects = [
    { id: "office-tower", name: "Office Tower Phase 1" },
    { id: "residential", name: "Residential Complex" },
    { id: "highway", name: "Highway Extension" },
    { id: "shopping-mall", name: "Shopping Mall" },
  ]

  const handleProjectToggle = (projectId: string) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  const handleExport = async () => {
    setIsExporting(true)

    try {
      // Prepare the data for export
      const exportData = {
        reportType,
        projects: selectedProjects,
        dateRange,
        generatedAt: new Date().toISOString(),
      }

      // Generate file content based on format
      let content = '';
      let mimeType = '';
      let fileExtension = '';
      
      switch (fileFormat) {
        case 'json':
          content = JSON.stringify(exportData, null, 2);
          mimeType = 'application/json';
          fileExtension = 'json';
          break;
        case 'csv':
          content = `Report Type,Date Range,Projects\n${reportType},"${dateRange.from ? format(dateRange.from, 'LLL dd, y') : ''} - ${dateRange.to ? format(dateRange.to, 'LLL dd, y') : ''}","${selectedProjects.join(', ')}"`;
          mimeType = 'text/csv';
          fileExtension = 'csv';
          break;
        case 'pdf':
          // For PDF, we'll use a simple text representation for now
          // In a real app, you would use a PDF generation library
          content = `Report Type: ${reportType}\nDate Range: ${dateRange.from ? format(dateRange.from, 'LLL dd, y') : ''} - ${dateRange.to ? format(dateRange.to, 'LLL dd, y') : ''}\nProjects: ${selectedProjects.join(', ')}`;
          mimeType = 'text/plain';
          fileExtension = 'txt';
          break;
        case 'xlsx':
          // For Excel, we'll use a simple text representation for now
          // In a real app, you would use an Excel generation library
          content = `Report Type: ${reportType}\nDate Range: ${dateRange.from ? format(dateRange.from, 'LLL dd, y') : ''} - ${dateRange.to ? format(dateRange.to, 'LLL dd, y') : ''}\nProjects: ${selectedProjects.join(', ')}`;
          mimeType = 'text/plain';
          fileExtension = 'txt';
          break;
      }

      // Create blob and download
      const blob = new Blob([content], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${reportType}-${format(new Date(), 'yyyy-MM-dd')}.${fileExtension}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setIsExporting(false);
      onOpenChange(false);
    } catch (error) {
      console.error('Error exporting report:', error);
      alert('Failed to export report. Please try again.');
      setIsExporting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Export Report</DialogTitle>
          <DialogDescription>Generate and download reports for your projects.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="report-type" className="text-right">
              Report Type
            </Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger id="report-type" className="col-span-3">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="resource-allocation">Resource Allocation</SelectItem>
                <SelectItem value="project-status">Project Status</SelectItem>
                <SelectItem value="budget-analysis">Budget Analysis</SelectItem>
                <SelectItem value="carbon-footprint">Carbon Footprint</SelectItem>
                <SelectItem value="schedule-performance">Schedule Performance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file-format" className="text-right">
              File Format
            </Label>
            <Select value={fileFormat} onValueChange={setFileFormat}>
              <SelectTrigger id="file-format" className="col-span-3">
                <SelectValue placeholder="Select file format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="xlsx">Excel Spreadsheet</SelectItem>
                <SelectItem value="csv">CSV File</SelectItem>
                <SelectItem value="json">JSON Data</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Date Range</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="col-span-3 justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    "Select date range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="range" selected={dateRange} onSelect={setDateRange as any} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label className="text-right pt-2">Projects</Label>
            <div className="col-span-3 space-y-2">
              {projects.map((project) => (
                <div key={project.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`project-${project.id}`}
                    checked={selectedProjects.includes(project.id)}
                    onCheckedChange={() => handleProjectToggle(project.id)}
                  />
                  <label
                    htmlFor={`project-${project.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {project.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <FileDown className="mr-2 h-4 w-4" />
                Export Report
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

