import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GenerateQr from "@/services/GenerateQr";

export default function CreateQr() {
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    course: "",
    sectionYear: "",
  });

  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData(formData); 
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Student Registration</CardTitle>
          <CardDescription>Please fill in your student information</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                name="studentId"
                placeholder="e.g., 2023-12345"
                value={formData.studentId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select onValueChange={(value) => handleSelectChange("course", value)}>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select your course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Information Technology">Information Technology</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Business Administration">Business Administration</SelectItem>
                  <SelectItem value="Arts and Humanities">Arts and Humanities</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sectionYear">Section and Year</Label>
              <Input
                id="sectionYear"
                name="sectionYear"
                placeholder="e.g., BSIT-2023"
                value={formData.sectionYear}
                onChange={handleChange}
                required
              />
              <p className="text-sm text-muted-foreground">Format: Section-Year (e.g., BSIT-2023)</p>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full mt-2">
              Submit Registration
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Conditionally render the QR code after submission */}
      {submittedData && (
        <div className="mt-6">
          <GenerateQr formData={submittedData} />
        </div>
      )}
    </div>
  );
}
