// Metro 4 UI Admin Portal JavaScript

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
        subtitle: 'Welcome to your Metro 4 admin dashboard',
        breadcrumb: 'Dashboard'
    },
    users: {
        title: 'User Management',
        subtitle: 'Manage your application users',
        breadcrumb: 'Users'
    },
    analytics: {
        title: 'Analytics',
        subtitle: 'View detailed analytics and reports',
        breadcrumb: 'Analytics'
    },
    products: {
        title: 'Product Management',
        subtitle: 'Manage your product catalog',
        breadcrumb: 'Products'
    },
    orders: {
        title: 'Order Management',
        subtitle: 'Track and manage orders',
        breadcrumb: 'Orders'
    },
    settings: {
        title: 'Settings',
        subtitle: 'Configure your application settings',
        breadcrumb: 'Settings'
    },
    help: {
        title: 'Help & Support',
        subtitle: 'Get help and support',
        breadcrumb: 'Help'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Metro UI to initialize
    setTimeout(() => {
        initializeUserTable();
        initializeEventListeners();
        initializeNavigation();
        initializeAnimations();
    }, 100);
});

// Initialize user table
function initializeUserTable() {
    const tableBody = document.getElementById('userTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    userData.forEach((user, index) => {
        const row = createUserRow(user);
        row.style.opacity = '0';
        row.style.transform = 'translateX(20px)';
        tableBody.appendChild(row);
        
        // Animate row appearance
        setTimeout(() => {
            row.style.transition = 'all 0.3s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, index * 50);
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
            <div class="d-flex">
                <button class="action-btn edit" onclick="editUser(${user.id})" title="Edit user">
                    <span class="mif-pencil"></span> Edit
                </button>
                <button class="action-btn delete" onclick="deleteUser(${user.id})" title="Delete user">
                    <span class="mif-bin"></span> Delete
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
    // Add user button
    const addUserBtn = document.getElementById('addUserBtn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', addUser);
    }
    
    // Handle mobile sidebar toggle
    const toggleBtn = document.querySelector('[data-role="hamburger"]');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.toggle('show');
            }
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

// Initialize animations
function initializeAnimations() {
    // Animate tiles on load
    const tiles = document.querySelectorAll('.tile-large');
    tiles.forEach((tile, index) => {
        tile.style.opacity = '0';
        tile.style.transform = 'scale(0.9)';
        tile.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            tile.style.opacity = '1';
            tile.style.transform = 'scale(1)';
        }, index * 100);
    });
}

// Set active tab
function setActiveTab(tab) {
    const pageTitle = document.getElementById('pageTitle');
    const pageSubtitle = document.getElementById('pageSubtitle');
    const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
    const statsRow = document.getElementById('statsRow');
    const dataTableContainer = document.getElementById('dataTableContainer');
    const tabContent = document.getElementById('tabContent');
    const emptyTitle = document.getElementById('emptyTitle');
    
    if (tabConfig[tab]) {
        if (pageTitle) {
            pageTitle.textContent = tabConfig[tab].title;
            pageTitle.classList.add('fade-in');
        }
        if (pageSubtitle) {
            pageSubtitle.textContent = tabConfig[tab].subtitle;
            pageSubtitle.classList.add('fade-in');
        }
        if (breadcrumbCurrent) breadcrumbCurrent.textContent = tabConfig[tab].breadcrumb;
        if (emptyTitle) emptyTitle.textContent = tabConfig[tab].title;
    }
    
    // Show/hide content based on tab with animations
    if (tab === 'dashboard') {
        if (statsRow) {
            statsRow.style.display = 'flex';
            statsRow.classList.add('slide-in-right');
        }
        if (dataTableContainer) {
            dataTableContainer.style.display = 'block';
            dataTableContainer.classList.add('fade-in');
        }
        if (tabContent) tabContent.style.display = 'none';
    } else if (tab === 'users') {
        if (statsRow) statsRow.style.display = 'none';
        if (dataTableContainer) {
            dataTableContainer.style.display = 'block';
            dataTableContainer.classList.add('fade-in');
        }
        if (tabContent) tabContent.style.display = 'none';
    } else {
        if (statsRow) statsRow.style.display = 'none';
        if (dataTableContainer) dataTableContainer.style.display = 'none';
        if (tabContent) {
            tabContent.style.display = 'block';
            tabContent.classList.add('scale-in');
        }
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
        // Validation
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (name.length < 2) {
            showNotification('Name must be at least 2 characters long', 'error');
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
        showNotification('User added successfully!', 'success');
    }
}

// Edit user function
function editUser(userId) {
    const user = userData.find(u => u.id === userId);
    if (!user) return;
    
    const newName = prompt('Edit user name:', user.name);
    if (newName && newName !== user.name) {
        if (newName.length < 2) {
            showNotification('Name must be at least 2 characters long', 'error');
            return;
        }
        
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
            showNotification('User deleted successfully!', 'success');
        }
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.metro-notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `metro-notification ${type}`;
    notification.innerHTML = `
        <div class="d-flex flex-align-center">
            <span class="mr-2">${getNotificationIcon(type)}</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide and remove notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Get notification icon
function getNotificationIcon(type) {
    const icons = {
        success: '<span class="mif-checkmark"></span>',
        error: '<span class="mif-cross"></span>',
        warning: '<span class="mif-warning"></span>',
        info: '<span class="mif-info"></span>'
    };
    return icons[type] || icons.info;
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Loading state management
function setLoadingState(element, isLoading) {
    if (isLoading) {
        element.classList.add('loading');
    } else {
        element.classList.remove('loading');
    }
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Handle responsive behavior
function handleResponsive() {
    const sidebar = document.querySelector('.sidebar');
    const contentArea = document.querySelector('.content-area');
    
    if (window.innerWidth <= 768) {
        if (sidebar) sidebar.classList.add('mobile-hidden');
        if (contentArea) contentArea.style.marginLeft = '0';
    } else {
        if (sidebar) sidebar.classList.remove('mobile-hidden');
        if (contentArea) contentArea.style.marginLeft = '25%';
    }
}

// Initialize responsive behavior
window.addEventListener('resize', debounce(handleResponsive, 250));
handleResponsive();

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search (placeholder)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showNotification('Search functionality would be implemented here', 'info');
    }
    
    // Escape to close dropdowns
    if (e.key === 'Escape') {
        // Close any open dropdowns
        const dropdowns = document.querySelectorAll('.d-menu.opened');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('opened');
        });
    }
});

// Tile click handlers
document.addEventListener('click', function(e) {
    const tile = e.target.closest('.tile-large');
    if (tile) {
        const tileLabel = tile.querySelector('.tile-label');
        if (tileLabel) {
            const label = tileLabel.textContent.toLowerCase();
            showNotification(`${tileLabel.textContent} tile clicked`, 'info');
        }
    }
});

// Initialize Metro UI components after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Metro UI dropdowns
    if (typeof Metro !== 'undefined') {
        Metro.init();
    }
});

// Export functions for global access
window.Metro4Admin = {
    addUser,
    editUser,
    deleteUser,
    showNotification,
    setLoadingState,
    validateEmail
};