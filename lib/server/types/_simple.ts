export interface IImageDTO {
    height: number;
    url: string;
    width: number;
}

export interface IItemArtistDTO {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}
