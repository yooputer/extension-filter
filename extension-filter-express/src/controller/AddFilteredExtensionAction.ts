import {Request, Response} from "express";
import {getManager} from "typeorm";
import FilteredExtension from "../entity/FilteredExtension";

/**
 * Loads all posts from the database.
 */
export default async function AddFilteredExtensionAction(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const filteredExtensionRepository = getManager().getRepository(FilteredExtension);

    let newFilteredExtension = new FilteredExtension();
    newFilteredExtension.name = 'jpg';

    // load posts
    await filteredExtensionRepository.save(newFilteredExtension);

    // return loaded posts
    response.send(newFilteredExtension);
}