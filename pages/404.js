import styles from '../styles/404.module.scss';
import Image from 'next/image';

const Custom404Page = () => {
    return (
        <main className={styles.wrapper}>
            <h1 className={styles.title}>404 — Page Not Found</h1>
            <Image
                src="/images/perhaps-the-archives-are-incomplete.gif"
                alt="Impossible. Perhaps the archives are incomplete."
                width={640}
                height={320}
            />
        </main>
    );
}

export default Custom404Page;