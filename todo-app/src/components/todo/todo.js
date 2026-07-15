import { Button } from '../button/button';
import styles from './todo.module.css';
export const TaskItem = ({
	title,
	completed,
	isEditing,
	onEditRequest,
	onTitleUpdate,
	onStatusChange,
	onSaveRequest,
	onDeleteRequest,
}) => {
	return (
		<div className={styles.taskContainer}>
			<input
				className={styles.statusCheckbox}
				type="checkbox"
				checked={completed}
				onChange={({ target }) => onStatusChange(target.checked)}
			/>
			<div className={styles.taskTitle}>
				{isEditing ? (
					<input
						className={styles.editInput}
						type="text"
						value={title}
						onChange={({ target }) => onTitleUpdate(target.value)}
						autoFocus
					/>
				) : (
					<span className={styles.titleText} onClick={onEditRequest}>
						{title}
					</span>
				)}
			</div>
			<div className={styles.actionArea}>
				{isEditing ? (
					<Button clickHandler={onSaveRequest}>💾</Button>
				) : (
					<Button clickHandler={onDeleteRequest}>🗑️</Button>
				)}
			</div>
		</div>
	);
};
