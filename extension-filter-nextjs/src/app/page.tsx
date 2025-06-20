'use client';

import {resetFilteredExtensions} from "@/api/filtered-extension";
import FixedExtensionSection from './components/FixedExtensionSection';
import CustomExtensionSection from './components/CustomExtensionSection';
import Swal from 'sweetalert2'
import { useFilteredExtensionContext } from "@/context/FilteredExtensionContext";

export default function Page() {
    const {
        fixedExtensions,
        customExtensions,
        fetchFilteredExtensions
    } = useFilteredExtensionContext();

    const handleResetClick = async () => {
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
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                ⚙️ 파일 확장자 차단 설정
            </h1>

            <FixedExtensionSection />

            <CustomExtensionSection />

            <div className="flex justify-center">
                {(fixedExtensions.length > 0 || customExtensions.length > 0) && (
                    <button
                        onClick={() => handleResetClick()}
                        className="text-sm ml-auto mr-1 bg-gray-400 hover:bg-gray-600 px-1.5 py-1 rounded-md"
                    >
                        초기화
                    </button>
                )}
            </div>
        </div>
    );
}
