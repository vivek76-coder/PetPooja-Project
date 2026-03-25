const ManagerDashboard = () => {
    const stats = [
        { label: 'Today\'s Revenue', value: '₹1,24,500', icon: 'ri-money-rupee-circle-line', change: '↑ 12%', changeType: 'up', color: '#10B981', bg: 'rgba(16,185,129,0.12)' },
        { label: 'Active Orders', value: '23', icon: 'ri-shopping-cart-line', change: '8 new', changeType: 'up', color: '#818CF8', bg: 'rgba(129,140,248,0.12)' },
        { label: 'Tables Occupied', value: '18/24', icon: 'ri-layout-grid-line', change: '75%', changeType: 'up', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
        { label: 'Staff On Duty', value: '14', icon: 'ri-group-line', change: '2 absent', changeType: 'dn', color: '#FB7185', bg: 'rgba(251,113,133,0.12)' },
    ];

    const recentOrders = [
        { id: '#901', table: 'Table 7', items: 4, amount: '₹1,040', status: 'New', time: 'Just now' },
        { id: '#900', table: 'Zomato', items: 3, amount: '₹890', status: 'Cooking', time: '3 min ago' },
        { id: '#899', table: 'Table 3', items: 5, amount: '₹1,520', status: 'Cooking', time: '8 min ago' },
        { id: '#898', table: 'Swiggy', items: 2, amount: '₹420', status: 'Ready', time: '12 min ago' },
        { id: '#897', table: 'Table 12', items: 3, amount: '₹780', status: 'Served', time: '18 min ago' },
    ];

    const topItems = [
        { name: 'Butter Chicken', orders: 48, revenue: '₹15,360', trend: '+12%' },
        { name: 'Chicken Biryani', orders: 42, revenue: '₹15,960', trend: '+8%' },
        { name: 'Dal Makhani', orders: 38, revenue: '₹10,640', trend: '+5%' },
        { name: 'Paneer Tikka', orders: 35, revenue: '₹9,100', trend: '+3%' },
        { name: 'Garlic Naan', orders: 64, revenue: '₹3,840', trend: '+18%' },
    ];

    const alerts = [
        { text: 'Table 9 waiting 22 min — no order taken', type: 'warning', icon: 'ri-alarm-warning-line' },
        { text: 'Onions stock running low (2kg left)', type: 'danger', icon: 'ri-error-warning-line' },
        { text: 'New complaint from Zomato order #Z8844', type: 'danger', icon: 'ri-feedback-line' },
        { text: '3 discount requests pending approval', type: 'info', icon: 'ri-percent-line' },
    ];

    const hourlyData = [
        { hour: '10AM', orders: 8 }, { hour: '11AM', orders: 18 }, { hour: '12PM', orders: 32 },
        { hour: '1PM', orders: 45 }, { hour: '2PM', orders: 28 }, { hour: '3PM', orders: 15 },
        { hour: '4PM', orders: 12 }, { hour: '5PM', orders: 20 }, { hour: '6PM', orders: 35 },
        { hour: '7PM', orders: 48 }, { hour: '8PM', orders: 52 }, { hour: '9PM', orders: 38 },
    ];
    const maxOrders = Math.max(...hourlyData.map(h => h.orders));

    return (
        <div className="mgr-page">
            {/* KPI Stats */}
            <div className="grid4" style={{ marginBottom: 16 }}>
                {stats.map(s => (
                    <div className="kpi" key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ width: 46, height: 46, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: s.color, flexShrink: 0 }}>
                            <i className={s.icon}></i>
                        </div>
                        <div>
                            <div className="kl">{s.label}</div>
                            <div className="kv" style={{ fontSize: 22 }}>{s.value}</div>
                            <div className="ks">
                                <span className={`kc ${s.changeType}`}>{s.change}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid3" style={{ marginBottom: 16 }}>
                {/* Recent Orders */}
                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <div className="ch">
                        <div><div className="ct">Recent Orders</div><div className="cs">Latest orders across all channels</div></div>
                    </div>
                    <div className="th" style={{ gridTemplateColumns: '60px 80px 50px 80px 80px 70px', display: 'grid' }}>
                        <span>Order</span><span>Source</span><span>Items</span><span>Amount</span><span>Status</span><span>Time</span>
                    </div>
                    {recentOrders.map(o => (
                        <div className="tr" key={o.id} style={{ gridTemplateColumns: '60px 80px 50px 80px 80px 70px', display: 'grid' }}>
                            <span style={{ fontWeight: 600, color: 'var(--tc)', fontSize: 12 }}>{o.id}</span>
                            <span style={{ fontSize: 11 }}>{o.table}</span>
                            <span style={{ fontSize: 11 }}>{o.items}</span>
                            <span style={{ fontSize: 11, fontWeight: 500 }}>{o.amount}</span>
                            <span className={`pill ${o.status === 'New' ? 'p-new' : o.status === 'Cooking' ? 'p-prep' : o.status === 'Ready' ? 'p-ready' : 'p-closed'}`} style={{ fontSize: 9, textAlign: 'center' }}>{o.status}</span>
                            <span style={{ fontSize: 10, color: 'var(--mt)' }}>{o.time}</span>
                        </div>
                    ))}
                </div>

                {/* Alerts */}
                <div className="card">
                    <div className="ch">
                        <div><div className="ct">⚠️ Alerts</div><div className="cs">Needs your attention</div></div>
                    </div>
                    {alerts.map((a, i) => (
                        <div className="alert-i" key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, borderLeft: `3px solid ${a.type === 'danger' ? '#FB7185' : a.type === 'warning' ? '#FBBF24' : '#818CF8'}` }}>
                            <i className={a.icon} style={{ fontSize: 16, color: a.type === 'danger' ? '#FB7185' : a.type === 'warning' ? '#FBBF24' : '#818CF8', marginTop: 1 }}></i>
                            <div className="alert-t" style={{ fontSize: 11 }}>{a.text}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid2" style={{ marginBottom: 16 }}>
                {/* Hourly Orders Chart */}
                <div className="card">
                    <div className="ch">
                        <div><div className="ct">Orders by Hour</div><div className="cs">Today's order volume</div></div>
                    </div>
                    <div className="bars" style={{ height: 120 }}>
                        {hourlyData.map(h => (
                            <div className="bg" key={h.hour}>
                                <div className="bw" style={{ height: 100 }}>
                                    <div className="b" style={{ height: `${(h.orders / maxOrders) * 100}%`, background: h.orders > 40 ? 'var(--tc)' : h.orders > 20 ? 'var(--gd)' : 'var(--dv)' }}></div>
                                </div>
                                <div className="bl">{h.hour}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Selling Items */}
                <div className="card">
                    <div className="ch">
                        <div><div className="ct">Top Selling Items</div><div className="cs">Today's best performers</div></div>
                    </div>
                    {topItems.map((item, i) => (
                        <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: i < topItems.length - 1 ? '1px solid var(--cr)' : 'none' }}>
                            <div style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--tcm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: 'var(--tc)' }}>{i + 1}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)' }}>{item.name}</div>
                                <div style={{ fontSize: 10, color: 'var(--mt)' }}>{item.orders} orders</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{item.revenue}</div>
                                <div style={{ fontSize: 10, color: 'var(--sg)' }}>{item.trend}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
