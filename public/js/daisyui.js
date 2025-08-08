// DaisyUI Admin Portal JavaScript

// Sample data
const userData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'pending' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'active' }
];

let currentTab = 'dashboard';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeUserTable();
    initializeEventListeners();
    animateElements();
});

// Populate user table
function initializeUserTable() {
    const tableBody = document.getElementById('userTableBody');
    
    userData.forEach(user => {
        const row = createUserRow(user);
        tableBody.appendChild(row);
    });
}

// Create user table row
function createUserRow(user) {
    const row = document.createElement('tr');
    
    const statusClasses = {
        active: 'badge-success',
        inactive: 'badge-error',
        pending: 'badge-warning'
    };
    
    const roleClasses = {
        Admin: 'badge-error',
        User: 'badge-primary',
        Moderator: 'badge-warning'
    };
    
    row.innerHTML = `
        <td>
            <div class="flex items-center space-x-3">
                <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=570df8&color=fff" alt="Avatar" />
                    </div>
                </div>
                <div>
                    <div class="font-bold">${user.name}</div>
                    <div class="text-sm opacity-50">${user.email}</div>
                </div>
            </div>
        </td>
        <td>${user.email}</td>
        <td>
            <span class="badge ${roleClasses[user.role]}">${user.role}</span>
        </td>
        <td>
            <span class="badge ${statusClasses[user.status]}">
                ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </span>
        </td>
        <td>
            <div class="flex space-x-2">
                <button class="btn btn-ghost btn-xs" onclick="editUser(${user.id})">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit
                </button>
                <button class="btn btn-ghost btn-xs text-error" onclick="deleteUser(${user.id})">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Delete
                </button>
            </div>
        </td>
    `;
    
    return row;
}

// Set active tab
function setActiveTab(tab) {
    currentTab = tab;
    
    // Update active menu item
    document.querySelectorAll('.menu li > a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update page content
    updatePageContent(tab);
}

// Update page content based on active tab
function updatePageContent(tab) {
    const titles = {
        dashboard: 'Dashboard',
        users: 'User Management',
        analytics: 'Analytics',
        products: 'Product Management',
        orders: 'Order Management',
        settings: 'Settings'
    };
    
    const subtitles = {
        dashboard: 'Welcome to your DaisyUI admin dashboard',
        users: 'Manage your application users',
        analytics: 'View detailed analytics and reports',
        products: 'Manage your product catalog',
        orders: 'Track and manage orders',
        settings: 'Configure your application settings'
    };
    
    document.getElementById('pageTitle').textContent = titles[tab] || 'Dashboard';
    document.getElementById('pageSubtitle').textContent = subtitles[tab] || 'Welcome to your DaisyUI admin dashboard';
    
    // Show/hide sections based on tab
    const statsGrid = document.getElementById('statsGrid');
    const usersTable = document.getElementById('usersTable');
    const otherContent = document.getElementById('otherContent');
    const otherContentTitle = document.getElementById('otherContentTitle');
    const otherContentText = document.getElementById('otherContentText');
    
    if (tab === 'dashboard') {
        statsGrid.style.display = 'grid';
        usersTable.style.display = 'block';
        otherContent.classList.add('hidden');
    } else if (tab === 'users') {
        statsGrid.style.display = 'none';
        usersTable.style.display = 'block';
        otherContent.classList.add('hidden');
    } else {
        statsGrid.style.display = 'none';
        usersTable.style.display = 'none';
        otherContent.classList.remove('hidden');
        otherContentTitle.textContent = titles[tab];
        otherContentText.textContent = `${titles[tab]} content would be displayed here.`;
    }
    
    // Re-animate elements
    animateElements();
}

// Event listeners
function initializeEventListeners() {
    // Add hover effects to stats
    document.querySelectorAll('.stat').forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        stat.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add loading states to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('text-error')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });

    // Theme toggle functionality
    const themeToggle = document.querySelector('[data-theme-toggle]');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Animate elements
function animateElements() {
    // Animate stats cards
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
        setTimeout(() => {
            stat.classList.add('fade-in-up');
        }, index * 100);
    });
    
    // Animate cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in-up');
        }, (stats.length + index) * 100);
    });
}

// User management functions
function editUser(userId) {
    const user = userData.find(u => u.id === userId);
    if (user) {
        const newName = prompt(`Edit user name:`, user.name);
        if (newName && newName !== user.name) {
            user.name = newName;
            refreshUserTable();
            showNotification('User updated successfully!', 'success');
        }
    }
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        const index = userData.findIndex(u => u.id === userId);
        if (index > -1) {
            userData.splice(index, 1);
            refreshUserTable();
            showNotification('User deleted successfully!', 'error');
        }
    }
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
        refreshUserTable();
        showNotification('User added successfully!', 'success');
    }
}

// Refresh user table
function refreshUserTable() {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';
    initializeUserTable();
}

// Show notification
function showNotification(message, type = 'info') {
    const typeClasses = {
        success: 'alert-success',
        error: 'alert-error',
        warning: 'alert-warning',
        info: 'alert-info'
    };
    
    const icons = {
        success: `<svg class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        error: `<svg class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        warning: `<svg class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>`,
        info: `<svg class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    };
    
    const notification = document.createElement('div');
    notification.className = `alert ${typeClasses[type]} notification-custom`;
    notification.innerHTML = `
        ${icons[type]}
        <span>${message}</span>
        <div>
            <button class="btn btn-sm btn-ghost" onclick="this.parentElement.parentElement.remove()">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 4000);
}

// Export functionality
function exportData() {
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'users_data.json';
    link.click();
    URL.revokeObjectURL(url);
    showNotification('Data exported successfully!', 'info');
}