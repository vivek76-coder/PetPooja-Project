import { useState } from 'react';

interface StaffMember {
    name: string;
    role: string;
    shift: string;
    checkIn: string;
    checkOut: string;
    status: 'present' | 'absent' | 'late' | 'leave';
    avatar: string;
}

const staffData: StaffMember[] = [
    { name: 'Rajesh Sharma', role: 'Head Chef', shift: '8AM - 4PM', checkIn: '7:55 AM', checkOut: '—', status: 'present', avatar: 'RS' },
    { name: 'Sunil Patil', role: 'Sous Chef', shift: '8AM - 4PM', checkIn: '8:12 AM', checkOut: '—', status: 'late', avatar: 'SP' },
    { name: 'Priya Singh', role: 'Waitress', shift: '10AM - 6PM', checkIn: '9:58 AM', checkOut: '—', status: 'present', avatar: 'PS' },
    { name: 'Amit Verma', role: 'Waiter', shift: '10AM - 6PM', checkIn: '—', checkOut: '—', status: 'absent', avatar: 'AV' },
    { name: 'Meena Desai', role: 'Cashier', shift: '10AM - 6PM', checkIn: '9:50 AM', checkOut: '—', status: 'present', avatar: 'MD' },
    { name: 'Karan Joshi', role: 'Waiter', shift: '12PM - 8PM', checkIn: '11:55 AM', checkOut: '—', status: 'present', avatar: 'KJ' },
    { name: 'Anita Kulkarni', role: 'Cook', shift: '8AM - 4PM', checkIn: '8:00 AM', checkOut: '—', status: 'present', avatar: 'AK' },
    { name: 'Vikas Pawar', role: 'Cook', shift: '12PM - 8PM', checkIn: '12:05 PM', checkOut: '—', status: 'present', avatar: 'VP' },
    { name: 'Ritu Patel', role: 'Hostess', shift: '10AM - 6PM', checkIn: '—', checkOut: '—', status: 'leave', avatar: 'RP' },
    { name: 'Deepak Nair', role: 'Waiter', shift: '4PM - 12AM', checkIn: '—', checkOut: '—', status: 'present', avatar: 'DN' },
    { name: 'Sanjay Rao', role: 'Bartender', shift: '4PM - 12AM', checkIn: '3:50 PM', checkOut: '—', status: 'present', avatar: 'SR' },
    { name: 'Nisha Gupta', role: 'Waitress', shift: '4PM - 12AM', checkIn: '4:10 PM', checkOut: '—', status: 'late', avatar: 'NG' },
    { name: 'Mohan Das', role: 'Cleaner', shift: '6AM - 2PM', checkIn: '6:00 AM', checkOut: '2:00 PM', status: 'present', avatar: 'MD' },
    { name: 'Lata Iyer', role: 'Cleaner', shift: '2PM - 10PM', checkIn: '2:05 PM', checkOut: '—', status: 'present', avatar: 'LI' },
];

const StaffAttendance = () => {
    const [filter, setFilter] = useState<'all' | 'present' | 'absent' | 'late' | 'leave'>('all');
    const filtered = filter === 'all' ? staffData : staffData.filter(s => s.status === filter);

    const present = staffData.filter(s => s.status === 'present').length;
    const absent = staffData.filter(s => s.status === 'absent').length;
    const late = staffData.filter(s => s.status === 'late').length;
    const onLeave = staffData.filter(s => s.status === 'leave').length;

    const statusColor: any = { present: '#34D399', absent: '#FB7185', late: '#FBBF24', leave: '#818CF8' };
    const statusBg: any = { present: 'rgba(52,211,153,0.12)', absent: 'rgba(251,113,133,0.12)', late: 'rgba(251,191,36,0.12)', leave: 'rgba(129,140,248,0.12)' };

    return (
        <div className="mgr-page">
            {/* Stats */}
            <div className="grid4" style={{ marginBottom: 16 }}>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(52,211,153,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#34D399' }}><i className="ri-user-follow-line"></i></div>
                    <div><div className="kl">Present</div><div className="kv" style={{ fontSize: 22 }}>{present}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(251,113,133,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#FB7185' }}><i className="ri-user-unfollow-line"></i></div>
                    <div><div className="kl">Absent</div><div className="kv" style={{ fontSize: 22 }}>{absent}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(251,191,36,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#FBBF24' }}><i className="ri-time-line"></i></div>
                    <div><div className="kl">Late</div><div className="kv" style={{ fontSize: 22 }}>{late}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(129,140,248,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#818CF8' }}><i className="ri-calendar-close-line"></i></div>
                    <div><div className="kl">On Leave</div><div className="kv" style={{ fontSize: 22 }}>{onLeave}</div></div>
                </div>
            </div>

            {/* Attendance Table */}
            <div className="card">
                <div className="ch">
                    <div><div className="ct">Today's Attendance</div><div className="cs">{staffData.length} staff members</div></div>
                    <div className="ko-filters">
                        {(['all', 'present', 'absent', 'late', 'leave'] as const).map(f => (
                            <button key={f} className={`ko-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="th" style={{ display: 'grid', gridTemplateColumns: '40px 1fr 100px 100px 90px 90px 70px' }}>
                    <span></span><span>Name</span><span>Role</span><span>Shift</span><span>Check In</span><span>Check Out</span><span>Status</span>
                </div>
                {filtered.map(s => (
                    <div className="tr" key={s.name} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 100px 100px 90px 90px 70px' }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: statusBg[s.status], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 600, color: statusColor[s.status] }}>{s.avatar}</div>
                        <span style={{ fontSize: 12, fontWeight: 500 }}>{s.name}</span>
                        <span style={{ fontSize: 11, color: 'var(--mt)' }}>{s.role}</span>
                        <span style={{ fontSize: 11 }}>{s.shift}</span>
                        <span style={{ fontSize: 11, color: s.checkIn === '—' ? 'var(--mt)' : 'var(--ink)' }}>{s.checkIn}</span>
                        <span style={{ fontSize: 11, color: s.checkOut === '—' ? 'var(--mt)' : 'var(--ink)' }}>{s.checkOut}</span>
                        <span className="pill" style={{ fontSize: 9, textAlign: 'center', background: statusBg[s.status], color: statusColor[s.status] }}>{s.status.toUpperCase()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StaffAttendance;
