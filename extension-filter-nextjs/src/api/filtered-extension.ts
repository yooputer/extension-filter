import {FilteredExtension} from "../../types/filtered-extension";

const baseURL = 'http://localhost:3000';

export const getAllFilteredExtension = async (): Promise<FilteredExtension[]> => {
    try{
        const response = await fetch(`${baseURL}/api/filtered-extensions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const filteredExtensions: FilteredExtension[] = await response.json();

        return filteredExtensions;
    }catch (error){
        console.error('확장자 목록을 불러오는데 실패했습니다:', error);
        return [];
    }
}

export const addFilteredExtension = async ({ name }: {name: string}) => {
    try {
        const response = await fetch(`${baseURL}/api/filtered-extensions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        // TODO 중복확장자 예외처리
        console.error('확장자 추가에 실패했습니다:', error);
    }
}

export const deleteFilteredExtension = async ({ name }: {name: string}) => {
    try {
        const response = await fetch(`${baseURL}/api/filtered-extensions`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.error('확장자 삭제에 실패했습니다:', error);
    }
}