const CashierDashboard = () => {
    const stats = [
        { label: 'Total Collections', value: '₹87,400', icon: 'ri-money-rupee-circle-line', change: '₹12,800 last hour', color: '#10B981', bg: 'rgba(16,185,129,0.12)' },
        { label: 'Bills Generated', value: '94', icon: 'ri-receipt-line', change: '↑ 6% vs yesterday', color: '#818CF8', bg: 'rgba(129,140,248,0.12)' },
        { label: 'Pending Bills', value: '6', icon: 'ri-time-line', change: 'Need attention', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
        { label: 'Avg Bill Value', value: '₹930', icon: 'ri-bar-chart-grouped-line', change: '↑ 4%', color: '#38BDF8', bg: 'rgba(56,189,248,0.12)' },
    ];

    const paymentSplit = [
        { method: 'Cash', amount: '₹32,600', count: 38, pct: 37, color: '#10B981' },
        { method: 'UPI', amount: '₹28,400', count: 30, pct: 33, color: '#818CF8' },
        { method: 'Card', amount: '₹18,200', count: 18, pct: 21, color: '#F59E0B' },
        { method: 'Online (Zomato/Swiggy)', amount: '₹8,200', count: 8, pct: 9, color: '#FB7185' },
    ];

    const recentBills = [
        { id: 'BIL-094', table: 'Table 12', amount: '₹1,240', method: 'UPI', time: '2 min ago', status: 'Paid' },
        { id: 'BIL-093', table: 'Table 5', amount: '₹800', method: 'Cash', time: '8 min ago', status: 'Paid' },
        { id: 'BIL-092', table: 'Takeaway', amount: '₹460', method: 'Card', time: '15 min ago', status: 'Paid' },
        { id: 'BIL-091', table: 'Table 7', amount: '₹1,560', method: 'Cash', time: '22 min ago', status: 'Paid' },
        { id: 'BIL-090', table: 'Table 3', amount: '₹920', method: 'UPI', time: '30 min ago', status: 'Paid' },
    ];

    const hourlyData = [
        { hour: '10AM', amount: 4800 }, { hour: '11AM', amount: 9200 }, { hour: '12PM', amount: 15600 },
        { hour: '1PM', amount: 21400 }, { hour: '2PM', amount: 12800 }, { hour: '3PM', amount: 6400 },
        { hour: '4PM', amount: 5200 }, { hour: '5PM', amount: 8800 }, { hour: '6PM', amount: 14200 },
    ];
    const maxAmount = Math.max(...hourlyData.map(h => h.amount));

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
                            <div style={{ fontSize: 10, color: 'var(--sg)', marginTop: 2 }}>{s.change}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid3" style={{ marginBottom: 16 }}>
                {/* Recent Bills */}
                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <div className="ch">
                        <div><div className="ct">Recent Bills</div><div className="cs">Latest completed transactions</div></div>
                    </div>
                    <div className="th" style={{ display: 'grid', gridTemplateColumns: '70px 80px 90px 80px 80px 60px' }}>
                        <span>Bill</span><span>Source</span><span>Amount</span><span>Method</span><span>Time</span><span>Status</span>
                    </div>
                    {recentBills.map(b => (
                        <div className="tr" key={b.id} style={{ display: 'grid', gridTemplateColumns: '70px 80px 90px 80px 80px 60px' }}>
                            <span style={{ fontFamily: 'Outfit', fontWeight: 700, color: 'var(--tc)', fontSize: 12 }}>{b.id}</span>
                            <span style={{ fontSize: 11 }}>{b.table}</span>
                            <span style={{ fontSize: 13, fontWeight: 600, fontFamily: 'Outfit' }}>{b.amount}</span>
                            <span style={{ fontSize: 11 }}>{b.method}</span>
                            <span style={{ fontSize: 10, color: 'var(--mt)' }}>{b.time}</span>
                            <span className="pill p-paid" style={{ fontSize: 9, textAlign: 'center' }}>{b.status}</span>
                        </div>
                    ))}
                </div>

                {/* Payment Split */}
                <div className="card">
                    <div className="ch">
                        <div><div className="ct">💰 Payment Split</div><div className="cs">Today's breakdown</div></div>
                    </div>
                    {paymentSplit.map(p => (
                        <div key={p.method} style={{ marginBottom: 14 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                <div>
                                    <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)' }}>{p.method}</span>
                                    <span style={{ fontSize: 10, color: 'var(--mt)', marginLeft: 6 }}>{p.count} txns</span>
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 600, fontFamily: 'Outfit' }}>{p.amount}</span>
                            </div>
                            <div style={{ height: 6, background: 'var(--dv)', borderRadius: 3, overflow: 'hidden' }}>
                                <div style={{ width: `${p.pct}%`, height: '100%', background: p.color, borderRadius: 3, transition: 'width 0.5s' }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hourly Collections */}
            <div className="card">
                <div className="ch">
                    <div><div className="ct">Hourly Collections</div><div className="cs">Amount collected per hour</div></div>
                </div>
                <div className="bars" style={{ height: 120 }}>
                    {hourlyData.map(h => (
                        <div className="bg" key={h.hour}>
                            <div className="bw" style={{ height: 100 }}>
                                <div className="b" style={{ height: `${(h.amount / maxAmount) * 100}%`, background: h.amount > 12000 ? 'var(--tc)' : h.amount > 6000 ? 'var(--gd)' : 'var(--dv)' }}></div>
                            </div>
                            <div className="bl">{h.hour}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CashierDashboard;
