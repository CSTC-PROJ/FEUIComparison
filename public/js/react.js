const { useState, useEffect } = React;

// Sample data
const sampleUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'inactive', role: 'User' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'pending', role: 'Moderator' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'active', role: 'User' }
];

// Sidebar Component
const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', icon: '📊', active: true },
        { name: 'Users', icon: '👥', active: false },
        { name: 'Analytics', icon: '📈', active: false },
        { name: 'Settings', icon: '⚙️', active: false },
        { name: 'Reports', icon: '📋', active: false }
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>React Admin</h2>
                <span className="tech-badge">React Native</span>
            </div>
            <ul className="nav-menu">
                {menuItems.map((item, index) => (
                    <li key={index} className="nav-item">
                        <a href="#" className={`nav-link ${item.active ? 'active' : ''}`}>
                            <span>{item.icon}</span> {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Header Component
const Header = () => {
    return (
        <div className="header">
            <h1>Dashboard Overview</h1>
            <div className="user-info">
                <span>Welcome, Admin</span>
                <div className="avatar">A</div>
            </div>
        </div>
    );
};

// Stats Card Component
const StatsCard = ({ value, label, trend }) => {
    return (
        <div className="stat-card">
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
        </div>
    );
};

// User Table Component
const UserTable = ({ users }) => {
    return (
        <div className="content-section">
            <div className="section-header">
                <h3 className="section-title">Recent Users</h3>
                <button className="btn">Add User</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <span className={`status ${user.status}`}>
                                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                </span>
                            </td>
                            <td>
                                <button className="btn" style={{fontSize: '0.8rem', padding: '0.5rem 1rem'}}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Main App Component
const App = () => {
    const [users, setUsers] = useState(sampleUsers);
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        revenue: 0,
        orders: 0
    });

    useEffect(() => {
        // Simulate loading stats
        setStats({
            totalUsers: users.length,
            activeUsers: users.filter(u => u.status === 'active').length,
            revenue: 24567,
            orders: 142
        });
    }, [users]);

    return (
        <div className="admin-container">
            <Sidebar />
            <div className="main-content">
                <Header />
                
                <div className="stats-grid">
                    <StatsCard value={stats.totalUsers} label="Total Users" />
                    <StatsCard value={stats.activeUsers} label="Active Users" />
                    <StatsCard value={`$${stats.revenue.toLocaleString()}`} label="Revenue" />
                    <StatsCard value={stats.orders} label="Orders" />
                </div>

                <UserTable users={users} />
            </div>
        </div>
    );
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));