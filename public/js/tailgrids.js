// TailGrids Admin Portal JavaScript

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
        subtitle: 'Welcome to your TailGrids admin dashboard',
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
    support: {
        title: 'Support',
        subtitle: 'Get help and support',
        breadcrumb: 'Support'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeUserTable();
    initializeEventListeners();
    initializeNavigation();
    initializeAnimations();
});

// Initialize user table
function initializeUserTable() {
    const tableBody = document.getElementById('userTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    userData.forEach((user, index) => {
        const row = createUserRow(user);
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        tableBody.appendChild(row);
        
        // Animate row appearance
        setTimeout(() => {
            row.style.transition = 'all 0.3s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Create user table row
function createUserRow(user) {
    const row = document.createElement('tr');
    row.className = 'table-row-hover';
    
    const statusClass = getStatusClass(user.status);
    
    row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900">${user.name}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-500">${user.email}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="role-badge">${user.role}</span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="status-badge ${statusClass}">${capitalizeFirst(user.status)}</span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            ${formatDate(user.joinDate)}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div class="flex space-x-2">
                <button onclick="editUser(${user.id})" class="action-btn edit tooltip" data-tooltip="Edit user">
                    ✏️ Edit
                </button>
                <button onclick="deleteUser(${user.id})" class="action-btn delete tooltip" data-tooltip="Delete user">
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
            notificationDropdown.classList.toggle('hidden');
            
            if (!notificationDropdown.classList.contains('hidden')) {
                notificationDropdown.classList.add('scale-in');
            }
        });
        
        if (closeNotifications) {
            closeNotifications.addEventListener('click', function() {
                notificationDropdown.classList.add('hidden');
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!notificationDropdown.contains(e.target) && !notificationBtn.contains(e.target)) {
                notificationDropdown.classList.add('hidden');
            }
        });
    }
    
    // Add user button
    const addUserBtn = document.getElementById('addUserBtn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', addUser);
    }
    
    // User menu button
    const userMenuBtn = document.getElementById('userMenuBtn');
    if (userMenuBtn) {
        userMenuBtn.addEventListener('click', function() {
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

// Initialize animations
function initializeAnimations() {
    // Animate stats cards on load
    const statsCards = document.querySelectorAll('#statsGrid > div');
    statsCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Set active tab
function setActiveTab(tab) {
    const pageTitle = document.getElementById('pageTitle');
    const pageSubtitle = document.getElementById('pageSubtitle');
    const breadcrumb = document.getElementById('breadcrumb');
    const statsGrid = document.getElementById('statsGrid');
    const dataTable = document.getElementById('dataTable');
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
        if (breadcrumb) breadcrumb.textContent = tabConfig[tab].breadcrumb;
        if (emptyTitle) emptyTitle.textContent = tabConfig[tab].title;
    }
    
    // Show/hide content based on tab with animations
    if (tab === 'dashboard') {
        if (statsGrid) {
            statsGrid.style.display = 'grid';
            statsGrid.classList.add('slide-up');
        }
        if (dataTable) {
            dataTable.style.display = 'block';
            dataTable.classList.add('slide-up');
        }
        if (tabContent) tabContent.style.display = 'none';
    } else if (tab === 'users') {
        if (statsGrid) statsGrid.style.display = 'none';
        if (dataTable) {
            dataTable.style.display = 'block';
            dataTable.classList.add('slide-up');
        }
        if (tabContent) tabContent.style.display = 'none';
    } else {
        if (statsGrid) statsGrid.style.display = 'none';
        if (dataTable) dataTable.style.display = 'none';
        if (tabContent) {
            tabContent.style.display = 'block';
            tabContent.classList.add('fade-in');
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
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
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
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
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

// Smooth scroll function
function smoothScrollTo(element, duration = 500) {
    const targetPosition = element.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Handle responsive behavior
function handleResponsive() {
    const sidebar = document.querySelector('aside');
    const mainContent = document.querySelector('main');
    
    if (window.innerWidth <= 768) {
        if (sidebar) sidebar.classList.add('mobile-hidden');
        if (mainContent) mainContent.classList.remove('ml-64');
    } else {
        if (sidebar) sidebar.classList.remove('mobile-hidden');
        if (mainContent) mainContent.classList.add('ml-64');
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
        const notificationDropdown = document.getElementById('notificationDropdown');
        if (notificationDropdown && !notificationDropdown.classList.contains('hidden')) {
            notificationDropdown.classList.add('hidden');
        }
    }
});

// Export functions for global access
window.TailGridsAdmin = {
    addUser,
    editUser,
    deleteUser,
    showNotification,
    setLoadingState,
    validateEmail,
    smoothScrollTo
};