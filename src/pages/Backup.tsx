
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Database, Upload, Download, Cloud } from "lucide-react";
import { Link } from "react-router-dom";

const backupHistory = [
  {
    id: 1,
    fileName: "Research_Data_2024_01_15.zip",
    size: "2.3 GB",
    date: "2024-01-15 14:30",
    status: "Completed",
    type: "Full Backup"
  },
  {
    id: 2,
    fileName: "Lab_Results_Jan_2024.tar.gz",
    size: "890 MB",
    date: "2024-01-12 09:15",
    status: "Completed",
    type: "Incremental"
  },
  {
    id: 3,
    fileName: "Experiment_Logs_Week2.zip",
    size: "1.1 GB",
    date: "2024-01-10 16:45",
    status: "Completed",
    type: "Selective"
  },
  {
    id: 4,
    fileName: "Project_Alpha_Data.zip",
    size: "3.7 GB",
    date: "2024-01-08 11:20",
    status: "Completed",
    type: "Full Backup"
  }
];

const Backup = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [backupName, setBackupName] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleBackup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select files to backup.",
        variant: "destructive",
      });
      return;
    }

    if (!backupName.trim()) {
      toast({
        title: "Missing Backup Name",
        description: "Please provide a name for your backup.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Backup Successful!",
        description: `Your files have been securely backed up as "${backupName}".`,
      });
      
      // Reset form
      setSelectedFiles(null);
      setBackupName("");
      setDescription("");
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }, 3000);
  };

  const handleDownload = (fileName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${fileName}...`,
    });
  };

  const calculateTotalSize = () => {
    if (!selectedFiles) return "0 MB";
    
    let totalBytes = 0;
    for (let i = 0; i < selectedFiles.length; i++) {
      totalBytes += selectedFiles[i].size;
    }
    
    const totalMB = totalBytes / (1024 * 1024);
    return totalMB > 1024 
      ? `${(totalMB / 1024).toFixed(2)} GB` 
      : `${totalMB.toFixed(2)} MB`;
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
            <Database className="h-8 w-8 text-orange-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Data Backup</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Backup Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Create New Backup
                </CardTitle>
                <CardDescription>
                  Upload and securely store your research data and files.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBackup} className="space-y-6">
                  <div>
                    <Label htmlFor="backup-name">Backup Name *</Label>
                    <Input
                      id="backup-name"
                      value={backupName}
                      onChange={(e) => setBackupName(e.target.value)}
                      placeholder="Enter a descriptive name for your backup"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="file-upload">Select Files *</Label>
                    <Input
                      id="file-upload"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="mt-1"
                      required
                    />
                    {selectedFiles && selectedFiles.length > 0 && (
                      <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          {selectedFiles.length} file(s) selected ({calculateTotalSize()})
                        </p>
                        <div className="mt-2 space-y-1">
                          {Array.from(selectedFiles).slice(0, 5).map((file, index) => (
                            <p key={index} className="text-xs text-blue-600">
                              • {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                            </p>
                          ))}
                          {selectedFiles.length > 5 && (
                            <p className="text-xs text-blue-600">
                              • ...and {selectedFiles.length - 5} more files
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add notes about this backup (experiment details, data type, etc.)"
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Cloud className="h-4 w-4 mr-2 animate-spin" />
                        Backing up...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Create Backup
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Backup History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="h-5 w-5 mr-2" />
                  Backup History
                </CardTitle>
                <CardDescription>
                  View and download your previous backups.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {backupHistory.map((backup) => (
                    <div
                      key={backup.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{backup.fileName}</h3>
                          <p className="text-sm text-gray-600">{backup.date}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(backup.fileName)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Size: {backup.size}</span>
                        <div className="flex space-x-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            backup.type === "Full Backup"
                              ? "bg-blue-100 text-blue-800"
                              : backup.type === "Incremental"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                          }`}>
                            {backup.type}
                          </span>
                          <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                            {backup.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Storage Info & Guidelines */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Storage Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">2.1 TB</div>
                  <div className="text-sm text-gray-600">Total Backed Up</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: "42%" }}></div>
                </div>
                <div className="text-sm text-gray-600 text-center">
                  4.8 TB available space remaining
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backup Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <p>• Regular backups are recommended weekly</p>
                <p>• Maximum file size: 10 GB per individual file</p>
                <p>• Supported formats: All common research file types</p>
                <p>• Data is encrypted during transfer and storage</p>
                <p>• Backups are retained for 2 years minimum</p>
                <p>• Use descriptive names for easy identification</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Database className="h-4 w-4 mr-2" />
                  Schedule Auto-Backup
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Bulk Download
                </Button>
                <Button variant="outline" className="w-full">
                  <Cloud className="h-4 w-4 mr-2" />
                  Cloud Sync Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Backup;
