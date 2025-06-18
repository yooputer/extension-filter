import {Request, Response} from "express";
import {getManager} from "typeorm";
import FilteredExtension from "../entity/FilteredExtension";

export default async function GetFilteredExtensionsAction(request: Request, response: Response) {
    const filteredExtensionRepository = getManager().getRepository(FilteredExtension);

    const filteredExtensions = await filteredExtensionRepository.find();

    response.send(filteredExtensions);
}