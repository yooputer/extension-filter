import {Request, Response} from "express";
import {PostFilteredExtensionsRequestBody} from "../types/request/filtered-extensions";
import {getManager, QueryFailedError} from "typeorm";
import FilteredExtension from "../entity/FilteredExtension";
import {validateExtensionName} from "../lib/extension";

export async function GetFilteredExtensionsAction(request: Request, response: Response) {
    const filteredExtensionRepository = getManager().getRepository(FilteredExtension);

    const filteredExtensions = await filteredExtensionRepository.find();

    response.status(200).send(filteredExtensions);
}

export async function PostFilteredExtensionsAction(request: Request, response: Response) {
    const requestBody: PostFilteredExtensionsRequestBody = request.body;
    const filteredExtensionRepository = getManager().getRepository(FilteredExtension);

    try {
        const extensionName = requestBody.name;
        validateExtensionName(extensionName);

        const newEntity = new FilteredExtension(extensionName);

        await filteredExtensionRepository.save(newEntity);
        response.send(newEntity);
    } catch (error) {
        let status = 500;

        if (error instanceof QueryFailedError) {
            const driverErrorMsg: string = error.driverError.message;
            if (driverErrorMsg && driverErrorMsg.startsWith('duplicate key')) {
                status = 400;
            }
        }

        console.log(error);
        response.status(status).json();
    }
}

export async function DeleteFilteredExtensionsAction(request: Request, response: Response) {
    const requestBody: PostFilteredExtensionsRequestBody = request.body;
    const filteredExtensionRepository = getManager().getRepository(FilteredExtension);

    const extensionName = requestBody.name;

    await filteredExtensionRepository.delete({name: extensionName});

    response.status(200).send();
}

export async function ResetFilteredExtensionsAction(response: Response) {
    const filteredExtensionRepository = getManager().getRepository(FilteredExtension);

    await filteredExtensionRepository.deleteAll();

    response.status(200).send();
}