// Vue.js Admin Portal

const { createApp, ref, reactive, computed, onMounted } = Vue;

// Vue Admin Component
const VueAdmin = {
    template: `
        <div class="vue-admin">
            <!-- Header -->
            <header class="header">
                <div class="logo">
                    <span>🟢</span>
                    <span>Vue.js Admin</span>
                    <span class="tech-badge">Vue Native</span>
                </div>
                <div class="header-actions">
                    <button class="notification-btn" @click="showNotifications = !showNotifications">
                        🔔
                        <span class="notification-badge">{{ notifications.length }}</span>
                    </button>
                    <div class="user-menu" @click="showUserMenu = !showUserMenu">
                        <div class="user-avatar">VU</div>
                        <span>Vue User</span>
                        <span>{{ showUserMenu ? '▲' : '▼' }}</span>
                    </div>
                </div>
            </header>

            <!-- Main Layout -->
            <div class="main-layout">
                <!-- Sidebar -->
                <aside class="sidebar">
                    <nav>
                        <div class="nav-section">
                            <div class="nav-title">Main</div>
                            <ul class="nav-list">
                                <li class="nav-item">
                                    <a href="#" class="nav-link active" @click="setActiveTab('dashboard')">
                                        <span class="nav-icon">📊</span>
                                        <span>Dashboard</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link" @click="setActiveTab('users')">
                                        <span class="nav-icon">👥</span>
                                        <span>Users</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link" @click="setActiveTab('analytics')">
                                        <span class="nav-icon">📈</span>
                                        <span>Analytics</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                        <div class="nav-section">
                            <div class="nav-title">Management</div>
                            <ul class="nav-list">
                                <li class="nav-item">
                                    <a href="#" class="nav-link" @click="setActiveTab('products')">
                                        <span class="nav-icon">📦</span>
                                        <span>Products</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link" @click="setActiveTab('orders')">
                                        <span class="nav-icon">🛒</span>
                                        <span>Orders</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                        <div class="nav-section">
                            <div class="nav-title">Settings</div>
                            <ul class="nav-list">
                                <li class="nav-item">
                                    <a href="#" class="nav-link" @click="setActiveTab('settings')">
                                        <span class="nav-icon">⚙️</span>
                                        <span>Configuration</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </aside>

                <!-- Content Area -->
                <main class="content-area">
                    <div class="page-header">
                        <h1 class="page-title">{{ currentTabTitle }}</h1>
                        <p class="page-subtitle">{{ currentTabSubtitle }}</p>
                    </div>

                    <!-- Stats Grid -->
                    <div class="stats-grid" v-if="activeTab === 'dashboard'">
                        <div class="stat-card" v-for="stat in stats" :key="stat.id">
                            <div class="stat-icon" :class="stat.iconClass">
                                {{ stat.icon }}
                            </div>
                            <div class="stat-value">{{ stat.value }}</div>
                            <div class="stat-label">{{ stat.label }}</div>
                            <div class="stat-change" :class="stat.changeType">
                                {{ stat.change }}
                            </div>
                        </div>
                    </div>

                    <!-- Users Table -->
                    <div class="data-table" v-if="activeTab === 'dashboard' || activeTab === 'users'">
                        <div class="table-header">
                            <h3 class="table-title">Recent Users</h3>
                            <button class="btn" @click="addUser">
                                ➕ Add User
                            </button>
                        </div>
                        <table class="table">
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
                                <tr v-for="user in users" :key="user.id">
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>
                                        <span class="status-badge" :class="getRoleBadgeClass(user.role)">
                                            {{ user.role }}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="status-badge" :class="user.status">
                                            {{ user.status.charAt(0).toUpperCase() + user.status.slice(1) }}
                                        </span>
                                    </td>
                                    <td>
                                        <button class="btn secondary" @click="editUser(user)" style="margin-right: 0.5rem; padding: 0.5rem 1rem; font-size: 0.8rem;">
                                            ✏️ Edit
                                        </button>
                                        <button class="btn danger" @click="deleteUser(user.id)" style="padding: 0.5rem 1rem; font-size: 0.8rem;">
                                            🗑️ Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Other Tab Content -->
                    <div v-if="activeTab !== 'dashboard' && activeTab !== 'users'" class="data-table">
                        <div class="table-header">
                            <h3 class="table-title">{{ currentTabTitle }}</h3>
                        </div>
                        <div style="padding: 2rem; text-align: center; color: #666;">
                            <p>{{ currentTabTitle }} content would be displayed here.</p>
                            <p style="margin-top: 1rem; font-size: 0.9rem;">This is a demo showing Vue.js component structure.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    `,
    
    setup() {
        // Reactive data
        const activeTab = ref('dashboard');
        const showNotifications = ref(false);
        const showUserMenu = ref(false);
        
        const users = reactive([
            { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'inactive' },
            { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'pending' },
            { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'active' }
        ]);
        
        const stats = reactive([
            {
                id: 1,
                icon: '👥',
                iconClass: 'primary',
                value: '1,247',
                label: 'Total Users',
                change: '↗ +12%',
                changeType: 'positive'
            },
            {
                id: 2,
                icon: '💰',
                iconClass: 'success',
                value: '$45,678',
                label: 'Revenue',
                change: '↗ +8%',
                changeType: 'positive'
            },
            {
                id: 3,
                icon: '📦',
                iconClass: 'warning',
                value: '234',
                label: 'Orders',
                change: '↘ -3%',
                changeType: 'negative'
            },
            {
                id: 4,
                icon: '📊',
                iconClass: 'danger',
                value: '3.2%',
                label: 'Conversion',
                change: '↗ +0.5%',
                changeType: 'positive'
            }
        ]);
        
        const notifications = reactive([
            { id: 1, message: 'New user registered' },
            { id: 2, message: 'Order completed' },
            { id: 3, message: 'System update available' }
        ]);
        
        // Computed properties
        const currentTabTitle = computed(() => {
            const titles = {
                dashboard: 'Dashboard',
                users: 'User Management',
                analytics: 'Analytics',
                products: 'Product Management',
                orders: 'Order Management',
                settings: 'Settings'
            };
            return titles[activeTab.value] || 'Dashboard';
        });
        
        const currentTabSubtitle = computed(() => {
            const subtitles = {
                dashboard: 'Welcome to your Vue.js admin dashboard',
                users: 'Manage your application users',
                analytics: 'View detailed analytics and reports',
                products: 'Manage your product catalog',
                orders: 'Track and manage orders',
                settings: 'Configure your application settings'
            };
            return subtitles[activeTab.value] || 'Welcome to your Vue.js admin dashboard';
        });
        
        // Methods
        const setActiveTab = (tab) => {
            activeTab.value = tab;
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            event.target.closest('.nav-link').classList.add('active');
        };
        
        const getRoleBadgeClass = (role) => {
            const classes = {
                Admin: 'danger',
                Moderator: 'warning',
                User: 'active'
            };
            return classes[role] || 'active';
        };
        
        const addUser = () => {
            const name = prompt('Enter user name:');
            const email = prompt('Enter user email:');
            
            if (name && email) {
                const newUser = {
                    id: users.length + 1,
                    name: name,
                    email: email,
                    role: 'User',
                    status: 'active'
                };
                
                users.push(newUser);
                showNotification('User added successfully!', 'success');
            }
        };
        
        const editUser = (user) => {
            const newName = prompt('Edit user name:', user.name);
            if (newName && newName !== user.name) {
                user.name = newName;
                showNotification('User updated successfully!', 'success');
            }
        };
        
        const deleteUser = (userId) => {
            if (confirm('Are you sure you want to delete this user?')) {
                const index = users.findIndex(u => u.id === userId);
                if (index > -1) {
                    users.splice(index, 1);
                    showNotification('User deleted successfully!', 'danger');
                }
            }
        };
        
        const showNotification = (message, type = 'info') => {
            // Simple notification implementation
            const notification = document.createElement('div');
            const bgColor = type === 'success' ? '#42b883' : type === 'danger' ? '#ff4757' : '#333';
            notification.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                background: ${bgColor};
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
            `;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 3000);
        };
        
        // Lifecycle
        onMounted(() => {
            console.log('Vue.js Admin Portal mounted successfully!');
        });
        
        return {
            activeTab,
            showNotifications,
            showUserMenu,
            users,
            stats,
            notifications,
            currentTabTitle,
            currentTabSubtitle,
            setActiveTab,
            getRoleBadgeClass,
            addUser,
            editUser,
            deleteUser
        };
    }
};

// Create Vue app
const app = createApp({
    components: {
        VueAdmin
    }
});

app.mount('#app');