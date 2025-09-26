// eTask - Task and Appointment Manager
class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('etasks')) || [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        // Form submission
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Filter buttons
        document.getElementById('filterAll').addEventListener('click', () => this.setFilter('all'));
        document.getElementById('filterTasks').addEventListener('click', () => this.setFilter('task'));
        document.getElementById('filterAppointments').addEventListener('click', () => this.setFilter('appointment'));
        document.getElementById('filterToday').addEventListener('click', () => this.setFilter('today'));
    }

    addTask() {
        const title = document.getElementById('taskTitle').value.trim();
        const date = document.getElementById('taskDate').value;
        const time = document.getElementById('taskTime').value;
        const type = document.getElementById('taskType').value;
        const description = document.getElementById('taskDescription').value.trim();

        if (!title || !date || !time) {
            alert('Please fill in all required fields!');
            return;
        }

        const task = {
            id: Date.now().toString(),
            title,
            date,
            time,
            type,
            description,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.render();
        this.clearForm();
        
        // Show success message
        this.showNotification('Task added successfully!', 'success');
    }

    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.saveTasks();
            this.render();
            this.showNotification('Task deleted successfully!', 'success');
        }
    }

    toggleComplete(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
            this.showNotification(
                task.completed ? 'Task marked as completed!' : 'Task marked as incomplete!',
                'success'
            );
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-controls button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeButton = {
            'all': 'filterAll',
            'task': 'filterTasks',
            'appointment': 'filterAppointments',
            'today': 'filterToday'
        };
        
        document.getElementById(activeButton[filter]).classList.add('active');
        this.render();
    }

    getFilteredTasks() {
        let filtered = [...this.tasks];

        switch (this.currentFilter) {
            case 'task':
                filtered = filtered.filter(task => task.type === 'task');
                break;
            case 'appointment':
                filtered = filtered.filter(task => task.type === 'appointment');
                break;
            case 'today':
                const today = new Date().toISOString().split('T')[0];
                filtered = filtered.filter(task => task.date === today);
                break;
            default:
                // 'all' - no additional filtering
                break;
        }

        // Sort by date and time
        return filtered.sort((a, b) => {
            const dateTimeA = new Date(`${a.date}T${a.time}`);
            const dateTimeB = new Date(`${b.date}T${b.time}`);
            return dateTimeA - dateTimeB;
        });
    }

    render() {
        const tasksList = document.getElementById('tasksList');
        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            tasksList.innerHTML = '<div class="empty-state">No tasks found. Add your first task!</div>';
            return;
        }

        tasksList.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join('');

        // Bind event listeners for task actions
        tasksList.querySelectorAll('.complete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskId = e.target.dataset.taskId;
                this.toggleComplete(taskId);
            });
        });

        tasksList.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskId = e.target.dataset.taskId;
                this.deleteTask(taskId);
            });
        });
    }

    createTaskHTML(task) {
        const taskDate = new Date(`${task.date}T${task.time}`);
        const isOverdue = taskDate < new Date() && !task.completed;
        const formattedDate = taskDate.toLocaleDateString();
        const formattedTime = taskDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                <div class="task-header">
                    <div class="task-title">${this.escapeHtml(task.title)}</div>
                    <div class="task-type ${task.type}">${task.type}</div>
                </div>
                <div class="task-datetime ${isOverdue ? 'overdue' : ''}">
                    📅 ${formattedDate} ⏰ ${formattedTime}
                    ${isOverdue ? '<span style="color: #f56565;">• OVERDUE</span>' : ''}
                </div>
                ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ''}
                <div class="task-actions">
                    <button class="complete-btn" data-task-id="${task.id}">
                        ${task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                    </button>
                    <button class="delete-btn" data-task-id="${task.id}">Delete</button>
                </div>
            </div>
        `;
    }

    clearForm() {
        document.getElementById('taskForm').reset();
        document.getElementById('taskDate').value = new Date().toISOString().split('T')[0];
    }

    saveTasks() {
        localStorage.setItem('etasks', JSON.stringify(this.tasks));
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#48bb78' : '#667eea'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Export tasks to JSON
    exportTasks() {
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'etasks-backup.json';
        link.click();
        URL.revokeObjectURL(url);
        this.showNotification('Tasks exported successfully!', 'success');
    }

    // Clear all tasks
    clearAllTasks() {
        if (confirm('Are you sure you want to delete ALL tasks? This cannot be undone!')) {
            this.tasks = [];
            this.saveTasks();
            this.render();
            this.showNotification('All tasks cleared!', 'success');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set default date to today
    document.getElementById('taskDate').value = new Date().toISOString().split('T')[0];
    
    // Initialize the task manager
    window.taskManager = new TaskManager();
    
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                }).catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter to quickly add task
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            const form = document.getElementById('taskForm');
            if (form.checkValidity()) {
                window.taskManager.addTask();
            }
        }
    });
    
    console.log('eTask application initialized successfully!');
});