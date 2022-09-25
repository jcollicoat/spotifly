import { v4 as uuidv4 } from 'uuid';

export const transformId = (id: string): string => {
    const uuid = uuidv4();
    return `${id}-${uuid}`;
};
