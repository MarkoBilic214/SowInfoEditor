import React from 'react';
import styles from './head.module.css'

const HeadMark = () => {
    return (
    <div className={styles.headContainer}>
        <img src="pig.svg" alt="piggy"/>
        <nav>
            <ul>
                <li>
                    <a href="#file-info">Insert file information</a>
                </li>
                <li>
                    <a href="#Insert-info">Insert information</a>
                </li>
                <li>
                    <a href="#export-info">export information</a>
                </li>
            </ul>
        </nav>
      
    </div>
  );
}

export default HeadMark;
