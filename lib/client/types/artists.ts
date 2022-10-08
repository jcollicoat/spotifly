export interface IArtist {
    followers: number;
    genres: string[];
    id: string;
    image: string;
    key: string;
    name: string;
    popularity: number;
    type: string;
}

export interface ITopArtists {
    artists: IArtist[];
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}
