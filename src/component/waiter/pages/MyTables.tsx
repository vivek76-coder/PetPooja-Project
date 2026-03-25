import { useState } from 'react';

interface Table {
    num: number;
    seats: number;
    status: 'occupied' | 'available' | 'reserved' | 'bill-requested';
    guests?: number;
    order?: string;
    orderTime?: string;
    amount?: string;
    items?: string[];
    orderStatus?: 'new' | 'cooking' | 'ready' | 'served';
}

const tablesData: Table[] = [
    { num: 3, seats: 4, status: 'occupied', guests: 3, order: '#ORD-898', orderTime: '18 min', amount: '₹680', items: ['Palak Paneer', 'Jeera Rice ×2', 'Tandoori Roti ×6'], orderStatus: 'cooking' },
    { num: 5, seats: 4, status: 'occupied', guests: 2, order: '#ORD-894', orderTime: '32 min', amount: '₹800', items: ['Mutton Rogan Josh', 'Biryani'], orderStatus: 'ready' },
    { num: 7, seats: 6, status: 'occupied', guests: 5, order: '#ORD-901', orderTime: '5 min', amount: '₹1,040', items: ['Butter Chicken ×2', 'Garlic Naan ×4', 'Mango Lassi ×2'], orderStatus: 'new' },
    { num: 11, seats: 4, status: 'bill-requested', guests: 4, order: '#ORD-890', orderTime: '55 min', amount: '₹1,560', items: ['Paneer Butter Masala ×2', 'Naan ×6', 'Raita ×2', 'Gulab Jamun ×4'], orderStatus: 'served' },
    { num: 12, seats: 4, status: 'occupied', guests: 2, order: '#ORD-896', orderTime: '20 min', amount: '₹800', items: ['Dal Makhani ×2', 'Butter Naan ×4'], orderStatus: 'ready' },
    { num: 16, seats: 2, status: 'available' },
    { num: 19, seats: 2, status: 'available' },
    { num: 22, seats: 2, status: 'reserved' },
];

const MyTables = () => {
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);

    const statusColor: any = { occupied: '#818CF8', available: '#34D399', reserved: '#FBBF24', 'bill-requested': '#FB7185' };
    const statusBg: any = { occupied: 'rgba(129,140,248,0.08)', available: 'rgba(52,211,153,0.06)', reserved: 'rgba(251,191,36,0.06)', 'bill-requested': 'rgba(251,113,133,0.08)' };
    const orderStatusColor: any = { new: '#818CF8', cooking: '#F59E0B', ready: '#34D399', served: '#94A3B8' };

    const occupied = tablesData.filter(t => t.status === 'occupied' || t.status === 'bill-requested').length;
    const available = tablesData.filter(t => t.status === 'available').length;

    return (
        <div className="mgr-page">
            {/* Stats */}
            <div className="grid4" style={{ marginBottom: 16, gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(129,140,248,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#818CF8' }}><i className="ri-layout-grid-line"></i></div>
                    <div><div className="kl">Total Assigned</div><div className="kv" style={{ fontSize: 22 }}>{tablesData.length}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#F59E0B' }}><i className="ri-group-line"></i></div>
                    <div><div className="kl">Occupied</div><div className="kv" style={{ fontSize: 22 }}>{occupied}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(52,211,153,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#34D399' }}><i className="ri-checkbox-circle-line"></i></div>
                    <div><div className="kl">Available</div><div className="kv" style={{ fontSize: 22 }}>{available}</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(251,113,133,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#FB7185' }}><i className="ri-bill-line"></i></div>
                    <div><div className="kl">Bill Requested</div><div className="kv" style={{ fontSize: 22 }}>{tablesData.filter(t => t.status === 'bill-requested').length}</div></div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16 }}>
                {/* Tables Grid */}
                <div className="card">
                    <div className="ch"><div><div className="ct">My Assigned Tables</div><div className="cs">Click on a table to see details</div></div></div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                        {tablesData.map(t => (
                            <div key={t.num} onClick={() => setSelectedTable(t)} style={{ padding: '16px 12px', borderRadius: 12, background: statusBg[t.status], border: `2px solid ${selectedTable?.num === t.num ? statusColor[t.status] : 'transparent'}`, cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}>
                                <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Outfit', color: statusColor[t.status], marginBottom: 4 }}>T{t.num}</div>
                                <div style={{ fontSize: 10, color: 'var(--mt)', marginBottom: 4 }}>{t.seats} seats</div>
                                {t.status === 'occupied' && <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--ink)' }}>{t.guests} guests · {t.orderTime}</div>}
                                {t.status === 'bill-requested' && <div style={{ fontSize: 9, fontWeight: 600, color: '#FB7185', background: 'rgba(251,113,133,0.12)', padding: '2px 6px', borderRadius: 4, display: 'inline-block' }}>BILL REQ</div>}
                                {t.status === 'available' && <div style={{ fontSize: 10, color: '#34D399', fontWeight: 500 }}>Empty</div>}
                                {t.status === 'reserved' && <div style={{ fontSize: 10, color: '#FBBF24', fontWeight: 500 }}>Reserved</div>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Table Details Panel */}
                <div className="card">
                    {selectedTable ? (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                                <div>
                                    <div style={{ fontFamily: 'Outfit', fontSize: 24, fontWeight: 700, color: statusColor[selectedTable.status] }}>Table {selectedTable.num}</div>
                                    <div style={{ fontSize: 11, color: 'var(--mt)' }}>{selectedTable.seats} seats · {selectedTable.status === 'occupied' || selectedTable.status === 'bill-requested' ? `${selectedTable.guests} guests` : selectedTable.status}</div>
                                </div>
                                {selectedTable.orderStatus && (
                                    <span className="pill" style={{ fontSize: 9, background: `${orderStatusColor[selectedTable.orderStatus]}20`, color: orderStatusColor[selectedTable.orderStatus] }}>
                                        {selectedTable.orderStatus.toUpperCase()}
                                    </span>
                                )}
                            </div>

                            {selectedTable.order && (
                                <>
                                    <div style={{ padding: '10px 12px', background: 'var(--cr)', borderRadius: 8, marginBottom: 12 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <span style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 13, color: 'var(--tc)' }}>{selectedTable.order}</span>
                                            <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: 'var(--ink)' }}>{selectedTable.amount}</span>
                                        </div>
                                        <div style={{ fontSize: 10, color: 'var(--mt)' }}>Ordered {selectedTable.orderTime} ago</div>
                                    </div>

                                    <div style={{ marginBottom: 14 }}>
                                        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Items Ordered:</div>
                                        {selectedTable.items?.map((item, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 0', borderBottom: '1px solid var(--cr)', fontSize: 12 }}>
                                                <i className="ri-restaurant-line" style={{ fontSize: 10, color: 'var(--tc)' }}></i>
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ display: 'grid', gap: 8 }}>
                                        {selectedTable.orderStatus === 'ready' && (
                                            <button className="btn" style={{ width: '100%', padding: '10px', fontSize: 12, background: '#34D399' }}>
                                                <i className="ri-checkbox-circle-line" style={{ marginRight: 4 }}></i>Mark as Served
                                            </button>
                                        )}
                                        {(selectedTable.status === 'occupied' || selectedTable.status === 'bill-requested') && (
                                            <button className="btn-o" style={{ width: '100%', padding: '10px', fontSize: 12 }}>
                                                <i className="ri-add-line" style={{ marginRight: 4 }}></i>Add More Items
                                            </button>
                                        )}
                                        {selectedTable.orderStatus === 'served' && (
                                            <button className="btn" style={{ width: '100%', padding: '10px', fontSize: 12, background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>
                                                <i className="ri-bill-line" style={{ marginRight: 4 }}></i>Request Bill
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}

                            {selectedTable.status === 'available' && (
                                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                                    <i className="ri-add-circle-line" style={{ fontSize: 40, color: 'var(--dv)', marginBottom: 10, display: 'block' }}></i>
                                    <div style={{ fontSize: 12, color: 'var(--mt)', marginBottom: 14 }}>Table is empty. Seat guests & take order.</div>
                                    <button className="btn" style={{ fontSize: 12 }}><i className="ri-user-add-line" style={{ marginRight: 4 }}></i>Seat Guests</button>
                                </div>
                            )}

                            {selectedTable.status === 'reserved' && (
                                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                                    <i className="ri-calendar-check-line" style={{ fontSize: 40, color: '#FBBF24', marginBottom: 10, display: 'block' }}></i>
                                    <div style={{ fontSize: 12, color: 'var(--mt)' }}>This table is reserved</div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '50px 0' }}>
                            <i className="ri-hand-coin-line" style={{ fontSize: 44, color: 'var(--dv)', marginBottom: 10, display: 'block' }}></i>
                            <div style={{ fontSize: 13, color: 'var(--mt)' }}>Select a table to view details</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyTables;
