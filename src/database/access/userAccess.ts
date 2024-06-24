import { InferCreationAttributes, InferAttributes } from 'sequelize';
import { User } from '../models/user';

export const createUnique = async (payload: InferCreationAttributes<User>): Promise<InferAttributes<User>> => {
    if (await findOneByName(payload.name) || await findOneByEmail(payload.email)) {
        throw new Error('A user with that name or email already exists');
    }
    const user = await User.create(payload);
    return user;
}

export const findOneByName = async (userName: string): Promise<InferAttributes<User> | null> => {
    // SQL injection vulnerability?
    const user = await User.findOne({where: {name: userName}});
    return user;
}

export const findOneByEmail = async (userEmail: string): Promise<InferAttributes<User> | null> => {
    // SQL injection vulnerability?
    const user = await User.findOne({where: {email: userEmail}});
    return user;
}

export const update = async (id: number, payload: Partial<InferAttributes<User>>): Promise<InferAttributes<User>> => {
    const user = await User.findByPk(id)
    if (!user) {
        throw new Error('User not found')
    }
    const updatedUser = await user.update(payload)
    return updatedUser
}

export const getById = async (id: number): Promise<InferAttributes<User>> => {
    const user = await User.findByPk(id)
    if (!user) {
        throw new Error('User not found')
    }
    return user
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedUserCount = await User.destroy({
        where: {id}
    })
    return !!deletedUserCount
}

export const getAll = async (): Promise<InferAttributes<User>[]> => {
    return User.findAll();
}