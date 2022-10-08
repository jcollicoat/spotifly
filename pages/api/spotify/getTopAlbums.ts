/* eslint-disable @typescript-eslint/naming-convention */
// import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IAlbumAPI } from './getAlbum';
// import { getSession } from 'next-auth/react';
// import { ITopAlbumsDTO, ITopAlbums } from '../../../lib/client/spotify-types';
// import { buildAlbums } from './getAlbum';

// const endpoint = 'https://api.spotify.com/v1/me/top/albums';

interface ITopAlbumsAPI {
    href: string;
    items: IAlbumAPI[];
    limit: number;
    next?: string;
    offset: number;
    previous?: string;
    total: number;
}

// const builtTopAlbums = async (data: ITopAlbumsDTO): Promise<ITopAlbums> => ({
//     items: await buildAlbums(data.items),
// });

// eslint-disable-next-line require-await
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(400).send('API in development.');

    // const session = await getSession({ req });

    // if (!session) {
    //     res.status(401).send(
    //         'No session data found. User is likely not logged in.'
    //     );
    // } else {
    //     const access_token = session.access_token;

    //     const response = await axios.get(endpoint, {
    //         headers: {
    //             Authorization: `Bearer ${access_token}`,
    //         },
    //     });
    //     const built = await builtTopAlbums(response.data);
    //     console.log(built);

    //     res.status(response.status).json(built);
    // }
};

export default handler;
