import Link from 'next/link';
import { useState } from 'react';
import { getSortedFilmsData } from '../utils/films';

export async function getStaticProps() {
  const sortedFilmsData = await getSortedFilmsData();

  return {
    props: {
      sortedFilmsData,
    },
  }
}


const Home = ({ sortedFilmsData }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = event => {
    setSearchQuery(event.target.value.toLowerCase());
  }

  const films = sortedFilmsData.filter(
    ({ properties }) => {
      return properties.title.toLowerCase().includes(searchQuery);
  }).map(
    ({ properties, uid }) => {
      return (
        <article key={uid}>
            <Link href={`/${uid}`}>
              <a>
                <h2>{properties.title}</h2>
              </a>
            </Link>
          </article>
      );
    }
  );

  return (
    <main>
      <h1>Star Wars Films</h1>
      <input
        type="search"
        placeholder="Search Star Wars films..."
        value={searchQuery}
        onChange={handleSearchQuery}
      ></input>
      {films}
    </main>
  )
}

export default Home;


