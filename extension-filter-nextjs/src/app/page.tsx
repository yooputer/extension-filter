'use client';

import {useState, useEffect} from 'react';
import {getAllFilteredExtension, resetFilteredExtensions} from "@/api/filtered-extension";
import FixedExtensionSection from './components/FixedExtensionSection';
import CustomExtensionSection from './components/CustomExtensionSection';
import Swal from 'sweetalert2'

const FIXED_EXTENSIONS = ['bat', 'cmd', 'com', 'cpl', 'exe', 'src', 'js'];

export default function Page() {
  const [fixedExtensions, setFixedExtensions] = useState<string[]>([]);
  const [customExtensions, setCustomExtensions] = useState<string[]>([]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchExtensions();
  }, []);

  const fetchExtensions = async () => {
      // 차단된 확장자 조회
      const filteredExtensions = await getAllFilteredExtension();

      // state 세팅
      const fixedExtensionNames: string[] = [];
      const customExtensionNames: string[] = [];

      filteredExtensions.forEach(({ name }) => {
        if (FIXED_EXTENSIONS.includes(name)) {
          fixedExtensionNames.push(name);
        }else{
          customExtensionNames.push(name);
        }
      })

      setFixedExtensions(fixedExtensionNames);
      setCustomExtensions(customExtensionNames);
  };

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
          await fetchExtensions();
      }
  }

  return (
      <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              ⚙️ 파일 확장자 차단 설정
          </h1>

          <FixedExtensionSection
              FIXED_EXTENSIONS={FIXED_EXTENSIONS}
              checkedFixedExtensions={fixedExtensions}
              fetchExtensions={fetchExtensions}
          />

          <CustomExtensionSection
              FIXED_EXTENSIONS={FIXED_EXTENSIONS}
              customExtensions={customExtensions}
              fetchExtensions={fetchExtensions}
          />

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
