import { useState } from 'react';

interface Complaint {
    id: string;
    customer: string;
    source: string;
    issue: string;
    description: string;
    time: string;
    status: 'open' | 'in-progress' | 'resolved';
    priority: 'high' | 'medium' | 'low';
    orderId?: string;
}

const complaintsData: Complaint[] = [
    { id: 'CMP-101', customer: 'Rahul Mehta', source: 'Zomato', issue: 'Cold food delivered', description: 'Butter chicken was cold when delivered. Delivery took 55 minutes.', time: '25 min ago', status: 'open', priority: 'high', orderId: '#ORD-896' },
    { id: 'CMP-100', customer: 'Sneha Rao', source: 'Dine-in (T7)', issue: 'Hair in food', description: 'Found hair in dal makhani. Very unhygienic experience.', time: '1h ago', status: 'open', priority: 'high' },
    { id: 'CMP-099', customer: 'Amit Patel', source: 'Swiggy', issue: 'Wrong item received', description: 'Ordered veg biryani but received chicken biryani. Customer is vegetarian.', time: '2h ago', status: 'in-progress', priority: 'high', orderId: '#ORD-885' },
    { id: 'CMP-098', customer: 'Priya Sharma', source: 'Dine-in (T3)', issue: 'Slow service', description: 'Waited 30 minutes for starters. No waiter visited table for water refill.', time: '3h ago', status: 'in-progress', priority: 'medium' },
    { id: 'CMP-097', customer: 'Vikram Joshi', source: 'Takeaway', issue: 'Missing items', description: 'Ordered 4 naan but received only 2. Raita was also missing.', time: '4h ago', status: 'resolved', priority: 'medium', orderId: '#ORD-880' },
    { id: 'CMP-096', customer: 'Meera Kulkarni', source: 'Google Review', issue: 'Rude staff', description: 'Waiter was very rude when asked about delay. Bad attitude.', time: '5h ago', status: 'resolved', priority: 'low' },
];

const Complaints = () => {
    const [filter, setFilter] = useState<'all' | 'open' | 'in-progress' | 'resolved'>('all');
    const filtered = filter === 'all' ? complaintsData : complaintsData.filter(c => c.status === filter);

    const open = complaintsData.filter(c => c.status === 'open').length;
    const inProgress = complaintsData.filter(c => c.status === 'in-progress').length;
    const resolved = complaintsData.filter(c => c.status === 'resolved').length;

    const priorityColor: any = { high: '#FB7185', medium: '#FBBF24', low: '#94A3B8' };
    const priorityBg: any = { high: 'rgba(251,113,133,0.12)', medium: 'rgba(251,191,36,0.12)', low: 'rgba(148,163,184,0.12)' };
    const statusColor: any = { open: '#FB7185', 'in-progress': '#F59E0B', resolved: '#34D399' };
    const statusBg: any = { open: 'rgba(251,113,133,0.12)', 'in-progress': 'rgba(245,158,11,0.12)', resolved: 'rgba(52,211,153,0.12)' };

    return (
        <div className="mgr-page">
            {/* Stats */}
            <div className="grid4" style={{ marginBottom: 16, gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(251,113,133,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#FB7185' }}><i className="ri-error-warning-line"></i></div>
                    <div><div className="kl">Open</div><div className="kv" style={{ fontSize: 22 }}>{open}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#F59E0B' }}><i className="ri-loader-4-line"></i></div>
                    <div><div className="kl">In Progress</div><div className="kv" style={{ fontSize: 22 }}>{inProgress}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(52,211,153,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#34D399' }}><i className="ri-checkbox-circle-line"></i></div>
                    <div><div className="kl">Resolved</div><div className="kv" style={{ fontSize: 22 }}>{resolved}</div></div>
                </div>
            </div>

            {/* Filters */}
            <div className="ko-filters" style={{ marginBottom: 16 }}>
                {(['all', 'open', 'in-progress', 'resolved'] as const).map(f => (
                    <button key={f} className={`ko-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                        {f === 'all' ? 'All' : f === 'in-progress' ? 'In Progress' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Complaint Cards */}
            <div style={{ display: 'grid', gap: 12 }}>
                {filtered.map(c => (
                    <div className="card" key={c.id} style={{ borderLeft: `4px solid ${statusColor[c.status]}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <span style={{ fontFamily: 'Outfit', fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{c.id}</span>
                                    <span className="pill" style={{ fontSize: 8, background: priorityBg[c.priority], color: priorityColor[c.priority] }}>{c.priority.toUpperCase()}</span>
                                    <span className="pill" style={{ fontSize: 8, background: statusBg[c.status], color: statusColor[c.status] }}>{c.status.toUpperCase()}</span>
                                </div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{c.issue}</div>
                                <div style={{ fontSize: 11, color: 'var(--mt)' }}>{c.description}</div>
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <div style={{ fontSize: 10, color: 'var(--mt)' }}>{c.time}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                            <span className="tag"><i className="ri-user-3-line" style={{ marginRight: 3, fontSize: 10 }}></i>{c.customer}</span>
                            <span className="tag"><i className="ri-map-pin-line" style={{ marginRight: 3, fontSize: 10 }}></i>{c.source}</span>
                            {c.orderId && <span className="tag" style={{ background: 'var(--tcm)', color: 'var(--tc)' }}><i className="ri-file-list-line" style={{ marginRight: 3, fontSize: 10 }}></i>{c.orderId}</span>}
                            {c.status === 'open' && (
                                <button className="btn" style={{ marginLeft: 'auto', fontSize: 11, padding: '5px 14px' }}>
                                    <i className="ri-play-circle-line" style={{ marginRight: 4 }}></i>Start Working
                                </button>
                            )}
                            {c.status === 'in-progress' && (
                                <button className="btn" style={{ marginLeft: 'auto', fontSize: 11, padding: '5px 14px', background: 'var(--sg)' }}>
                                    <i className="ri-checkbox-circle-line" style={{ marginRight: 4 }}></i>Mark Resolved
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Complaints;
