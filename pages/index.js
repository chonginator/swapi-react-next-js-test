import { baseURL } from '../constants';
import { useState, useEffect } from 'react';

const Home = () => {
  const [filmData, setFilmData] = useState([])

  // Fetch list of films from SWAPI
  useEffect(() => {
    fetch(baseURL)
      .then(res => res.json())
      .then(data => setFilmData(data.result))
      .catch(error => console.error(error))
  }, [])

  const films = filmData.map(
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


