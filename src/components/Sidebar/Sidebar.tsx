import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { GlobalContextProvider } from 'src/Context/GlobalContext';
import { TaskInfoAPI } from 'src/store/interface';

library.add(fas, far);

const cx = classNames.bind(styles);

const Sidebar: React.FC = () => {
  const { state } = useContext(GlobalContextProvider);
  const pending = state.jobs.filter((job: TaskInfoAPI) => !job.completed).length;
  return (
    <div className={cx('sidebar')}>
      <div className={cx('sidebar__content')}>
        <nav className={cx('sidebar__nav')}>
          <ul className={cx('sidebar__list')}>
            <li className={cx('sidebar__list-item')}>
              <FontAwesomeIcon icon={['far', 'sun']} />
              <span>My Day</span>
            </li>
            <li className={cx('sidebar__list-item')}>
              <FontAwesomeIcon icon={['far', 'star']} />
              <span>Important</span>
            </li>
            <li className={cx('sidebar__list-item')}>
              <FontAwesomeIcon icon={['far', 'calendar']} />
              <span>Planned</span>
            </li>
            <li className={cx('sidebar__list-item')}>
              <FontAwesomeIcon icon={['far', 'user']} />
              <span>Assigned to me</span>
            </li>
            <li className={cx('sidebar__list-item')}>
              <FontAwesomeIcon icon={['fas', 'house']} />
              <div className={cx('sidebar__task')}>
                <div>Task</div>
                <div className={cx('sidebar__task-count')}>{pending}</div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
