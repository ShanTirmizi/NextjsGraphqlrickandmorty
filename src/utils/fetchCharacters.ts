import { gql }  from '@apollo/client';
import { getClient } from '@/lib/client'

const query = gql`
query {
  characters(filter: { name: "Morty", status: "alive" }) {
    results {
      id
      name
      status
      origin {
        name
      }
      location {
        name
      }
      episode {
        name
      }
      image
      species
      gender
    }
  }
}
`;

export async function fetchCharacters() {
  try {
    const { data } = await getClient().query({ query });
    return { characters: data.characters.results };
  } catch (error) {
    console.error(error);
    return { error}
  }
}
