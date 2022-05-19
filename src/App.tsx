import React, { useEffect, useState } from 'react';
import './App.scss';
import DogCard from './DogCard/DogCard';
import {
  fetchBreedImage,
  fetchBreedSubtypeImage,
  fetchDogs,
} from './services/dogs.service';

interface DogListItem {
  name: string;
  imageUrl: string;
}

const App: React.FC = () => {
  const [dogs, setDogs] = useState<DogListItem[]>([]);
  const [showError, setShowError] = useState<boolean>(false);

  const convertDogsResponseToDogArray = async (
    dogsResponse: Record<string, string[]>
  ) => {
    const dogsList = Object.entries(dogsResponse).reduce<
      Promise<DogListItem>[]
    >((acc, [breed, subtypes]) => {
      if (subtypes.length === 0) {
        const breedPromise = new Promise<DogListItem>(async (resolve) => {
          try {
            const imageUrl = await fetchBreedImage(breed);
            resolve({ name: breed, imageUrl });
          } catch {
            resolve({ name: breed, imageUrl: '' });
          }
        });
        return [...acc, breedPromise];
      }
      const allSubtypes = subtypes.map((subtype) => {
        return new Promise<DogListItem>(async (resolve) => {
          try {
            const imageUrl = await fetchBreedSubtypeImage(breed, subtype);
            resolve({ name: `${subtype} ${breed}`, imageUrl });
          } catch {
            resolve({ name: `${subtype} ${breed}`, imageUrl: '' });
          }
        });
      });
      return [...acc, ...allSubtypes];
    }, []);
    return Promise.all(dogsList);
  };

  useEffect(() => {
    fetchDogs()
      .then(async (response) => {
        const dogList = await convertDogsResponseToDogArray(response);
        setDogs(dogList);
      })
      .catch(() => {
        setShowError(true);
      });
  }, []);

  return (
    <div>
      <header className="header">
        <h1 className="margin-top-0 header-title">Dog List</h1>
        <nav className="navigation-bar">
          <ul>
            <li className="nav-item">
              <a href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a href="#about">About</a>
            </li>
            <li className="nav-item">
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
        </nav>
        <div className="flex-row flex-wrap">
          <div className="page-description margin-right-4">
            <h2 className="description-title">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Gravida cum sociis natoque penatibus. Condimentum id venenatis a
              condimentum vitae sapien. Praesent elementum facilisis leo vel.
              Malesuada fames ac turpis egestas maecenas pharetra convallis
              posuere morbi. Mauris a diam maecenas sed enim. Neque egestas
              congue quisque egestas diam in. Sed adipiscing diam donec
              adipiscing tristique risus nec feugiat in. Nisl rhoncus mattis
              rhoncus urna.
            </p>
          </div>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/iXCESZ1Wn7Q"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </header>
      <main className="padding-4">
        <h2 className="text-center margin-top-0">Dog Breeds</h2>
        <div className="flex-row flex-wrap dog-card-list align-items-start">
          {showError ? (
            <p>
              Oops, it looks like we can't show the dogs right now. Please check
              back again later!
            </p>
          ) : (
            dogs.map(({ imageUrl, name }) => {
              return (
                <DogCard key={name} imageUrl={imageUrl} name={name}></DogCard>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
