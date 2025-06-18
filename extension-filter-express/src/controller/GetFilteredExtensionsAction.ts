import {Request, Response} from "express";
import {getManager} from "typeorm";
import FilteredExtension from "../entity/FilteredExtension";

/**
 * Loads all posts from the database.
 */
export default async function GetFilteredExtensionsAction(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const filteredExtensionRepository = getManager().getRepository(FilteredExtension);

    // load posts
    const filteredExtensions = await filteredExtensionRepository.find();

    // return loaded posts
    response.send(filteredExtensions);
}