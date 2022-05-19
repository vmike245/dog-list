import { FetchImageResponse, FetchDogsResponse } from './dogs.service.types';

export async function fetchDogs() {
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  const parsedResponse: FetchDogsResponse = await response.json();
  return parsedResponse.message;
}

export async function fetchBreedImage(breed: string) {
  const response = await fetch(
    `https://dog.ceo/api/breed/${breed}/images/random`
  );
  const parsedResponse: FetchImageResponse = await response.json();
  return parsedResponse.message;
}

export async function fetchBreedSubtypeImage(breed: string, subtype: string) {
  const response = await fetch(
    `https://dog.ceo/api/breed/${breed}/${subtype}/images/random`
  );
  const parsedResponse: FetchImageResponse = await response.json();
  return parsedResponse.message;
}
