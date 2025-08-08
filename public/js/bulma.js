// Bulma Admin Portal JavaScript

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
    animateCards();
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
        active: 'is-status-active',
        inactive: 'is-status-inactive',
        pending: 'is-status-pending'
    };
    
    const roleClasses = {
        Admin: 'is-role-admin',
        User: 'is-role-user',
        Moderator: 'is-role-moderator'
    };
    
    row.innerHTML = `
        <td>
            <div class="media">
                <div class="media-left">
                    <figure class="image is-32x32">
                        <img class="is-rounded" src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=00d1b2&color=fff">
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-6">${user.name}</p>
                    <p class="subtitle is-7">${user.email}</p>
                </div>
            </div>
        </td>
        <td>${user.email}</td>
        <td>
            <span class="tag ${roleClasses[user.role]}">${user.role}</span>
        </td>
        <td>
            <span class="tag ${statusClasses[user.status]}">
                ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </span>
        </td>
        <td>
            <div class="field is-grouped">
                <p class="control">
                    <button class="button is-small is-info" onclick="editUser(${user.id})">
                        <span class="icon is-small">
                            <i class="fas fa-edit"></i>
                        </span>
                        <span>Edit</span>
                    </button>
                </p>
                <p class="control">
                    <button class="button is-small is-danger" onclick="deleteUser(${user.id})">
                        <span class="icon is-small">
                            <i class="fas fa-trash"></i>
                        </span>
                        <span>Delete</span>
                    </button>
                </p>
            </div>
        </td>
    `;
    
    return row;
}

// Set active tab
function setActiveTab(tab) {
    currentTab = tab;
    
    // Update active menu item
    document.querySelectorAll('.menu-list a').forEach(link => {
        link.classList.remove('is-active');
    });
    event.target.classList.add('is-active');
    
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
        inventory: 'Inventory Management',
        settings: 'Settings',
        security: 'Security'
    };
    
    const subtitles = {
        dashboard: 'Welcome to your Bulma admin dashboard',
        users: 'Manage your application users',
        analytics: 'View detailed analytics and reports',
        products: 'Manage your product catalog',
        orders: 'Track and manage orders',
        inventory: 'Monitor inventory levels',
        settings: 'Configure your application settings',
        security: 'Manage security settings'
    };
    
    document.getElementById('pageTitle').textContent = titles[tab] || 'Dashboard';
    document.getElementById('pageSubtitle').textContent = subtitles[tab] || 'Welcome to your Bulma admin dashboard';
    
    // Show/hide sections based on tab
    const statsSection = document.getElementById('statsSection');
    const usersTable = document.getElementById('usersTable');
    const otherContent = document.getElementById('otherContent');
    const otherContentTitle = document.getElementById('otherContentTitle');
    const otherContentText = document.getElementById('otherContentText');
    
    if (tab === 'dashboard') {
        statsSection.style.display = 'flex';
        usersTable.style.display = 'block';
        otherContent.style.display = 'none';
    } else if (tab === 'users') {
        statsSection.style.display = 'none';
        usersTable.style.display = 'block';
        otherContent.style.display = 'none';
    } else {
        statsSection.style.display = 'none';
        usersTable.style.display = 'none';
        otherContent.style.display = 'block';
        otherContentTitle.textContent = titles[tab];
        otherContentText.textContent = `${titles[tab]} content would be displayed here.`;
    }
}

// Event listeners
function initializeEventListeners() {
    // Add hover effects to cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add loading states to buttons
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('is-danger')) {
                this.classList.add('is-loading');
                setTimeout(() => {
                    this.classList.remove('is-loading');
                }, 1000);
            }
        });
    });
}

// Animate cards on load
function animateCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in-up');
        }, index * 100);
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
            showNotification('User updated successfully!', 'is-success');
        }
    }
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        const index = userData.findIndex(u => u.id === userId);
        if (index > -1) {
            userData.splice(index, 1);
            refreshUserTable();
            showNotification('User deleted successfully!', 'is-danger');
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
        showNotification('User added successfully!', 'is-success');
    }
}

// Refresh user table
function refreshUserTable() {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';
    initializeUserTable();
}

// Show notification
function showNotification(message, type = 'is-info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type} is-custom`;
    notification.innerHTML = `
        <button class="delete" onclick="this.parentElement.remove()"></button>
        <strong>${message}</strong>
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
    showNotification('Data exported successfully!', 'is-info');
}