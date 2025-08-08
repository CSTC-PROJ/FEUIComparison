// Angular Admin Portal JavaScript

angular.module('adminApp', [])
.controller('AdminController', ['$scope', function($scope) {
    // Initialize data
    $scope.activeTab = 'dashboard';
    $scope.showNotifications = false;
    $scope.showUserMenu = false;
    
    $scope.users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'inactive' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'pending' },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'active' }
    ];
    
    $scope.stats = [
        {
            icon: '👥',
            iconClass: 'primary',
            value: '1,247',
            label: 'Total Users',
            change: '↗ +12%',
            changeType: 'positive'
        },
        {
            icon: '💰',
            iconClass: 'success',
            value: '$45,678',
            label: 'Revenue',
            change: '↗ +8%',
            changeType: 'positive'
        },
        {
            icon: '📦',
            iconClass: 'warning',
            value: '234',
            label: 'Orders',
            change: '↘ -3%',
            changeType: 'negative'
        },
        {
            icon: '📊',
            iconClass: 'danger',
            value: '3.2%',
            label: 'Conversion',
            change: '↗ +0.5%',
            changeType: 'positive'
        }
    ];
    
    $scope.notifications = [
        { id: 1, message: 'New user registered' },
        { id: 2, message: 'Order completed' },
        { id: 3, message: 'System update available' }
    ];
    
    // Methods
    $scope.setActiveTab = function(tab) {
        $scope.activeTab = tab;
    };
    
    $scope.getTabTitle = function(tab) {
        const titles = {
            dashboard: 'Dashboard',
            users: 'User Management',
            analytics: 'Analytics',
            products: 'Product Management',
            orders: 'Order Management'
        };
        return titles[tab] || 'Dashboard';
    };
    
    $scope.getTabSubtitle = function(tab) {
        const subtitles = {
            dashboard: 'Welcome to your Angular admin dashboard',
            users: 'Manage your application users',
            analytics: 'View detailed analytics and reports',
            products: 'Manage your product catalog',
            orders: 'Track and manage orders'
        };
        return subtitles[tab] || 'Welcome to your Angular admin dashboard';
    };
    
    $scope.getRoleBadgeClass = function(role) {
        const classes = {
            Admin: 'danger',
            Moderator: 'warning',
            User: 'primary'
        };
        return classes[role] || 'primary';
    };
    
    $scope.toggleNotifications = function() {
        $scope.showNotifications = !$scope.showNotifications;
    };
    
    $scope.toggleUserMenu = function() {
        $scope.showUserMenu = !$scope.showUserMenu;
    };
    
    $scope.addUser = function() {
        var name = prompt('Enter user name:');
        var email = prompt('Enter user email:');
        
        if (name && email) {
            var newUser = {
                id: $scope.users.length + 1,
                name: name,
                email: email,
                role: 'User',
                status: 'active'
            };
            
            $scope.users.push(newUser);
            $scope.showNotification('User added successfully!', 'success');
        }
    };
    
    $scope.editUser = function(user) {
        var newName = prompt('Edit user name:', user.name);
        if (newName && newName !== user.name) {
            user.name = newName;
            $scope.showNotification('User updated successfully!', 'success');
        }
    };
    
    $scope.deleteUser = function(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
            var index = $scope.users.findIndex(function(u) { return u.id === userId; });
            if (index > -1) {
                $scope.users.splice(index, 1);
                $scope.showNotification('User deleted successfully!', 'danger');
            }
        }
    };
    
    $scope.showNotification = function(message, type) {
        var notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${type === 'success' ? '#dd0031' : type === 'danger' ? '#dc3545' : '#333'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(function() {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    };
}])
.filter('capitalize', function() {
    return function(input) {
        return input ? input.charAt(0).toUpperCase() + input.slice(1) : '';
    };
});