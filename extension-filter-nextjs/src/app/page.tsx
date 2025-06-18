'use client';

import {useState, useEffect} from 'react';
import {getAllFilteredExtension} from "@/api/filtered-extension";
import FixedExtensionSection from './components/FixedExtensionSection';
import CustomExtensionSection from './components/CustomExtensionsFieldset';

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
      let fixedExtensionNames: string[] = [];
      let customExtensionNames: string[] = [];

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
          customExtensions={customExtensions}
          fetchExtensions={fetchExtensions}
        />
      </div>
  );
}
