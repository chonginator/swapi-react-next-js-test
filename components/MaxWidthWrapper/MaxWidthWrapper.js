import styles from './MaxWidthWrapper.module.scss';

const MaxWidthWrapper = ({ children }) => {
    return <div className={styles.wrapper}>{children}</div>
}

export default MaxWidthWrapper;