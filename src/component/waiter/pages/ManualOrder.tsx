import { useState } from 'react';

/* ── Types ── */
interface ManualItem {
    id: number;
    name: string;
    price: number;
    qty: number;
    notes: string;
    veg: boolean;
}

/* ── Quick‑add popular items (waiter can tap directly) ── */
const quickItems = [
    { name: 'Butter Chicken', price: 320, veg: false, icon: 'ri-restaurant-line' },
    { name: 'Dal Makhani', price: 280, veg: true, icon: 'ri-bowl-line' },
    { name: 'Garlic Naan', price: 60, veg: true, icon: 'ri-cake-2-line' },
    { name: 'Paneer Tikka', price: 260, veg: true, icon: 'ri-fire-line' },
    { name: 'Chicken Biryani', price: 380, veg: false, icon: 'ri-bowl-line' },
    { name: 'Mango Lassi', price: 120, veg: true, icon: 'ri-cup-line' },
    { name: 'Tandoori Roti', price: 40, veg: true, icon: 'ri-cake-2-line' },
    { name: 'Gulab Jamun', price: 100, veg: true, icon: 'ri-cake-3-line' },
];

const ManualOrder = () => {
    /* ── State ── */
    const [selectedTable, setSelectedTable] = useState('');
    const [guestCount, setGuestCount] = useState(2);
    const [orderType, setOrderType] = useState<'dine-in' | 'takeaway' | 'delivery'>('dine-in');
    const [cart, setCart] = useState<ManualItem[]>([]);
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemVeg, setItemVeg] = useState(true);
    const [globalNotes, setGlobalNotes] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [nextId, setNextId] = useState(1);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const tables = [
        { num: '1', status: 'available' }, { num: '2', status: 'available' },
        { num: '3', status: 'occupied' }, { num: '4', status: 'available' },
        { num: '5', status: 'occupied' }, { num: '6', status: 'available' },
        { num: '7', status: 'available' }, { num: '8', status: 'occupied' },
        { num: '9', status: 'available' }, { num: '10', status: 'available' },
        { num: '11', status: 'occupied' }, { num: '12', status: 'available' },
    ];

    /* ── Cart helpers ── */
    const addToCart = (name: string, price: number, veg: boolean) => {
        const existing = cart.find(c => c.name.toLowerCase() === name.toLowerCase());
        if (existing) {
            setCart(cart.map(c => c.name.toLowerCase() === name.toLowerCase() ? { ...c, qty: c.qty + 1 } : c));
        } else {
            setCart([...cart, { id: nextId, name, price, qty: 1, notes: '', veg }]);
            setNextId(nextId + 1);
        }
    };

    const addManualItem = () => {
        if (!itemName.trim() || !itemPrice.trim()) return;
        addToCart(itemName.trim(), parseFloat(itemPrice), itemVeg);
        setItemName('');
        setItemPrice('');
    };

    const updateQty = (id: number, delta: number) => {
        setCart(cart.map(c => c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0));
    };

    const updateItemNote = (id: number, note: string) => {
        setCart(cart.map(c => c.id === id ? { ...c, notes: note } : c));
    };

    const removeItem = (id: number) => {
        setCart(cart.filter(c => c.id !== id));
    };

    const clearCart = () => {
        setCart([]);
        setGlobalNotes('');
    };

    const totalItems = cart.reduce((s, c) => s + c.qty, 0);
    const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
    const gst = Math.round(subtotal * 0.05);
    const grandTotal = subtotal + gst;

    const filteredQuickItems = quickItems.filter(i =>
        searchQuery === '' || i.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlePlaceOrder = () => {
        if (cart.length === 0 || !selectedTable) return;
        setOrderPlaced(true);
        setTimeout(() => setOrderPlaced(false), 3000);
    };

    const orderTypeConfig = [
        { key: 'dine-in', label: 'Dine-in', icon: 'ri-restaurant-line', color: '#818CF8' },
        { key: 'takeaway', label: 'Takeaway', icon: 'ri-shopping-bag-line', color: '#F59E0B' },
        { key: 'delivery', label: 'Delivery', icon: 'ri-truck-line', color: '#34D399' },
    ];

    return (
        <div className="mgr-page">
            {/* ── Success Toast ── */}
            {orderPlaced && (
                <div style={{
                    position: 'fixed', top: 24, right: 24, zIndex: 999, background: 'linear-gradient(135deg, #34D399, #10B981)',
                    color: '#fff', padding: '14px 24px', borderRadius: 14, fontSize: 13, fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 32px rgba(16,185,129,0.35)',
                    animation: 'slideIn 0.4s ease'
                }}>
                    <i className="ri-check-double-line" style={{ fontSize: 20 }}></i>
                    Order sent to kitchen — Table {selectedTable}
                </div>
            )}

            {/* ── Top Bar: Order Type + Table Selection ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                {/* Order Type Card */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <i className="ri-file-list-3-line" style={{ fontSize: 16, color: 'var(--tc)' }}></i>
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Order Type</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        {orderTypeConfig.map(t => (
                            <button key={t.key} onClick={() => setOrderType(t.key as any)} style={{
                                flex: 1, padding: '12px 10px', borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s',
                                border: orderType === t.key ? `2px solid ${t.color}` : '2px solid var(--dv)',
                                background: orderType === t.key ? `${t.color}14` : 'var(--ww)',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                            }}>
                                <i className={t.icon} style={{
                                    fontSize: 20, color: orderType === t.key ? t.color : 'var(--mt)',
                                    transition: 'color 0.2s'
                                }}></i>
                                <span style={{
                                    fontSize: 11, fontWeight: 600,
                                    color: orderType === t.key ? t.color : 'var(--mt)',
                                    fontFamily: 'Outfit'
                                }}>{t.label}</span>
                            </button>
                        ))}
                    </div>
                    {orderType === 'dine-in' && (
                        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 11, color: 'var(--mt)' }}>Guests:</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <button onClick={() => setGuestCount(Math.max(1, guestCount - 1))} style={{
                                    width: 28, height: 28, borderRadius: 8, border: '1px solid var(--dv)',
                                    background: 'var(--ww)', cursor: 'pointer', fontSize: 16, display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', color: 'var(--ink)'
                                }}>−</button>
                                <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: 'var(--tc)', minWidth: 24, textAlign: 'center' }}>{guestCount}</span>
                                <button onClick={() => setGuestCount(guestCount + 1)} style={{
                                    width: 28, height: 28, borderRadius: 8, border: 'none',
                                    background: 'var(--tc)', color: '#fff', cursor: 'pointer', fontSize: 16,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>+</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Table Selection Card */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <i className="ri-layout-grid-line" style={{ fontSize: 16, color: 'var(--tc)' }}></i>
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Select Table</span>
                        {selectedTable && (
                            <span className="pill" style={{ background: 'rgba(52,211,153,0.15)', color: '#34D399', marginLeft: 'auto', fontSize: 9 }}>
                                Table {selectedTable} selected
                            </span>
                        )}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
                        {tables.map(t => (
                            <button key={t.num} onClick={() => t.status === 'available' || selectedTable === t.num ? setSelectedTable(selectedTable === t.num ? '' : t.num) : null}
                                style={{
                                    padding: '10px 0', borderRadius: 10, cursor: t.status === 'available' || selectedTable === t.num ? 'pointer' : 'not-allowed',
                                    border: selectedTable === t.num ? '2px solid var(--tc)' : t.status === 'occupied' ? '2px solid rgba(251,113,133,0.3)' : '2px solid var(--dv)',
                                    background: selectedTable === t.num ? 'var(--tcm)' : t.status === 'occupied' ? 'rgba(251,113,133,0.06)' : 'var(--ww)',
                                    transition: 'all 0.15s', textAlign: 'center', opacity: t.status === 'occupied' && selectedTable !== t.num ? 0.5 : 1,
                                }}>
                                <div style={{ fontFamily: 'Outfit', fontSize: 14, fontWeight: 700, color: selectedTable === t.num ? 'var(--tc)' : 'var(--ink)' }}>T{t.num}</div>
                                <div style={{
                                    fontSize: 8, marginTop: 2, fontWeight: 500,
                                    color: t.status === 'occupied' ? '#FB7185' : '#34D399',
                                    textTransform: 'uppercase', letterSpacing: 0.5
                                }}>
                                    {selectedTable === t.num ? '✓ Selected' : t.status === 'occupied' ? 'Busy' : 'Free'}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Main Grid: Manual Entry + Quick Items | Cart ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 16 }}>
                {/* Left Side */}
                <div>
                    {/* Manual Item Entry */}
                    <div className="card" style={{ marginBottom: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: 10,
                                background: 'linear-gradient(135deg, var(--tc), var(--tcl))',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <i className="ri-edit-line" style={{ fontSize: 18, color: '#fff' }}></i>
                            </div>
                            <div>
                                <div className="ct" style={{ fontSize: 14 }}>Manual Item Entry</div>
                                <div className="cs">Type item name and price to add to order</div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px auto auto', gap: 10, alignItems: 'end' }}>
                            {/* Item Name */}
                            <div>
                                <label style={{ fontSize: 10, color: 'var(--mt)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Item Name</label>
                                <input type="text" value={itemName} onChange={e => setItemName(e.target.value)}
                                    placeholder="e.g. Special Thali, Extra Raita..."
                                    onKeyDown={e => e.key === 'Enter' && addManualItem()}
                                    style={{
                                        width: '100%', padding: '10px 14px', borderRadius: 10,
                                        border: '1.5px solid var(--dv)', background: 'var(--ww)', fontSize: 12,
                                        color: 'var(--ink)', fontFamily: 'inherit', transition: 'border-color 0.2s',
                                        outline: 'none'
                                    }}
                                    onFocus={e => (e.target.style.borderColor = 'var(--tc)')}
                                    onBlur={e => (e.target.style.borderColor = 'var(--dv)')}
                                />
                            </div>
                            {/* Price */}
                            <div>
                                <label style={{ fontSize: 10, color: 'var(--mt)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Price (₹)</label>
                                <input type="number" value={itemPrice} onChange={e => setItemPrice(e.target.value)}
                                    placeholder="0"
                                    onKeyDown={e => e.key === 'Enter' && addManualItem()}
                                    style={{
                                        width: '100%', padding: '10px 14px', borderRadius: 10,
                                        border: '1.5px solid var(--dv)', background: 'var(--ww)', fontSize: 12,
                                        color: 'var(--ink)', fontFamily: 'Outfit', fontWeight: 600, outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                    onFocus={e => (e.target.style.borderColor = 'var(--tc)')}
                                    onBlur={e => (e.target.style.borderColor = 'var(--dv)')}
                                />
                            </div>
                            {/* Veg/Non-veg Toggle */}
                            <div>
                                <label style={{ fontSize: 10, color: 'var(--mt)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Type</label>
                                <button onClick={() => setItemVeg(!itemVeg)} style={{
                                    padding: '9px 14px', borderRadius: 10, cursor: 'pointer', fontSize: 11, fontWeight: 600,
                                    border: `2px solid ${itemVeg ? '#34D399' : '#FB7185'}`,
                                    background: itemVeg ? 'rgba(52,211,153,0.1)' : 'rgba(251,113,133,0.1)',
                                    color: itemVeg ? '#34D399' : '#FB7185',
                                    display: 'flex', alignItems: 'center', gap: 5, transition: 'all 0.2s', whiteSpace: 'nowrap'
                                }}>
                                    <div style={{
                                        width: 10, height: 10, borderRadius: 2,
                                        border: `2px solid ${itemVeg ? '#34D399' : '#FB7185'}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: itemVeg ? '#34D399' : '#FB7185' }}></div>
                                    </div>
                                    {itemVeg ? 'Veg' : 'Non-Veg'}
                                </button>
                            </div>
                            {/* Add Button */}
                            <div>
                                <button onClick={addManualItem} style={{
                                    padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
                                    background: itemName.trim() && itemPrice.trim()
                                        ? 'linear-gradient(135deg, var(--tc), var(--tcl))'
                                        : 'var(--dv)',
                                    color: itemName.trim() && itemPrice.trim() ? '#fff' : 'var(--mt)',
                                    fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5,
                                    transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif"
                                }}>
                                    <i className="ri-add-line" style={{ fontSize: 16 }}></i> Add
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Add Section */}
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <i className="ri-flashlight-line" style={{ fontSize: 16, color: '#F59E0B' }}></i>
                                <div>
                                    <div className="ct" style={{ fontSize: 14 }}>Quick Add</div>
                                    <div className="cs">Popular items — tap to add instantly</div>
                                </div>
                            </div>
                            {/* Search */}
                            <div style={{ position: 'relative' }}>
                                <i className="ri-search-line" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: 'var(--mt)' }}></i>
                                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Search items..."
                                    style={{
                                        padding: '8px 12px 8px 30px', borderRadius: 10,
                                        border: '1.5px solid var(--dv)', background: 'var(--cr)', fontSize: 11,
                                        color: 'var(--ink)', fontFamily: 'inherit', width: 180, outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                    onFocus={e => (e.target.style.borderColor = 'var(--tc)')}
                                    onBlur={e => (e.target.style.borderColor = 'var(--dv)')}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                            {filteredQuickItems.map((item, idx) => {
                                const inCart = cart.find(c => c.name.toLowerCase() === item.name.toLowerCase());
                                return (
                                    <div key={idx} onClick={() => addToCart(item.name, item.price, item.veg)}
                                        style={{
                                            padding: '14px 12px', borderRadius: 12, cursor: 'pointer',
                                            border: inCart ? '2px solid var(--tc)' : '2px solid var(--dv)',
                                            background: inCart ? 'var(--tcm)' : 'var(--ww)',
                                            transition: 'all 0.2s', position: 'relative', overflow: 'hidden'
                                        }}>
                                        {inCart && (
                                            <div style={{
                                                position: 'absolute', top: 6, right: 6, width: 20, height: 20, borderRadius: '50%',
                                                background: 'var(--tc)', color: '#fff', fontSize: 10, fontWeight: 700,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit'
                                            }}>{inCart.qty}</div>
                                        )}
                                        <div style={{
                                            width: 32, height: 32, borderRadius: 9,
                                            background: item.veg ? 'rgba(52,211,153,0.1)' : 'rgba(251,113,133,0.1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8
                                        }}>
                                            <i className={item.icon} style={{ fontSize: 16, color: item.veg ? '#34D399' : '#FB7185' }}></i>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                                            <div style={{
                                                width: 8, height: 8, borderRadius: 1.5,
                                                border: `1.5px solid ${item.veg ? '#34D399' : '#FB7185'}`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <div style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: item.veg ? '#34D399' : '#FB7185' }}></div>
                                            </div>
                                            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink)' }}>{item.name}</span>
                                        </div>
                                        <div style={{ fontFamily: 'Outfit', fontSize: 14, fontWeight: 700, color: 'var(--tc)' }}>₹{item.price}</div>
                                    </div>
                                );
                            })}
                            {filteredQuickItems.length === 0 && (
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '28px 0', color: 'var(--mt)' }}>
                                    <i className="ri-search-line" style={{ fontSize: 28, display: 'block', marginBottom: 6, opacity: 0.4 }}></i>
                                    <div style={{ fontSize: 12 }}>No items match "{searchQuery}"</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Right Side: Cart / Order Summary ── */}
                <div className="card" style={{ position: 'sticky', top: 70, alignSelf: 'start', padding: 0, overflow: 'hidden' }}>
                    {/* Cart Header */}
                    <div style={{
                        padding: '16px 18px', borderBottom: '1px solid var(--dv)',
                        background: 'linear-gradient(135deg, var(--tc), var(--tcl))',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <i className="ri-file-list-3-line" style={{ fontSize: 20, color: '#fff' }}></i>
                            <div>
                                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: 'Outfit' }}>
                                    {selectedTable ? `Order — Table ${selectedTable}` : 'New Order'}
                                </div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>
                                    {orderType.charAt(0).toUpperCase() + orderType.slice(1)} · {totalItems} items
                                </div>
                            </div>
                        </div>
                        {cart.length > 0 && (
                            <button onClick={clearCart} style={{
                                background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff',
                                padding: '5px 10px', borderRadius: 8, fontSize: 10, cursor: 'pointer',
                                fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4
                            }}>
                                <i className="ri-delete-bin-line" style={{ fontSize: 12 }}></i> Clear
                            </button>
                        )}
                    </div>

                    <div style={{ padding: '14px 18px' }}>
                        {/* Empty State */}
                        {cart.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px 16px' }}>
                                <div style={{
                                    width: 64, height: 64, borderRadius: 16, background: 'var(--cr)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 14px'
                                }}>
                                    <i className="ri-shopping-cart-line" style={{ fontSize: 28, color: 'var(--dv)' }}></i>
                                </div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>No items yet</div>
                                <div style={{ fontSize: 11, color: 'var(--mt)', lineHeight: 1.5 }}>
                                    Type an item manually or tap from<br />Quick Add section to get started
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Cart Items */}
                                <div style={{ maxHeight: 320, overflowY: 'auto', marginBottom: 12 }}>
                                    {cart.map((c, idx) => (
                                        <div key={c.id} style={{
                                            padding: '10px 0', borderBottom: idx < cart.length - 1 ? '1px solid var(--cr)' : 'none',
                                            animation: 'fadeInUp 0.3s ease'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                                        <div style={{
                                                            width: 9, height: 9, borderRadius: 2,
                                                            border: `1.5px solid ${c.veg ? '#34D399' : '#FB7185'}`,
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                        }}>
                                                            <div style={{ width: 4, height: 4, borderRadius: '50%', background: c.veg ? '#34D399' : '#FB7185' }}></div>
                                                        </div>
                                                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{c.name}</span>
                                                    </div>
                                                    <div style={{ fontSize: 10, color: 'var(--mt)', marginTop: 2 }}>₹{c.price} × {c.qty}</div>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <button onClick={() => updateQty(c.id, -1)} style={{
                                                        width: 22, height: 22, borderRadius: 6, border: '1px solid var(--dv)',
                                                        background: 'var(--ww)', cursor: 'pointer', fontSize: 13,
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)'
                                                    }}>−</button>
                                                    <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, minWidth: 16, textAlign: 'center', color: 'var(--tc)' }}>{c.qty}</span>
                                                    <button onClick={() => updateQty(c.id, 1)} style={{
                                                        width: 22, height: 22, borderRadius: 6, border: 'none',
                                                        background: 'var(--tc)', color: '#fff', cursor: 'pointer', fontSize: 13,
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                    }}>+</button>
                                                    <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 12, minWidth: 50, textAlign: 'right', color: 'var(--ink)' }}>₹{c.price * c.qty}</span>
                                                    <button onClick={() => removeItem(c.id)} title="Remove" style={{
                                                        background: 'none', border: 'none', cursor: 'pointer', color: '#FB7185', fontSize: 14,
                                                        display: 'flex', alignItems: 'center', padding: 2
                                                    }}>
                                                        <i className="ri-close-line"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            {/* Inline note for this item */}
                                            <input type="text" value={c.notes} onChange={e => updateItemNote(c.id, e.target.value)}
                                                placeholder="Add note (e.g. less spicy)..."
                                                style={{
                                                    width: '100%', marginTop: 6, padding: '5px 10px', borderRadius: 7,
                                                    border: '1px solid var(--dv)', background: 'var(--cr)', fontSize: 10,
                                                    color: 'var(--ink)', fontFamily: 'inherit', outline: 'none'
                                                }} />
                                        </div>
                                    ))}
                                </div>

                                {/* Global Notes */}
                                <div style={{ marginBottom: 12 }}>
                                    <label style={{ fontSize: 10, color: 'var(--mt)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                                        <i className="ri-chat-3-line" style={{ fontSize: 11 }}></i>
                                        Kitchen Instructions
                                    </label>
                                    <textarea value={globalNotes} onChange={e => setGlobalNotes(e.target.value)}
                                        placeholder="e.g. Rush order, Birthday special, No onion garlic..."
                                        style={{
                                            width: '100%', padding: '8px 12px', borderRadius: 10,
                                            border: '1.5px solid var(--dv)', background: 'var(--ww)', fontSize: 11,
                                            resize: 'none', height: 48, color: 'var(--ink)', fontFamily: 'inherit', outline: 'none'
                                        }} />
                                </div>

                                {/* Billing Summary */}
                                <div style={{ padding: '12px 14px', background: 'var(--cr)', borderRadius: 12, marginBottom: 12 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <span style={{ fontSize: 11, color: 'var(--mt)' }}>Subtotal</span>
                                        <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink)' }}>₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                        <span style={{ fontSize: 11, color: 'var(--mt)' }}>GST (5%)</span>
                                        <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink)' }}>₹{gst.toLocaleString()}</span>
                                    </div>
                                    <div style={{ borderTop: '2px dashed var(--dv)', paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: 15, fontWeight: 700, fontFamily: 'Outfit', color: 'var(--ink)' }}>Total</span>
                                        <span style={{ fontSize: 15, fontWeight: 700, fontFamily: 'Outfit', color: 'var(--tc)' }}>₹{grandTotal.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                    <button className="btn-o" style={{
                                        width: '100%', padding: '12px', fontSize: 12, fontWeight: 600,
                                        borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5
                                    }}>
                                        <i className="ri-save-line" style={{ fontSize: 14 }}></i> Save Draft
                                    </button>
                                    <button onClick={handlePlaceOrder} disabled={cart.length === 0 || !selectedTable} style={{
                                        width: '100%', padding: '12px', fontSize: 12, fontWeight: 600,
                                        borderRadius: 12, border: 'none', cursor: cart.length > 0 && selectedTable ? 'pointer' : 'not-allowed',
                                        background: cart.length > 0 && selectedTable
                                            ? 'linear-gradient(135deg, #818CF8, #6366F1)'
                                            : 'var(--dv)',
                                        color: cart.length > 0 && selectedTable ? '#fff' : 'var(--mt)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                                        fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s'
                                    }}>
                                        <i className="ri-send-plane-line" style={{ fontSize: 14 }}></i> Send to Kitchen
                                    </button>
                                </div>

                                {!selectedTable && cart.length > 0 && (
                                    <div style={{
                                        marginTop: 8, padding: '8px 12px', borderRadius: 9,
                                        background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)',
                                        display: 'flex', alignItems: 'center', gap: 6
                                    }}>
                                        <i className="ri-error-warning-line" style={{ fontSize: 14, color: '#FBBF24' }}></i>
                                        <span style={{ fontSize: 10, color: '#D97706', fontWeight: 500 }}>Please select a table to place this order</span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManualOrder;
