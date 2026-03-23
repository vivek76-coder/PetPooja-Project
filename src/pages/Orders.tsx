const Orders = () => {
    return (
        <>
            <div className="grid4" style={{ marginBottom: 14 }}>
                <div className="kpi"><div className="kl">Total Today</div><div className="kv">312</div><div className="ks"><span className="kc up">↑ 8%</span></div></div>
                <div className="kpi"><div className="kl">In Progress</div><div className="kv" style={{ color: 'var(--tc)' }}>47</div></div>
                <div className="kpi"><div className="kl">Avg Prep Time</div><div className="kv">18m</div></div>
                <div className="kpi"><div className="kl">Cancelled</div><div className="kv">9</div><div className="ks"><span className="kc dn">2.9%</span></div></div>
            </div>

            <div className="order-filters">
                {['All Orders', 'Dine-in', 'Delivery', 'Takeaway', 'Koregaon Park', 'Baner', 'Viman Nagar'].map((f, i) => (
                    <div className={`of ${i === 0 ? 'act' : ''}`} key={f}>{f}</div>
                ))}
            </div>

            <div className="order-cols">
                {/* New Orders Column */}
                <div className="ord-col">
                    <div className="ord-col-head"><span className="ord-col-title">New orders</span><span className="pill p-new">8</span></div>
                    {[
                        { id: '#853', info: 'Table 7 · Koregaon Park · Dine-in', items: '2× Butter Chicken, 4× Garlic Naan, 2× Lassi', time: 'Just now', amount: '₹1,040' },
                        { id: '#852', info: 'Zomato #Z9341 · Baner · Delivery', items: '1× Dal Makhani, 2× Naan, 1× Lassi', time: '2 min ago', amount: '₹520' },
                        { id: '#851', info: 'Swiggy #S1122 · Viman Nagar · Delivery', items: '1× Chicken Biryani, 1× Raita', time: '4 min ago', amount: '₹420' },
                    ].map((o) => (
                        <div className="ord-card" key={o.id}>
                            <div className="ord-card-id">{o.id}</div>
                            <div className="ord-card-info">{o.info}</div>
                            <div className="ord-card-items">{o.items}</div>
                            <div className="ord-card-footer">
                                <span className="ord-time">{o.time}</span>
                                <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink)' }}>{o.amount}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Preparing Column */}
                <div className="ord-col">
                    <div className="ord-col-head"><span className="ord-col-title">Preparing</span><span className="pill p-prep">24</span></div>
                    <div className="ord-card">
                        <div className="ord-card-id">#846</div>
                        <div className="ord-card-info">Zomato #Z8821 · Baner · Delivery</div>
                        <div className="ord-card-items">2× Paneer Tikka, 2× Dal, 3× Naan</div>
                        <div className="ord-card-footer">
                            <div>
                                <span className="ord-time">7 min ago</span>
                                <div style={{ width: 100, height: 3, background: 'var(--dv)', borderRadius: 2, marginTop: 4, overflow: 'hidden' }}>
                                    <div style={{ width: '60%', height: '100%', background: 'var(--gd)', borderRadius: 2 }}></div>
                                </div>
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink)' }}>₹1,060</span>
                        </div>
                    </div>
                    <div className="ord-card">
                        <div className="ord-card-id">#844</div>
                        <div className="ord-card-info">Swiggy #SW4421 · Viman Nagar</div>
                        <div className="ord-card-items">1× Veg Biryani, 1× Boondi Raita</div>
                        <div className="ord-card-footer">
                            <div>
                                <span className="ord-time">14 min ago</span>
                                <div style={{ width: 100, height: 3, background: 'var(--dv)', borderRadius: 2, marginTop: 4, overflow: 'hidden' }}>
                                    <div style={{ width: '85%', height: '100%', background: 'var(--tc)', borderRadius: 2 }}></div>
                                </div>
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink)' }}>₹540</span>
                        </div>
                    </div>
                </div>

                {/* Ready/Served Column */}
                <div className="ord-col">
                    <div className="ord-col-head"><span className="ord-col-title">Ready / Served</span><span className="pill p-ready">15</span></div>
                    {[
                        { id: '#847', info: 'Table 4 · Koregaon Park · Dine-in', items: '2× Dal Makhani, 1× Butter Chicken, 4× Naan', time: '2 min ago', status: 'Served' },
                        { id: '#845', info: 'Table 12 · Koregaon Park · Dine-in', items: '3× Paneer Tikka, 1× Butter Naan', time: '9 min ago', status: 'Served' },
                        { id: '#843', info: 'Table 2 · Kothrud · Dine-in', items: 'Full family meal order', time: '18 min ago', status: 'Billing pending' },
                    ].map((o) => (
                        <div className="ord-card" key={o.id}>
                            <div className="ord-card-id">{o.id}</div>
                            <div className="ord-card-info">{o.info}</div>
                            <div className="ord-card-items">{o.items}</div>
                            <div className="ord-card-footer">
                                <span className="ord-time">{o.time}</span>
                                <span style={{ fontSize: 11, fontWeight: 500, color: o.status === 'Billing pending' ? 'var(--tc)' : 'var(--sg)' }}>{o.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Orders;
