import { getSortedFilmsData } from "../utils/getSortedFilmsData";

export async function getStaticProps() {
  const sortedFilmsData = await getSortedFilmsData();

  return {
    props: {
      sortedFilmsData,
    },
  }
}

const Home = ({ sortedFilmsData }) => {

  const films = sortedFilmsData.map(
    ({ properties, uid }) => {
      return (
        <article key={uid}>
          <h2>Star Wars: {properties.title}</h2>
        </article>
      )
    }
  )

  return (
    <main>
      <h1>Star Wars Films</h1>
      {films}
    </main>
  )
}

export default Home;


