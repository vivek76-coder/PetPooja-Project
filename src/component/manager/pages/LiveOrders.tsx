import { useState } from 'react';

interface OrderItem {
    name: string;
    qty: number;
    notes?: string;
}

interface Order {
    id: string;
    type: 'Dine-in' | 'Delivery' | 'Takeaway';
    platform?: string;
    table?: string;
    customer?: string;
    items: OrderItem[];
    time: string;
    status: 'new' | 'cooking' | 'ready' | 'served';
    amount: string;
}

const ordersData: Order[] = [
    { id: '#ORD-901', type: 'Dine-in', table: 'Table 7', items: [{ name: 'Butter Chicken', qty: 2 }, { name: 'Garlic Naan', qty: 4 }, { name: 'Mango Lassi', qty: 2, notes: 'Less sugar' }], time: 'Just now', status: 'new', amount: '₹1,040' },
    { id: '#ORD-900', type: 'Delivery', platform: 'Zomato #Z9341', customer: 'Rahul S.', items: [{ name: 'Chicken Biryani', qty: 2 }, { name: 'Raita', qty: 2 }], time: '3 min ago', status: 'new', amount: '₹890' },
    { id: '#ORD-899', type: 'Delivery', platform: 'Swiggy #S1122', customer: 'Priya M.', items: [{ name: 'Paneer Tikka', qty: 1 }, { name: 'Veg Biryani', qty: 1 }], time: '5 min ago', status: 'cooking', amount: '₹520' },
    { id: '#ORD-898', type: 'Dine-in', table: 'Table 3', items: [{ name: 'Palak Paneer', qty: 1 }, { name: 'Jeera Rice', qty: 2 }, { name: 'Tandoori Roti', qty: 6 }], time: '8 min ago', status: 'cooking', amount: '₹680' },
    { id: '#ORD-897', type: 'Takeaway', customer: 'Amit K.', items: [{ name: 'Chole Bhature', qty: 2 }, { name: 'Lassi', qty: 2 }], time: '12 min ago', status: 'cooking', amount: '₹460' },
    { id: '#ORD-896', type: 'Dine-in', table: 'Table 12', items: [{ name: 'Dal Makhani', qty: 2 }, { name: 'Butter Naan', qty: 4 }], time: '18 min ago', status: 'ready', amount: '₹800' },
    { id: '#ORD-895', type: 'Delivery', platform: 'Zomato #Z8800', customer: 'Sneha R.', items: [{ name: 'Chicken Curry', qty: 1 }, { name: 'Naan', qty: 2 }], time: '22 min ago', status: 'ready', amount: '₹420' },
    { id: '#ORD-894', type: 'Dine-in', table: 'Table 5', items: [{ name: 'Mutton Rogan Josh', qty: 1 }, { name: 'Biryani', qty: 1 }], time: '30 min ago', status: 'served', amount: '₹800' },
    { id: '#ORD-893', type: 'Takeaway', customer: 'Vikram J.', items: [{ name: 'Veg Burger', qty: 2 }, { name: 'Fries', qty: 2 }], time: '35 min ago', status: 'served', amount: '₹540' },
];

const LiveOrders = () => {
    const [filter, setFilter] = useState<'all' | 'new' | 'cooking' | 'ready' | 'served'>('all');
    const filtered = filter === 'all' ? ordersData : ordersData.filter(o => o.status === filter);

    const counts = {
        all: ordersData.length,
        new: ordersData.filter(o => o.status === 'new').length,
        cooking: ordersData.filter(o => o.status === 'cooking').length,
        ready: ordersData.filter(o => o.status === 'ready').length,
        served: ordersData.filter(o => o.status === 'served').length,
    };

    const statusColor: any = { new: '#818CF8', cooking: '#F59E0B', ready: '#34D399', served: '#94A3B8' };
    const statusPill: any = { new: 'p-new', cooking: 'p-prep', ready: 'p-ready', served: 'p-closed' };
    const typeIcon: any = { 'Dine-in': 'ri-restaurant-line', 'Delivery': 'ri-e-bike-2-line', 'Takeaway': 'ri-shopping-bag-3-line' };

    return (
        <div className="mgr-page">
            {/* Summary */}
            <div className="ko-summary" style={{ marginBottom: 16 }}>
                {[
                    { key: 'all' as const, label: 'Total', icon: 'ri-file-list-3-line', color: '#818CF8', bg: 'rgba(129,140,248,0.12)' },
                    { key: 'new' as const, label: 'New', icon: 'ri-alarm-warning-line', color: '#6366F1', bg: 'rgba(99,102,241,0.12)' },
                    { key: 'cooking' as const, label: 'Cooking', icon: 'ri-fire-line', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
                    { key: 'ready' as const, label: 'Ready', icon: 'ri-checkbox-circle-line', color: '#34D399', bg: 'rgba(52,211,153,0.12)' },
                ].map(s => (
                    <div className="ko-sum-card" key={s.key} onClick={() => setFilter(s.key)} style={{ cursor: 'pointer', borderColor: filter === s.key ? s.color : undefined }}>
                        <div className="ko-sum-icon" style={{ background: s.bg, color: s.color }}><i className={s.icon}></i></div>
                        <div>
                            <div className="ko-sum-val">{counts[s.key]}</div>
                            <div className="ko-sum-label">{s.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Orders Table */}
            <div className="card">
                <div className="ch">
                    <div><div className="ct">Live Order Tracking</div><div className="cs">Monitor all active orders in real-time</div></div>
                    <div className="ko-filters">
                        {(['all', 'new', 'cooking', 'ready', 'served'] as const).map(f => (
                            <button key={f} className={`ko-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)} <span className="ko-filter-count">{counts[f]}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="th" style={{ display: 'grid', gridTemplateColumns: '70px 90px 80px 1fr 90px 80px 80px' }}>
                    <span>Order</span><span>Type</span><span>Source</span><span>Items</span><span>Amount</span><span>Status</span><span>Time</span>
                </div>
                {filtered.map(o => (
                    <div className="tr" key={o.id} style={{ display: 'grid', gridTemplateColumns: '70px 90px 80px 1fr 90px 80px 80px', borderLeft: `3px solid ${statusColor[o.status]}` }}>
                        <span style={{ fontFamily: 'Outfit', fontWeight: 700, color: 'var(--tc)', fontSize: 12 }}>{o.id}</span>
                        <span style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <i className={typeIcon[o.type]} style={{ fontSize: 12 }}></i>{o.type}
                        </span>
                        <span style={{ fontSize: 10, color: 'var(--mt)' }}>{o.table || o.platform || '—'}</span>
                        <span style={{ fontSize: 11 }}>{o.items.map(i => `${i.qty}× ${i.name}`).join(', ')}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, fontFamily: 'Outfit' }}>{o.amount}</span>
                        <span className={`pill ${statusPill[o.status]}`} style={{ fontSize: 9, textAlign: 'center' }}>{o.status.toUpperCase()}</span>
                        <span style={{ fontSize: 10, color: 'var(--mt)' }}>{o.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiveOrders;
