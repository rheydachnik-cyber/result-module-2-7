import { Button } from '../button/button';
import { Search, Sorting } from './components';
import { useTodo } from '../../context';
import styles from './control-panel.module.css';

export const Controls = ({ onAddTask, onFilterChange, onSortToggle }) => {
  const { filterText, sortAlphabetically } = useTodo();

  return (
    <div className={styles.controlsContainer}>
      <Search onFilter={onFilterChange} initialValue={filterText} />
      <Sorting onToggle={onSortToggle} initialValue={sortAlphabetically} />
      <Button clickHandler={onAddTask}>+</Button>
    </div>
  );
};
