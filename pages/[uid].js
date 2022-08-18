import styles from '../styles/[uid].module.scss';
import Link from 'next/link';
import { getAllFilmIds, getFilmData } from '../utils/films';
import { getResources } from '../utils/resources';
import Button from '../components/Button';
import CharacterCard from '../components/CharacterCard';

const romans = require('romans');

export async function getStaticPaths() {
  return {
    paths: await getAllFilmIds(),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const filmData = await getFilmData(params.uid);
  const charactersData = await getResources(filmData.properties.characters);

  return {
    props: {
      filmData,
      charactersData,
    },
  }
}

const FilmPage = ({
  filmData,
  charactersData,
}) => {
    const {
      title,
      episode_id: episodeId,
      release_date: releaseDate,
      director,
      producer,
      planets,
      species,
      starships,
      vehicles
    } = filmData.properties;

    const characters = charactersData.map(
      ({ properties, uid }) => {
        return <CharacterCard key={uid} uid={uid} data={properties} /> 
      } 
    );

    return (
      <>
        <header>
          <Button>
            <Link href="/">[home]</Link>
          </Button>
        </header>

        <main className={styles.film}>
          <h1 className={styles.title}>
            Star Wars Episode {romans.romanize(episodeId)}:<br/>
            {title}
          </h1>

          <section className={styles.filmInfo}>
            <p>Director: {director}</p>
            <p>Producer: {producer}</p>
            <p>Release date: {releaseDate}</p>
          </section>

          <section>
            <h2>Characters <span>({characters.length})</span></h2>
            <div className={styles.characters}>
              {characters}
            </div>
          </section>

          <section>
            <h2>Planets <span>({planets.length})</span></h2>
          </section>

          <section>
            <h2>Species <span>({species.length})</span></h2>
          </section>

          <section>
            <h2>Starships <span>({starships.length})</span></h2>
          </section>

          <section>
            <h2>Vehicles <span>({vehicles.length})</span></h2>
          </section>
        </main>
      </>
    );
}

export default FilmPage;