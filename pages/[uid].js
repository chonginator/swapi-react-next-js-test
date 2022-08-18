import styles from '../styles/[uid].module.scss';
import Link from 'next/link';
import { getAllFilmIds, getFilmData } from '../utils/films';
import { getResources } from '../utils/resources';
import Button from '../components/Button';
import Character from '../components/Character';

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
  // const planetsData = await getResources(filmData.properties.planets);
  // const speciesData = await getResources(filmData.properties.species);
  // const starshipsData = await getResources(filmData.properties.starships);
  // const vehiclesData = await getResources(filmData.properties.vehicles);

  return {
    props: {
      filmData,
      charactersData,
      // planetsData,
      // speciesData,
      // starshipsData,
      // vehiclesData,
    },
  }
}

const FilmPage = ({
  filmData,
  charactersData,
  // planetsData,
  // speciesData,
  // starshipsData,
  // vehiclesData,
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
        return <Character uid={uid} data={properties} /> 
      } 
    )

    return (
      <>
        <header>
          <Button>
            <Link href="/">[Home]</Link>
          </Button>
        </header>

        <main>
          <h1 className={styles.title}>
            Star Wars Episode {romans.romanize(episodeId)}:<br/>
            {title}
          </h1>
          <p>Director: {director}</p>
          <p>Producer: {producer}</p>
          <p>Release date: {releaseDate}</p>

          <section>
            <h2>Characters</h2>
            <p>{characters.length} characters</p>
            <div>
              {characters}
            </div>
          </section>

          <section>
            <h2>Planets</h2>
            <p>{planets.length} planets</p>
          </section>

          <section>
            <h2>Species</h2>
            <p>{species.length} species</p>
          </section>

          <section>
            <h2>Starships</h2>
            <p>{starships.length} starships</p>
          </section>

          <section>
            <h2>Vehicles</h2>
            <p>{vehicles.length} vehicles</p>
          </section>
        </main>
      </>
    );
}

export default FilmPage;