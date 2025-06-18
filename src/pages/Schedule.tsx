
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for bookings
const mockBookings = [
  {
    id: 1,
    room: "Lab A - Chemistry",
    date: "2024-01-15",
    startTime: "09:00",
    endTime: "11:00",
    bookedBy: "Dr. Smith",
    purpose: "Organic Chemistry Research",
    attendees: 8
  },
  {
    id: 2,
    room: "Conference Room 1",
    date: "2024-01-15",
    startTime: "14:00",
    endTime: "16:00",
    bookedBy: "Prof. Johnson",
    purpose: "Weekly Team Meeting",
    attendees: 12
  },
  {
    id: 3,
    room: "Lab B - Physics",
    date: "2024-01-16",
    startTime: "10:00",
    endTime: "12:00",
    bookedBy: "Dr. Williams",
    purpose: "Quantum Mechanics Experiment",
    attendees: 6
  },
  {
    id: 4,
    room: "Research Lab C",
    date: "2024-01-16",
    startTime: "13:00",
    endTime: "17:00",
    bookedBy: "Sarah Chen",
    purpose: "Data Analysis Session",
    attendees: 4
  },
  {
    id: 5,
    room: "Conference Room 2",
    date: "2024-01-17",
    startTime: "09:00",
    endTime: "10:30",
    bookedBy: "Dr. Brown",
    purpose: "Project Review",
    attendees: 5
  }
];

const rooms = [
  "All Rooms",
  "Lab A - Chemistry",
  "Lab B - Physics",
  "Conference Room 1",
  "Conference Room 2",
  "Research Lab C"
];

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedRoom, setSelectedRoom] = useState("All Rooms");

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const filteredBookings = mockBookings.filter(booking => {
    const matchesDate = booking.date === formatDate(selectedDate);
    const matchesRoom = selectedRoom === "All Rooms" || booking.room === selectedRoom;
    return matchesDate && matchesRoom;
  });

  const getUpcomingBookings = () => {
    const today = new Date();
    return mockBookings
      .filter(booking => new Date(booking.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
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
            <Clock className="h-8 w-8 text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Meeting Schedule</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Filter by Room</CardTitle>
              </CardHeader>
              <CardContent>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {rooms.map((room) => (
                    <option key={room} value={room}>
                      {room}
                    </option>
                  ))}
                </select>
              </CardContent>
            </Card>
          </div>

          {/* Schedule Display */}
          <div className="lg:col-span-3 space-y-6">
            {/* Selected Date Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Schedule for {selectedDate.toDateString()}
                </CardTitle>
                <CardDescription>
                  {selectedRoom === "All Rooms" ? "All rooms" : selectedRoom}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredBookings.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No meetings scheduled for this date and room filter.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{booking.room}</h3>
                          <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                            {booking.startTime} - {booking.endTime}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{booking.purpose}</p>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Booked by: {booking.bookedBy}</span>
                          <span>{booking.attendees} attendees</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Meetings */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Meetings</CardTitle>
                <CardDescription>
                  Next 5 scheduled meetings across all rooms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getUpcomingBookings().map((booking) => (
                    <div
                      key={booking.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{booking.room}</div>
                        <div className="text-sm text-gray-600">{booking.purpose}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {new Date(booking.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.startTime} - {booking.endTime}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Room Availability Today */}
            <Card>
              <CardHeader>
                <CardTitle>Room Availability Today</CardTitle>
                <CardDescription>
                  Quick overview of room availability for today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rooms.slice(1).map((room) => {
                    const todayBookings = mockBookings.filter(
                      booking => booking.room === room && booking.date === formatDate(new Date())
                    );
                    const isAvailable = todayBookings.length === 0;
                    
                    return (
                      <div
                        key={room}
                        className={`p-3 rounded-lg border ${
                          isAvailable 
                            ? "bg-green-50 border-green-200" 
                            : "bg-red-50 border-red-200"
                        }`}
                      >
                        <div className="font-medium">{room}</div>
                        <div className={`text-sm ${
                          isAvailable ? "text-green-600" : "text-red-600"
                        }`}>
                          {isAvailable ? "Available" : `${todayBookings.length} booking(s)`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Schedule;
