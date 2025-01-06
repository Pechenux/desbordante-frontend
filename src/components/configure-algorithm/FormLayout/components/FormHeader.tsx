import React from 'react';
import styles from './FormHeader.module.scss';

export const FormHeader = () => (
  <>
    <h2 className={styles.title}>Configure Algorithm</h2>
    <h6 className={styles.description}>Select algorithm parameters</h6>
  </>
);
