import { v4 as uuid } from 'uuid';

export const uuidv4 = (prefix: string) => {
    return prefix + '-' + uuid();
};