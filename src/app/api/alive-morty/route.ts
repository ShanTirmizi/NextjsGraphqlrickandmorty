import { gql }  from '@apollo/client';
import { getClient } from '@/lib/client'
import { NextResponse } from 'next/server';

export async function GET() {
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
        }
      }
    }
  `;

  try {
    const { data } = await getClient().query({ query });
    return NextResponse.json(data.characters.results);
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
    });
  }
}
