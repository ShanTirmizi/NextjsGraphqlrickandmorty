import { gql }  from '@apollo/client';
import { getClient } from '@/lib/client'
import { NextResponse } from 'next/server';

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

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  try {
    const { data } = await getClient().query({ query, variables: { id } });
    return new NextResponse(JSON.stringify({character: data.character}));
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error }),
      {
        status: 500,
      }
    );
  }

}
