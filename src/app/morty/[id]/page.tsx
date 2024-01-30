import { ICharacterImageAndLocation } from "@/types/types";
import { headers } from 'next/headers';
import Link from "next/link";
import Image from "next/image";

export default async function Morty() {
  const headersList = headers()
  const fullUrl = headersList.get('referer') || "";
  const id = fullUrl.split("/").pop();

  const response =  await fetch(`http://localhost:3000/api/character/${id}`)
  const data = await response.json();
  const { loading } = data;
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-4xl">Loading...</h2>
      </div>
    )
  }
  const character: ICharacterImageAndLocation = data.character;
  const {episode} = character
  return (
    <>
      <div className="row w-full h-full bg-slate-100 p-5 flex flex-col h-600">
        <div className="mb-10">
          <h2 className="mb-2 text-4xl">Rick and Morty</h2>
          <Link href="/">
            &#8592; Back to character listing
          </Link>
        </div>
        <div className="md:flex">
          <Image src={character.image} alt={character.name} width={200} height={200} className="rounded-full" />
          <div className="ms-5 mt-5">
            <h2 className="mb-2 text-4xl">{character.name}</h2>
            <p>Status: {character?.status}</p>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="mb-10">
          <h3 className="text-3xl bold">
            Location Details:
          </h3>
          <p>Name: {character.location.name}</p>
          <p>Type: {character.location.type}</p>
          <p>Dimension: {character.location.dimension}</p>
          <p>No. of Residents: {character.location.residents.length}</p>
        </div>
        <div>
          <h3 className="text-3xl bold mb-3">
            Episodes {episode.length}:
          </h3>
          <p>First appearance: {episode[0].name} {episode[0].episode}</p>
          <p>First appearance: air date: {episode[0].airDate}</p>
          <p>First appearance character count: {episode[0].characters.length}</p>
          <p>Last appearance: {episode[episode.length -1].name} {episode[episode.length -1].episode}</p>
          <p>Last appearance air date: {episode[episode.length -1].airDate}</p>
          <p>Last appearance character count: {episode[0].characters.length}</p>
        </div>
      </div>
    </>
  )

}