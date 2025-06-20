import {useFilteredExtensionContext} from "@/context/FilteredExtensionContext";
import Swal from "sweetalert2";
import {resetFilteredExtensions} from "@/api/filtered-extension";

export default function ResetButton(){
    const {
        fixedExtensions,
        customExtensions,
        fetchFilteredExtensions
    } = useFilteredExtensionContext();

    const handleClick = async () => {
        const result = await Swal.fire({
            html: '등록된 모든 확장자가 삭제됩니다. <br/> 초기화하시겠습니까?',
            icon: 'question',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        });

        if (result.isConfirmed) {
            await resetFilteredExtensions();
            await fetchFilteredExtensions();
        }
    }

    return (
        <>
            {(fixedExtensions.length > 0 || customExtensions.length > 0) && (
                <button
                    onClick={() => handleClick()}
                    className="text-sm ml-auto mr-1 bg-gray-400 hover:bg-gray-600 px-1.5 py-1 rounded-md"
                >
                    초기화
                </button>
            )}
        </>
    )
}