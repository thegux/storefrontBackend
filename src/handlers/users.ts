import express, { Request, Response } from 'express'
import UserTable, { User } from '../models/users'
import jwt from "jsonwebtoken"

const store = new UserTable();

export const create = async(req: Request, res: Response) => {
    const user : User = {
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.firstName || "",
        last_name: req.body.lastName || ""
    }
    
    const jwtSecret = process.env.BCRYPT_PASSWORD || "";

    try {
        const newUser = await store.create(user);
        const token = jwt.sign({user: newUser}, jwtSecret);
        res.json(token);

    } catch (error) {
        res.status(400);
        res.json({error, user});
    }
}


export const authenticate = async(req: Request, res: Response) => {
    const user : User = {
        username: req.body.username,
        password: req.body.password
    }

    const jwtSecret = process.env.BCRYPT_PASSWORD || "";

    try {
        const authenticated_user = store.authenticate(user.username, user.password);
        const token = jwt.sign({user: authenticated_user}, jwtSecret);
        res.json(token);

    } catch (error){
        res.status(400);
        res.json({error});
    }
}
