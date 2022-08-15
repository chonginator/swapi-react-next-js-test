import Link from 'next/link';
import { getSortedFilmsData } from "../utils/films";

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
            <Link href={`/${uid}`}>
              <a>
                <h2>Star Wars: {properties.title}</h2>
              </a>
            </Link>
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


