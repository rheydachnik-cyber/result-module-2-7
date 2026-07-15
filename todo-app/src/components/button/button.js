import styles from './button.module.css';
export const Button = ({ children, clickHandler }) => {
	return (
		<button className={styles.clickable} onClick={clickHandler}>
			{children}
		</button>
	);
};
