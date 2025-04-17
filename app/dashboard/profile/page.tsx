'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Mail, Phone, MapPin, Building, Briefcase, ArrowLeft, FileText, Award, Users, HardHat, IndianRupee, Calendar } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const user = {
  name: "Code Brigade Construction Pvt. Ltd.",
  email: "info@codebrigade.in",
  phone: "+91 98765 43210",
  role: "Construction Management Company",
  department: "Head Office",
  location: "Mumbai, Maharashtra",
  address: "Bandra Kurla Complex, Mumbai - 400051",
  gst: "27AABCC1234D1Z5",
  pan: "AABCC1234D",
  cin: "U45200MH2020PTC123456",
  website: "www.codebrigade.in",
  about: "Code Brigade is a leading construction management company based in Mumbai, specializing in commercial and residential projects across India. With over 15 years of experience, we have successfully completed numerous landmark projects in major Indian cities.",
  projects: [
    {
      name: "Lakshmi Tech Park",
      location: "Pune, Maharashtra",
      type: "Commercial",
      status: "In Progress",
      startDate: "2023-01-15",
      endDate: "2025-06-30",
      budget: "₹250 Crore",
      progress: 45,
    },
    {
      name: "Ganga Residency",
      location: "Noida, Uttar Pradesh",
      type: "Residential",
      status: "Completed",
      startDate: "2021-03-01",
      endDate: "2023-12-31",
      budget: "₹180 Crore",
      progress: 100,
    },
    {
      name: "Mumbai-Pune Highway Extension",
      location: "Maharashtra",
      type: "Infrastructure",
      status: "In Progress",
      startDate: "2022-07-01",
      endDate: "2024-12-31",
      budget: "₹500 Crore",
      progress: 60,
    },
    {
      name: "Ganesh Shopping Mall",
      location: "Bangalore, Karnataka",
      type: "Commercial",
      status: "Planning",
      startDate: "2024-01-01",
      endDate: "2026-12-31",
      budget: "₹350 Crore",
      progress: 10,
    },
  ],
  team: [
    {
      name: "Rajesh Kumar",
      role: "Project Manager",
      department: "Construction",
      contact: "+91 98765 43211",
    },
    {
      name: "Priya Sharma",
      role: "Architect",
      department: "Design",
      contact: "+91 98765 43212",
    },
    {
      name: "Amit Verma",
      role: "Site Engineer",
      department: "Construction",
      contact: "+91 98765 43213",
    },
    {
      name: "Deepak Joshi",
      role: "Quality Manager",
      department: "Quality Control",
      contact: "+91 98765 43214",
    },
  ],
  certifications: [
    {
      name: "ISO 9001:2015",
      issuer: "Bureau of Indian Standards",
      date: "2022-01-15",
      validUntil: "2025-01-14",
    },
    {
      name: "Green Building Certification",
      issuer: "Indian Green Building Council",
      date: "2021-06-20",
      validUntil: "2024-06-19",
    },
    {
      name: "Safety Excellence Award",
      issuer: "Construction Industry Development Council",
      date: "2023-03-10",
      validUntil: "2026-03-09",
    },
  ],
  documents: [
    {
      name: "Company Registration Certificate",
      type: "PDF",
      size: "2.5 MB",
      uploaded: "2020-01-15",
    },
    {
      name: "GST Registration Certificate",
      type: "PDF",
      size: "1.8 MB",
      uploaded: "2020-01-20",
    },
    {
      name: "Latest Financial Statement",
      type: "PDF",
      size: "3.2 MB",
      uploaded: "2023-03-31",
    },
  ],
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Company Profile</h1>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        <div className="grid gap-6">
          {/* Company Overview */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/company-logo.png" alt={user.name} />
                    <AvatarFallback>CB</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="icon" className="absolute bottom-0 right-0 rounded-full" variant="secondary">
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.role}</p>
                  <p className="text-sm text-muted-foreground">{user.about}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Location</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p>{user.location}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Address</Label>
                  <p>{user.address}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Contact</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p>{user.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p>{user.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Registration Details</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">GST</p>
                      <p>{user.gst}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">PAN</p>
                      <p>{user.pan}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">CIN</p>
                      <p>{user.cin}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.certifications.map((cert, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{cert.name}</h3>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      </div>
                      <Badge variant="outline">Valid</Badge>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>Issued: {cert.date}</p>
                      <p>Valid Until: {cert.validUntil}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardHat className="h-5 w-5" />
                Current Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.projects.map((project, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">{project.location}</p>
                      </div>
                      <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p>{project.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Budget</p>
                        <p>{project.budget}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Start Date</p>
                        <p>{project.startDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">End Date</p>
                        <p>{project.endDate}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Key Team Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {user.team.map((member, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.department}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{member.contact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Company Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.documents.map((doc, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <p className="text-sm text-muted-foreground">Uploaded: {doc.uploaded}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>{doc.type}</p>
                        <p>{doc.size}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 