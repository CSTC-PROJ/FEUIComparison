// Semantic UI Admin Portal JavaScript

// Sample data
const userData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'pending' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'active' }
];

let currentTab = 'dashboard';

// Initialize Semantic UI and the application
$(document).ready(function() {
    // Initialize Semantic UI components
    $('.ui.dropdown').dropdown();
    
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
            <div class="ui items">
                <div class="item">
                    <div class="ui tiny image">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=21ba45&color=fff" class="ui avatar image">
                    </div>
                    <div class="content">
                        <div class="header">${user.name}</div>
                        <div class="meta">${user.email}</div>
                    </div>
                </div>
            </div>
        </td>
        <td>${user.email}</td>
        <td>
            <div class="ui label role-${user.role.toLowerCase()}">${user.role}</div>
        </td>
        <td>
            <div class="ui label status-${user.status}">
                ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </div>
        </td>
        <td>
            <div class="ui buttons">
                <button class="ui mini button" onclick="editUser(${user.id})">
                    <i class="edit icon"></i> Edit
                </button>
                <button class="ui mini red button" onclick="deleteUser(${user.id})">
                    <i class="trash icon"></i> Delete
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
    $('.ui.vertical.menu .item .menu .item').removeClass('active');
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
        dashboard: 'Welcome to your Semantic UI admin dashboard',
        users: 'Manage your application users',
        analytics: 'View detailed analytics and reports',
        products: 'Manage your product catalog',
        orders: 'Track and manage orders',
        settings: 'Configure your application settings'
    };
    
    document.getElementById('pageTitle').textContent = titles[tab] || 'Dashboard';
    document.getElementById('pageSubtitle').textContent = subtitles[tab] || 'Welcome to your Semantic UI admin dashboard';
    
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
    $('.ui.card').hover(
        function() {
            $(this).css('transform', 'translateY(-2px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );

    // Add loading states to buttons
    $('.ui.button').on('click', function() {
        if (!$(this).hasClass('red')) {
            $(this).addClass('loading');
            setTimeout(() => {
                $(this).removeClass('loading');
            }, 1000);
        }
    });
}

// Animate cards on load
function animateCards() {
    const cards = document.querySelectorAll('.ui.card, .stats-card');
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

// Refresh user table
function refreshUserTable() {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';
    initializeUserTable();
}

// Show notification using Semantic UI
function showNotification(message, type = 'info') {
    const typeClasses = {
        success: 'ui positive message',
        error: 'ui negative message',
        warning: 'ui warning message',
        info: 'ui info message'
    };
    
    const icons = {
        success: 'checkmark',
        error: 'times',
        warning: 'warning',
        info: 'info'
    };
    
    const notification = $(`
        <div class="${typeClasses[type]} notification">
            <i class="close icon" onclick="$(this).parent().remove()"></i>
            <div class="header">
                <i class="${icons[type]} icon"></i>
                ${message}
            </div>
        </div>
    `);
    
    $('body').append(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.remove();
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