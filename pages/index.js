import styles from '../styles/Home.module.scss';
import { useState, useEffect } from 'react';
import { getSortedFilmsData } from '../utils/films';
import FilmCard from '../components/FilmCard';
import SearchBar from '../components/SearchBar';

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
  }

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
  }

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
        <FilmCard
          key={uid}
          uid={uid}
          data={properties}
          isFavourited={favouriteFilmsIds.includes(uid)}
          toggleFavourite={() => toggleFavourite(uid)}
        />
      );
    }
  );
    
  return (
    <main className={styles.home}>
      <h1 className={styles.title}>Star Wars Films</h1>
      <div>
        <SearchBar
          placeholder="Search your feelings..."
          value={searchQuery}
          onChange={handleSearchQuery}
        />
      </div>
      <div className={styles.films}>
        {films}
      </div>
    </main>
  );
}

export default Home;