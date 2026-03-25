import { useState } from 'react';

interface OrderItem {
    name: string;
    qty: number;
    notes?: string;
}

interface Order {
    id: string;
    type: 'Dine-in' | 'Delivery' | 'Takeaway';
    platform?: string;
    table?: string;
    customer?: string;
    items: OrderItem[];
    time: string;
    status: 'new' | 'cooking' | 'ready';
}

const initialOrders: Order[] = [
    {
        id: '#ORD-901',
        type: 'Dine-in',
        table: 'Table 7',
        items: [
            { name: 'Butter Chicken', qty: 2 },
            { name: 'Garlic Naan', qty: 4 },
            { name: 'Dal Makhani', qty: 1 },
            { name: 'Mango Lassi', qty: 2, notes: 'Less sugar' },
        ],
        time: 'Just now',
        status: 'new',
    },
    {
        id: '#ORD-900',
        type: 'Delivery',
        platform: 'Zomato #Z9341',
        customer: 'Rahul S.',
        items: [
            { name: 'Chicken Biryani', qty: 2 },
            { name: 'Raita', qty: 2 },
            { name: 'Gulab Jamun', qty: 4, notes: 'Extra syrup' },
        ],
        time: '2 min ago',
        status: 'new',
    },
    {
        id: '#ORD-899',
        type: 'Delivery',
        platform: 'Swiggy #S1122',
        customer: 'Priya M.',
        items: [
            { name: 'Paneer Tikka', qty: 1 },
            { name: 'Veg Biryani', qty: 1 },
            { name: 'Butter Naan', qty: 2 },
        ],
        time: '4 min ago',
        status: 'new',
    },
    {
        id: '#ORD-898',
        type: 'Dine-in',
        table: 'Table 3',
        items: [
            { name: 'Palak Paneer', qty: 1 },
            { name: 'Jeera Rice', qty: 2 },
            { name: 'Tandoori Roti', qty: 6 },
        ],
        time: '6 min ago',
        status: 'cooking',
    },
    {
        id: '#ORD-897',
        type: 'Takeaway',
        customer: 'Amit K.',
        items: [
            { name: 'Chole Bhature', qty: 2 },
            { name: 'Lassi', qty: 2 },
        ],
        time: '9 min ago',
        status: 'cooking',
    },
    {
        id: '#ORD-896',
        type: 'Delivery',
        platform: 'Zomato #Z8844',
        customer: 'Sneha R.',
        items: [
            { name: 'Chicken Curry', qty: 1 },
            { name: 'Egg Curry', qty: 1 },
            { name: 'Garlic Naan', qty: 4 },
            { name: 'Raita', qty: 1 },
        ],
        time: '12 min ago',
        status: 'cooking',
    },
    {
        id: '#ORD-895',
        type: 'Dine-in',
        table: 'Table 12',
        items: [
            { name: 'Paneer Butter Masala', qty: 1 },
            { name: 'Butter Naan', qty: 3 },
        ],
        time: '15 min ago',
        status: 'ready',
    },
    {
        id: '#ORD-894',
        type: 'Takeaway',
        customer: 'Vikram J.',
        items: [
            { name: 'Mutton Rogan Josh', qty: 1 },
            { name: 'Chicken Biryani', qty: 1 },
            { name: 'Naan', qty: 2 },
        ],
        time: '18 min ago',
        status: 'ready',
    },
];

const OrdersKitchen = () => {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [activeFilter, setActiveFilter] = useState<'all' | 'new' | 'cooking' | 'ready'>('all');

    const filteredOrders = activeFilter === 'all'
        ? orders
        : orders.filter(o => o.status === activeFilter);

    const newCount = orders.filter(o => o.status === 'new').length;
    const cookingCount = orders.filter(o => o.status === 'cooking').length;
    const readyCount = orders.filter(o => o.status === 'ready').length;

    const updateStatus = (id: string, newStatus: 'new' | 'cooking' | 'ready' | 'done') => {
        if (newStatus === 'done') {
            setOrders(prev => prev.filter(o => o.id !== id));
        } else {
            setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'new': return { label: 'New Order', cls: 'ko-badge ko-badge-new' };
            case 'cooking': return { label: 'Cooking', cls: 'ko-badge ko-badge-cooking' };
            case 'ready': return { label: 'Ready', cls: 'ko-badge ko-badge-ready' };
            default: return { label: '', cls: '' };
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Dine-in': return 'ri-restaurant-line';
            case 'Delivery': return 'ri-e-bike-2-line';
            case 'Takeaway': return 'ri-shopping-bag-3-line';
            default: return 'ri-file-list-line';
        }
    };

    return (
        <div className="ko-page">
            {/* Summary Strip */}
            <div className="ko-summary">
                <div className="ko-sum-card">
                    <div className="ko-sum-icon" style={{ background: 'rgba(129,140,248,0.15)', color: '#818CF8' }}>
                        <i className="ri-file-list-3-line"></i>
                    </div>
                    <div>
                        <div className="ko-sum-val">{orders.length}</div>
                        <div className="ko-sum-label">Total Orders</div>
                    </div>
                </div>
                <div className="ko-sum-card">
                    <div className="ko-sum-icon" style={{ background: 'rgba(251,191,36,0.15)', color: '#FBBF24' }}>
                        <i className="ri-alarm-warning-line"></i>
                    </div>
                    <div>
                        <div className="ko-sum-val">{newCount}</div>
                        <div className="ko-sum-label">New (Pending)</div>
                    </div>
                </div>
                <div className="ko-sum-card">
                    <div className="ko-sum-icon" style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}>
                        <i className="ri-fire-line"></i>
                    </div>
                    <div>
                        <div className="ko-sum-val">{cookingCount}</div>
                        <div className="ko-sum-label">Cooking</div>
                    </div>
                </div>
                <div className="ko-sum-card">
                    <div className="ko-sum-icon" style={{ background: 'rgba(52,211,153,0.15)', color: '#34D399' }}>
                        <i className="ri-checkbox-circle-line"></i>
                    </div>
                    <div>
                        <div className="ko-sum-val">{readyCount}</div>
                        <div className="ko-sum-label">Ready to Serve</div>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="ko-filters">
                {[
                    { key: 'all' as const, label: 'All Orders', count: orders.length },
                    { key: 'new' as const, label: 'New', count: newCount },
                    { key: 'cooking' as const, label: 'Cooking', count: cookingCount },
                    { key: 'ready' as const, label: 'Ready', count: readyCount },
                ].map(f => (
                    <button
                        key={f.key}
                        className={`ko-filter-btn ${activeFilter === f.key ? 'active' : ''}`}
                        onClick={() => setActiveFilter(f.key)}
                    >
                        {f.label} <span className="ko-filter-count">{f.count}</span>
                    </button>
                ))}
            </div>

            {/* Orders Grid */}
            <div className="ko-orders-grid">
                {filteredOrders.length === 0 && (
                    <div className="ko-empty">
                        <i className="ri-restaurant-2-line" style={{ fontSize: 40, color: 'var(--mt)', marginBottom: 8 }}></i>
                        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--mt)' }}>No orders in this category</div>
                    </div>
                )}
                {filteredOrders.map(order => {
                    const badge = getStatusBadge(order.status);
                    return (
                        <div className={`ko-card ko-card-${order.status}`} key={order.id}>
                            {/* Card Header */}
                            <div className="ko-card-header">
                                <div className="ko-card-left">
                                    <span className="ko-order-id">{order.id}</span>
                                    <span className={badge.cls}>{badge.label}</span>
                                </div>
                                <span className="ko-time">
                                    <i className="ri-time-line" style={{ marginRight: 3 }}></i>
                                    {order.time}
                                </span>
                            </div>

                            {/* Order Type Info */}
                            <div className="ko-type-row">
                                <div className="ko-type-chip">
                                    <i className={getTypeIcon(order.type)}></i>
                                    <span>{order.type}</span>
                                </div>
                                {order.table && <span className="ko-table-tag"><i className="ri-layout-grid-line" style={{ marginRight: 3 }}></i>{order.table}</span>}
                                {order.platform && <span className="ko-platform-tag">{order.platform}</span>}
                                {order.customer && <span className="ko-customer-tag"><i className="ri-user-3-line" style={{ marginRight: 3 }}></i>{order.customer}</span>}
                            </div>

                            {/* Items List — Main Content */}
                            <div className="ko-items">
                                <div className="ko-items-title">
                                    <i className="ri-draft-line" style={{ marginRight: 4, fontSize: 12 }}></i>
                                    Items to Cook ({order.items.reduce((sum, i) => sum + i.qty, 0)})
                                </div>
                                {order.items.map((item, idx) => (
                                    <div className="ko-item-row" key={idx}>
                                        <span className="ko-item-qty">{item.qty}×</span>
                                        <span className="ko-item-name">{item.name}</span>
                                        {item.notes && (
                                            <span className="ko-item-note">
                                                <i className="ri-chat-quote-line" style={{ marginRight: 3, fontSize: 10 }}></i>
                                                {item.notes}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Action Button */}
                            <div className="ko-card-actions">
                                {order.status === 'new' && (
                                    <button className="ko-action-btn ko-btn-accept" onClick={() => updateStatus(order.id, 'cooking')}>
                                        <i className="ri-fire-line" style={{ marginRight: 4 }}></i>
                                        Start Cooking
                                    </button>
                                )}
                                {order.status === 'cooking' && (
                                    <button className="ko-action-btn ko-btn-ready" onClick={() => updateStatus(order.id, 'ready')}>
                                        <i className="ri-checkbox-circle-line" style={{ marginRight: 4 }}></i>
                                        Mark Ready
                                    </button>
                                )}
                                {order.status === 'ready' && (
                                    <button className="ko-action-btn ko-btn-done" onClick={() => updateStatus(order.id, 'done')}>
                                        <i className="ri-check-double-line" style={{ marginRight: 4 }}></i>
                                        Served / Picked Up
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrdersKitchen;
