import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Key } from "lucide-react";
import { Link } from "react-router-dom";
import { googleSheetsAPI } from "@/services/googleSheetsApi";

const accessAreas = [
  { id: "lab-a", name: "Chemistry Lab A", level: "Standard" },
  { id: "lab-b", name: "Physics Lab B", level: "Standard" },
  { id: "lab-c", name: "Research Lab C", level: "Restricted" },
  { id: "storage", name: "Equipment Storage", level: "Restricted" },
  { id: "clean-room", name: "Clean Room", level: "High Security" },
  { id: "server-room", name: "Server Room", level: "High Security" },
];

const DoorAccess = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    email: "",
    department: "",
    supervisor: "",
    reason: "",
    selectedAreas: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAreaChange = (areaId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedAreas: checked
        ? [...prev.selectedAreas, areaId]
        : prev.selectedAreas.filter(id => id !== areaId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.studentId || !formData.email || formData.selectedAreas.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select at least one access area.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await googleSheetsAPI.createAccessRequest(formData);

      toast({
        title: "Access Request Submitted!",
        description: "Your door access request has been submitted for approval. You will receive an email notification once processed.",
      });

      // Reset form
      setFormData({
        fullName: "",
        studentId: "",
        email: "",
        department: "",
        supervisor: "",
        reason: "",
        selectedAreas: [],
      });
    } catch (error) {
      console.error('Access request failed:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your access request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Key className="h-8 w-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Door Access Registration</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Access Request Form</CardTitle>
                <CardDescription>
                  Complete this form to request access to laboratory facilities and secure areas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="studentId">Student/Staff ID *</Label>
                      <Input
                        id="studentId"
                        value={formData.studentId}
                        onChange={(e) => handleInputChange("studentId", e.target.value)}
                        placeholder="Enter your ID number"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@university.edu"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={formData.department}
                        onChange={(e) => handleInputChange("department", e.target.value)}
                        placeholder="Your department/faculty"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="supervisor">Supervisor/Advisor</Label>
                    <Input
                      id="supervisor"
                      value={formData.supervisor}
                      onChange={(e) => handleInputChange("supervisor", e.target.value)}
                      placeholder="Name of your supervisor or advisor"
                    />
                  </div>

                  <div>
                    <Label htmlFor="reason">Reason for Access Request *</Label>
                    <Textarea
                      id="reason"
                      value={formData.reason}
                      onChange={(e) => handleInputChange("reason", e.target.value)}
                      placeholder="Explain why you need access to these areas..."
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-base font-medium">Request Access to Areas *</Label>
                    <div className="mt-3 space-y-3">
                      {accessAreas.map((area) => (
                        <div key={area.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={area.id}
                            checked={formData.selectedAreas.includes(area.id)}
                            onCheckedChange={(checked) => 
                              handleAreaChange(area.id, checked as boolean)
                            }
                          />
                          <Label htmlFor={area.id} className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <span>{area.name}</span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                area.level === "High Security" 
                                  ? "bg-red-100 text-red-800"
                                  : area.level === "Restricted"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}>
                                {area.level}
                              </span>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Access Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Information Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Access Levels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-800">Standard Access</div>
                  <div className="text-sm text-green-600">General lab areas, usually approved within 1-2 days</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="font-medium text-yellow-800">Restricted Access</div>
                  <div className="text-sm text-yellow-600">Specialized equipment areas, requires supervisor approval</div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="font-medium text-red-800">High Security</div>
                  <div className="text-sm text-red-600">Critical infrastructure, requires department head approval</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Important Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <p>• Access requests are typically processed within 3-5 business days</p>
                <p>• High security areas may require additional background verification</p>
                <p>• You will receive email notifications about your request status</p>
                <p>• Access cards must be returned when leaving the program</p>
                <p>• Report lost or stolen access cards immediately to security</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoorAccess;
