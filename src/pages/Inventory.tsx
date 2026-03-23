const Inventory = () => {
    const items = [
        { name: 'Fresh Paneer', cat: 'Dairy', unit: 'kg', stock: '1.2 kg', sColor: '#E24B4A', pct: 15, reorder: '5 kg', status: 'Low', sCls: 'p-due', act: 'Reorder', hi: true, bar: '#E24B4A' },
        { name: 'Chicken (Whole)', cat: 'Meat', unit: 'kg', stock: '18 kg', sColor: '', pct: 60, reorder: '10 kg', status: 'Good', sCls: 'p-ready', act: 'Update', hi: false, bar: 'var(--sg)' },
        { name: 'Basmati Rice', cat: 'Dry Goods', unit: 'kg', stock: '42 kg', sColor: '', pct: 84, reorder: '15 kg', status: 'Good', sCls: 'p-ready', act: 'Update', hi: false, bar: 'var(--sg)' },
        { name: 'Mango Pulp', cat: 'Beverages', unit: 'litre', stock: '3.5 L', sColor: '#854F0B', pct: 23, reorder: '8 L', status: 'Medium', sCls: 'p-prep', act: 'Reorder', hi: true, bar: '#EF9F27' },
        { name: 'Ghee', cat: 'Dairy', unit: 'kg', stock: '0 kg', sColor: '#E24B4A', pct: 0, reorder: '3 kg', status: 'Out of Stock', sCls: 'p-due', act: 'Reorder', hi: true, bar: '#E24B4A' },
    ];

    return (
        <>
            <div className="grid4" style={{ marginBottom: 14 }}>
                <div className="kpi"><div className="kl">Total Items</div><div className="kv">248</div></div>
                <div className="kpi"><div className="kl">Low Stock</div><div className="kv" style={{ color: '#E24B4A' }}>12</div><div className="ks"><span className="kc dn">Needs reorder</span></div></div>
                <div className="kpi"><div className="kl">Out of Stock</div><div className="kv" style={{ color: 'var(--tc)' }}>3</div></div>
                <div className="kpi"><div className="kl">Today's Usage</div><div className="kv">₹28.4K</div></div>
            </div>
            <div className="inv-cats" style={{ marginBottom: 14 }}>
                {['All', 'Dairy', 'Vegetables', 'Meat', 'Spices', 'Dry Goods', 'Beverages'].map((c, i) => (
                    <div className={`inv-cat ${i === 0 ? 'act' : ''}`} key={c}>{c}</div>
                ))}
            </div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--dv)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="ct" style={{ fontSize: 14 }}>Stock levels</div>
                    <div style={{ display: 'flex', gap: 8 }}><button className="btn-o" style={{ fontSize: 11 }}>Export</button><button className="btn" style={{ fontSize: 11 }}>+ Add Item</button></div>
                </div>
                <div className="th inv-row" style={{ display: 'grid' }}><span>Item</span><span>Unit</span><span>Current Stock</span><span>Reorder Level</span><span>Status</span><span>Action</span></div>
                {items.map(it => (
                    <div className="tr inv-row" style={{ display: 'grid' }} key={it.name}>
                        <div><div style={{ fontSize: 11, fontWeight: 500 }}>{it.name}</div><div style={{ fontSize: 9, color: 'var(--mt)' }}>{it.cat}</div></div>
                        <div style={{ fontSize: 11, color: 'var(--mt)' }}>{it.unit}</div>
                        <div><div style={{ fontSize: 11, fontWeight: 500, color: it.sColor || 'var(--ink)' }}>{it.stock}</div><div className="stock-bar"><div className="stock-fill" style={{ background: it.bar, width: `${it.pct}%` }}></div></div></div>
                        <div style={{ fontSize: 11, color: 'var(--mt)' }}>{it.reorder}</div>
                        <div><span className={`pill ${it.sCls}`}>{it.status}</span></div>
                        <div style={{ fontSize: 11, color: it.hi ? 'var(--tc)' : 'var(--mt)', cursor: 'pointer', fontWeight: it.hi ? 500 : 400 }}>{it.act}</div>
                    </div>
                ))}
            </div>
        </>
    );
};
export default Inventory;
