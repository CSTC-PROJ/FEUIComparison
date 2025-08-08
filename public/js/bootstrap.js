// Bootstrap Admin Portal JavaScript

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

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeUserTable();
    initializeChart();
    initializeEventListeners();
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
    
    const statusClass = `status-${user.status}`;
    const statusText = user.status.charAt(0).toUpperCase() + user.status.slice(1);
    
    row.innerHTML = `
        <td class="font-weight-bold">${user.name}</td>
        <td>${user.email}</td>
        <td>
            <span class="badge bg-secondary">${user.role}</span>
        </td>
        <td>
            <span class="status-badge ${statusClass}">${statusText}</span>
        </td>
        <td>${formatDate(user.joinDate)}</td>
        <td>
            <div class="btn-group" role="group">
                <button type="button" class="btn btn-outline-primary btn-sm" onclick="editUser(${user.id})">
                    <i class="bi bi-pencil"></i>
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm" onclick="deleteUser(${user.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </td>
    `;
    
    return row;
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

// Initialize Chart.js chart
function initializeChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Revenue',
                data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000],
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#007bff',
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
                        color: '#858796'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(133, 135, 150, 0.1)'
                    },
                    ticks: {
                        color: '#858796',
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            elements: {
                point: {
                    hoverBackgroundColor: '#007bff'
                }
            }
        }
    });
}

// Event listeners
function initializeEventListeners() {
    // Add smooth scrolling to sidebar links
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('.sidebar .nav-link').forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    // Add loading state to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('btn-outline-danger')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });

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

// User management functions
function editUser(userId) {
    const user = userData.find(u => u.id === userId);
    if (user) {
        // Create a simple modal-like alert for demo
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
            showNotification('User deleted successfully!', 'danger');
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
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 70px; right: 20px; z-index: 1050; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Add some interactive features
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
            joinDate: new Date().toISOString().split('T')[0]
        };
        
        userData.push(newUser);
        refreshUserTable();
        showNotification('User added successfully!', 'success');
    }
}

// Export data function
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

// Add click handlers for toolbar buttons
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for export button
    const exportBtn = document.querySelector('.btn-outline-secondary:last-child');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportData);
    }
    
    // Add event listener for add user button
    const addUserBtn = document.querySelector('.card-header .btn-primary');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', addUser);
    }
});