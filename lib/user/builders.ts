import { UserProfileDTO, UserProfile } from './types';

export const buildUserProfile = (data: UserProfileDTO): UserProfile => ({
    country: data.country,
    display_name: data.display_name,
    followers: data.followers.total,
    id: data.id,
    image: data.images[0].url,
    product: data.product,
    type: data.type,
});
