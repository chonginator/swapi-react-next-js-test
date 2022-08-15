import { getAllFilmIds, getFilmData } from "../utils/films";

export async function getStaticPaths() {
  return {
    paths: await getAllFilmIds(),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const filmData = await getFilmData(params.uid);

  return {
    props: {
      filmData,
    },
  }
}

const FilmPage = ({ filmData }) => {
    return (
      <main>
        <h1>Star Wars: {filmData.properties.title}</h1>
      </main>
    )
}

export default FilmPage;