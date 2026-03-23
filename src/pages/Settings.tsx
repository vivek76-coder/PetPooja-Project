const Settings = () => {
    const navItems = ['Restaurant info', 'Outlets', 'Taxes & charges', 'Payment methods', 'Integrations', 'Notifications', 'Users & roles', 'Printers', 'Data & backup'];
    const infoFields = [
        { label: 'Restaurant name', value: 'Petpooja Multi-Chain' },
        { label: 'GSTIN', value: '27AABCP1234Q1Z5' },
        { label: 'FSSAI License', value: '10718012000561' },
        { label: 'Primary contact', value: '+91 98220 12345' },
        { label: 'Timezone', value: 'Asia/Kolkata (IST)' },
    ];
    const toggles = [
        { label: 'Auto-print KOT', desc: 'Print order ticket automatically on place', on: true },
        { label: 'Low stock alerts', desc: 'Notify when stock falls below reorder level', on: true },
        { label: 'Customer SMS on order', desc: 'Send SMS confirmation to guest', on: false },
        { label: 'Loyalty programme', desc: 'Enable points accrual on every bill', on: true },
        { label: 'Happy hours pricing', desc: 'Auto-discount during set time windows', on: false },
    ];
    return (
        <div className="settings-layout">
            <div className="set-nav">
                {navItems.map((n, i) => <div className={`set-ni ${i === 0 ? 'act' : ''}`} key={n}>{n}</div>)}
            </div>
            <div>
                <div className="set-section">
                    <div className="set-sh">Restaurant information</div>
                    {infoFields.map(f => (
                        <div className="set-row" key={f.label}><div><div className="set-rl">{f.label}</div></div><input className="set-inp" defaultValue={f.value} /></div>
                    ))}
                </div>
                <div className="set-section">
                    <div className="set-sh">Operational settings</div>
                    {toggles.map(t => (
                        <div className="set-row" key={t.label}>
                            <div><div className="set-rl">{t.label}</div><div className="set-rs">{t.desc}</div></div>
                            <div className={`toggle ${t.on ? '' : 'off'}`}><div className="toggle-k"></div></div>
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}><button className="btn-o">Cancel</button><button className="btn">Save changes</button></div>
            </div>
        </div>
    );
};
export default Settings;
