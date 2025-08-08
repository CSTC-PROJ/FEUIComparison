// Ant Design Admin Portal JavaScript

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
        description: 'Welcome to your Ant Design admin dashboard',
        breadcrumb: 'Dashboard'
    },
    users: {
        title: 'User Management',
        description: 'Manage your application users',
        breadcrumb: 'Users'
    },
    analytics: {
        title: 'Analytics',
        description: 'View detailed analytics and reports',
        breadcrumb: 'Analytics'
    },
    products: {
        title: 'Product Management',
        description: 'Manage your product catalog',
        breadcrumb: 'Products'
    },
    orders: {
        title: 'Order Management',
        description: 'Track and manage orders',
        breadcrumb: 'Orders'
    },
    settings: {
        title: 'Settings',
        description: 'Configure your application settings',
        breadcrumb: 'Settings'
    },
    help: {
        title: 'Help & Support',
        description: 'Get help and support',
        breadcrumb: 'Help'
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
    
    row.innerHTML = `
        <td>
            <strong>${user.name}</strong>
        </td>
        <td>${user.email}</td>
        <td>
            <span class="role-badge">${user.role}</span>
        </td>
        <td>
            <span class="status-badge ${statusClass}">${capitalizeFirst(user.status)}</span>
        </td>
        <td>${formatDate(user.joinDate)}</td>
        <td>
            <div class="action-buttons">
                <button class="action-btn edit" onclick="editUser(${user.id})">
                    ✏️ Edit
                </button>
                <button class="action-btn delete" onclick="deleteUser(${user.id})">
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
    
    // User button
    const userBtn = document.getElementById('userBtn');
    if (userBtn) {
        userBtn.addEventListener('click', function() {
            showMessage('User menu clicked', 'info');
        });
    }
}

// Initialize navigation
function initializeNavigation() {
    const menuLinks = document.querySelectorAll('.menu-link');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const tab = this.getAttribute('data-tab');
            if (tab) {
                setActiveTab(tab);
                updateActiveMenuLink(this);
            }
        });
    });
}

// Set active tab
function setActiveTab(tab) {
    const pageTitle = document.getElementById('pageTitle');
    const pageDescription = document.getElementById('pageDescription');
    const currentBreadcrumb = document.getElementById('currentBreadcrumb');
    const statsRow = document.getElementById('statsRow');
    const dataCard = document.getElementById('dataCard');
    const tabContent = document.getElementById('tabContent');
    const emptyTitle = document.getElementById('emptyTitle');
    
    if (tabConfig[tab]) {
        if (pageTitle) pageTitle.textContent = tabConfig[tab].title;
        if (pageDescription) pageDescription.textContent = tabConfig[tab].description;
        if (currentBreadcrumb) currentBreadcrumb.textContent = tabConfig[tab].breadcrumb;
        if (emptyTitle) emptyTitle.textContent = tabConfig[tab].title;
    }
    
    // Show/hide content based on tab
    if (tab === 'dashboard') {
        if (statsRow) {
            statsRow.style.display = 'grid';
            animateStatsCards();
        }
        if (dataCard) {
            dataCard.style.display = 'block';
            animateCard(dataCard);
        }
        if (tabContent) tabContent.style.display = 'none';
    } else if (tab === 'users') {
        if (statsRow) statsRow.style.display = 'none';
        if (dataCard) {
            dataCard.style.display = 'block';
            animateCard(dataCard);
        }
        if (tabContent) tabContent.style.display = 'none';
    } else {
        if (statsRow) statsRow.style.display = 'none';
        if (dataCard) dataCard.style.display = 'none';
        if (tabContent) {
            tabContent.style.display = 'block';
            animateCard(tabContent);
        }
    }
}

// Update active menu link
function updateActiveMenuLink(activeLink) {
    const menuLinks = document.querySelectorAll('.menu-link');
    
    menuLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    activeLink.classList.add('active');
}

// Add user function
function addUser() {
    const name = prompt('Enter user name:');
    const email = prompt('Enter user email:');
    
    if (name && email) {
        // Basic validation
        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
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
        showMessage('User added successfully!', 'success');
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
        showMessage('User updated successfully!', 'success');
    }
}

// Delete user function
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        const index = userData.findIndex(u => u.id === userId);
        if (index > -1) {
            userData.splice(index, 1);
            initializeUserTable();
            showMessage('User deleted successfully!', 'success');
        }
    }
}

// Show message notification
function showMessage(message, type = 'info') {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `ant-message ant-message-${type}`;
    messageEl.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: ${getMessageColor(type)};
        color: white;
        padding: 12px 24px;
        border-radius: 6px;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        z-index: 1002;
        font-size: 14px;
        font-weight: 400;
        max-width: 400px;
        text-align: center;
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
        transition: all 0.3s ease;
    `;
    messageEl.textContent = message;
    
    document.body.appendChild(messageEl);
    
    // Animate in
    setTimeout(() => {
        messageEl.style.opacity = '1';
        messageEl.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 3000);
}

// Get message color based on type
function getMessageColor(type) {
    const colors = {
        success: '#52c41a',
        error: '#ff4d4f',
        warning: '#faad14',
        info: '#1890ff'
    };
    return colors[type] || colors.info;
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Animation functions
function animateStatsCards() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function animateCard(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Loading state management
function setLoading(element, isLoading) {
    if (isLoading) {
        element.style.opacity = '0.6';
        element.style.pointerEvents = 'none';
    } else {
        element.style.opacity = '1';
        element.style.pointerEvents = 'auto';
    }
}

// Handle responsive behavior
function handleResponsive() {
    const sider = document.querySelector('.ant-sider');
    const content = document.querySelector('.ant-content');
    
    if (window.innerWidth <= 768) {
        if (sider) sider.classList.add('mobile-hidden');
        if (content) content.style.marginLeft = '0';
    } else {
        if (sider) sider.classList.remove('mobile-hidden');
        if (content) content.style.marginLeft = '256px';
    }
}

// Initialize responsive behavior
window.addEventListener('resize', debounce(handleResponsive, 250));
handleResponsive();

// Export functions for global access
window.AntDesignAdmin = {
    addUser,
    editUser,
    deleteUser,
    showMessage,
    setLoading,
    validateEmail
};