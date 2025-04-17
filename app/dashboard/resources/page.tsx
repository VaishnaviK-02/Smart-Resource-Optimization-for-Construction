"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  Download,
  Plus,
  Search,
  Package,
  Users,
  HardHat,
  Wrench,
  ArrowUpDown,
  MoreHorizontal,
  FileDown,
  Pencil,
  Trash2,
  Phone,
  Mail,
  Building2,
  MapPin,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { AddResourceDialog } from "@/components/resources/add-resource-dialog"
import { ResourceDetailsDialog } from "@/components/resources/resource-details-dialog"
import { format } from "date-fns"
import Link from "next/link"

// Mock data for resources
const materials = [
  {
    id: 1,
    name: "Cement (OPC 53 Grade)",
    category: "Construction Materials",
    quantity: 2500,
    unit: "Bags",
    available: 1800,
    allocated: 1200,
    supplier: {
      name: "Ultratech Cement Ltd.",
      contact: "+91 98765 43216",
      email: "sales@ultratech.com",
      address: "Bangalore, Karnataka"
    },
    lastUpdated: "2025-04-02",
    status: "adequate",
    cost: 380,
    location: "Main Warehouse",
  },
  {
    id: 2,
    name: "TMT Steel Bars (12mm)",
    category: "Construction Materials",
    quantity: 15000,
    unit: "Kg",
    available: 8500,
    allocated: 6500,
    supplier: {
      name: "JSW Steel Ltd.",
      contact: "+91 98765 43215",
      email: "orders@jswsteel.com",
      address: "Mumbai, Maharashtra"
    },
    lastUpdated: "2025-04-01",
    status: "adequate",
    cost: 65,
    location: "Steel Yard",
  },
  {
    id: 3,
    name: "Bricks (Red Clay)",
    category: "Construction Materials",
    quantity: 50000,
    unit: "Pieces",
    available: 22000,
    allocated: 28000,
    supplier: {
      name: "Lakshmi Brick Works",
      contact: "+91 98765 43221",
      email: "orders@lakshmibricks.com",
      address: "Bangalore Rural, Karnataka"
    },
    lastUpdated: "2025-03-28",
    status: "low",
    cost: 8,
    location: "Site Storage",
  },
  {
    id: 4,
    name: "Sand (River)",
    category: "Construction Materials",
    quantity: 500,
    unit: "Cubic Meters",
    available: 120,
    allocated: 380,
    supplier: {
      name: "Krishna River Aggregates",
      contact: "+91 98765 43214",
      email: "sales@krishnaaggregates.com",
      address: "Bangalore, Karnataka"
    },
    lastUpdated: "2025-03-30",
    status: "low",
    cost: 1800,
    location: "Sand Depot",
  },
  {
    id: 5,
    name: "Ready Mix Concrete (M25)",
    category: "Construction Materials",
    quantity: 350,
    unit: "Cubic Meters",
    available: 350,
    allocated: 0,
    supplier: {
      name: "RMC India Ltd.",
      contact: "+91 98765 43213",
      email: "sales@rmcindia.com",
      address: "Bangalore, Karnataka"
    },
    lastUpdated: "2025-04-03",
    status: "adequate",
    cost: 6500,
    location: "On Demand",
  },
  {
    id: 6,
    name: "Electrical Wiring (2.5 sq mm)",
    category: "Electrical",
    quantity: 8000,
    unit: "Meters",
    available: 5200,
    allocated: 2800,
    supplier: {
      name: "Havells India Ltd.",
      contact: "+91 98765 43212",
      email: "sales@havells.com",
      address: "Bangalore, Karnataka"
    },
    lastUpdated: "2025-03-25",
    status: "adequate",
    cost: 28,
    location: "Electrical Store",
  },
  {
    id: 7,
    name: "PVC Pipes (4 inch)",
    category: "Plumbing",
    quantity: 1200,
    unit: "Meters",
    available: 450,
    allocated: 750,
    supplier: {
      name: "Finolex Pipes Ltd.",
      contact: "+91 98765 43211",
      email: "sales@finolexpipes.com",
      address: "Bangalore, Karnataka"
    },
    lastUpdated: "2025-03-22",
    status: "low",
    cost: 180,
    location: "Plumbing Store",
  },
]

const equipment = [
  {
    id: 1,
    name: "Excavator (JCB 3DX)",
    category: "Heavy Machinery",
    quantity: 3,
    available: 1,
    allocated: 2,
    condition: "good",
    lastMaintenance: "2025-03-15",
    nextMaintenance: "2025-05-15",
    operator: "Ramesh Yadav",
    location: "Lakshmi Tech Park",
    dailyRate: 12000,
    vendor: {
      name: "JCB",
      contact: "+91 98765 43210",
      email: "sales@jcb.com",
      address: "Bangalore, Karnataka"
    },
    status: "Partially Available",
  },
  {
    id: 2,
    name: "Concrete Mixer (7/5)",
    category: "Construction Equipment",
    quantity: 5,
    available: 2,
    allocated: 3,
    condition: "fair",
    lastMaintenance: "2025-03-10",
    nextMaintenance: "2025-04-10",
    operator: "Various",
    location: "Equipment Yard",
    dailyRate: 2500,
    vendor: {
      name: "Schwing Stetter",
      contact: "+91 98765 43209",
      email: "support@schwing.co.in",
      address: "Chennai, Tamil Nadu"
    },
    status: "Available",
  },
  {
    id: 3,
    name: "Tower Crane (Potain MCT 85)",
    category: "Heavy Machinery",
    quantity: 1,
    available: 0,
    allocated: 1,
    condition: "excellent",
    lastMaintenance: "2025-03-20",
    nextMaintenance: "2025-05-20",
    operator: "Sunil Patil",
    location: "Lakshmi Tech Park",
    dailyRate: 25000,
    vendor: {
      name: "Potain",
      contact: "+91 98765 43208",
      email: "rentals@potain.com",
      address: "Delhi, NCR"
    },
    status: "All Allocated",
  },
  {
    id: 4,
    name: "Concrete Pump",
    category: "Construction Equipment",
    quantity: 2,
    available: 1,
    allocated: 1,
    condition: "good",
    lastMaintenance: "2025-03-25",
    nextMaintenance: "2025-04-25",
    operator: "Ajay Kumar",
    location: "Ganga Residency",
    dailyRate: 8000,
    vendor: {
      name: "Schwing Stetter",
      contact: "+91 98765 43207",
      email: "support@schwing.co.in",
      address: "Chennai, Tamil Nadu"
    },
    status: "Available",
  },
  {
    id: 5,
    name: "Generator (100 KVA)",
    category: "Power Equipment",
    quantity: 4,
    available: 1,
    allocated: 3,
    condition: "good",
    lastMaintenance: "2025-03-18",
    nextMaintenance: "2025-04-18",
    operator: "Various",
    location: "Multiple Sites",
    dailyRate: 5000,
    vendor: {
      name: "Generators India",
      contact: "+91 98765 43206",
      email: "sales@generatorsindia.com",
      address: "Bangalore, Karnataka"
    },
    status: "Partially Available",
  },
  {
    id: 6,
    name: "Scaffolding Set",
    category: "Construction Equipment",
    quantity: 20,
    available: 5,
    allocated: 15,
    condition: "fair",
    lastMaintenance: "2025-03-05",
    nextMaintenance: "2025-05-05",
    operator: "N/A",
    location: "Equipment Yard",
    dailyRate: 1200,
    vendor: {
      name: "Scaffolders India",
      contact: "+91 98765 43205",
      email: "sales@scaffoldersindia.com",
      address: "Bangalore, Karnataka"
    },
    status: "Available",
  },
]

const labor = [
  {
    id: 1,
    name: "Skilled Masons",
    category: "Skilled Labor",
    quantity: 25,
    available: 8,
    allocated: 17,
    supervisor: "Rajesh Kumar",
    contact: "+91 98765 43230",
    location: "Multiple Sites",
    dailyWage: 850,
  },
  {
    id: 2,
    name: "Carpenters",
    category: "Skilled Labor",
    quantity: 15,
    available: 3,
    allocated: 12,
    supervisor: "Mohan Singh",
    contact: "+91 98765 43231",
    location: "Multiple Sites",
    dailyWage: 900,
  },
  {
    id: 3,
    name: "Electricians",
    category: "Skilled Labor",
    quantity: 12,
    available: 4,
    allocated: 8,
    supervisor: "Anand Sharma",
    contact: "+91 98765 43232",
    location: "Multiple Sites",
    dailyWage: 950,
  },
  {
    id: 4,
    name: "Plumbers",
    category: "Skilled Labor",
    quantity: 10,
    available: 2,
    allocated: 8,
    supervisor: "Suresh Patel",
    contact: "+91 98765 43233",
    location: "Multiple Sites",
    dailyWage: 900,
  },
  {
    id: 5,
    name: "General Workers",
    category: "Unskilled Labor",
    quantity: 50,
    available: 12,
    allocated: 38,
    supervisor: "Vikram Singh",
    contact: "+91 98765 43234",
    location: "Multiple Sites",
    dailyWage: 600,
  },
  {
    id: 6,
    name: "Painters",
    category: "Skilled Labor",
    quantity: 8,
    available: 5,
    allocated: 3,
    supervisor: "Deepak Joshi",
    contact: "+91 98765 43235",
    location: "Ganesh Shopping Mall",
    dailyWage: 850,
  },
]

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("materials")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [isAddResourceDialogOpen, setIsAddResourceDialogOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState<any>(null)
  const [isResourceDetailsOpen, setIsResourceDetailsOpen] = useState(false)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortData = (data: any[]) => {
    return [...data].sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return sortDirection === "asc" ? (aValue > bValue ? 1 : -1) : aValue < bValue ? 1 : -1
    })
  }

  const filterData = (data: any[]) => {
    if (!searchQuery) return sortData(data)

    return sortData(
      data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.supplier && item.supplier.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase())),
      ),
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "adequate":
        return <Badge className="bg-green-500">Adequate</Badge>
      case "low":
        return <Badge className="bg-amber-500">Low Stock</Badge>
      case "critical":
        return <Badge className="bg-red-500">Critical</Badge>
      case "In Stock":
        return <Badge className="bg-green-500">In Stock</Badge>
      case "Out of Stock":
        return <Badge className="bg-red-500">Out of Stock</Badge>
      case "Available":
        return <Badge className="bg-green-500">Available</Badge>
      case "Partially Available":
        return <Badge className="bg-amber-500">Partially Available</Badge>
      case "All Allocated":
        return <Badge className="bg-blue-500">All Allocated</Badge>
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

  const handleResourceClick = (resource: any) => {
    setSelectedResource(resource)
    setIsResourceDetailsOpen(true)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleExportResources = (resourceType?: string) => {
    // Determine which resources to export
    let dataToExport;
    const type = resourceType || activeTab;
    
    switch (type) {
      case "materials":
        dataToExport = materials;
        break;
      case "equipment":
        dataToExport = equipment;
        break;
      case "labor":
        dataToExport = labor;
        break;
      default:
        dataToExport = materials; // Default to materials if type not specified
    }

    // Convert to CSV format
    const headers = ['Name', 'Type', 'Status', 'Quantity', 'Unit Cost', 'Total Cost', 'Last Updated'];
    const csvContent = [
      headers.join(','),
      ...dataToExport.map(item => [
        item.name,
        item.category,
        item.status,
        item.quantity,
        item.cost,
        item.quantity * item.cost,
        item.lastUpdated
      ].join(','))
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-resources-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

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
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Resources</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full max-w-sm items-center md:flex">
              <Search className="absolute left-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search resources..."
                className="w-full rounded-md border border-gray-200 bg-white pl-8 shadow-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button variant="outline" onClick={() => handleExportResources()}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>

            <Button onClick={() => setIsAddResourceDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          </div>
        </div>

        {/* Resource Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-foreground">Total Materials</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{materials.length} Types</div>
                <p className="text-xs text-muted-foreground">
                  {materials.reduce((sum, item) => sum + item.quantity, 0)} Total Units
                </p>
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
                <CardTitle className="text-sm font-medium text-foreground">Equipment</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{equipment.length} Types</div>
                <p className="text-xs text-muted-foreground">
                  {equipment.reduce((sum, item) => sum + item.quantity, 0)} Total Units
                </p>
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
                <CardTitle className="text-sm font-medium text-foreground">Labor</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{labor.length} Teams</div>
                <p className="text-xs text-muted-foreground">
                  {labor.reduce((sum, item) => sum + item.quantity, 0)} Total Workers
                </p>
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
                <CardTitle className="text-sm font-medium text-foreground">Total Value</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {formatCurrency(
                    materials.reduce((sum, item) => sum + item.quantity * item.cost, 0) +
                      equipment.reduce((sum, item) => sum + item.quantity * item.dailyRate * 30, 0),
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Estimated inventory value</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Resource Tables */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-foreground">Resource Management</h2>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="materials" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="materials" className="flex items-center">
                  <Package className="mr-2 h-4 w-4" />
                  Materials
                </TabsTrigger>
                <TabsTrigger value="equipment" className="flex items-center">
                  <Wrench className="mr-2 h-4 w-4" />
                  Equipment
                </TabsTrigger>
                <TabsTrigger value="labor" className="flex items-center">
                  <HardHat className="mr-2 h-4 w-4" />
                  Labor
                </TabsTrigger>
              </TabsList>

              <TabsContent value="materials" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="cursor-pointer text-foreground" onClick={() => handleSort("name")}>
                        <div className="flex items-center">Name</div>
                      </TableHead>
                      <TableHead className="text-foreground">Category</TableHead>
                      <TableHead className="text-foreground">Quantity</TableHead>
                      <TableHead className="text-foreground">Availability</TableHead>
                      <TableHead className="text-foreground">Status</TableHead>
                      <TableHead className="text-foreground">Supplier</TableHead>
                      <TableHead className="text-foreground">Contact</TableHead>
                      <TableHead className="text-right text-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterData(materials).map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium text-foreground">{material.name}</TableCell>
                        <TableCell className="text-foreground">{material.category}</TableCell>
                        <TableCell className="text-foreground">
                          {material.quantity} {material.unit}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Progress value={(material.available / material.quantity) * 100} className="h-2" />
                            <div className="text-xs text-muted-foreground">
                              {material.available} available / {material.allocated} allocated
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(material.status)}</TableCell>
                        <TableCell className="text-foreground">{material.supplier.name}</TableCell>
                        <TableCell>
                          <a href={`tel:${material.supplier.contact}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                            {material.supplier.contact}
                          </a>
                        </TableCell>
                        <TableCell className="text-right text-foreground">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleResourceClick(material)
                                }}
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleExportResources("materials")}>
                                <FileDown className="mr-2 h-4 w-4" />
                                Export
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="equipment" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterData(equipment).map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.quantity} Units</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Progress value={(item.available / item.quantity) * 100} className="h-2" />
                            <div className="text-xs text-gray-500">
                              {item.available} available / {item.allocated} allocated
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getConditionBadge(item.condition)}</TableCell>
                        <TableCell>{item.vendor.name}</TableCell>
                        <TableCell>
                          <a href={`tel:${item.vendor.contact}`} className="text-blue-600 hover:text-blue-800">
                            {item.vendor.contact}
                          </a>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleResourceClick(item)
                                }}
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleExportResources("equipment")}>
                                <FileDown className="mr-2 h-4 w-4" />
                                Export
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="labor" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Workers</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead>Supervisor</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Daily Wage</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterData(labor).map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.quantity} Workers</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Progress value={(item.available / item.quantity) * 100} className="h-2" />
                            <div className="text-xs text-gray-500">
                              {item.available} available / {item.allocated} allocated
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{item.supervisor}</TableCell>
                        <TableCell>
                          <a href={`tel:${item.contact}`} className="text-blue-600 hover:text-blue-800">
                            {item.contact}
                          </a>
                        </TableCell>
                        <TableCell>{formatCurrency(item.dailyWage)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleResourceClick(item)
                                }}
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleExportResources("labor")}>
                                <FileDown className="mr-2 h-4 w-4" />
                                Export
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Dialogs */}
        <AddResourceDialog
          open={isAddResourceDialogOpen}
          onOpenChange={setIsAddResourceDialogOpen}
          resourceType={activeTab}
        />

        {selectedResource && (
          <ResourceDetailsDialog
            open={isResourceDetailsOpen}
            onOpenChange={setIsResourceDetailsOpen}
            resource={selectedResource}
            resourceType={activeTab}
          />
        )}
      </div>
    </div>
  )
}

