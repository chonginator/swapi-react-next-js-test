import styles from './Button.module.scss';

const Button = ({
    children, ...delegated
}) => {
    return (
        <button
            className={styles.button}
            {...delegated}
        >
            {children}
        </button>
    )
}

export default Button;