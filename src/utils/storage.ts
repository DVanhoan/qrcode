export interface AttendanceRecord {
    mssv: string;
    time: string;
}

const STORAGE_KEY = 'attendance_list';

export function saveAttendance(mssv: string) {
    const now = new Date();
    const time = now.toISOString().replace('T', ' ').substring(0, 19);
    const list = getAttendanceList();
    list.push({ mssv, time });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function getAttendanceList(): AttendanceRecord[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function clearAttendance() {
    localStorage.removeItem(STORAGE_KEY);
}

export function exportCSV() {
    const list = getAttendanceList();
    let csv = 'MSSV,ThoiGian\n';
    list.forEach(item => {
        csv += `${item.mssv},${item.time}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance.csv';
    a.click();
    URL.revokeObjectURL(url);
}
