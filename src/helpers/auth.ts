import bcrypt from "bcrypt";

const saltRound = 10;

export async function encryptPassword(password: string) {
    return bcrypt.hashSync(password,saltRound)

}

export async function decryptPassword(password: string, databasePassword: string) {
    return bcrypt.compareSync(password, databasePassword)
}
