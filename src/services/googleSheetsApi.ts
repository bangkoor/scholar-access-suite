const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTNpdR5aCj4HDlBzQuv-FbrmBUm1zoCGMsyB3xoSuwiXy-rJzR234y1HuA05rVT8g0Sk0_Uw_7FhVDE/pub?gid=1237300131&single=true&output=csv';

export interface BookingData {
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  attendees: string;
  bookedBy: string;
  timestamp: string;
}

export interface AccessRequestData {
  fullName: string;
  studentId: string;
  email: string;
  department: string;
  supervisor: string;
  reason: string;
  selectedAreas: string[];
  timestamp: string;
  status: string;
}

export interface BackupData {
  fileName: string;
  description: string;
  timestamp: string;
  size: string;
  status: string;
}

class GoogleSheetsAPI {
  private async makeRequest(action: string, data: any) {
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          data
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private parseCSV(csvText: string): BookingData[] {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const booking: any = {};
      
      headers.forEach((header, index) => {
        booking[header.toLowerCase().replace(/\s+/g, '')] = values[index] || '';
      });
      
      return {
        room: booking.room || '',
        date: booking.date || '',
        startTime: booking.starttime || booking.start_time || '',
        endTime: booking.endtime || booking.end_time || '',
        purpose: booking.purpose || '',
        attendees: booking.attendees || '',
        bookedBy: booking.bookedby || booking.booked_by || '',
        timestamp: booking.timestamp || ''
      };
    });
  }

  async getBookingsFromCSV(): Promise<BookingData[]> {
    try {
      const response = await fetch(CSV_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.status}`);
      }
      const csvText = await response.text();
      return this.parseCSV(csvText);
    } catch (error) {
      console.error('Failed to fetch CSV data:', error);
      throw error;
    }
  }

  async createBooking(bookingData: Omit<BookingData, 'timestamp' | 'bookedBy'>) {
    const data = {
      ...bookingData,
      timestamp: new Date().toISOString(),
      bookedBy: 'Current User' // You can implement user authentication later
    };
    return this.makeRequest('createBooking', data);
  }

  async getBookings() {
    // First try to get from CSV, fallback to Apps Script
    try {
      const csvBookings = await this.getBookingsFromCSV();
      return { bookings: csvBookings };
    } catch (error) {
      console.error('CSV fetch failed, trying Apps Script:', error);
      return this.makeRequest('getBookings', {});
    }
  }

  async createAccessRequest(accessData: Omit<AccessRequestData, 'timestamp' | 'status'>) {
    const data = {
      ...accessData,
      timestamp: new Date().toISOString(),
      status: 'Pending'
    };
    return this.makeRequest('createAccessRequest', data);
  }

  async getAccessRequests() {
    return this.makeRequest('getAccessRequests', {});
  }

  async createBackup(backupData: Omit<BackupData, 'timestamp' | 'status'>) {
    const data = {
      ...backupData,
      timestamp: new Date().toISOString(),
      status: 'Completed'
    };
    return this.makeRequest('createBackup', data);
  }

  async getBackups() {
    return this.makeRequest('getBackups', {});
  }
}

export const googleSheetsAPI = new GoogleSheetsAPI();
