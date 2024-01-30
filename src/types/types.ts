export interface ICharacterCore {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    avatar: string;
}

export interface ICharacter extends ICharacterCore {
    origin: ILocation;
    location: ILocation;
    episodes: IEpisode[];
}

export interface ICharacters extends ICharacterCore {
    image: string;
}

export interface ILocation {
    id: number;
    name: string;
    type: string;
    noOfResidents: number;
    dimension: string;
}

export interface IResident {
    id: number;
}

export interface ILocationWithResidents extends ILocation {
    residents: IResident[];
}


export interface ICharacterImageAndLocation extends ICharacter {
    image: string;
    episode: IEpisodeWithCharacters[];
    location: ILocationWithResidents;
}

export interface IEpisode {
    id: number;
    name: string;
    airDate: string;
    noOfCharacters: number;
    episode: string;
}

export interface IEpisodeWithCharacters extends IEpisode {
    characters: ICharacter[];
}