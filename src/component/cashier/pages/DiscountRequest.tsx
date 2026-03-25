import { useState } from 'react';

interface DiscountReq {
    id: string;
    orderId: string;
    table: string;
    reason: string;
    discountPct: number;
    originalAmount: string;
    discountAmount: string;
    finalAmount: string;
    time: string;
    status: 'pending' | 'approved' | 'rejected';
}

const DiscountRequest = () => {
    const [requests, setRequests] = useState<DiscountReq[]>([
        { id: 'DSC-060', orderId: '#ORD-901', table: 'Table 7', reason: 'Regular customer — loyalty discount', discountPct: 10, originalAmount: '₹1,176', discountAmount: '₹118', finalAmount: '₹1,058', time: '5 min ago', status: 'pending' },
        { id: 'DSC-059', orderId: '#ORD-898', table: 'Table 3', reason: 'Food quality complaint', discountPct: 15, originalAmount: '₹830', discountAmount: '₹125', finalAmount: '₹705', time: '20 min ago', status: 'approved' },
        { id: 'DSC-058', orderId: '#ORD-895', table: 'Table 5', reason: 'Birthday celebration', discountPct: 20, originalAmount: '₹840', discountAmount: '₹168', finalAmount: '₹672', time: '40 min ago', status: 'rejected' },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ orderId: '', table: '', reason: '', discountPct: 10 });

    const handleSubmit = () => {
        const newReq: DiscountReq = {
            id: `DSC-${61 + requests.length}`,
            orderId: formData.orderId || '#ORD-XXX',
            table: formData.table || 'Table X',
            reason: formData.reason || 'Customer request',
            discountPct: formData.discountPct,
            originalAmount: '₹1,000',
            discountAmount: `₹${formData.discountPct * 10}`,
            finalAmount: `₹${1000 - formData.discountPct * 10}`,
            time: 'Just now',
            status: 'pending',
        };
        setRequests([newReq, ...requests]);
        setShowForm(false);
        setFormData({ orderId: '', table: '', reason: '', discountPct: 10 });
    };

    const statusColor: any = { pending: '#FBBF24', approved: '#34D399', rejected: '#FB7185' };
    const statusBg: any = { pending: 'rgba(251,191,36,0.12)', approved: 'rgba(52,211,153,0.12)', rejected: 'rgba(251,113,133,0.12)' };

    return (
        <div className="mgr-page">
            {/* Stats */}
            <div className="grid4" style={{ marginBottom: 16, gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(251,191,36,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#FBBF24' }}><i className="ri-time-line"></i></div>
                    <div><div className="kl">Pending</div><div className="kv" style={{ fontSize: 22 }}>{requests.filter(r => r.status === 'pending').length}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(52,211,153,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#34D399' }}><i className="ri-checkbox-circle-line"></i></div>
                    <div><div className="kl">Approved</div><div className="kv" style={{ fontSize: 22 }}>{requests.filter(r => r.status === 'approved').length}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(251,113,133,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#FB7185' }}><i className="ri-close-circle-line"></i></div>
                    <div><div className="kl">Rejected</div><div className="kv" style={{ fontSize: 22 }}>{requests.filter(r => r.status === 'rejected').length}</div></div>
                </div>
            </div>

            {/* New Request Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
                <button className="btn" style={{ fontSize: 12 }} onClick={() => setShowForm(!showForm)}>
                    <i className="ri-add-line" style={{ marginRight: 4 }}></i>New Discount Request
                </button>
            </div>

            {/* New Request Form */}
            {showForm && (
                <div className="card" style={{ marginBottom: 14, borderLeft: '4px solid var(--tc)' }}>
                    <div className="ct" style={{ marginBottom: 12 }}>📝 New Discount Request</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 100px', gap: 10, marginBottom: 12 }}>
                        <div>
                            <label style={{ fontSize: 10, color: 'var(--mt)', display: 'block', marginBottom: 4 }}>Order ID</label>
                            <input className="set-inp" style={{ width: '100%' }} placeholder="#ORD-XXX" value={formData.orderId} onChange={e => setFormData({ ...formData, orderId: e.target.value })} />
                        </div>
                        <div>
                            <label style={{ fontSize: 10, color: 'var(--mt)', display: 'block', marginBottom: 4 }}>Table / Source</label>
                            <input className="set-inp" style={{ width: '100%' }} placeholder="Table 7" value={formData.table} onChange={e => setFormData({ ...formData, table: e.target.value })} />
                        </div>
                        <div>
                            <label style={{ fontSize: 10, color: 'var(--mt)', display: 'block', marginBottom: 4 }}>Reason</label>
                            <input className="set-inp" style={{ width: '100%' }} placeholder="Regular customer, complaint..." value={formData.reason} onChange={e => setFormData({ ...formData, reason: e.target.value })} />
                        </div>
                        <div>
                            <label style={{ fontSize: 10, color: 'var(--mt)', display: 'block', marginBottom: 4 }}>Discount %</label>
                            <input className="set-inp" style={{ width: '100%' }} type="number" min={1} max={100} value={formData.discountPct} onChange={e => setFormData({ ...formData, discountPct: parseInt(e.target.value) || 0 })} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <button className="btn-o" style={{ fontSize: 11 }} onClick={() => setShowForm(false)}>Cancel</button>
                        <button className="btn" style={{ fontSize: 11, background: '#10B981' }} onClick={handleSubmit}>
                            <i className="ri-send-plane-line" style={{ marginRight: 4 }}></i>Send to Manager
                        </button>
                    </div>
                </div>
            )}

            {/* Requests List */}
            <div style={{ display: 'grid', gap: 10 }}>
                {requests.map(r => (
                    <div className="card" key={r.id} style={{ borderLeft: `4px solid ${statusColor[r.status]}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <span style={{ fontFamily: 'Outfit', fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{r.id}</span>
                                    <span className="pill" style={{ fontSize: 8, background: statusBg[r.status], color: statusColor[r.status] }}>{r.status.toUpperCase()}</span>
                                    <span className="pill" style={{ fontSize: 8, background: 'rgba(129,140,248,0.12)', color: '#818CF8' }}>{r.discountPct}% OFF</span>
                                </div>
                                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)', marginBottom: 2 }}>{r.reason}</div>
                            </div>
                            <div style={{ fontSize: 10, color: 'var(--mt)' }}>{r.time}</div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8, padding: '8px 12px', background: 'var(--cr)', borderRadius: 8 }}>
                            <div><div style={{ fontSize: 9, color: 'var(--mt)', textTransform: 'uppercase' }}>Original</div><div style={{ fontSize: 14, fontWeight: 600, fontFamily: 'Outfit' }}>{r.originalAmount}</div></div>
                            <i className="ri-arrow-right-line" style={{ color: 'var(--mt)' }}></i>
                            <div><div style={{ fontSize: 9, color: 'var(--mt)', textTransform: 'uppercase' }}>Discount</div><div style={{ fontSize: 14, fontWeight: 600, fontFamily: 'Outfit', color: '#FB7185' }}>-{r.discountAmount}</div></div>
                            <i className="ri-arrow-right-line" style={{ color: 'var(--mt)' }}></i>
                            <div><div style={{ fontSize: 9, color: 'var(--mt)', textTransform: 'uppercase' }}>Final</div><div style={{ fontSize: 14, fontWeight: 600, fontFamily: 'Outfit', color: 'var(--tc)' }}>{r.finalAmount}</div></div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                            <span className="tag"><i className="ri-file-list-line" style={{ marginRight: 3, fontSize: 10 }}></i>{r.orderId}</span>
                            <span className="tag"><i className="ri-layout-grid-line" style={{ marginRight: 3, fontSize: 10 }}></i>{r.table}</span>
                            {r.status === 'pending' && (
                                <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--mt)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <i className="ri-loader-4-line" style={{ animation: 'spin 2s linear infinite' }}></i>Waiting for manager approval...
                                </span>
                            )}
                            {r.status === 'approved' && (
                                <span style={{ marginLeft: 'auto', fontSize: 10, color: '#34D399', fontWeight: 500 }}>✓ Manager approved</span>
                            )}
                            {r.status === 'rejected' && (
                                <span style={{ marginLeft: 'auto', fontSize: 10, color: '#FB7185', fontWeight: 500 }}>✗ Manager rejected</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiscountRequest;
