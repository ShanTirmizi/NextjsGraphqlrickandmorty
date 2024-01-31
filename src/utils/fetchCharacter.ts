import { gql }  from '@apollo/client';
import { getClient } from '@/lib/client'

const query = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      origin {
        name
      }
      location {
        name
        type
        dimension
        residents {
          id
        }
      }
      episode {
        id
        name
        episode
        airDate: air_date
        characters {
          id
        }
      }
      image
      species
      gender
    }
  }
`;

export async function fetchCharacter(id: string) {
  try {
    const { data } = await getClient().query({ query, variables: { id } });
    return { character: data.character };
  } catch (error) {
    console.error(error);
    return { error }
  }

}
