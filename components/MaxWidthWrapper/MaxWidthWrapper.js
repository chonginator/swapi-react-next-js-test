import styles from './MaxWidthWrapper.module.scss';

const MaxWidthWrapper = ({ children }) => 
    <div className={styles.wrapper}>{children}</div>

export default MaxWidthWrapper;