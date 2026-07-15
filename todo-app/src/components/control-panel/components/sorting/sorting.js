import { useState } from 'react';
import { Button } from '../../../button/button';
import styles from './sorting.module.css';
export const Sorting = ({ onToggle }) => {
	const [active, setActive] = useState(false);
	const handleToggle = ({ target }) => {
		setActive(target.checked);
		onToggle(target.checked);
	};
	return (
		<Button>
			<input
				className={styles.toggleInput}
				id="sort-toggle"
				type="checkbox"
				checked={active}
				onChange={handleToggle}
			/>
			<label className={styles.toggleLabel} htmlFor="sort-toggle">
				A↓
			</label>
		</Button>
	);
};
