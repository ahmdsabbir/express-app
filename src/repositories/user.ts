import { AppDataSource } from "@/database/DataSource";
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

export async function allUsers() {
    const users = await AppDataSource.getRepository(User)
        .find({
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
                updatedAt: true
            }
        })
    return users;
}

export async function createUser(username: string, password: string, email: string, role: string ='USER') {
    const userRepository = AppDataSource.getRepository(User)
    const user = new User()
    user.username = username;
    user.password = password;
    user.isVerified = true;
    user.email = email;
    user.role = role;
    await userRepository.save(user)
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