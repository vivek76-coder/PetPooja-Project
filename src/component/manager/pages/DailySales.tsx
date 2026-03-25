const DailySales = () => {
    const kpis = [
        { label: 'Total Revenue', value: '₹1,24,500', icon: 'ri-money-rupee-circle-line', change: '↑ 12% vs yesterday', color: '#10B981', bg: 'rgba(16,185,129,0.12)' },
        { label: 'Total Orders', value: '156', icon: 'ri-shopping-cart-line', change: '↑ 8%', color: '#818CF8', bg: 'rgba(129,140,248,0.12)' },
        { label: 'Avg Order Value', value: '₹798', icon: 'ri-bar-chart-grouped-line', change: '↑ 3%', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
        { label: 'Cancelled', value: '4', icon: 'ri-close-circle-line', change: '2.5% rate', color: '#FB7185', bg: 'rgba(251,113,133,0.12)' },
    ];

    const paymentBreakdown = [
        { method: 'Cash', amount: '₹38,200', count: 48, pct: 31, color: '#10B981' },
        { method: 'UPI / Online', amount: '₹52,800', count: 66, pct: 42, color: '#818CF8' },
        { method: 'Card', amount: '₹21,500', count: 27, pct: 17, color: '#F59E0B' },
        { method: 'Zomato/Swiggy', amount: '₹12,000', count: 15, pct: 10, color: '#FB7185' },
    ];

    const channelData = [
        { channel: 'Dine-in', orders: 89, revenue: '₹78,400', pct: 63 },
        { channel: 'Zomato', orders: 34, revenue: '₹24,800', pct: 20 },
        { channel: 'Swiggy', orders: 22, revenue: '₹14,300', pct: 11 },
        { channel: 'Takeaway', orders: 11, revenue: '₹7,000', pct: 6 },
    ];

    const hourlyRevenue = [
        { hour: '10AM', rev: 4200 }, { hour: '11AM', rev: 8600 }, { hour: '12PM', rev: 14800 },
        { hour: '1PM', rev: 22400 }, { hour: '2PM', rev: 12600 }, { hour: '3PM', rev: 6800 },
        { hour: '4PM', rev: 5200 }, { hour: '5PM', rev: 8400 }, { hour: '6PM', rev: 15600 },
        { hour: '7PM', rev: 18900 }, { hour: '8PM', rev: 20800 }, { hour: '9PM', rev: 14200 },
    ];
    const maxRev = Math.max(...hourlyRevenue.map(h => h.rev));

    return (
        <div className="mgr-page">
            {/* KPIs */}
            <div className="grid4" style={{ marginBottom: 16 }}>
                {kpis.map(k => (
                    <div className="kpi" key={k.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ width: 46, height: 46, borderRadius: 12, background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: k.color, flexShrink: 0 }}>
                            <i className={k.icon}></i>
                        </div>
                        <div>
                            <div className="kl">{k.label}</div>
                            <div className="kv" style={{ fontSize: 22 }}>{k.value}</div>
                            <div style={{ fontSize: 10, color: 'var(--sg)', marginTop: 2 }}>{k.change}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid2" style={{ marginBottom: 16 }}>
                {/* Hourly Revenue Chart */}
                <div className="card">
                    <div className="ch">
                        <div><div className="ct">Hourly Revenue</div><div className="cs">Revenue trend throughout the day</div></div>
                    </div>
                    <div className="bars" style={{ height: 130 }}>
                        {hourlyRevenue.map(h => (
                            <div className="bg" key={h.hour}>
                                <div className="bw" style={{ height: 110 }}>
                                    <div className="b" style={{ height: `${(h.rev / maxRev) * 100}%`, background: h.rev > 15000 ? 'var(--tc)' : h.rev > 8000 ? 'var(--gd)' : 'var(--dv)' }}></div>
                                </div>
                                <div className="bl">{h.hour}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Breakdown */}
                <div className="card">
                    <div className="ch">
                        <div><div className="ct">Payment Breakdown</div><div className="cs">How customers are paying</div></div>
                    </div>
                    {paymentBreakdown.map(p => (
                        <div key={p.method} style={{ marginBottom: 14 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                <div>
                                    <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)' }}>{p.method}</span>
                                    <span style={{ fontSize: 10, color: 'var(--mt)', marginLeft: 8 }}>{p.count} txns</span>
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 600, fontFamily: 'Outfit', color: 'var(--ink)' }}>{p.amount}</span>
                            </div>
                            <div style={{ height: 6, background: 'var(--dv)', borderRadius: 3, overflow: 'hidden' }}>
                                <div style={{ width: `${p.pct}%`, height: '100%', background: p.color, borderRadius: 3, transition: 'width 0.5s ease' }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Channel Performance */}
            <div className="card">
                <div className="ch">
                    <div><div className="ct">Channel Performance</div><div className="cs">Orders & revenue by channel</div></div>
                </div>
                <div className="th" style={{ display: 'grid', gridTemplateColumns: '1fr 80px 120px 1fr' }}>
                    <span>Channel</span><span>Orders</span><span>Revenue</span><span>Share</span>
                </div>
                {channelData.map(c => (
                    <div className="tr" key={c.channel} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 120px 1fr' }}>
                        <span style={{ fontSize: 12, fontWeight: 500 }}>{c.channel}</span>
                        <span style={{ fontSize: 12 }}>{c.orders}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, fontFamily: 'Outfit' }}>{c.revenue}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ flex: 1, height: 6, background: 'var(--dv)', borderRadius: 3, overflow: 'hidden' }}>
                                <div style={{ width: `${c.pct}%`, height: '100%', background: 'var(--tc)', borderRadius: 3 }}></div>
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 500, minWidth: 30 }}>{c.pct}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailySales;
