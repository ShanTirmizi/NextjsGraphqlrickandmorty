import Image from "next/image";
import {ICharacters} from '@/types/types'
import Link from "next/link";
import styles from './page.module.scss'
import { fetchCharacters } from '@/utils/fetchCharacters';

interface FetchCharactersResponse {
    characters?: ICharacters[];
    error?: Error;
}

export default async function Home() {
    const data = await fetchCharacters() as FetchCharactersResponse;
    const { error, characters } = data;
    if (error) {
        return (
          <div className="flex justify-center items-center h-screen">
            <h2 className="text-4xl">{(error as Error).message}</h2>
          </div>
        );
    }
    if(!characters) (
        <div className="flex justify-center items-center h-screen">
            <h2 className="text-4xl">Characters not found</h2>
        </div>
    );
    return (
        <>
            <div className="md:relative">
                <h2 className="text-4xl flex justify-center font-bold h-60 bg-slate-100 pt-10">Rick and Morty</h2>
                <div className="flex flex-wrap justify-center md:absolute md:top-40">
                    {characters?.map((character: ICharacters) => (
                        <div className={`m-4 ${styles.HomeCharacterCard}`} key={character.id}>
                            <div className="card">
                                <div className="card-body">
                                    <Image src={character.image} alt={character.name} width={150} height={150} />
                                    <h5 className="card-title truncate">Name: {character.name}</h5>
                                    <p className="card-text">Gender: {character.gender}</p>
                                    <p className="card-text mb-2">Species: {character.species}</p>
                                    <Link href={`/character/${character.id}`} className="bg-gray-300 hover:bg-gray-400 p-2 block w-full text-center">
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
