import { useState } from 'react';

interface InventoryItem {
    name: string;
    category: string;
    currentStock: string;
    minRequired: string;
    unit: string;
    stockPct: number;
    lastRestocked: string;
    status: 'critical' | 'low' | 'ok';
    supplier?: string;
}

const inventoryData: InventoryItem[] = [
    { name: 'Onions', category: 'Vegetables', currentStock: '2', minRequired: '15', unit: 'kg', stockPct: 13, lastRestocked: '2 days ago', status: 'critical', supplier: 'Farm Fresh Pvt Ltd' },
    { name: 'Tomatoes', category: 'Vegetables', currentStock: '3', minRequired: '12', unit: 'kg', stockPct: 25, lastRestocked: '1 day ago', status: 'critical', supplier: 'Farm Fresh Pvt Ltd' },
    { name: 'Chicken', category: 'Meat', currentStock: '4', minRequired: '20', unit: 'kg', stockPct: 20, lastRestocked: 'Today morning', status: 'critical', supplier: 'Star Meats' },
    { name: 'Paneer', category: 'Dairy', currentStock: '3', minRequired: '10', unit: 'kg', stockPct: 30, lastRestocked: '1 day ago', status: 'low', supplier: 'Amul Distributors' },
    { name: 'Cooking Oil', category: 'Essentials', currentStock: '5', minRequired: '15', unit: 'L', stockPct: 33, lastRestocked: '3 days ago', status: 'low', supplier: 'Fortune Oils' },
    { name: 'Basmati Rice', category: 'Grains', currentStock: '8', minRequired: '25', unit: 'kg', stockPct: 32, lastRestocked: '4 days ago', status: 'low', supplier: 'India Gate' },
    { name: 'Butter', category: 'Dairy', currentStock: '2', minRequired: '5', unit: 'kg', stockPct: 40, lastRestocked: '2 days ago', status: 'low', supplier: 'Amul Distributors' },
    { name: 'Cream', category: 'Dairy', currentStock: '1.5', minRequired: '4', unit: 'L', stockPct: 38, lastRestocked: '1 day ago', status: 'low', supplier: 'Amul Distributors' },
    { name: 'Flour (Maida)', category: 'Grains', currentStock: '12', minRequired: '20', unit: 'kg', stockPct: 60, lastRestocked: '3 days ago', status: 'ok' },
    { name: 'Spice Mix', category: 'Spices', currentStock: '3', minRequired: '5', unit: 'kg', stockPct: 60, lastRestocked: '5 days ago', status: 'ok' },
    { name: 'Ginger-Garlic Paste', category: 'Spices', currentStock: '2', minRequired: '4', unit: 'kg', stockPct: 50, lastRestocked: '2 days ago', status: 'ok' },
    { name: 'Mutton', category: 'Meat', currentStock: '6', minRequired: '10', unit: 'kg', stockPct: 60, lastRestocked: 'Today morning', status: 'ok', supplier: 'Star Meats' },
];

const InventoryAlerts = () => {
    const [filter, setFilter] = useState<'all' | 'critical' | 'low' | 'ok'>('all');
    const filtered = filter === 'all' ? inventoryData : inventoryData.filter(i => i.status === filter);

    const critical = inventoryData.filter(i => i.status === 'critical').length;
    const low = inventoryData.filter(i => i.status === 'low').length;
    const ok = inventoryData.filter(i => i.status === 'ok').length;

    const statusColor: any = { critical: '#FB7185', low: '#FBBF24', ok: '#34D399' };
    const statusBg: any = { critical: 'rgba(251,113,133,0.12)', low: 'rgba(251,191,36,0.12)', ok: 'rgba(52,211,153,0.12)' };

    return (
        <div className="mgr-page">
            {/* Stats */}
            <div className="grid4" style={{ marginBottom: 16, gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12, borderLeft: '4px solid #FB7185' }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(251,113,133,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#FB7185' }}><i className="ri-alert-line"></i></div>
                    <div><div className="kl">Critical</div><div className="kv" style={{ fontSize: 22, color: '#FB7185' }}>{critical}</div><div style={{ fontSize: 10, color: 'var(--mt)' }}>Reorder immediately</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12, borderLeft: '4px solid #FBBF24' }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(251,191,36,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#FBBF24' }}><i className="ri-error-warning-line"></i></div>
                    <div><div className="kl">Low Stock</div><div className="kv" style={{ fontSize: 22, color: '#FBBF24' }}>{low}</div><div style={{ fontSize: 10, color: 'var(--mt)' }}>Plan reorder</div></div>
                </div>
                <div className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12, borderLeft: '4px solid #34D399' }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(52,211,153,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#34D399' }}><i className="ri-checkbox-circle-line"></i></div>
                    <div><div className="kl">Sufficient</div><div className="kv" style={{ fontSize: 22, color: '#34D399' }}>{ok}</div><div style={{ fontSize: 10, color: 'var(--mt)' }}>Stock OK</div></div>
                </div>
            </div>

            {/* Filters */}
            <div className="ko-filters" style={{ marginBottom: 16 }}>
                {(['all', 'critical', 'low', 'ok'] as const).map(f => (
                    <button key={f} className={`ko-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                        {f === 'all' ? 'All Items' : f === 'ok' ? 'Sufficient' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Inventory Table */}
            <div className="card">
                <div className="th" style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px 90px 1fr 80px 70px' }}>
                    <span>Item</span><span>Stock</span><span>Min Req</span><span>Category</span><span>Stock Level</span><span>Restocked</span><span>Status</span>
                </div>
                {filtered.map(item => (
                    <div className="tr" key={item.name} style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px 90px 1fr 80px 70px', borderLeft: `3px solid ${statusColor[item.status]}` }}>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)' }}>{item.name}</div>
                            {item.supplier && <div style={{ fontSize: 9, color: 'var(--mt)' }}>{item.supplier}</div>}
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 600, fontFamily: 'Outfit', color: statusColor[item.status] }}>{item.currentStock} {item.unit}</span>
                        <span style={{ fontSize: 11, color: 'var(--mt)' }}>{item.minRequired} {item.unit}</span>
                        <span style={{ fontSize: 11 }}>{item.category}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ flex: 1, height: 6, background: 'var(--dv)', borderRadius: 3, overflow: 'hidden' }}>
                                <div style={{ width: `${item.stockPct}%`, height: '100%', background: statusColor[item.status], borderRadius: 3, transition: 'width 0.5s' }}></div>
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 500, minWidth: 28 }}>{item.stockPct}%</span>
                        </div>
                        <span style={{ fontSize: 10, color: 'var(--mt)' }}>{item.lastRestocked}</span>
                        <span className="pill" style={{ fontSize: 8, textAlign: 'center', background: statusBg[item.status], color: statusColor[item.status] }}>{item.status.toUpperCase()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InventoryAlerts;
