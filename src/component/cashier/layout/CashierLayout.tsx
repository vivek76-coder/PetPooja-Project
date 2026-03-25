import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const pageConfig: any = {
    '/': { title: 'Cashier Dashboard', sub: 'Today\'s collection overview' },
    '/billing-queue': { title: 'Billing Queue', sub: 'Pending bills for payment' },
    '/payment': { title: 'Payment Collection', sub: 'Collect & process payments' },
    '/cash-register': { title: 'Cash Register', sub: 'Cash drawer management' },
    '/receipts': { title: 'Receipt History', sub: 'Today\'s generated receipts' },
    '/discount-request': { title: 'Discount Request', sub: 'Request discounts from manager' },
};

const navSections = [
    {
        title: 'Overview',
        items: [
            { to: '/cashier', label: 'Dashboard', icon: 'ri-dashboard-line' },
        ],
    },
    {
        title: 'Billing',
        items: [
            { to: '/cashier/billing-queue', label: 'Billing Queue', icon: 'ri-file-list-3-line', badge: '6' },
            { to: '/cashier/payment', label: 'Payment', icon: 'ri-bank-card-line' },
            { to: '/cashier/receipts', label: 'Receipts', icon: 'ri-receipt-line' },
        ],
    },
    {
        title: 'Cash & Requests',
        items: [
            { to: '/cashier/cash-register', label: 'Cash Register', icon: 'ri-safe-2-line' },
            { to: '/cashier/discount-request', label: 'Discount Request', icon: 'ri-percent-line' },
        ],
    },
];

const CashierLayout = () => {
    const location = useLocation();
    const path = location.pathname.replace('/cashier', '') || '/';
    const config = pageConfig[path] || pageConfig['/'];

    const [theme, setTheme] = useState('light');
    const [sidebarWidth, setSidebarWidth] = useState(230);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const handleToggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="">
            {/* SIDEBAR */}
            <div className="sb fixed top-0 left-0 overflow-x-hidden h-screen" style={{ width: sidebarWidth, transition: '0.4s' }}>
                <div className="sb-brand">
                    <div className="sb-icon">
                        <svg viewBox="0 0 24 24"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" /></svg>
                    </div>
                    <div>
                        <div className="sb-name">Petpooja</div>
                        <div className="sb-sub">Cashier</div>
                    </div>
                </div>

                <div className="sb-outlet">
                    <div className="sb-ol">Current outlet</div>
                    <div className="sb-on">Koregaon Park <span>▾</span></div>
                </div>

                <div className="sb-nav">
                    {navSections.map((section: any) => (
                        <div className="sb-sec" key={section.title}>
                            <div className="sb-sl">{section.title}</div>
                            {section.items.map((item: any) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.to === '/cashier'}
                                    className={({ isActive }) => `nav-i ${isActive ? 'act' : ''}`}
                                >
                                    <i className={item.icon} style={{ fontSize: 15 }}></i>
                                    <span>{item.label}</span>
                                    {item.badge && <span className="nav-bd">{item.badge}</span>}
                                </NavLink>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Profile */}
                <div className="flex align-center justify-around py-4! px-3! border-t border-slate-700">
                    <div className="sb-av">MD</div>
                    <div>
                        <div className="sb-un">Meena Desai</div>
                        <div className="sb-ur">Cashier</div>
                    </div>
                    <button className='border border-gray-500 p-1! rounded! text-gray-500 shadow-md hover:bg-[#293240] hover:shadow-2xl'>LOGOUT</button>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="main" style={{ marginLeft: sidebarWidth, transition: '0.4s' }}>
                <div className="topbar">
                    <div>
                        <div className="tp-title">{config.title}</div>
                        <div className="tp-sub">{config.sub}</div>
                    </div>
                    <div className="tp-r">
                        <div className="nbt" onClick={handleToggleTheme} title="Toggle Theme">
                            <i className={theme === 'light' ? 'ri-moon-line' : 'ri-sun-line'} style={{ fontSize: 14, color: 'var(--mt)' }}></i>
                        </div>
                        <div className="nbt">
                            <i className="ri-notification-3-line" style={{ fontSize: 14, color: 'var(--mt)' }}></i>
                            <div className="ndot"></div>
                        </div>
                        <button className='nbt rounded-md!' style={{ fontSize: 14, color: 'var(--mt)' }} onClick={() => setSidebarWidth(sidebarWidth === 230 ? 0 : 230)}>
                            <i className="ri-menu-line"></i>
                        </button>
                    </div>
                </div>
                <div className="page-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default CashierLayout;
