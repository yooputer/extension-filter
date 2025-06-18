import {Request, Response} from "express";

/**
 * Loads all posts from the database.
 */
export default async function GetTestAction(request: Request, response: Response) {

    // return loaded posts
    response.send("hello~");
}