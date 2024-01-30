import Image from "next/image";
import {ICharacters} from '@/types/types'
import Link from "next/link";

export default async function Home() {
    const response =  await fetch('http://localhost:3000/api/characters')
    const { characters } = await response.json();
    const mortys = characters.results
    return (
        <>
            <div className="p-5">
                <h2 className="text-4xl flex justify-center m-10">Rick and Morty</h2>
                <div className="flex flex-wrap justify-center">
                    {mortys.map((morty: ICharacters) => (
                        <div className="m-4 max-w-sm" key={morty.id}>
                            <div className="card">
                                <div className="card-body">
                                    <Image src={morty.image} alt={morty.name} width={150} height={150} />
                                    <h5 className="card-title truncate">{morty.name}</h5>
                                    <p className="card-text">{morty.gender}</p>
                                    <p className="card-text">{morty.species}</p>
                                    <Link href={`/morty/${morty.id}`}>
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
