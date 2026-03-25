import { useState } from 'react';

interface Order {
    id: string;
    table: string;
    items: { name: string; qty: number; status: 'preparing' | 'ready' | 'served' }[];
    placedAt: string;
    elapsedTime: string;
    status: 'new' | 'cooking' | 'ready' | 'served';
}

const ordersData: Order[] = [
    { id: '#ORD-901', table: 'Table 7', items: [{ name: 'Butter Chicken', qty: 2, status: 'preparing' }, { name: 'Garlic Naan', qty: 4, status: 'preparing' }, { name: 'Mango Lassi', qty: 2, status: 'ready' }], placedAt: '12:50 PM', elapsedTime: '5 min', status: 'cooking' },
    { id: '#ORD-898', table: 'Table 3', items: [{ name: 'Palak Paneer', qty: 1, status: 'preparing' }, { name: 'Jeera Rice', qty: 2, status: 'preparing' }, { name: 'Tandoori Roti', qty: 6, status: 'ready' }], placedAt: '12:37 PM', elapsedTime: '18 min', status: 'cooking' },
    { id: '#ORD-896', table: 'Table 12', items: [{ name: 'Dal Makhani', qty: 2, status: 'ready' }, { name: 'Butter Naan', qty: 4, status: 'ready' }], placedAt: '12:35 PM', elapsedTime: '20 min', status: 'ready' },
    { id: '#ORD-894', table: 'Table 5', items: [{ name: 'Mutton Rogan Josh', qty: 1, status: 'ready' }, { name: 'Biryani', qty: 1, status: 'ready' }], placedAt: '12:23 PM', elapsedTime: '32 min', status: 'ready' },
    { id: '#ORD-890', table: 'Table 11', items: [{ name: 'Paneer Butter Masala', qty: 2, status: 'served' }, { name: 'Naan', qty: 6, status: 'served' }, { name: 'Raita', qty: 2, status: 'served' }, { name: 'Gulab Jamun', qty: 4, status: 'served' }], placedAt: '12:00 PM', elapsedTime: '55 min', status: 'served' },
];

const OrderStatus = () => {
    const [filter, setFilter] = useState<'all' | 'cooking' | 'ready' | 'served'>('all');
    const filtered = filter === 'all' ? ordersData : ordersData.filter(o => o.status === filter);

    const statusColor: any = { new: '#818CF8', cooking: '#F59E0B', ready: '#34D399', served: '#94A3B8' };
    const statusBg: any = { new: 'rgba(129,140,248,0.12)', cooking: 'rgba(245,158,11,0.12)', ready: 'rgba(52,211,153,0.12)', served: 'rgba(148,163,184,0.1)' };
    const itemStatusIcon: any = { preparing: 'ri-fire-line', ready: 'ri-checkbox-circle-line', served: 'ri-check-double-line' };
    const itemStatusColor: any = { preparing: '#F59E0B', ready: '#34D399', served: '#94A3B8' };

    return (
        <div className="mgr-page">
            {/* Stats */}
            <div className="grid4" style={{ marginBottom: 16, gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#F59E0B' }}><i className="ri-fire-line"></i></div>
                    <div><div className="kl">In Kitchen</div><div className="kv" style={{ fontSize: 22 }}>{ordersData.filter(o => o.status === 'cooking').length}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12. }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(52,211,153,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#34D399' }}><i className="ri-checkbox-circle-line"></i></div>
                    <div><div className="kl">Ready to Serve</div><div className="kv" style={{ fontSize: 22 }}>{ordersData.filter(o => o.status === 'ready').length}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(148,163,184,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#94A3B8' }}><i className="ri-check-double-line"></i></div>
                    <div><div className="kl">Served</div><div className="kv" style={{ fontSize: 22 }}>{ordersData.filter(o => o.status === 'served').length}</div></div>
                </div>
            </div>

            {/* Filters */}
            <div className="ko-filters" style={{ marginBottom: 16 }}>
                {(['all', 'cooking', 'ready', 'served'] as const).map(f => (
                    <button key={f} className={`ko-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                        {f === 'all' ? 'All Orders' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Order Cards */}
            <div style={{ display: 'grid', gap: 12 }}>
                {filtered.map(order => (
                    <div className="card" key={order.id} style={{ borderLeft: `4px solid ${statusColor[order.status]}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontFamily: 'Outfit', fontSize: 16, fontWeight: 700, color: 'var(--tc)' }}>{order.id}</span>
                                <span className="tag">{order.table}</span>
                                <span className="pill" style={{ fontSize: 8, background: statusBg[order.status], color: statusColor[order.status] }}>{order.status.toUpperCase()}</span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 10, color: 'var(--mt)' }}>Placed at {order.placedAt}</div>
                                <div style={{ fontSize: 12, fontWeight: 600, fontFamily: 'Outfit', color: parseInt(order.elapsedTime) > 25 ? '#FB7185' : 'var(--ink)' }}>⏱ {order.elapsedTime}</div>
                            </div>
                        </div>

                        {/* Items with individual status */}
                        <div style={{ display: 'grid', gap: 4 }}>
                            {order.items.map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', background: 'var(--cr)', borderRadius: 8 }}>
                                    <i className={itemStatusIcon[item.status]} style={{ fontSize: 13, color: itemStatusColor[item.status] }}></i>
                                    <span style={{ fontSize: 12, flex: 1 }}>{item.qty}× {item.name}</span>
                                    <span style={{ fontSize: 9, fontWeight: 600, color: itemStatusColor[item.status], textTransform: 'uppercase' }}>{item.status}</span>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        {order.status === 'ready' && (
                            <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
                                <button className="btn" style={{ fontSize: 12, padding: '8px 20px', background: '#34D399' }}>
                                    <i className="ri-check-line" style={{ marginRight: 4 }}></i>Mark as Served
                                </button>
                            </div>
                        )}
                        {order.status === 'cooking' && parseInt(order.elapsedTime) > 20 && (
                            <div style={{ marginTop: 10, padding: '6px 10px', background: 'rgba(251,113,133,0.08)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                                <i className="ri-alarm-warning-line" style={{ color: '#FB7185', fontSize: 13 }}></i>
                                <span style={{ fontSize: 11, color: '#FB7185' }}>Order taking longer than expected — {order.elapsedTime}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderStatus;
