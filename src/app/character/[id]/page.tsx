interface IParams {
  params: {
    id: string
  }
}
import { ICharacterImageAndLocation } from "@/types/types";
import Link from "next/link";
import Image from "next/image";

async function getCharacter(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/character/${id}`);
    const data = await response.json();
    if (data.error) {
      return { error: data.error.message };
    }
    return { character: data.character as ICharacterImageAndLocation };
  } catch (error) {
    console.error("Fetching error:", error);
    return { error: 'An error occurred while fetching the character data.' };
  }
}

export default async function Page({params}: IParams) {
  const data = await getCharacter(params.id);
  const { error } = data;
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-4xl">{error}</h2>
      </div>
    );
  }
  if (!data.character) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-4xl">Character not found</h2>
      </div>
    );
  }
  const character: ICharacterImageAndLocation = data.character;
  const { episode } = character;
  return (
    <>
      <div className="row w-full bg-slate-100 p-5 flex flex-col h-600 md:relative h-full md:h-80">
        <div className="mb-10 text-center md:text-left">
          <h2 className="mb-2 text-4xl">Rick and Morty</h2>
          <Link href="/">
            &#8592; Back to character listing
          </Link>
        </div>
        <div className="flex flex-col items-center md:flex-row md:items-start md:absolute md:top-40">
          <Image src={character.image} alt={character.name} width={200} height={200} className="rounded-full" />
          <div className="ms-5 mt-5">
            <h2 className="mb-2 text-4xl">{character.name}</h2>
            <p>Status: {character.status}</p>
            <p>Origin: {character.origin.name}</p>
          </div>
        </div>
      </div>
      <div className="p-5 mt-10">
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
  );
}