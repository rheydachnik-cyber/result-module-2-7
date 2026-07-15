import { FRESH_TASK_ID } from '../constants';
export const insertTaskIntoList = (tasks, newTask) => {
	const taskToAdd = newTask || {
		id: FRESH_TASK_ID,
		title: '',
		completed: false,
		isEditing: true,
	};
	return [taskToAdd, ...tasks];
};