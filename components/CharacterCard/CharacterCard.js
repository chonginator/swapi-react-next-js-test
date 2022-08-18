import styles from './CharacterCard.module.scss';
import Tooltip from '../Tooltip';

const CharacterCard = ({
    uid,
    data,
}) => {
    const {
        name,
        birth_year: birthYear,
        eye_color: eyeColour,
        gender,
        hair_color: hairColour,
    } = data;

    const tooltipContent = (
        <div className={styles.tooltip}>
            <p>Name: {name}</p>
            <p className={styles.aurebesh}>{name}</p>
            <p>Birth Year: {birthYear}</p>
            <p>Gender: {gender}</p>
            <p>Eye Colour: {eyeColour}</p>
            <p>Hair Colour: {hairColour}</p>
        </div>
    );

    return (
        <div key={uid} className={styles.card}>
            <Tooltip content={tooltipContent} placement="left">
                <p>{name}</p>
            </Tooltip>
        </div>
    );
}

export default CharacterCard;