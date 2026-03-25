const tables = [
    { num: 1, seats: 2, status: 'available' }, { num: 2, seats: 4, status: 'occupied', order: '#892', time: '45 min', amount: '₹1,200' },
    { num: 3, seats: 4, status: 'occupied', order: '#898', time: '18 min', amount: '₹680' }, { num: 4, seats: 6, status: 'reserved', time: '7:30 PM', guest: 'Sharma Family' },
    { num: 5, seats: 4, status: 'occupied', order: '#894', time: '32 min', amount: '₹800' }, { num: 6, seats: 2, status: 'available' },
    { num: 7, seats: 6, status: 'occupied', order: '#901', time: '5 min', amount: '₹1,040' }, { num: 8, seats: 4, status: 'cleaning' },
    { num: 9, seats: 2, status: 'available' }, { num: 10, seats: 8, status: 'reserved', time: '8:00 PM', guest: 'Birthday Party' },
    { num: 11, seats: 4, status: 'occupied', order: '#890', time: '55 min', amount: '₹1,560' }, { num: 12, seats: 4, status: 'occupied', order: '#896', time: '20 min', amount: '₹800' },
    { num: 13, seats: 2, status: 'available' }, { num: 14, seats: 6, status: 'cleaning' },
    { num: 15, seats: 4, status: 'occupied', order: '#889', time: '1h 10m', amount: '₹2,100' }, { num: 16, seats: 2, status: 'available' },
    { num: 17, seats: 4, status: 'reserved', time: '8:30 PM', guest: 'VIP Guest' }, { num: 18, seats: 4, status: 'occupied', order: '#891', time: '48 min', amount: '₹920' },
    { num: 19, seats: 2, status: 'available' }, { num: 20, seats: 6, status: 'available' },
    { num: 21, seats: 4, status: 'occupied', order: '#888', time: '1h 20m', amount: '₹1,780' }, { num: 22, seats: 2, status: 'available' },
    { num: 23, seats: 4, status: 'available' }, { num: 24, seats: 8, status: 'occupied', order: '#887', time: '1h 5m', amount: '₹3,200' },
];

const statusCls: any = { available: 'avail', occupied: 'occ', reserved: 'rsv', cleaning: 'clean' };
const statusLabel: any = { available: 'Available', occupied: 'Occupied', reserved: 'Reserved', cleaning: 'Cleaning' };

const TableOverview = () => {
    const occupied = tables.filter(t => t.status === 'occupied').length;
    const available = tables.filter(t => t.status === 'available').length;
    const reserved = tables.filter(t => t.status === 'reserved').length;
    const cleaning = tables.filter(t => t.status === 'cleaning').length;

    return (
        <div className="mgr-page">
            {/* Stats */}
            <div className="grid4" style={{ marginBottom: 16 }}>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#F59E0B' }}><i className="ri-layout-grid-line"></i></div>
                    <div><div className="kl">Occupied</div><div className="kv" style={{ fontSize: 22 }}>{occupied}/24</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(52,211,153,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#34D399' }}><i className="ri-checkbox-circle-line"></i></div>
                    <div><div className="kl">Available</div><div className="kv" style={{ fontSize: 22 }}>{available}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(251,191,36,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#FBBF24' }}><i className="ri-calendar-check-line"></i></div>
                    <div><div className="kl">Reserved</div><div className="kv" style={{ fontSize: 22 }}>{reserved}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(129,140,248,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#818CF8' }}><i className="ri-brush-line"></i></div>
                    <div><div className="kl">Cleaning</div><div className="kv" style={{ fontSize: 22 }}>{cleaning}</div></div>
                </div>
            </div>

            {/* Floor Plan */}
            <div className="card">
                <div className="ch">
                    <div><div className="ct">Floor Plan — Koregaon Park</div><div className="cs">Live table status</div></div>
                </div>
                <div className="floor-grid">
                    {tables.map(t => (
                        <div className={`table-box ${statusCls[t.status]}`} key={t.num}>
                            <div className="tb-num">T{t.num}</div>
                            <div className="tb-pax">{t.seats} seats</div>
                            <div className="tb-status">{statusLabel[t.status]}</div>
                            {t.status === 'occupied' && (
                                <div style={{ marginTop: 4 }}>
                                    <div style={{ fontSize: 9, color: 'var(--tc)', fontWeight: 600 }}>{t.order}</div>
                                    <div style={{ fontSize: 8, color: 'var(--mt)' }}>{t.time} · {t.amount}</div>
                                </div>
                            )}
                            {t.status === 'reserved' && (
                                <div style={{ marginTop: 4 }}>
                                    <div style={{ fontSize: 9, fontWeight: 500, color: '#FBBF24' }}>{t.time}</div>
                                    <div style={{ fontSize: 8, color: 'var(--mt)' }}>{t.guest}</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="legend-strip" style={{ marginTop: 16 }}>
                    <div className="leg-i"><div className="leg-sq" style={{ background: 'var(--ww)', border: '1px solid var(--dv)' }}></div>Available</div>
                    <div className="leg-i"><div className="leg-sq" style={{ background: 'var(--tcm)' }}></div>Occupied</div>
                    <div className="leg-i"><div className="leg-sq" style={{ background: 'rgba(245,158,11,0.12)' }}></div>Reserved</div>
                    <div className="leg-i"><div className="leg-sq" style={{ background: 'rgba(52,211,153,0.1)' }}></div>Cleaning</div>
                </div>
            </div>
        </div>
    );
};

export default TableOverview;
