import 'alpinejs'

window.data = function () {
	return {
		todos: [],
		newTodoTitle: '',
		filter: 'all',
		get activeTodos() {
			return this.todos.filter(item => !item.completed);
		},
		get activeTodosCount() {
			return this.activeTodos.length;
		},
		get completedTodos() {
			return this.todos.filter(item => item.completed);
		},
		get completedTodosCount() {
			return this.completedTodos.length;
		},
		get filteredTodos() {
			switch (this.filter) {
				case "all":
					return this.todos;
					break;
				case 'completed':
					return this.completedTodos;
					break;
				case 'active':
					return this.activeTodos;
					break;
			}
		},
		addTodo() {
			if (this.newTodoTitle.trim()) {
				this.todos.push({
					id: Date.now(),
					title: this.newTodoTitle,
					completed: false,
				})
				this.newTodoTitle = ''
			}
		},
		removeTodo(todo) {
			this.todos.splice(this.todos.indexOf(todo), 1);
		},
		toggleCompleted(todo) {
			todo.completed = !todo.completed;
		},

	}
}
