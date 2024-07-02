import { faker } from '@faker-js/faker';
import { IUser } from '../../types/User_Interface';
import { createRandomAddress } from './Address_Seed';
import { createRandomSocialAuthInfos } from './SocialAuthInfos_Seed';
import { createRandomSellerInfos } from './SellerInfos_Seed.ts';
import { ObjectId } from 'mongodb';

export function createRandomUser(): IUser {
    const USERID = new ObjectId();
    const ROLES = getRandomRoles()
    return {
        _id: USERID,
        username: faker.internet.userName(),
        password: faker.internet.password(),
        is_vendor: ROLES.is_vendor,
        is_purchaser: ROLES.is_purchaser,
        is_admin: ROLES.is_vendor,
        full_name: faker.person.fullName(),
        phone_number: faker.phone.number(),
        email: faker.internet.email(),
        gender: faker.person.sex(),
        dBo: faker.date.birthdate(),
        social_auth_infos: createRandomSocialAuthInfos(),
        is_verify: faker.datatype.boolean(),
        address: [createRandomAddress(USERID)._id.toString()],
        sellerInfos: createRandomSellerInfos(),

    };
}

function getRandomRoles() {
    const roles = [
        { is_vendor: true, is_purchaser: false, is_admin: false },
        { is_vendor: false, is_purchaser: true, is_admin: false },
        { is_vendor: false, is_purchaser: false, is_admin: true },
    ];

    return roles[Math.floor(Math.random() * roles.length)];
}


export { createRandomAddress };

