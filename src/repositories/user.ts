import { AppDataSource } from "@/database/DataSource";
import Credential from "@/database/entities/credentials";
import User from "@/database/entities/users";


export async function getUser(id:string) {
    return await AppDataSource.getRepository(User)
        .findOne({
            where: {id: id},
            select: {
                id: true,
                username: true,
                email: true,
                role: true
            }
        })
        .then((user) => {
            return user ? user : null
        })
        .catch((err) => {
            console.error(err)
            return null
        })
}

export async function allUsers(page: number = 1, pageSize: number = 10) {
    const users = await AppDataSource.getRepository(User)
        .find({
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                status: true
            },
            skip: (page -1) * pageSize,
            take: pageSize
        })
    return users;
}

export const rel = async () => {
    return await AppDataSource
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.credential', 'credential')
        .addSelect('COUNT(credential.id)', 'credsCount')
        .groupBy('user.id')
        .getRawMany()
}

export async function createUser(username: string, password: string, email: string, role: string ='USER') {
    const userRepository = AppDataSource.getRepository(User)
    const user = new User()
    user.username = username;
    user.isVerified = true;
    user.email = email;
    user.role = role;

    const credential = new Credential();
    credential.password = password;
    user.credential = credential;

    await userRepository.save(user)
}

export const createUserFromAdmin = async (username: string, password: string, email: string, role: string, status: string, isVerified: boolean = false) => {
    const userRepository = AppDataSource.getRepository(User)
    const user = new User();
    user.username = username;
    user.email = email;
    user.role = role;
    user.status = status;
    user.isVerified = isVerified;

    const credential = new Credential();
    credential.password = password;
    user.credential = credential;

    await userRepository.save(user);
}

export const removeUser = async (id: string) => {
    const user = await AppDataSource.getRepository(User)
            .findOne({
                where: {
                    id: id
                }
            })
    if (user) {
        return await AppDataSource.getRepository(User)
                .remove(user)
    }
    return null;
}

export const loginUser = async (email: string, password: string) => {
    const user = await AppDataSource
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.credential', 'credential')
        .where('user.email = :email', {email: email})
        .getOne()
    
    return ( user == null || user.credential.validatePassword(password) == false ) ? {state: false, user: null} : {state: true, user: user}
};


export const setAdmin = async (id: string) => {
    return await AppDataSource
        .createQueryBuilder()
        .update(User)
        .set({
            role: 'ADMIN'
        })
        .where('id = :id', {id: id})
        .execute()
}