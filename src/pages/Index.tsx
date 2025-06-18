
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Key, Clock, Database } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Lab Management System</h1>
              <p className="text-gray-600">University Laboratory Portal</p>
            </div>
            <nav className="flex space-x-4">
              <Link to="/book-room">
                <Button variant="ghost">Book Room</Button>
              </Link>
              <Link to="/door-access">
                <Button variant="ghost">Door Access</Button>
              </Link>
              <Link to="/schedule">
                <Button variant="ghost">Schedule</Button>
              </Link>
              <Link to="/backup">
                <Button variant="ghost">Data Backup</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to the Lab Management Portal
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manage your laboratory activities efficiently with our comprehensive system for room booking, access control, scheduling, and data management.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/book-room">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-blue-50 border-blue-200">
              <CardHeader className="text-center">
                <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-blue-800">Book a Room</CardTitle>
                <CardDescription>
                  Reserve meeting rooms and laboratory spaces for your research activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Start Booking
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/door-access">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-green-50 border-green-200">
              <CardHeader className="text-center">
                <Key className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">Door Access</CardTitle>
                <CardDescription>
                  Register for access to laboratory rooms and secure areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Register Access
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/schedule">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-purple-50 border-purple-200">
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-purple-800">View Schedule</CardTitle>
                <CardDescription>
                  Check meeting schedules and room availability across all facilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  View Schedule
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/backup">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-orange-50 border-orange-200">
              <CardHeader className="text-center">
                <Database className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle className="text-orange-800">Data Backup</CardTitle>
                <CardDescription>
                  Secure backup and storage solutions for your research data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Backup Data
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 bg-white rounded-lg shadow p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Laboratory Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">15</div>
              <div className="text-gray-600">Available Rooms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">48</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">127</div>
              <div className="text-gray-600">This Week's Bookings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">2.1TB</div>
              <div className="text-gray-600">Data Backed Up</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
