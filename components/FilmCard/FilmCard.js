import styles from './FilmCard.module.scss';
import Link from 'next/link';
import Button from '../Button';

const romans = require('romans');

const FilmCard = ({
    uid,
    data,
    isFavourited,
    toggleFavourite
}) => {
    return (
        <article
            key={uid}
            className={`${styles.card} ${isFavourited ? styles.cardFavourited : ''}`}
        >
            <div className={styles.card__header}>
                <span className={styles.episode}>
                    {romans.romanize(data.episode_id)}. 
                </span>

                <Button onClick={toggleFavourite}>
                    {isFavourited ? '[forget]' : '[favourite]'}
                </Button>
            </div>
            <div className={styles.card__body}>
                <Link href={`/${uid}`} className={styles.link}>
                    <a>
                        <h2>
                            {data.title}
                        </h2>
                    </a>
                </Link>
                <p className={styles.subtitle}>{data.title}</p>
            </div>
        </article>
    );
}

export default FilmCard;