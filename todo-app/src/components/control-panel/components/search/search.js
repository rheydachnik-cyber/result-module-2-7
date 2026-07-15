import { useRef, useState } from 'react';
import { delay } from './utils';
import styles from './search.module.css';
export const Search = ({ onFilter }) => {
	const [inputValue, setInputValue] = useState('');
	const delayedFilter = useRef(delay(onFilter, 2000)).current;
	const handleInputChange = ({ target }) => {
		setInputValue(target.value);
		delayedFilter(target.value);
	};
	const handleFormSubmit = (event) => {
		event.preventDefault();
		onFilter(inputValue);
	};
	return (
		<form className={styles.filterForm} onSubmit={handleFormSubmit}>
			<input
				className={styles.filterInput}
				type="text"
				value={inputValue}
				placeholder="Найти задачу..."
				onChange={handleInputChange}
			/>
		</form>
	);
};
