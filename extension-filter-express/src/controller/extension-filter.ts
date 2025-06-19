import {Request, Response} from "express";
import {PostFilteredExtensionsRequestBody} from "../types/request/filtered-extensions";
import {getManager} from "typeorm";
import FilteredExtension from "../entity/FilteredExtension";
import {validateExtensionName} from "../lib/extension";

export async function GetFilteredExtensionsAction(request: Request, response: Response) {
    const filteredExtensionRepository = getManager().getRepository(FilteredExtension);

    const filteredExtensions = await filteredExtensionRepository.find();

    response.send(filteredExtensions);
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
        // TODO: 중복 확장자에 대한 예외처리
        console.log(error)
        response.status(500).json({ message: '서버에서 오류가 발생하였습니다. '});
    }
}

export async function DeleteFilteredExtensionsAction(request: Request, response: Response) {
    const requestBody: PostFilteredExtensionsRequestBody = request.body;
    const filteredExtensionRepository = getManager().getRepository(FilteredExtension);

    const extensionName = requestBody.name;

    await filteredExtensionRepository.delete({name: extensionName});

    response.send();
}