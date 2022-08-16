import Link from 'next/link';
import { getAllFilmIds, getFilmData } from '../utils/films';
import { getResources } from '../utils/resources';

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

const FilmPage = ({ filmData, charactersData }) => {
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
        const {
          name,
          birth_year: birthYear,
          eye_color: eyeColour,
          gender,
          hair_color: hairColour,
        } = properties

        return (
          <article key={uid}>
            <h3>{name}</h3>
            <p>Birth Year: {birthYear}</p>
            <p>Gender: {gender}</p>
            <p>Eye Colour: {eyeColour}</p>
            <p>Hair Colour: {hairColour}</p>
          </article>
        )
      } 
    )

    return (
      <>
        <header>
          <Link href="/">Home</Link>
        </header>

        <main>
          <h1>Star Wars: Episode {episodeId} — {title}</h1>
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