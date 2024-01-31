import Image from "next/image";
import {ICharacters} from '@/types/types'
import Link from "next/link";
import styles from './page.module.scss'

export default async function Home() {
    const response =  await fetch('http://localhost:3000/api/characters')
    const { characters } = await response.json();
    const mortys = characters.results
    return (
        <>
            <div className="md:relative">
                <h2 className="text-4xl flex justify-center font-bold h-60 bg-slate-100 pt-10">Rick and Morty</h2>
                <div className="flex flex-wrap justify-center md:absolute md:top-40">
                    {mortys.map((morty: ICharacters) => (
                        <div className={`m-4 ${styles.HomeCharacterCard}`} key={morty.id}>
                            <div className="card">
                                <div className="card-body">
                                    <Image src={morty.image} alt={morty.name} width={150} height={150} />
                                    <h5 className="card-title truncate">Name: {morty.name}</h5>
                                    <p className="card-text">Gender: {morty.gender}</p>
                                    <p className="card-text mb-2">Species: {morty.species}</p>
                                    <Link href={`/morty/${morty.id}`} className="bg-gray-300 hover:bg-gray-400 p-2 block w-full text-center">
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
