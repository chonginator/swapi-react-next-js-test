import { useState } from 'react';
import Tooltip from '../components/Tooltip';

const Character = ({
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
        <div>
            <p>Birth Year: {birthYear}</p>
            <p>Gender: {gender}</p>
            <p>Eye Colour: {eyeColour}</p>
            <p>Hair Colour: {hairColour}</p>
        </div>
    );

    return (
        <article key={uid}>
            <Tooltip content={tooltipContent}>
                <h3>{name}</h3>
            </Tooltip>
        </article>
    )
}

export default Character;