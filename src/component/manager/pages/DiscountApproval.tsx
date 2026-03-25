import { useState } from 'react';

interface DiscountRequest {
    id: string;
    orderId: string;
    table: string;
    waiter: string;
    reason: string;
    originalAmount: string;
    discountPct: number;
    discountAmount: string;
    finalAmount: string;
    time: string;
    status: 'pending' | 'approved' | 'rejected';
}

const discountRequests: DiscountRequest[] = [
    { id: 'DSC-051', orderId: '#ORD-901', table: 'Table 7', waiter: 'Karan Joshi', reason: 'Regular customer — 10% loyalty discount', originalAmount: '₹1,040', discountPct: 10, discountAmount: '₹104', finalAmount: '₹936', time: '5 min ago', status: 'pending' },
    { id: 'DSC-050', orderId: '#ORD-899', table: 'Swiggy #S1122', waiter: 'System', reason: 'Delayed delivery — compensation', originalAmount: '₹520', discountPct: 15, discountAmount: '₹78', finalAmount: '₹442', time: '12 min ago', status: 'pending' },
    { id: 'DSC-049', orderId: '#ORD-898', table: 'Table 3', waiter: 'Priya Singh', reason: 'Customer birthday celebration', originalAmount: '₹680', discountPct: 20, discountAmount: '₹136', finalAmount: '₹544', time: '18 min ago', status: 'pending' },
    { id: 'DSC-048', orderId: '#ORD-896', table: 'Table 12', waiter: 'Karan Joshi', reason: 'Food complaint — partial refund', originalAmount: '₹800', discountPct: 25, discountAmount: '₹200', finalAmount: '₹600', time: '35 min ago', status: 'pending' },
    { id: 'DSC-047', orderId: '#ORD-894', table: 'Table 5', waiter: 'Priya Singh', reason: 'Corporate discount — agreement', originalAmount: '₹800', discountPct: 15, discountAmount: '₹120', finalAmount: '₹680', time: '1h ago', status: 'pending' },
    { id: 'DSC-046', orderId: '#ORD-890', table: 'Table 11', waiter: 'Karan Joshi', reason: 'Regular customer loyalty', originalAmount: '₹1,560', discountPct: 10, discountAmount: '₹156', finalAmount: '₹1,404', time: '2h ago', status: 'approved' },
    { id: 'DSC-045', orderId: '#ORD-885', table: 'Zomato #Z8799', waiter: 'System', reason: 'Wrong item sent — full item refund', originalAmount: '₹380', discountPct: 100, discountAmount: '₹380', finalAmount: '₹0', time: '3h ago', status: 'rejected' },
];

const DiscountApproval = () => {
    const [requests, setRequests] = useState(discountRequests);
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

    const filtered = filter === 'all' ? requests : requests.filter(r => r.status === filter);
    const pending = requests.filter(r => r.status === 'pending').length;
    const approved = requests.filter(r => r.status === 'approved').length;
    const rejected = requests.filter(r => r.status === 'rejected').length;
    const totalDiscount = requests.filter(r => r.status === 'approved').reduce((sum, r) => sum + parseInt(r.discountAmount.replace(/[₹,]/g, '')), 0);

    const handleAction = (id: string, action: 'approved' | 'rejected') => {
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
    };

    const statusColor: any = { pending: '#FBBF24', approved: '#34D399', rejected: '#FB7185' };
    const statusBg: any = { pending: 'rgba(251,191,36,0.12)', approved: 'rgba(52,211,153,0.12)', rejected: 'rgba(251,113,133,0.12)' };

    return (
        <div className="mgr-page">
            {/* Stats */}
            <div className="grid4" style={{ marginBottom: 16 }}>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(251,191,36,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#FBBF24' }}><i className="ri-time-line"></i></div>
                    <div><div className="kl">Pending</div><div className="kv" style={{ fontSize: 22 }}>{pending}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(52,211,153,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#34D399' }}><i className="ri-checkbox-circle-line"></i></div>
                    <div><div className="kl">Approved</div><div className="kv" style={{ fontSize: 22 }}>{approved}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(251,113,133,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#FB7185' }}><i className="ri-close-circle-line"></i></div>
                    <div><div className="kl">Rejected</div><div className="kv" style={{ fontSize: 22 }}>{rejected}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(129,140,248,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#818CF8' }}><i className="ri-money-rupee-circle-line"></i></div>
                    <div><div className="kl">Total Discount Given</div><div className="kv" style={{ fontSize: 22 }}>₹{totalDiscount.toLocaleString()}</div></div>
                </div>
            </div>

            {/* Filters */}
            <div className="ko-filters" style={{ marginBottom: 16 }}>
                {(['all', 'pending', 'approved', 'rejected'] as const).map(f => (
                    <button key={f} className={`ko-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Discount Cards */}
            <div style={{ display: 'grid', gap: 12 }}>
                {filtered.map(r => (
                    <div className="card" key={r.id} style={{ borderLeft: `4px solid ${statusColor[r.status]}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <span style={{ fontFamily: 'Outfit', fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{r.id}</span>
                                    <span className="pill" style={{ fontSize: 8, background: statusBg[r.status], color: statusColor[r.status] }}>{r.status.toUpperCase()}</span>
                                    <span className="pill" style={{ fontSize: 8, background: r.discountPct >= 25 ? 'rgba(251,113,133,0.12)' : r.discountPct >= 15 ? 'rgba(251,191,36,0.12)' : 'rgba(52,211,153,0.12)', color: r.discountPct >= 25 ? '#FB7185' : r.discountPct >= 15 ? '#FBBF24' : '#34D399' }}>{r.discountPct}% OFF</span>
                                </div>
                                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)', marginBottom: 2 }}>{r.reason}</div>
                            </div>
                            <div style={{ fontSize: 10, color: 'var(--mt)', flexShrink: 0 }}>{r.time}</div>
                        </div>

                        {/* Amount breakdown */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10, padding: '8px 12px', background: 'var(--cr)', borderRadius: 8 }}>
                            <div><div style={{ fontSize: 9, color: 'var(--mt)', textTransform: 'uppercase' }}>Original</div><div style={{ fontSize: 14, fontWeight: 600, fontFamily: 'Outfit', color: 'var(--ink)' }}>{r.originalAmount}</div></div>
                            <i className="ri-arrow-right-line" style={{ color: 'var(--mt)' }}></i>
                            <div><div style={{ fontSize: 9, color: 'var(--mt)', textTransform: 'uppercase' }}>Discount</div><div style={{ fontSize: 14, fontWeight: 600, fontFamily: 'Outfit', color: '#FB7185' }}>-{r.discountAmount}</div></div>
                            <i className="ri-arrow-right-line" style={{ color: 'var(--mt)' }}></i>
                            <div><div style={{ fontSize: 9, color: 'var(--mt)', textTransform: 'uppercase' }}>Final</div><div style={{ fontSize: 14, fontWeight: 600, fontFamily: 'Outfit', color: 'var(--tc)' }}>{r.finalAmount}</div></div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                            <span className="tag"><i className="ri-file-list-line" style={{ marginRight: 3, fontSize: 10 }}></i>{r.orderId}</span>
                            <span className="tag"><i className="ri-layout-grid-line" style={{ marginRight: 3, fontSize: 10 }}></i>{r.table}</span>
                            <span className="tag"><i className="ri-user-3-line" style={{ marginRight: 3, fontSize: 10 }}></i>{r.waiter}</span>

                            {r.status === 'pending' && (
                                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                                    <button className="btn-o" style={{ fontSize: 11, padding: '5px 14px', borderColor: '#FB7185', color: '#FB7185' }} onClick={() => handleAction(r.id, 'rejected')}>
                                        <i className="ri-close-line" style={{ marginRight: 3 }}></i>Reject
                                    </button>
                                    <button className="btn" style={{ fontSize: 11, padding: '5px 14px', background: '#34D399' }} onClick={() => handleAction(r.id, 'approved')}>
                                        <i className="ri-check-line" style={{ marginRight: 3 }}></i>Approve
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiscountApproval;
