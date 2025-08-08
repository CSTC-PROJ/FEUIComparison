// Svelte Admin Portal JavaScript (Vanilla JS implementation)

// Sample data
const userData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'pending' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'active' }
];

const statsData = [
    { icon: '👥', iconClass: 'primary', value: '1,247', label: 'Total Users', change: '↗ +12%', changeType: 'positive' },
    { icon: '💰', iconClass: 'success', value: '$45,678', label: 'Revenue', change: '↗ +8%', changeType: 'positive' },
    { icon: '📦', iconClass: 'warning', value: '234', label: 'Orders', change: '↘ -3%', changeType: 'negative' },
    { icon: '📊', iconClass: 'danger', value: '3.2%', label: 'Conversion', change: '↗ +0.5%', changeType: 'positive' }
];

let currentTab = 'dashboard';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderApp();
});

// Render the entire Svelte-style app
function renderApp() {
    const app = document.getElementById('app');
    app.innerHTML = createAppHTML();
    
    // Initialize event listeners after rendering
    initializeEventListeners();
    animateElements();
}

// Create the main app HTML
function createAppHTML() {
    return `
        <div class="svelte-admin">
            ${createHeader()}
            <div class="main-layout">
                ${createSidebar()}
                ${createContent()}
            </div>
        </div>
    `;
}

// Create header component
function createHeader() {
    return `
        <header class="header">
            <div class="logo">
                <span>🔥</span>
                <span>Svelte Admin</span>
                <span class="tech-badge">Svelte Native</span>
            </div>
            <div class="header-actions">
                <button class="notification-btn" onclick="toggleNotifications()">
                    🔔
                    <span class="notification-badge">3</span>
                </button>
                <div class="user-menu" onclick="toggleUserMenu()">
                    <div class="user-avatar">SV</div>
                    <span>Svelte User</span>
                    <span>▼</span>
                </div>
            </div>
        </header>
    `;
}

// Create sidebar component
function createSidebar() {
    const menuSections = [
        {
            title: 'Main',
            items: [
                { name: 'Dashboard', icon: '📊', id: 'dashboard', active: true },
                { name: 'Users', icon: '👥', id: 'users', active: false },
                { name: 'Analytics', icon: '📈', id: 'analytics', active: false }
            ]
        },
        {
            title: 'Management',
            items: [
                { name: 'Products', icon: '📦', id: 'products', active: false },
                { name: 'Orders', icon: '🛒', id: 'orders', active: false }
            ]
        },
        {
            title: 'Settings',
            items: [
                { name: 'Configuration', icon: '⚙️', id: 'settings', active: false }
            ]
        }
    ];

    let sidebarHTML = '<aside class="sidebar">';
    
    menuSections.forEach(section => {
        sidebarHTML += `
            <div class="nav-section">
                <div class="nav-title">${section.title}</div>
                <ul class="nav-list">
        `;
        
        section.items.forEach(item => {
            sidebarHTML += `
                <li class="nav-item">
                    <a href="#" class="nav-link ${item.active ? 'active' : ''}" onclick="setActiveTab('${item.id}')">
                        <span class="nav-icon">${item.icon}</span>
                        <span>${item.name}</span>
                    </a>
                </li>
            `;
        });
        
        sidebarHTML += '</ul></div>';
    });
    
    sidebarHTML += '</aside>';
    return sidebarHTML;
}

// Create content area
function createContent() {
    return `
        <main class="content-area">
            <div class="page-header">
                <h1 class="page-title" id="pageTitle">${getTabTitle(currentTab)}</h1>
                <p class="page-subtitle" id="pageSubtitle">${getTabSubtitle(currentTab)}</p>
            </div>

            ${currentTab === 'dashboard' ? createStatsGrid() : ''}
            ${(currentTab === 'dashboard' || currentTab === 'users') ? createUsersTable() : createOtherContent()}
        </main>
    `;
}

// Create stats grid
function createStatsGrid() {
    let statsHTML = '<div class="stats-grid">';
    
    statsData.forEach(stat => {
        statsHTML += `
            <div class="stat-card fade-in">
                <div class="stat-icon ${stat.iconClass}">
                    ${stat.icon}
                </div>
                <div class="stat-value">${stat.value}</div>
                <div class="stat-label">${stat.label}</div>
                <div class="stat-change ${stat.changeType}">
                    ${stat.change}
                </div>
            </div>
        `;
    });
    
    statsHTML += '</div>';
    return statsHTML;
}

// Create users table
function createUsersTable() {
    let tableHTML = `
        <div class="data-table">
            <div class="table-header">
                <h3 class="table-title">Recent Users</h3>
                <button class="btn" onclick="addUser()">
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
    `;
    
    userData.forEach(user => {
        const statusClass = user.status;
        const statusText = user.status.charAt(0).toUpperCase() + user.status.slice(1);
        
        tableHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <span class="status-badge ${statusClass}">
                        ${statusText}
                    </span>
                </td>
                <td>
                    <button class="btn secondary sm" onclick="editUser(${user.id})">
                        ✏️ Edit
                    </button>
                    <button class="btn danger sm" onclick="deleteUser(${user.id})">
                        🗑️ Delete
                    </button>
                </td>
            </tr>
        `;
    });
    
    tableHTML += '</tbody></table></div>';
    return tableHTML;
}

// Create other content
function createOtherContent() {
    return `
        <div class="data-table">
            <div class="table-header">
                <h3 class="table-title">${getTabTitle(currentTab)}</h3>
            </div>
            <div style="padding: 2rem; text-align: center; color: #666;">
                <p>${getTabTitle(currentTab)} content would be displayed here.</p>
                <p style="margin-top: 1rem; font-size: 0.9rem;">This is a demo showing Svelte component structure.</p>
            </div>
        </div>
    `;
}

// Helper functions
function getTabTitle(tab) {
    const titles = {
        dashboard: 'Dashboard',
        users: 'User Management',
        analytics: 'Analytics',
        products: 'Product Management',
        orders: 'Order Management',
        settings: 'Settings'
    };
    return titles[tab] || 'Dashboard';
}

function getTabSubtitle(tab) {
    const subtitles = {
        dashboard: 'Welcome to your Svelte admin dashboard',
        users: 'Manage your application users',
        analytics: 'View detailed analytics and reports',
        products: 'Manage your product catalog',
        orders: 'Track and manage orders',
        settings: 'Configure your application settings'
    };
    return subtitles[tab] || 'Welcome to your Svelte admin dashboard';
}

// Event handlers
function setActiveTab(tab) {
    currentTab = tab;
    
    // Re-render the content area
    const contentArea = document.querySelector('.content-area');
    contentArea.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">${getTabTitle(currentTab)}</h1>
            <p class="page-subtitle">${getTabSubtitle(currentTab)}</p>
        </div>

        ${currentTab === 'dashboard' ? createStatsGrid() : ''}
        ${(currentTab === 'dashboard' || currentTab === 'users') ? createUsersTable() : createOtherContent()}
    `;
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.closest('.nav-link').classList.add('active');
    
    // Re-animate elements
    animateElements();
}

function toggleNotifications() {
    showNotification('Notifications toggled!', 'info');
}

function toggleUserMenu() {
    showNotification('User menu toggled!', 'info');
}

function addUser() {
    const name = prompt('Enter user name:');
    const email = prompt('Enter user email:');
    
    if (name && email) {
        const newUser = {
            id: userData.length + 1,
            name: name,
            email: email,
            role: 'User',
            status: 'active'
        };
        
        userData.push(newUser);
        
        // Re-render if on dashboard or users tab
        if (currentTab === 'dashboard' || currentTab === 'users') {
            setActiveTab(currentTab);
        }
        
        showNotification('User added successfully!', 'success');
    }
}

function editUser(userId) {
    const user = userData.find(u => u.id === userId);
    if (user) {
        const newName = prompt('Edit user name:', user.name);
        if (newName && newName !== user.name) {
            user.name = newName;
            
            // Re-render if on dashboard or users tab
            if (currentTab === 'dashboard' || currentTab === 'users') {
                setActiveTab(currentTab);
            }
            
            showNotification('User updated successfully!', 'success');
        }
    }
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        const index = userData.findIndex(u => u.id === userId);
        if (index > -1) {
            userData.splice(index, 1);
            
            // Re-render if on dashboard or users tab
            if (currentTab === 'dashboard' || currentTab === 'users') {
                setActiveTab(currentTab);
            }
            
            showNotification('User deleted successfully!', 'danger');
        }
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#ff3e00' : type === 'danger' ? '#dc3545' : '#333'};
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
}

function initializeEventListeners() {
    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function animateElements() {
    // Animate cards
    const cards = document.querySelectorAll('.stat-card, .data-table');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
}