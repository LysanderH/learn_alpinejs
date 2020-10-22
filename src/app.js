import 'alpinejs'

window.data = function () {
	return {
		todos: [],
		newTodoTitle: '',
		filter: 'all',
		todoEditing: null,

		/**
		 * Filters todos to get not accomplished todos
		 * @returns array activeTodos
		 */
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
			return {
				all: this.todos,
				active: this.activeTodos,
				completed: this.completedTodos
			}[this.filter]
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

		startEditing(todo, tick, field) {
			todo.cachedTitle = todo.title;

			if (this.todoEditing) {
				delete this.todoEditing.editing;
			}
			this.todoEditing = todo;
			todo.editing = true;

			tick(setTimeout(() => {
				field.focus()
			}));
		},

		validateEditingTodo(todo) {
			if (todo.title.trim()) {
				delete this.todoEditing.editing;
			} else {
				this.removeTodo(todo);
			}
		},

		cancelEditingTodo(todo){
			todo.title = todo.cachedTitle;
			delete todo.cachedTitle;
			delete todo.editing;
		}

	}
}
