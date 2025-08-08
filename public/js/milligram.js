// Milligram Admin Portal JavaScript

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
    
    row.innerHTML = `
        <td>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=9b4dca&color=fff" 
                     alt="Avatar" style="width: 32px; height: 32px; border-radius: 50%;">
                <div>
                    <strong>${user.name}</strong><br>
                    <small style="color: #606c76;">${user.email}</small>
                </div>
            </div>
        </td>
        <td>${user.email}</td>
        <td>
            <span class="role-${user.role.toLowerCase()}">${user.role}</span>
        </td>
        <td>
            <span class="status-${user.status}">
                ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </span>
        </td>
        <td>
            <button class="button button-outline small" onclick="editUser(${user.id})">
                Edit
            </button>
            <button class="button button-clear small" onclick="deleteUser(${user.id})" style="color: #dc3545;">
                Delete
            </button>
        </td>
    `;
    
    return row;
}

// Set active tab
function setActiveTab(tab) {
    currentTab = tab;
    
    // Update active menu item
    document.querySelectorAll('.nav-link').forEach(link => {
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
        dashboard: 'Welcome to your Milligram admin dashboard',
        users: 'Manage your application users',
        analytics: 'View detailed analytics and reports',
        products: 'Manage your product catalog',
        orders: 'Track and manage orders',
        settings: 'Configure your application settings'
    };
    
    document.getElementById('pageTitle').textContent = titles[tab] || 'Dashboard';
    document.getElementById('pageSubtitle').textContent = subtitles[tab] || 'Welcome to your Milligram admin dashboard';
    
    // Show/hide sections based on tab
    const statsGrid = document.getElementById('statsGrid');
    const usersTable = document.getElementById('usersTable');
    const otherContent = document.getElementById('otherContent');
    const otherContentTitle = document.getElementById('otherContentTitle');
    const otherContentText = document.getElementById('otherContentText');
    
    if (tab === 'dashboard') {
        statsGrid.style.display = 'flex';
        usersTable.style.display = 'block';
        otherContent.style.display = 'none';
    } else if (tab === 'users') {
        statsGrid.style.display = 'none';
        usersTable.style.display = 'block';
        otherContent.style.display = 'none';
    } else {
        statsGrid.style.display = 'none';
        usersTable.style.display = 'none';
        otherContent.style.display = 'block';
        otherContentTitle.textContent = titles[tab];
        otherContentText.textContent = `${titles[tab]} content would be displayed here.`;
    }
    
    // Re-animate elements
    animateCards();
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
}

// Animate cards on load
function animateCards() {
    const cards = document.querySelectorAll('.card, .stats-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
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

function toggleNotifications() {
    showNotification('Notifications toggled!', 'info');
}

// Refresh user table
function refreshUserTable() {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';
    initializeUserTable();
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#9b4dca' : type === 'error' ? '#dc3545' : '#6c757d'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        font-size: 0.9rem;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
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