import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

// 1. Pages configuration (Header titles aur subtitles)
const pageConfig: any = {
    '/': { title: 'Good evening, Rahul', sub: 'Sunday, 22 March 2026 · All 5 outlets active', tabs: true },
    '/pos': { title: 'Point of Sale', sub: 'Koregaon Park · Table view', tabs: false },
    '/orders': { title: 'Order management', sub: 'Live orders across all outlets', tabs: true },
    '/tables': { title: 'Table management', sub: 'Koregaon Park · Floor plan', tabs: false },
    '/menu': { title: 'Menu management', sub: '248 items across 7 categories', tabs: false },
    '/billing': { title: 'Billing & payments', sub: "Today's settlement overview", tabs: true },
    '/inventory': { title: 'Inventory', sub: 'Stock levels across all outlets', tabs: false },
    '/staff': { title: 'Staff management', sub: '84 staff · 5 outlets', tabs: false },
    '/reports': { title: 'Reports & analytics', sub: 'March 2026 · Chain-wide overview', tabs: true },
    '/crm': { title: 'Customer CRM', sub: '12,841 customers · Loyalty programme', tabs: false },
    '/settings': { title: 'Settings', sub: 'Chain configuration & preferences', tabs: false },
};

// 2. Sidebar navigation sections
const navSections = [
    {
        title: 'Overview',
        items: [
            { to: '/', label: 'Dashboard', icon: 'ri-dashboard-line' },
            { to: '/reports', label: 'Reports', icon: 'ri-file-chart-line' },
        ],
    },
    {
        title: 'Operations',
        items: [
            { to: '/pos', label: 'POS / Billing', icon: 'ri-bank-card-line' },
            { to: '/orders', label: 'Orders', icon: 'ri-shopping-cart-line' },
            { to: '/tables', label: 'Tables', icon: 'ri-layout-grid-line' },
            { to: '/menu', label: 'Menu', icon: 'ri-restaurant-line' },
            { to: '/billing', label: 'Billing', icon: 'ri-money-dollar-circle-line' },
        ],
    },
    {
        title: 'Management',
        items: [
            { to: '/inventory', label: 'Inventory', icon: 'ri-shield-check-line' },
            { to: '/staff', label: 'Staff', icon: 'ri-group-line' },
            { to: '/crm', label: 'CRM', icon: 'ri-user-heart-line' },
            { to: '/settings', label: 'Settings', icon: 'ri-settings-3-line' },
        ],
    },
];

const Layout = () => {
    const location = useLocation();

    const config = pageConfig[location.pathname] || pageConfig['/'];

    // States for Tabs and Theme and Menu
    const [activeTab, setActiveTab] = useState('Today');
    const [theme, setTheme] = useState('light');
    const [menuOpenWidth, setMenuOpenWidth] = useState(250);

    // Theme ko HTML tag par apply karna
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Theme switch karne wala function
    const handleToggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    //Toggle Menu function
    return (
        <div className="">
            {/* --- SIDEBAR START --- */}
            {

                <div className="sb fixed top-0 left-0 overflow-hidden" style={{
                    width: menuOpenWidth
                }}>
                    <div className="sb-brand">
                        <div className="sb-icon">
                            <svg viewBox="0 0 24 24"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" /></svg>
                        </div>
                        <div>
                            <div className="sb-name">Petpooja</div>
                            <div className="sb-sub">Enterprise</div>
                        </div>
                    </div>

                    <div className="sb-outlet">
                        <div className="sb-ol">Active outlet</div>
                        <div className="sb-on">All Outlets <span>5 ▾</span></div>
                    </div>

                    <div className="sb-nav overflow-y-auto">
                        {/* Har section (Overview, Operations etc.) par loop chala rahe hain */}
                        {navSections.map((section: any) => (
                            <div className="sb-sec" key={section.title}>
                                <div className="sb-sl">{section.title}</div>
                                {/* Har section ke items (Dashboard, POS etc.) par loop chala rahe hain */}
                                {section.items.map((item: any) => (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        className={({ isActive }) => `nav-i ${isActive ? 'act' : ''}`}
                                    >
                                        <i className={item.icon} style={{ fontSize: 15 }}></i>
                                        <span>{item.label}</span>
                                    </NavLink>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Profile Section at bottom */}
                    <div className="sb-foot">
                        <div className="sb-av">RA</div>
                        <div>
                            <div className="sb-un">Rahul Agarwal</div>
                            <div className="sb-ur">Chain Manager</div>
                        </div>
                    </div>
                </div>
            }
            {/* --- SIDEBAR END --- */}

            {/* --- MAIN CONTENT AREA --- */}
            <div className="main" style={{
                marginLeft: menuOpenWidth
            }}>
                {/* Header (Top bar) */}
                <div className="topbar">
                    <div>
                        <div className="tp-title">{config.title}</div>
                        <div className="tp-sub">{config.sub}</div>
                    </div>

                    <div className="tp-r">
                        {/* Tabs sirf tab dikhenge jab "tabs: true" hoga config mein */}
                        {config.tabs && (
                            <div className="page-tabs">
                                {['Today', 'This week', 'This month'].map((tabName) => (
                                    <div
                                        key={tabName}
                                        className={`ptab ${activeTab === tabName ? 'act' : ''}`}
                                        onClick={() => setActiveTab(tabName)}
                                    >
                                        {tabName}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Theme Toggle Button */}
                        <div className="nbt" onClick={handleToggleTheme} title="Toggle Theme">
                            <i className={theme === 'light' ? 'ri-moon-line' : 'ri-sun-line'} style={{ fontSize: 14, color: 'var(--mt)' }}></i>
                        </div>

                        {/* Notification Bell */}
                        <div className="nbt">
                            <i className="ri-notification-3-line" style={{ fontSize: 14, color: 'var(--mt)' }}></i>
                            <div className="ndot"></div>
                        </div>
                        {/* menu Toggle*/}
                        <button className='border border-gray-200 w-8 h-8 bg-gray-100 rounded-md dark:bg-slate-800'><i className="ri-menu-line"></i></button>
                    </div>
                </div>

                {/* Jahan alag-alag pages render honge (Home, POS etc.) */}
                <div className="page-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
