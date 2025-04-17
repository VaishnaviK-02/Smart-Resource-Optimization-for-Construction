"use client"

import { Button } from "@/components/ui/button"
import { Filter, Calendar } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardHeaderProps {
  activeFilter: string
  setActiveFilter: (filter: string) => void
  dateRange: string
  setDateRange: (range: string) => void
}

export function DashboardHeader({ activeFilter, setActiveFilter, dateRange, setDateRange }: DashboardHeaderProps) {
  const filters = [
    { id: "all", label: "All Projects" },
    { id: "active", label: "Active Only" },
    { id: "delayed", label: "Delayed" },
    { id: "completed", label: "Completed" },
  ]

  const dateRanges = ["Apr 2025", "Mar 2025", "Feb 2025", "Jan 2025", "Q1 2025", "Q4 2024"]

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500">Monitor and optimize your construction resources</p>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Filter className="mr-2 h-4 w-4" />
              {filters.find((f) => f.id === activeFilter)?.label || "Filter"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter Projects</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {filters.map((filter) => (
              <DropdownMenuItem
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={activeFilter === filter.id ? "bg-gray-100" : ""}
              >
                {filter.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Calendar className="mr-2 h-4 w-4" />
              {dateRange}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Select Time Period</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {dateRanges.map((range) => (
              <DropdownMenuItem
                key={range}
                onClick={() => setDateRange(range)}
                className={dateRange === range ? "bg-gray-100" : ""}
              >
                {range}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

