import { gql }  from '@apollo/client';
import { getClient } from '@/lib/client'
import { NextResponse } from 'next/server';

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

export async function GET() {
  try {
    const { data, loading } = await getClient().query({ query });
    if (loading) {
      return new NextResponse(JSON.stringify({ loading: true }));
    }
    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
    });
  }
}
