import Link from 'next/link';
import { useState, useEffect } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [favouriteFilmsIds, setFavouriteFilmsIds] = useState([]);

  // localStorage is not defined on the server-side so retrieve favourites in effect
  useEffect(() => {
    if (localStorage.hasOwnProperty('favouriteFilmsIds')) {
      setFavouriteFilmsIds(
        JSON.parse(localStorage.getItem('favouriteFilmsIds'))
      );
    }
  }, []);

  const handleSearchQuery = event => {
    setSearchQuery(event.target.value);
  };

  const toggleFavourite = uid => {
    setFavouriteFilmsIds(prevFavouriteFilmsIds => {
      // Unfavourite film
      let newFavouriteFilmsIds = prevFavouriteFilmsIds.filter(id => id !== uid);
      
      // Favourite film
      if (newFavouriteFilmsIds.length === prevFavouriteFilmsIds.length) {
        newFavouriteFilmsIds.push(uid);
      }
      
      localStorage.setItem('favouriteFilmsIds', JSON.stringify(newFavouriteFilmsIds));
      return newFavouriteFilmsIds;
    });
  };

  const films = sortedFilmsData.filter(
    // Only show films that match the search query
    ({ properties }) => {
      return properties.title.toLowerCase().includes(searchQuery.toLowerCase());
  }).sort(
    // Show favourited films at the top
    (filmA, filmB) => {
      const filmAFavourited = favouriteFilmsIds.includes(filmA.uid);
      const filmBFavourited = favouriteFilmsIds.includes(filmB.uid);

      if (!filmAFavourited && filmBFavourited) {
        return 1;
      } else if (filmAFavourited && !filmBFavourited) {
        return -1;
      }
    }    
  ).map(
    ({ properties, uid }) => {
      return (
        <article key={uid}>
            <Link href={`/${uid}`}>
              <a>
                <h2>{properties.title}</h2>
              </a>
            </Link>
            <button onClick={() => toggleFavourite(uid)}>
              {favouriteFilmsIds.includes(uid) ? 'Unfavourite' : 'Favourite'}
            </button>
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
  );
}

export default Home;