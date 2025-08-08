// Flowbite Admin Portal JavaScript

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
        subtitle: 'Welcome to your Flowbite admin dashboard'
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
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeUserTable();
    initializeEventListeners();
    initializeNavigation();
    initializeSidebar();
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
    row.className = 'bg-white border-b hover:bg-gray-50 table-row-hover';
    
    const statusClass = getStatusClass(user.status);
    
    row.innerHTML = `
        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            ${user.name}
        </td>
        <td class="px-6 py-4 text-gray-500">
            ${user.email}
        </td>
        <td class="px-6 py-4">
            <span class="role-badge">${user.role}</span>
        </td>
        <td class="px-6 py-4">
            <span class="status-badge ${statusClass}">${capitalizeFirst(user.status)}</span>
        </td>
        <td class="px-6 py-4 text-gray-500">
            ${formatDate(user.joinDate)}
        </td>
        <td class="px-6 py-4">
            <div class="flex space-x-2">
                <button onclick="editUser(${user.id})" class="action-btn edit">
                    ✏️ Edit
                </button>
                <button onclick="deleteUser(${user.id})" class="action-btn delete">
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
    // Add user button
    const addUserBtn = document.getElementById('addUserBtn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', addUser);
    }
    
    // Toggle sidebar for mobile
    const toggleSidebar = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('logo-sidebar');
    
    if (toggleSidebar && sidebar) {
        toggleSidebar.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth < 640) {
                if (!sidebar.contains(e.target) && !toggleSidebar.contains(e.target)) {
                    sidebar.classList.remove('show');
                }
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

// Initialize sidebar
function initializeSidebar() {
    // Handle responsive behavior
    handleResponsiveSidebar();
    window.addEventListener('resize', handleResponsiveSidebar);
}

// Handle responsive sidebar
function handleResponsiveSidebar() {
    const sidebar = document.getElementById('logo-sidebar');
    if (!sidebar) return;
    
    if (window.innerWidth >= 640) {
        sidebar.classList.remove('show');
        sidebar.classList.remove('-translate-x-full');
    } else {
        sidebar.classList.add('-translate-x-full');
    }
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
        if (statsGrid) {
            statsGrid.style.display = 'grid';
            statsGrid.classList.add('fade-in');
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
    
    // Close mobile sidebar after navigation
    if (window.innerWidth < 640) {
        const sidebar = document.getElementById('logo-sidebar');
        if (sidebar) {
            sidebar.classList.remove('show');
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
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
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
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide and remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
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

// Loading state management
function setLoadingState(element, isLoading) {
    if (isLoading) {
        element.classList.add('loading');
        element.style.position = 'relative';
    } else {
        element.classList.remove('loading');
    }
}

// Form validation utilities
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateRequired(value) {
    return value && value.trim().length > 0;
}

// Export functions for global access
window.FlowbiteAdmin = {
    addUser,
    editUser,
    deleteUser,
    showNotification,
    setLoadingState,
    validateEmail,
    validateRequired
};