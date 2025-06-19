import {FilteredExtension} from "../../types/filtered-extension";

export const getAllFilteredExtension = async (): Promise<FilteredExtension[]> => {
    try{
        const response = await fetch(`/api/filtered-extensions`, {
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
    const response = await fetch(`/api/filtered-extensions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });

    if (!response.ok) {
        if (response.status === 400) {
            return '이미 차단된 확장자입니다. ';
        }

        alert('서버에서 오류가 발생하였습니다.');
        return '';
    }

    return 'success';
}

export const deleteFilteredExtension = async ({ name }: {name: string}) => {
    try {
        const response = await fetch(`/api/filtered-extensions`, {
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