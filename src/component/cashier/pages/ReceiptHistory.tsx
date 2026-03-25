import { useState } from 'react';

const receiptsData = [
    { id: 'RCT-094', billId: 'BIL-094', table: 'Table 12', type: 'Dine-in', items: 3, amount: '₹1,240', method: 'UPI', time: '12:45 PM', customer: '—' },
    { id: 'RCT-093', billId: 'BIL-093', table: 'Table 5', type: 'Dine-in', items: 2, amount: '₹800', method: 'Cash', time: '12:30 PM', customer: '—' },
    { id: 'RCT-092', billId: 'BIL-092', table: 'Takeaway', type: 'Takeaway', items: 3, amount: '₹460', method: 'Card', time: '12:15 PM', customer: 'Amit K.' },
    { id: 'RCT-091', billId: 'BIL-091', table: 'Table 7', type: 'Dine-in', items: 4, amount: '₹1,560', method: 'Cash', time: '11:58 AM', customer: '—' },
    { id: 'RCT-090', billId: 'BIL-090', table: 'Table 3', type: 'Dine-in', items: 3, amount: '₹920', method: 'UPI', time: '11:40 AM', customer: '—' },
    { id: 'RCT-089', billId: 'BIL-089', table: 'Swiggy', type: 'Delivery', items: 2, amount: '₹520', method: 'Online', time: '11:22 AM', customer: 'Priya M.' },
    { id: 'RCT-088', billId: 'BIL-088', table: 'Takeaway', type: 'Takeaway', items: 2, amount: '₹460', method: 'Cash', time: '11:05 AM', customer: 'Vikram J.' },
    { id: 'RCT-087', billId: 'BIL-087', table: 'Zomato', type: 'Delivery', items: 3, amount: '₹890', method: 'Online', time: '10:48 AM', customer: 'Rahul S.' },
    { id: 'RCT-086', billId: 'BIL-086', table: 'Table 2', type: 'Dine-in', items: 5, amount: '₹2,100', method: 'Card', time: '10:30 AM', customer: '—' },
    { id: 'RCT-085', billId: 'BIL-085', table: 'Table 9', type: 'Dine-in', items: 3, amount: '₹780', method: 'UPI', time: '10:15 AM', customer: '—' },
];

const ReceiptHistory = () => {
    const [filter, setFilter] = useState<'all' | 'Cash' | 'UPI' | 'Card' | 'Online'>('all');
    const filtered = filter === 'all' ? receiptsData : receiptsData.filter(r => r.method === filter);

    const totalAmount = receiptsData.reduce((sum, r) => sum + parseInt(r.amount.replace(/[₹,]/g, '')), 0);

    return (
        <div className="mgr-page">
            {/* Stats */}
            <div className="grid4" style={{ marginBottom: 16, gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(129,140,248,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#818CF8' }}><i className="ri-receipt-line"></i></div>
                    <div><div className="kl">Total Receipts</div><div className="kv" style={{ fontSize: 22 }}>{receiptsData.length}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(52,211,153,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#34D399' }}><i className="ri-money-rupee-circle-line"></i></div>
                    <div><div className="kl">Total Collected</div><div className="kv" style={{ fontSize: 22 }}>₹{totalAmount.toLocaleString()}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#F59E0B' }}><i className="ri-bar-chart-grouped-line"></i></div>
                    <div><div className="kl">Avg Receipt</div><div className="kv" style={{ fontSize: 22 }}>₹{Math.round(totalAmount / receiptsData.length).toLocaleString()}</div></div>
                </div>
            </div>

            {/* Filters */}
            <div className="ko-filters" style={{ marginBottom: 16 }}>
                {(['all', 'Cash', 'UPI', 'Card', 'Online'] as const).map(f => (
                    <button key={f} className={`ko-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                        {f === 'all' ? 'All Methods' : f}
                    </button>
                ))}
            </div>

            {/* Receipts Table */}
            <div className="card">
                <div className="th" style={{ display: 'grid', gridTemplateColumns: '70px 70px 70px 70px 50px 90px 70px 80px 80px' }}>
                    <span>Receipt</span><span>Bill</span><span>Source</span><span>Type</span><span>Items</span><span>Amount</span><span>Method</span><span>Time</span><span>Actions</span>
                </div>
                {filtered.map(r => (
                    <div className="tr" key={r.id} style={{ display: 'grid', gridTemplateColumns: '70px 70px 70px 70px 50px 90px 70px 80px 80px' }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--tc)' }}>{r.id}</span>
                        <span style={{ fontSize: 10, color: 'var(--mt)' }}>{r.billId}</span>
                        <span style={{ fontSize: 11 }}>{r.table}</span>
                        <span style={{ fontSize: 10 }}>{r.type}</span>
                        <span style={{ fontSize: 11 }}>{r.items}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, fontFamily: 'Outfit' }}>{r.amount}</span>
                        <span className="pill" style={{ fontSize: 8, textAlign: 'center', background: r.method === 'Cash' ? 'rgba(52,211,153,0.12)' : r.method === 'UPI' ? 'rgba(129,140,248,0.12)' : r.method === 'Card' ? 'rgba(245,158,11,0.12)' : 'rgba(251,113,133,0.12)', color: r.method === 'Cash' ? '#34D399' : r.method === 'UPI' ? '#818CF8' : r.method === 'Card' ? '#F59E0B' : '#FB7185' }}>{r.method}</span>
                        <span style={{ fontSize: 10, color: 'var(--mt)' }}>{r.time}</span>
                        <div style={{ display: 'flex', gap: 4 }}>
                            <button className="btn-o" style={{ fontSize: 9, padding: '3px 8px' }}><i className="ri-eye-line"></i></button>
                            <button className="btn-o" style={{ fontSize: 9, padding: '3px 8px' }}><i className="ri-printer-line"></i></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReceiptHistory;
