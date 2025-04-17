"use client"

import { useState, useRef } from "react"
import { FileText, Upload, Download, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadedAt: string
  content: string
}

export default function DocumentsPage() {
  const downloadLinkRef = useRef<HTMLAnchorElement>(null)
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Project Requirements.pdf",
      type: "PDF",
      size: "2.5 MB",
      uploadedAt: "2024-04-01",
      content: "Project requirements document detailing the scope and specifications of the project."
    },
    {
      id: "2",
      name: "Technical Specifications.docx",
      type: "DOCX",
      size: "1.8 MB",
      uploadedAt: "2024-04-02",
      content: "Technical specifications document outlining the technical aspects of the project."
    },
    {
      id: "3",
      name: "User Manual.pdf",
      type: "PDF",
      size: "3.2 MB",
      uploadedAt: "2024-04-03",
      content: "User manual providing instructions for using the system."
    },
    {
      id: "4",
      name: "Project Timeline.xlsx",
      type: "XLSX",
      size: "1.5 MB",
      uploadedAt: "2024-04-04",
      content: "Excel spreadsheet containing the project timeline and milestones."
    },
    {
      id: "5",
      name: "Resource Allocation.pdf",
      type: "PDF",
      size: "2.1 MB",
      uploadedAt: "2024-04-05",
      content: "Document detailing the allocation of resources across different project phases."
    },
    {
      id: "6",
      name: "Risk Assessment.docx",
      type: "DOCX",
      size: "1.9 MB",
      uploadedAt: "2024-04-06",
      content: "Risk assessment document identifying potential project risks and mitigation strategies."
    },
    {
      id: "7",
      name: "Budget Report.pdf",
      type: "PDF",
      size: "2.8 MB",
      uploadedAt: "2024-04-07",
      content: "Detailed budget report for the current project phase."
    },
    {
      id: "8",
      name: "Quality Assurance Plan.docx",
      type: "DOCX",
      size: "2.3 MB",
      uploadedAt: "2024-04-08",
      content: "Quality assurance plan outlining testing and quality control procedures."
    },
    {
      id: "9",
      name: "Meeting Minutes.pdf",
      type: "PDF",
      size: "1.2 MB",
      uploadedAt: "2024-04-09",
      content: "Minutes from the latest project meeting."
    },
    {
      id: "10",
      name: "Project Status Report.pptx",
      type: "PPTX",
      size: "3.5 MB",
      uploadedAt: "2024-04-10",
      content: "PowerPoint presentation of the current project status."
    }
  ])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const newDocument: Document = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type.split("/")[1].toUpperCase(),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: new Date().toISOString().split("T")[0],
        content: "New document content"
      }
      setDocuments([...documents, newDocument])
      toast.success("Document uploaded successfully")
    }
  }

  const handleDownload = (document: Document) => {
    try {
      // Create a blob with the document content
      const blob = new Blob([document.content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      
      // Use the ref to set the download link
      if (downloadLinkRef.current) {
        downloadLinkRef.current.href = url
        downloadLinkRef.current.download = document.name
        downloadLinkRef.current.click()
      }
      
      // Clean up
      URL.revokeObjectURL(url)
      toast.success(`Downloaded ${document.name}`)
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download document')
    }
  }

  const handleDelete = (documentId: string) => {
    setDocuments(documents.filter((doc) => doc.id !== documentId))
    toast.success("Document deleted successfully")
  }

  return (
    <div className="container mx-auto p-6">
      {/* Hidden download link */}
      <a ref={downloadLinkRef} style={{ display: 'none' }} />
      
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Documents</h1>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            className="hidden"
            id="file-upload"
            onChange={handleFileUpload}
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {documents.map((document) => (
          <Card key={document.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="font-medium">{document.name}</h3>
                    <p className="text-sm text-gray-500">
                      {document.type} • {document.size} • Uploaded on{" "}
                      {document.uploadedAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDownload(document)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(document.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 