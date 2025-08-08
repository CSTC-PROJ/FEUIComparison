const { useState, useEffect } = React;

// Sample data
const sampleData = {
    users: [
        { id: 1, name: 'Sarah Connor', email: 'sarah@example.com', status: 'active', joinDate: '2024-01-15' },
        { id: 2, name: 'John Connor', email: 'john@example.com', status: 'active', joinDate: '2024-01-20' },
        { id: 3, name: 'Kyle Reese', email: 'kyle@example.com', status: 'inactive', joinDate: '2024-01-10' },
        { id: 4, name: 'Miles Dyson', email: 'miles@example.com', status: 'pending', joinDate: '2024-01-25' },
        { id: 5, name: 'T-800', email: 't800@example.com', status: 'active', joinDate: '2024-01-30' }
    ],
    metrics: {
        totalUsers: 1247,
        activeUsers: 892,
        revenue: 45678,
        orders: 234
    }
};

// Top Navigation Component
const TopNav = () => {
    return (
        <nav className="top-nav">
            <div className="logo">
                <span>⚡</span>
                <span>Next.js Admin</span>
                <span className="tech-badge">Next.js Native</span>
            </div>
            <div className="nav-actions">
                <div className="notification-bell">
                    🔔
                    <span className="notification-badge">3</span>
                </div>
                <div className="user-menu">
                    <div className="user-avatar">AD</div>
                    <span>Admin User</span>
                    <span>▼</span>
                </div>
            </div>
        </nav>
    );
};

// Sidebar Component
const Sidebar = () => {
    const menuSections = [
        {
            title: 'Main',
            items: [
                { name: 'Dashboard', icon: '📊', active: true },
                { name: 'Analytics', icon: '📈', active: false },
                { name: 'Users', icon: '👥', active: false }
            ]
        },
        {
            title: 'Management',
            items: [
                { name: 'Products', icon: '📦', active: false },
                { name: 'Orders', icon: '🛒', active: false },
                { name: 'Inventory', icon: '📋', active: false }
            ]
        },
        {
            title: 'Settings',
            items: [
                { name: 'Configuration', icon: '⚙️', active: false },
                { name: 'Security', icon: '🔒', active: false },
                { name: 'Integrations', icon: '🔗', active: false }
            ]
        }
    ];

    return (
        <aside className="sidebar">
            {menuSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="sidebar-section">
                    <div className="sidebar-title">{section.title}</div>
                    <ul className="sidebar-menu">
                        {section.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="sidebar-item">
                                <a href="#" className={`sidebar-link ${item.active ? 'active' : ''}`}>
                                    <span className="sidebar-icon">{item.icon}</span>
                                    <span>{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </aside>
    );
};

// Metric Card Component
const MetricCard = ({ icon, iconClass, value, label, change, changeType }) => {
    return (
        <div className="metric-card">
            <div className={`metric-icon ${iconClass}`}>
                {icon}
            </div>
            <div className="metric-value">{value}</div>
            <div className="metric-label">{label}</div>
            {change && (
                <div className={`metric-change ${changeType}`}>
                    {changeType === 'positive' ? '↗' : '↘'} {change}
                </div>
            )}
        </div>
    );
};

// Data Table Component
const DataTable = ({ title, data, columns }) => {
    return (
        <div className="data-table">
            <div className="table-header">
                <h3 className="table-title">{title}</h3>
                <button className="btn">Add New</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>
                                    {column.key === 'status' ? (
                                        <span className={`status-badge ${row[column.key]}`}>
                                            {row[column.key].charAt(0).toUpperCase() + row[column.key].slice(1)}
                                        </span>
                                    ) : column.key === 'actions' ? (
                                        <div style={{display: 'flex', gap: '0.5rem'}}>
                                            <button className="btn secondary" style={{padding: '0.5rem 1rem', fontSize: '0.8rem'}}>
                                                Edit
                                            </button>
                                            <button className="btn secondary" style={{padding: '0.5rem 1rem', fontSize: '0.8rem'}}>
                                                Delete
                                            </button>
                                        </div>
                                    ) : (
                                        row[column.key]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Main App Component
const NextJSApp = () => {
    const [data, setData] = useState(sampleData);

    const metricsData = [
        {
            icon: '👥',
            iconClass: 'primary',
            value: data.metrics.totalUsers.toLocaleString(),
            label: 'Total Users',
            change: '+12%',
            changeType: 'positive'
        },
        {
            icon: '✅',
            iconClass: 'success',
            value: data.metrics.activeUsers.toLocaleString(),
            label: 'Active Users',
            change: '+8%',
            changeType: 'positive'
        },
        {
            icon: '💰',
            iconClass: 'warning',
            value: `$${data.metrics.revenue.toLocaleString()}`,
            label: 'Revenue',
            change: '+15%',
            changeType: 'positive'
        },
        {
            icon: '📦',
            iconClass: 'danger',
            value: data.metrics.orders.toLocaleString(),
            label: 'Orders',
            change: '-3%',
            changeType: 'negative'
        }
    ];

    const tableColumns = [
        { header: 'Name', key: 'name' },
        { header: 'Email', key: 'email' },
        { header: 'Status', key: 'status' },
        { header: 'Join Date', key: 'joinDate' },
        { header: 'Actions', key: 'actions' }
    ];

    return (
        <div className="nextjs-admin">
            <TopNav />
            <div className="main-layout">
                <Sidebar />
                <main className="content-area">
                    <div className="page-header">
                        <h1 className="page-title">Dashboard</h1>
                        <p className="page-subtitle">Welcome to your Next.js admin dashboard</p>
                    </div>

                    <div className="metrics-grid">
                        {metricsData.map((metric, index) => (
                            <MetricCard key={index} {...metric} />
                        ))}
                    </div>

                    <DataTable 
                        title="Recent Users" 
                        data={data.users} 
                        columns={tableColumns} 
                    />
                </main>
            </div>
        </div>
    );
};

// Render the app
ReactDOM.render(<NextJSApp />, document.getElementById('__next'));