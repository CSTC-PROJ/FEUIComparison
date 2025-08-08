// Mantine Admin Portal JavaScript

// Sample user data
const userData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', joinDate: '2024-01-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'inactive', joinDate: '2024-01-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'pending', joinDate: '2024-01-25' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'active', joinDate: '2024-01-30' },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'active', joinDate: '2024-02-01' },
    { id: 7, name: 'Bruce Wayne', email: 'bruce@example.com', role: 'User', status: 'inactive', joinDate: '2024-02-05' }
];

// Tab configuration
const tabConfig = {
    dashboard: {
        title: 'Dashboard',
        subtitle: 'Welcome to your Mantine admin dashboard'
    },
    users: {
        title: 'User Management',
        subtitle: 'Manage your application users'
    },
    analytics: {
        title: 'Analytics',
        subtitle: 'View detailed analytics and reports'
    },
    products: {
        title: 'Product Management',
        subtitle: 'Manage your product catalog'
    },
    orders: {
        title: 'Order Management',
        subtitle: 'Track and manage orders'
    },
    settings: {
        title: 'Settings',
        subtitle: 'Configure your application settings'
    },
    profile: {
        title: 'Profile',
        subtitle: 'Manage your profile settings'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeUserTable();
    initializeEventListeners();
    initializeNavigation();
});

// Initialize user table
function initializeUserTable() {
    const tableBody = document.getElementById('userTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    userData.forEach(user => {
        const row = createUserRow(user);
        tableBody.appendChild(row);
    });
}

// Create user table row
function createUserRow(user) {
    const row = document.createElement('tr');
    
    const statusClass = getStatusClass(user.status);
    const roleClass = 'role-badge';
    
    row.innerHTML = `
        <td><strong>${user.name}</strong></td>
        <td>${user.email}</td>
        <td>
            <span class="${roleClass}">${user.role}</span>
        </td>
        <td>
            <span class="status-badge ${statusClass}">${capitalizeFirst(user.status)}</span>
        </td>
        <td>${formatDate(user.joinDate)}</td>
        <td>
            <div style="display: flex; gap: 8px;">
                <button class="btn secondary" onclick="editUser(${user.id})" style="padding: 6px 12px; font-size: 12px;">
                    ✏️ Edit
                </button>
                <button class="btn danger" onclick="deleteUser(${user.id})" style="padding: 6px 12px; font-size: 12px;">
                    🗑️ Delete
                </button>
            </div>
        </td>
    `;
    
    return row;
}

// Get status class
function getStatusClass(status) {
    const classes = {
        active: 'active',
        inactive: 'inactive',
        pending: 'pending'
    };
    return classes[status] || 'inactive';
}

// Capitalize first letter
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Initialize event listeners
function initializeEventListeners() {
    // Notification button
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const closeNotifications = document.getElementById('closeNotifications');
    
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationDropdown.classList.toggle('show');
        });
        
        if (closeNotifications) {
            closeNotifications.addEventListener('click', function() {
                notificationDropdown.classList.remove('show');
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!notificationDropdown.contains(e.target) && !notificationBtn.contains(e.target)) {
                notificationDropdown.classList.remove('show');
            }
        });
    }
    
    // Add user button
    const addUserBtn = document.getElementById('addUserBtn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', addUser);
    }
    
    // User menu
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
        userMenu.addEventListener('click', function() {
            showNotification('User menu clicked', 'info');
        });
    }
}

// Initialize navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const tab = this.getAttribute('data-tab');
            if (tab) {
                setActiveTab(tab);
                updateActiveNavLink(this);
            }
        });
    });
}

// Set active tab
function setActiveTab(tab) {
    const pageTitle = document.getElementById('pageTitle');
    const pageSubtitle = document.getElementById('pageSubtitle');
    const statsGrid = document.getElementById('statsGrid');
    const dataTable = document.getElementById('dataTable');
    const tabContent = document.getElementById('tabContent');
    const emptyTitle = document.getElementById('emptyTitle');
    
    if (tabConfig[tab]) {
        if (pageTitle) pageTitle.textContent = tabConfig[tab].title;
        if (pageSubtitle) pageSubtitle.textContent = tabConfig[tab].subtitle;
        if (emptyTitle) emptyTitle.textContent = tabConfig[tab].title;
    }
    
    // Show/hide content based on tab
    if (tab === 'dashboard') {
        if (statsGrid) statsGrid.style.display = 'grid';
        if (dataTable) dataTable.style.display = 'block';
        if (tabContent) tabContent.style.display = 'none';
    } else if (tab === 'users') {
        if (statsGrid) statsGrid.style.display = 'none';
        if (dataTable) dataTable.style.display = 'block';
        if (tabContent) tabContent.style.display = 'none';
    } else {
        if (statsGrid) statsGrid.style.display = 'none';
        if (dataTable) dataTable.style.display = 'none';
        if (tabContent) tabContent.style.display = 'block';
    }
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    activeLink.classList.add('active');
}

// Add user function
function addUser() {
    const name = prompt('Enter user name:');
    const email = prompt('Enter user email:');
    
    if (name && email) {
        const newUser = {
            id: userData.length + 1,
            name: name,
            email: email,
            role: 'User',
            status: 'active',
            joinDate: new Date().toISOString().split('T')[0]
        };
        
        userData.push(newUser);
        initializeUserTable();
        showNotification('User added successfully!', 'success');
    }
}

// Edit user function
function editUser(userId) {
    const user = userData.find(u => u.id === userId);
    if (!user) return;
    
    const newName = prompt('Edit user name:', user.name);
    if (newName && newName !== user.name) {
        user.name = newName;
        initializeUserTable();
        showNotification('User updated successfully!', 'success');
    }
}

// Delete user function
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        const index = userData.findIndex(u => u.id === userId);
        if (index > -1) {
            userData.splice(index, 1);
            initializeUserTable();
            showNotification('User deleted successfully!', 'danger');
        }
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 24px;
        background: ${type === 'success' ? '#51cf66' : type === 'danger' ? '#fa5252' : '#228be6'};
        color: white;
        padding: 12px 16px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1002;
        font-size: 14px;
        font-weight: 500;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Handle responsive sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('show');
    }
}

// Initialize responsive behavior
function initializeResponsive() {
    if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.add('mobile');
        }
    }
}

// Handle window resize
window.addEventListener('resize', initializeResponsive);
initializeResponsive();