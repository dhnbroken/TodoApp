import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGear, faQuestion, faBullhorn, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

const Header: React.FC = () => {
  return (
    <div className={cx('header')}>
      <button className={cx('todo__menu-btn')}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={cx('todo__menu')}>
        <div className={cx('todo__menu-logo')}>To do</div>
        <div className={cx('search')}>
          <div className={cx('search-icon')}><FontAwesomeIcon icon={faSearch} /></div>
          <input className={cx('search-input')}type="text" placeholder="Search" />
        </div>
        <div className={cx('todo__menu-icon')}>
          <ul className={cx('icon__list')}>
            <li className={cx('icon__list-item')}>
              <button><FontAwesomeIcon icon={faGear} /></button>
            </li>
            <li className={cx('icon__list-item')}>
              <button><FontAwesomeIcon icon={faQuestion} /></button>
            </li>
            <li className={cx('icon__list-item')}>
              <button><FontAwesomeIcon icon={faBullhorn} /></button>
            </li>
          </ul>
        </div>
      </div>
      <button className={cx('todo__menu-btn')}>
        <FontAwesomeIcon icon={faCircleUser} />
      </button>
    </div>
  );
};

export default Header;
