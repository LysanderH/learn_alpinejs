import 'alpinejs'

window.data = function () {
	return {
		todos: [],
		newTodoTitle: '',
		filter: 'all',
		todoEditing: null,
		checked: false,

		/**
		 * Filters todos to get not accomplished todos
		 * @returns array activeTodos
		 */
		get activeTodos() {
			return this.todos.filter(item => !item.completed);
		},

		/**
		 * Counts the active todos
		 * @returns int activeTodosCount
		 */
		get activeTodosCount() {
			return this.activeTodos.length;
		},

		/**
		 * Filters todos array to get completed todos
		 * @returns array completedTodos
		 */
		get completedTodos() {
			return this.todos.filter(item => item.completed);
		},

		/**
		 * Counts completed todos
		 * @returns {*}
		 */
		get completedTodosCount() {
			return this.completedTodos.length;
		},

		/**
		 * Get the filtered todos from todos array
		 * @returns array
		 */
		get filteredTodos() {
			return {
				all: this.todos,
				active: this.activeTodos,
				completed: this.completedTodos
			}[this.filter]
		},

		/**
		 * Checks if all todos are completed or not
		 * @returns {boolean}
		 */
		get allCompleted() {
			return this.todos.length === this.completedTodosCount;
		},

		/**
		 * Add an item to the todos array
		 */
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

		/**
		 * Removes an item from todos array
		 * @param todo
		 */
		removeTodo(todo) {
			this.todos.splice(this.todos.indexOf(todo), 1);
		},

		/**
		 * Changes the completed value of a todos array item
		 * @param todo
		 */
		toggleCompleted(todo) {
			todo.completed = !todo.completed;
		},

		/**
		 * Initiate the editing process of one item
		 * @param todo
		 * @param tick
		 * @param field
		 */
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

		/**
		 * Validates the updated values of the modified item
		 * @param todo
		 */
		validateEditingTodo(todo) {
			if (todo.title.trim()) {
				delete this.todoEditing.editing;
			} else {
				this.removeTodo(todo);
			}
		},

		/**
		 * If push esc cancel the editing and reset the title
		 * @param todo
		 */
		cancelEditingTodo(todo) {
			todo.title = todo.cachedTitle;
			delete todo.cachedTitle;
			delete todo.editing;
		},

		/**
		 * Toggle between completed or active if you click on mark all button
		 */
		toggleChecked() {
			let allCompleted = this.allCompleted;
			this.todos.forEach(todo => todo.completed = !allCompleted);
		}

	}
}
