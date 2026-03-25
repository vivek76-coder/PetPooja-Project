import { useState } from 'react';

const menuCategories = [
    { key: 'starters', label: 'Starters', icon: 'ri-fire-line' },
    { key: 'maincourse', label: 'Main Course', icon: 'ri-restaurant-line' },
    { key: 'breads', label: 'Breads', icon: 'ri-cake-2-line' },
    { key: 'rice', label: 'Rice & Biryani', icon: 'ri-bowl-line' },
    { key: 'beverages', label: 'Beverages', icon: 'ri-cup-line' },
    { key: 'desserts', label: 'Desserts', icon: 'ri-cake-3-line' },
];

const menuItems: any = {
    starters: [
        { id: 1, name: 'Paneer Tikka', price: 260, veg: true },
        { id: 2, name: 'Chicken Tikka', price: 290, veg: false },
        { id: 3, name: 'Hara Bhara Kebab', price: 220, veg: true },
        { id: 4, name: 'Seekh Kebab', price: 310, veg: false },
        { id: 5, name: 'Tandoori Mushroom', price: 240, veg: true },
        { id: 6, name: 'Fish Tikka', price: 340, veg: false },
    ],
    maincourse: [
        { id: 7, name: 'Butter Chicken', price: 320, veg: false },
        { id: 8, name: 'Palak Paneer', price: 250, veg: true },
        { id: 9, name: 'Dal Makhani', price: 280, veg: true },
        { id: 10, name: 'Mutton Rogan Josh', price: 420, veg: false },
        { id: 11, name: 'Chicken Curry', price: 300, veg: false },
        { id: 12, name: 'Paneer Butter Masala', price: 290, veg: true },
    ],
    breads: [
        { id: 13, name: 'Butter Naan', price: 60, veg: true },
        { id: 14, name: 'Garlic Naan', price: 60, veg: true },
        { id: 15, name: 'Tandoori Roti', price: 40, veg: true },
        { id: 16, name: 'Laccha Paratha', price: 70, veg: true },
    ],
    rice: [
        { id: 17, name: 'Jeera Rice', price: 150, veg: true },
        { id: 18, name: 'Chicken Biryani', price: 380, veg: false },
        { id: 19, name: 'Veg Biryani', price: 280, veg: true },
        { id: 20, name: 'Pulao', price: 180, veg: true },
    ],
    beverages: [
        { id: 21, name: 'Mango Lassi', price: 120, veg: true },
        { id: 22, name: 'Sweet Lassi', price: 90, veg: true },
        { id: 23, name: 'Masala Chaas', price: 60, veg: true },
        { id: 24, name: 'Fresh Lime Soda', price: 80, veg: true },
    ],
    desserts: [
        { id: 25, name: 'Gulab Jamun', price: 100, veg: true },
        { id: 26, name: 'Rasmalai', price: 120, veg: true },
        { id: 27, name: 'Ice Cream', price: 80, veg: true },
    ],
};

const TakeOrder = () => {
    const [selectedTable, setSelectedTable] = useState('7');
    const [activeCategory, setActiveCategory] = useState('starters');
    const [cart, setCart] = useState<any[]>([]);
    const [notes, setNotes] = useState('');

    const addItem = (item: any) => {
        const existing = cart.find(c => c.id === item.id);
        if (existing) {
            setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
        } else {
            setCart([...cart, { ...item, qty: 1 }]);
        }
    };

    const updateQty = (id: number, delta: number) => {
        setCart(cart.map(c => c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0));
    };

    const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);
    const totalAmount = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

    const tables = ['3', '5', '7', '11', '12', '16', '19'];

    return (
        <div className="mgr-page">
            {/* Table Selection */}
            <div className="card" style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>Select Table:</span>
                    {tables.map(t => (
                        <button key={t} onClick={() => setSelectedTable(t)} style={{ padding: '6px 14px', borderRadius: 8, border: `2px solid ${selectedTable === t ? 'var(--tc)' : 'var(--dv)'}`, background: selectedTable === t ? 'var(--tcm)' : 'var(--ww)', color: selectedTable === t ? 'var(--tc)' : 'var(--ink)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Outfit', transition: 'all 0.15s' }}>
                            T{t}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
                {/* Menu Section */}
                <div>
                    {/* Category Tabs */}
                    <div className="ko-filters" style={{ marginBottom: 12 }}>
                        {menuCategories.map(c => (
                            <button key={c.key} className={`ko-filter-btn ${activeCategory === c.key ? 'active' : ''}`} onClick={() => setActiveCategory(c.key)}>
                                <i className={c.icon} style={{ marginRight: 4 }}></i>{c.label}
                            </button>
                        ))}
                    </div>

                    {/* Menu Items Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                        {menuItems[activeCategory]?.map((item: any) => {
                            const inCart = cart.find(c => c.id === item.id);
                            return (
                                <div key={item.id} className="card" style={{ padding: '12px', cursor: 'pointer', border: inCart ? '2px solid var(--tc)' : '2px solid transparent', transition: 'all 0.15s' }} onClick={() => addItem(item)}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                                        <div style={{ width: 12, height: 12, borderRadius: 2, border: `2px solid ${item.veg ? '#34D399' : '#FB7185'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ width: 5, height: 5, borderRadius: '50%', background: item.veg ? '#34D399' : '#FB7185' }}></div>
                                        </div>
                                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{item.name}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: 14, fontWeight: 700, fontFamily: 'Outfit', color: 'var(--tc)' }}>₹{item.price}</span>
                                        {inCart ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} onClick={e => e.stopPropagation()}>
                                                <button onClick={() => updateQty(item.id, -1)} style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid var(--dv)', background: 'var(--ww)', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                                                <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, minWidth: 16, textAlign: 'center', color: 'var(--tc)' }}>{inCart.qty}</span>
                                                <button onClick={() => updateQty(item.id, 1)} style={{ width: 24, height: 24, borderRadius: 6, border: 'none', background: 'var(--tc)', color: '#fff', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                                            </div>
                                        ) : (
                                            <span style={{ fontSize: 10, color: 'var(--mt)' }}>Tap to add</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Cart / Order Summary */}
                <div className="card" style={{ position: 'sticky', top: 70, alignSelf: 'start' }}>
                    <div className="ch">
                        <div>
                            <div className="ct">🧾 Order — Table {selectedTable}</div>
                            <div className="cs">{totalItems} items</div>
                        </div>
                    </div>

                    {cart.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '30px 0' }}>
                            <i className="ri-shopping-cart-line" style={{ fontSize: 36, color: 'var(--dv)', display: 'block', marginBottom: 8 }}></i>
                            <div style={{ fontSize: 12, color: 'var(--mt)' }}>No items added yet</div>
                        </div>
                    ) : (
                        <>
                            {cart.map(c => (
                                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--cr)' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)' }}>{c.name}</div>
                                        <div style={{ fontSize: 10, color: 'var(--mt)' }}>₹{c.price} × {c.qty}</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <button onClick={() => updateQty(c.id, -1)} style={{ width: 20, height: 20, borderRadius: 4, border: '1px solid var(--dv)', background: 'var(--ww)', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                                        <span style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 12, minWidth: 14, textAlign: 'center' }}>{c.qty}</span>
                                        <button onClick={() => updateQty(c.id, 1)} style={{ width: 20, height: 20, borderRadius: 4, border: 'none', background: 'var(--tc)', color: '#fff', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                                        <span style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 12, minWidth: 50, textAlign: 'right' }}>₹{c.price * c.qty}</span>
                                    </div>
                                </div>
                            ))}

                            {/* Notes */}
                            <div style={{ marginTop: 10 }}>
                                <label style={{ fontSize: 10, color: 'var(--mt)', display: 'block', marginBottom: 3 }}>Special Instructions</label>
                                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. Less spicy, no onion..." style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid var(--dv)', background: 'var(--ww)', fontSize: 11, resize: 'none', height: 50, color: 'var(--ink)', fontFamily: 'inherit' }}></textarea>
                            </div>

                            {/* Total */}
                            <div style={{ marginTop: 10, paddingTop: 10, borderTop: '2px solid var(--dv)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700, fontFamily: 'Outfit', color: 'var(--tc)' }}>
                                    <span>Total</span><span>₹{totalAmount.toLocaleString()}</span>
                                </div>
                            </div>

                            <button className="btn" style={{ width: '100%', marginTop: 12, padding: '14px', fontSize: 14, fontWeight: 600, borderRadius: 12, background: 'linear-gradient(135deg, #818CF8, #6366F1)' }}>
                                <i className="ri-send-plane-line" style={{ marginRight: 6 }}></i>
                                Send to Kitchen
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TakeOrder;
