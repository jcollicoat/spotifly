import { v4 as uuidv4 } from 'uuid';

export const appendUUID = (id: string): string => {
    const uuid = uuidv4();
    return `${id}-${uuid}`;
};
