export const updateTaskInList = (tasks, updatedData) =>
	tasks.map((task) =>
		task.id === updatedData.id
			? {
					...task,
					...updatedData,
			  }
			: task,
	);