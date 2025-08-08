// Tailwind CSS Admin Portal JavaScript

// Sample data
const userData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', avatar: 'JD' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', avatar: 'JS' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'inactive', avatar: 'BJ' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'pending', avatar: 'AB' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'active', avatar: 'CW' }
];

const activityData = [
    { user: 'John Doe', action: 'Created new user', time: '2 minutes ago', type: 'user' },
    { user: 'Jane Smith', action: 'Updated profile', time: '5 minutes ago', type: 'profile' },
    { user: 'System', action: 'Backup completed', time: '10 minutes ago', type: 'system' },
    { user: 'Bob Johnson', action: 'Deleted product', time: '15 minutes ago', type: 'product' },
    { user: 'Alice Brown', action: 'Made purchase', time: '20 minutes ago', type: 'order' }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeUserTable();
    initializeActivityFeed();
    initializeChart();
    initializeEventListeners();
    addAnimations();
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
    row.className = 'hover:bg-gray-50 transition-colors fade-in';
    
    const statusColors = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-red-100 text-red-800',
        pending: 'bg-yellow-100 text-yellow-800'
    };
    
    const roleColors = {
        Admin: 'bg-purple-100 text-purple-800',
        User: 'bg-blue-100 text-blue-800',
        Moderator: 'bg-indigo-100 text-indigo-800'
    };
    
    row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                        ${user.avatar}
                    </div>
                </div>
                <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">${user.name}</div>
                    <div class="text-sm text-gray-500">${user.email}</div>
                </div>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${roleColors[user.role]}">
                ${user.role}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[user.status]}">
                <span class="status-dot status-${user.status}"></span>
                ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div class="flex space-x-2">
                <button onclick="editUser(${user.id})" class="text-indigo-600 hover:text-indigo-900 transition-colors">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteUser(${user.id})" class="text-red-600 hover:text-red-900 transition-colors">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    
    return row;
}

// Initialize activity feed
function initializeActivityFeed() {
    const activityFeed = document.getElementById('activityFeed');
    
    activityData.forEach(activity => {
        const item = createActivityItem(activity);
        activityFeed.appendChild(item);
    });
}

// Create activity item
function createActivityItem(activity) {
    const item = document.createElement('div');
    item.className = 'flex items-start space-x-3 fade-in';
    
    const iconColors = {
        user: 'bg-blue-100 text-blue-600',
        profile: 'bg-green-100 text-green-600',
        system: 'bg-gray-100 text-gray-600',
        product: 'bg-purple-100 text-purple-600',
        order: 'bg-yellow-100 text-yellow-600'
    };
    
    const icons = {
        user: 'fas fa-user',
        profile: 'fas fa-user-edit',
        system: 'fas fa-cog',
        product: 'fas fa-box',
        order: 'fas fa-shopping-cart'
    };
    
    item.innerHTML = `
        <div class="flex-shrink-0">
            <div class="w-8 h-8 rounded-full ${iconColors[activity.type]} flex items-center justify-center">
                <i class="${icons[activity.type]} text-sm"></i>
            </div>
        </div>
        <div class="flex-1 min-w-0">
            <p class="text-sm text-gray-900">
                <span class="font-medium">${activity.user}</span> ${activity.action}
            </p>
            <p class="text-xs text-gray-500">${activity.time}</p>
        </div>
    `;
    
    return item;
}

// Initialize Chart.js chart
function initializeChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Revenue',
                data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000],
                borderColor: '#3b82f6',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#6b7280'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(107, 114, 128, 0.1)'
                    },
                    ticks: {
                        color: '#6b7280',
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Event listeners
function initializeEventListeners() {
    // Sidebar navigation
    document.querySelectorAll('aside nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active classes
            document.querySelectorAll('aside nav a').forEach(l => {
                l.classList.remove('bg-blue-50', 'border-r-4', 'border-blue-500', 'text-blue-700');
                l.classList.add('hover:bg-gray-50');
                l.querySelector('i').classList.remove('text-blue-500');
                l.querySelector('i').classList.add('text-gray-400');
            });
            
            // Add active class to clicked link
            this.classList.add('bg-blue-50', 'border-r-4', 'border-blue-500', 'text-blue-700');
            this.classList.remove('hover:bg-gray-50');
            this.querySelector('i').classList.add('text-blue-500');
            this.querySelector('i').classList.remove('text-gray-400');
        });
    });

    // Add button loading states
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('text-red-600')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
}

// Add animations
function addAnimations() {
    // Animate stats cards on load
    const statsCards = document.querySelectorAll('.grid > div');
    statsCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
    
    // Add hover effects to cards
    document.querySelectorAll('.hover\\:shadow-md').forEach(card => {
        card.classList.add('hover-lift');
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

// Refresh user table
function refreshUserTable() {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';
    initializeUserTable();
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <div class="flex-shrink-0">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            </div>
            <div class="ml-3">
                <p class="text-sm font-medium">${message}</p>
            </div>
            <div class="ml-auto pl-3">
                <button onclick="this.parentElement.parentElement.remove()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
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
            avatar: name.split(' ').map(n => n[0]).join('').toUpperCase()
        };
        
        userData.push(newUser);
        refreshUserTable();
        showNotification('User added successfully!', 'success');
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const sidebar = document.querySelector('aside');
    sidebar.classList.toggle('open');
}