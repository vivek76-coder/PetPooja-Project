import { useState } from 'react';

interface PendingBill {
    id: string;
    table: string;
    type: 'Dine-in' | 'Takeaway' | 'Delivery';
    items: { name: string; qty: number; price: string }[];
    subtotal: string;
    tax: string;
    total: string;
    waiter: string;
    time: string;
    status: 'ready' | 'served';
}

const pendingBills: PendingBill[] = [
    { id: '#ORD-901', table: 'Table 7', type: 'Dine-in', items: [{ name: 'Butter Chicken', qty: 2, price: '₹640' }, { name: 'Garlic Naan', qty: 4, price: '₹240' }, { name: 'Mango Lassi', qty: 2, price: '₹240' }], subtotal: '₹1,120', tax: '₹56', total: '₹1,176', waiter: 'Karan J.', time: '5 min ago', status: 'served' },
    { id: '#ORD-898', table: 'Table 3', type: 'Dine-in', items: [{ name: 'Palak Paneer', qty: 1, price: '₹250' }, { name: 'Jeera Rice', qty: 2, price: '₹300' }, { name: 'Tandoori Roti', qty: 6, price: '₹240' }], subtotal: '₹790', tax: '₹40', total: '₹830', waiter: 'Priya S.', time: '12 min ago', status: 'served' },
    { id: '#ORD-896', table: 'Table 12', type: 'Dine-in', items: [{ name: 'Dal Makhani', qty: 2, price: '₹560' }, { name: 'Butter Naan', qty: 4, price: '₹240' }], subtotal: '₹800', tax: '₹40', total: '₹840', waiter: 'Karan J.', time: '20 min ago', status: 'served' },
    { id: '#ORD-897', table: 'Takeaway', type: 'Takeaway', items: [{ name: 'Chole Bhature', qty: 2, price: '₹360' }, { name: 'Lassi', qty: 2, price: '₹200' }], subtotal: '₹560', tax: '₹28', total: '₹588', waiter: '—', time: '15 min ago', status: 'ready' },
    { id: '#ORD-895', table: 'Table 5', type: 'Dine-in', items: [{ name: 'Mutton Rogan Josh', qty: 1, price: '₹420' }, { name: 'Chicken Biryani', qty: 1, price: '₹380' }], subtotal: '₹800', tax: '₹40', total: '₹840', waiter: 'Priya S.', time: '30 min ago', status: 'served' },
    { id: '#ORD-894', table: 'Table 11', type: 'Dine-in', items: [{ name: 'Paneer Butter Masala', qty: 2, price: '₹580' }, { name: 'Naan', qty: 6, price: '₹360' }, { name: 'Raita', qty: 2, price: '₹100' }], subtotal: '₹1,040', tax: '₹52', total: '₹1,092', waiter: 'Karan J.', time: '38 min ago', status: 'served' },
];

const BillingQueue = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <div className="mgr-page">
            {/* Stats */}
            <div className="grid4" style={{ marginBottom: 16, gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#F59E0B' }}><i className="ri-time-line"></i></div>
                    <div><div className="kl">Pending Bills</div><div className="kv" style={{ fontSize: 22 }}>{pendingBills.length}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(129,140,248,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#818CF8' }}><i className="ri-money-rupee-circle-line"></i></div>
                    <div><div className="kl">Total Pending Amount</div><div className="kv" style={{ fontSize: 22 }}>₹5,366</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(52,211,153,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#34D399' }}><i className="ri-checkbox-circle-line"></i></div>
                    <div><div className="kl">Oldest Pending</div><div className="kv" style={{ fontSize: 22 }}>38 min</div></div>
                </div>
            </div>

            {/* Bills List */}
            <div style={{ display: 'grid', gap: 10 }}>
                {pendingBills.map(bill => (
                    <div className="card" key={bill.id} style={{ borderLeft: `4px solid ${bill.status === 'served' ? '#34D399' : '#F59E0B'}`, cursor: 'pointer' }} onClick={() => setExpandedId(expandedId === bill.id ? null : bill.id)}>
                        {/* Header Row */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ fontFamily: 'Outfit', fontSize: 16, fontWeight: 700, color: 'var(--tc)' }}>{bill.id}</span>
                                <span className="tag"><i className="ri-layout-grid-line" style={{ marginRight: 3, fontSize: 10 }}></i>{bill.table}</span>
                                <span className="tag">{bill.type}</span>
                                <span className="pill" style={{ fontSize: 8, background: bill.status === 'served' ? 'rgba(52,211,153,0.12)' : 'rgba(245,158,11,0.12)', color: bill.status === 'served' ? '#34D399' : '#F59E0B' }}>{bill.status.toUpperCase()}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontFamily: 'Outfit', fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>{bill.total}</span>
                                <button className="btn" style={{ fontSize: 11, padding: '6px 16px' }}>
                                    <i className="ri-bank-card-line" style={{ marginRight: 4 }}></i>Collect Payment
                                </button>
                                <i className={`ri-arrow-${expandedId === bill.id ? 'up' : 'down'}-s-line`} style={{ color: 'var(--mt)', fontSize: 18 }}></i>
                            </div>
                        </div>

                        {/* Meta */}
                        <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 10, color: 'var(--mt)' }}>
                            <span><i className="ri-user-3-line" style={{ marginRight: 2 }}></i>Waiter: {bill.waiter}</span>
                            <span><i className="ri-time-line" style={{ marginRight: 2 }}></i>{bill.time}</span>
                        </div>

                        {/* Expanded: Items */}
                        {expandedId === bill.id && (
                            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed var(--dv)' }}>
                                {bill.items.map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 12 }}>
                                        <span style={{ color: 'var(--ink)' }}>{item.qty}× {item.name}</span>
                                        <span style={{ fontWeight: 500, fontFamily: 'Outfit' }}>{item.price}</span>
                                    </div>
                                ))}
                                <div style={{ borderTop: '1px solid var(--dv)', marginTop: 8, paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--mt)' }}><span>Subtotal</span><span>{bill.subtotal}</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--mt)' }}><span>Tax (GST 5%)</span><span>{bill.tax}</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 600, fontFamily: 'Outfit', color: 'var(--tc)', paddingTop: 6, borderTop: '1px solid var(--dv)' }}><span>Grand Total</span><span>{bill.total}</span></div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BillingQueue;
