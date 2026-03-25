const WaiterDashboard = () => {
    const stats = [
        { label: 'My Active Tables', value: '6', icon: 'ri-layout-grid-line', info: 'of 8 assigned', color: '#818CF8', bg: 'rgba(129,140,248,0.12)' },
        { label: 'Pending Orders', value: '4', icon: 'ri-shopping-cart-line', info: 'In kitchen', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
        { label: 'Ready to Serve', value: '2', icon: 'ri-checkbox-circle-line', info: 'Pick up now!', color: '#34D399', bg: 'rgba(52,211,153,0.12)' },
        { label: 'Service Requests', value: '3', icon: 'ri-hand-coin-line', info: 'Need attention', color: '#FB7185', bg: 'rgba(251,113,133,0.12)' },
    ];

    const myTables = [
        { num: 3, seats: 4, status: 'occupied', guests: 3, order: '#898', time: '18 min', amount: '₹680' },
        { num: 5, seats: 4, status: 'occupied', guests: 2, order: '#894', time: '32 min', amount: '₹800' },
        { num: 7, seats: 6, status: 'occupied', guests: 5, order: '#901', time: '5 min', amount: '₹1,040' },
        { num: 11, seats: 4, status: 'occupied', guests: 4, order: '#890', time: '55 min', amount: '₹1,560' },
        { num: 12, seats: 4, status: 'occupied', guests: 2, order: '#896', time: '20 min', amount: '₹800' },
        { num: 16, seats: 2, status: 'available', guests: 0 },
        { num: 19, seats: 2, status: 'available', guests: 0 },
        { num: 22, seats: 2, status: 'reserved', guests: 0 },
    ];

    const readyOrders = [
        { id: '#ORD-896', table: 'Table 12', items: '2× Dal Makhani, 4× Butter Naan', time: '2 min ago' },
        { id: '#ORD-894', table: 'Table 5', items: '1× Mutton Rogan Josh, 1× Biryani', time: '5 min ago' },
    ];

    const requests = [
        { table: 'Table 11', request: 'Water refill needed', time: '3 min ago', priority: 'medium' },
        { table: 'Table 7', request: 'Extra napkins please', time: '5 min ago', priority: 'low' },
        { table: 'Table 3', request: 'Want to see dessert menu', time: '8 min ago', priority: 'low' },
    ];

    const statusCls: any = { occupied: 'occ', available: 'avail', reserved: 'rsv' };

    return (
        <div className="mgr-page">
            {/* Stats */}
            <div className="grid4" style={{ marginBottom: 16 }}>
                {stats.map(s => (
                    <div className="kpi" key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ width: 46, height: 46, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: s.color, flexShrink: 0 }}>
                            <i className={s.icon}></i>
                        </div>
                        <div>
                            <div className="kl">{s.label}</div>
                            <div className="kv" style={{ fontSize: 22 }}>{s.value}</div>
                            <div style={{ fontSize: 10, color: 'var(--mt)', marginTop: 2 }}>{s.info}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid3" style={{ marginBottom: 16 }}>
                {/* My Tables Grid */}
                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <div className="ch">
                        <div><div className="ct">My Tables</div><div className="cs">8 tables assigned to you</div></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                        {myTables.map(t => (
                            <div className={`table-box ${statusCls[t.status]}`} key={t.num}>
                                <div className="tb-num">T{t.num}</div>
                                <div className="tb-pax">{t.seats} seats</div>
                                <div className="tb-status">{t.status === 'occupied' ? `${t.guests} guests` : t.status === 'reserved' ? 'Reserved' : 'Empty'}</div>
                                {t.status === 'occupied' && (
                                    <div style={{ marginTop: 4 }}>
                                        <div style={{ fontSize: 9, color: 'var(--tc)', fontWeight: 600 }}>{t.order}</div>
                                        <div style={{ fontSize: 8, color: 'var(--mt)' }}>{t.time} · {t.amount}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column */}
                <div>
                    {/* Ready to Serve */}
                    <div className="card" style={{ marginBottom: 12 }}>
                        <div className="ch">
                            <div><div className="ct">🍽️ Ready to Serve</div><div className="cs">Pick up from kitchen</div></div>
                        </div>
                        {readyOrders.map(o => (
                            <div key={o.id} style={{ padding: '10px 12px', background: 'rgba(52,211,153,0.08)', borderRadius: 9, marginBottom: 6, borderLeft: '3px solid #34D399' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                                    <span style={{ fontFamily: 'Outfit', fontSize: 13, fontWeight: 700, color: 'var(--tc)' }}>{o.id}</span>
                                    <span style={{ fontSize: 10, color: 'var(--mt)' }}>{o.time}</span>
                                </div>
                                <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink)', marginBottom: 2 }}>{o.table}</div>
                                <div style={{ fontSize: 10, color: 'var(--mt)' }}>{o.items}</div>
                            </div>
                        ))}
                    </div>

                    {/* Requests */}
                    <div className="card">
                        <div className="ch">
                            <div><div className="ct">🔔 Service Requests</div><div className="cs">Customer needs</div></div>
                        </div>
                        {requests.map((r, i) => (
                            <div key={i} className="alert-i" style={{ borderLeft: `3px solid ${r.priority === 'medium' ? '#FBBF24' : '#818CF8'}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                    <span className="alert-t" style={{ fontSize: 11 }}>{r.table}</span>
                                    <span style={{ fontSize: 9, color: 'var(--mt)' }}>{r.time}</span>
                                </div>
                                <div className="alert-s">{r.request}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaiterDashboard;
