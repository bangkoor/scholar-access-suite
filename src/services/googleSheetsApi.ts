
const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';

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

  async createBooking(bookingData: Omit<BookingData, 'timestamp' | 'bookedBy'>) {
    const data = {
      ...bookingData,
      timestamp: new Date().toISOString(),
      bookedBy: 'Current User' // You can implement user authentication later
    };
    return this.makeRequest('createBooking', data);
  }

  async getBookings() {
    return this.makeRequest('getBookings', {});
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
