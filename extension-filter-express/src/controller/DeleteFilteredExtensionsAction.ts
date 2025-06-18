import {Request, Response} from "express";
import {getManager} from "typeorm";
import FilteredExtension from "../entity/FilteredExtension";
import {PostFilteredExtensionsRequestBody} from "../types/request/filtered-extensions";

export default async function DeleteFilteredExtensionsAction(request: Request, response: Response) {
    const requestBody: PostFilteredExtensionsRequestBody = request.body;
    const filteredExtensionRepository = getManager().getRepository(FilteredExtension);

    const extensionName = requestBody.name;
    // TODO: 확장자명 유효성검사

    await filteredExtensionRepository.delete({name: extensionName});

    response.send();
}