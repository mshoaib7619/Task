import { DBConnection } from './../config/db';
import { Request, Response } from "express";
import { User } from "../entities/User";
import {encryptPassword,decryptPassword} from "../helpers/auth";
import { RedisClient } from '../config/redis';
import jwt from "jsonwebtoken";

const JWT_SECRET = "MyAPP@";
export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const userRepository = DBConnection.getRepository(User);
    const user = await userRepository.findOne({ where: { username } });

    if (user) {
      res.status(200).send("User Already Exist");
      return; 
    }

    const hashpassword =await encryptPassword(password) 
    const newUser = userRepository.create({ username, password:hashpassword });
    await userRepository.save(newUser);

    res.status(201).send("Signup successful");
  } catch (error) {
    console.error("Error signing up:", error); 
    res.status(500).send("Error signing up");
  }
};

export const login = async (req: Request , res: Response) => {
    try {
        const { username, password } = req.body
        const userRepository = DBConnection.getRepository(User)

        const user = await userRepository.findOne({where : {username} })
        if (!user  || !(await decryptPassword(password,user.password))) {
            res.status(200).send("Invalid Credentials.")
            return;
        }

        const token =jwt.sign({id:user.id},JWT_SECRET)
        await RedisClient.setex(`session:${token}`,3600,JSON.stringify(user))

        res.status(200).send({message:"Login Successfully",token});
    } catch (error) {
        console.error("Error login:", error); 
        res.status(500).send("Error login");
    }
}


export const logout = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        res.status(400).send({message:"Token required"})
    }
    try {
        const session = await RedisClient.del(`session:${token}`);
        if(!session){
            res.status(401).send({message:"Session already expire"})
            return;
        }
        res.status(200).send({message:"Logout Successfully"})
    } catch (error) {
        res.status(500).send({message:"Server error"});
    }

}


export const sessionVerify = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(400).send({message: "token required"})
    }
    try {

        const session = await RedisClient.get(`session:${token}`);
        if (!session) {
            res.status(401).send({message:"Invaild Session"})
            return
        }
        res.status(200).send({message:"Valid Session"})
    } catch (error) {
        res.status(500).send({message:error})
    }
}
