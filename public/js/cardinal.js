// Cardinal Admin Portal JavaScript

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
        subtitle: 'Welcome to your Cardinal admin dashboard',
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
    initializeMobileMenu();
});

// Initialize user table
function initializeUserTable() {
    const tableBody = document.getElementById('userTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    userData.forEach((user, index) => {
        const row = createUserRow(user);
        row.style.opacity = '0';
        row.style.transform = 'translateY(10px)';
        tableBody.appendChild(row);
        
        // Animate row appearance
        setTimeout(() => {
            row.style.transition = 'all 0.3s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, index * 30);
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
                    ✏️ Edit
                </button>
                <button class="action-btn delete" onclick="deleteUser(${user.id})" title="Delete user">
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
    // Notification dropdown
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationMenu = document.getElementById('notificationMenu');
    const closeNotifications = document.getElementById('closeNotifications');
    
    if (notificationBtn && notificationMenu) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationMenu.classList.toggle('show');
            
            // Close user menu if open
            const userMenu = document.getElementById('userMenu');
            if (userMenu) userMenu.classList.remove('show');
        });
        
        if (closeNotifications) {
            closeNotifications.addEventListener('click', function() {
                notificationMenu.classList.remove('show');
            });
        }
    }
    
    // User dropdown
    const userBtn = document.getElementById('userBtn');
    const userMenu = document.getElementById('userMenu');
    
    if (userBtn && userMenu) {
        userBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userMenu.classList.toggle('show');
            
            // Close notification menu if open
            if (notificationMenu) notificationMenu.classList.remove('show');
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (notificationMenu && !notificationMenu.contains(e.target) && !notificationBtn.contains(e.target)) {
            notificationMenu.classList.remove('show');
        }
        if (userMenu && !userMenu.contains(e.target) && !userBtn.contains(e.target)) {
            userMenu.classList.remove('show');
        }
    });
    
    // Add user button
    const addUserBtn = document.getElementById('addUserBtn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', addUser);
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
                
                // Close mobile menu if open
                const sidebar = document.getElementById('sidebar');
                if (sidebar && window.innerWidth <= 768) {
                    sidebar.classList.remove('show');
                }
            }
        });
    });
}

// Initialize animations
function initializeAnimations() {
    // Animate stats cards on load
    const statsCards = document.querySelectorAll('.stat-card');
    statsCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize mobile menu
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    sidebar.classList.remove('show');
                }
            }
        });
    }
}

// Set active tab
function setActiveTab(tab) {
    const pageTitle = document.getElementById('pageTitle');
    const pageSubtitle = document.getElementById('pageSubtitle');
    const currentBreadcrumb = document.getElementById('currentBreadcrumb');
    const statsGrid = document.getElementById('statsGrid');
    const dataCard = document.getElementById('dataCard');
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
        if (currentBreadcrumb) currentBreadcrumb.textContent = tabConfig[tab].breadcrumb;
        if (emptyTitle) emptyTitle.textContent = tabConfig[tab].title;
    }
    
    // Show/hide content based on tab with animations
    if (tab === 'dashboard') {
        if (statsGrid) {
            statsGrid.style.display = 'grid';
            statsGrid.classList.add('slide-up');
        }
        if (dataCard) {
            dataCard.style.display = 'block';
            dataCard.classList.add('slide-up');
        }
        if (tabContent) tabContent.style.display = 'none';
    } else if (tab === 'users') {
        if (statsGrid) statsGrid.style.display = 'none';
        if (dataCard) {
            dataCard.style.display = 'block';
            dataCard.classList.add('slide-up');
        }
        if (tabContent) tabContent.style.display = 'none';
    } else {
        if (statsGrid) statsGrid.style.display = 'none';
        if (dataCard) dataCard.style.display = 'none';
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
    const existingNotifications = document.querySelectorAll('.cardinal-notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `cardinal-notification ${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <span>${getNotificationIcon(type)}</span>
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
        element.style.opacity = '0.6';
        element.style.pointerEvents = 'none';
    } else {
        element.style.opacity = '1';
        element.style.pointerEvents = 'auto';
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
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth <= 768) {
        if (sidebar && !sidebar.classList.contains('show')) {
            sidebar.style.transform = 'translateX(-100%)';
        }
        if (mainContent) {
            mainContent.style.marginLeft = '0';
        }
    } else {
        if (sidebar) {
            sidebar.style.transform = 'translateX(0)';
            sidebar.classList.remove('show');
        }
        if (mainContent) {
            mainContent.style.marginLeft = '260px';
        }
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
    
    // Escape to close dropdowns and mobile menu
    if (e.key === 'Escape') {
        const notificationMenu = document.getElementById('notificationMenu');
        const userMenu = document.getElementById('userMenu');
        const sidebar = document.getElementById('sidebar');
        
        if (notificationMenu) notificationMenu.classList.remove('show');
        if (userMenu) userMenu.classList.remove('show');
        if (sidebar && window.innerWidth <= 768) sidebar.classList.remove('show');
    }
});

// Smooth scroll for internal links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Export functions for global access
window.CardinalAdmin = {
    addUser,
    editUser,
    deleteUser,
    showNotification,
    setLoadingState,
    validateEmail
};