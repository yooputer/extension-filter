'use client';

import {useState, useEffect, ChangeEvent} from 'react';
import {addFilteredExtension, deleteFilteredExtension, getAllFilteredExtension} from "@/api/filtered-extension";

const FIXED_EXTENSIONS = ['bat', 'cmd', 'com', 'cpl', 'exe', 'src', 'js'];

export default function Page() {
  const [fixedExtensions, setFixedExtensions] = useState<string[]>([]);
  const [customExtensions, setCustomExtensions] = useState<string[]>([]);
  const [newExtension, setNewExtension] = useState('');

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

  const handleFixedExtensionChange = async (e: ChangeEvent<HTMLInputElement>, extension: string) => {
    if (e.target.checked) {
      await addFilteredExtension({name: extension})
    }else{
      await deleteFilteredExtension({name: extension});
    }

    fetchExtensions();
  };

  const handleAddCustomExtension = async () => {
    let name = newExtension.trim();
    // TODO: 확장자명 유효성 체크
    // TODO: 커스터 확장자 200개 제한 처리

    await addFilteredExtension({name});

    fetchExtensions();
    setNewExtension('');
  };

  const handleDeleteCustomExtension = async (name: string) => {
    await deleteFilteredExtension({ name });

    fetchExtensions();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCustomExtension();
    }
  };

  return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          ⚙️ 파일 확장자 차단 설정
        </h1>

        {/* 고정 확장자 필드셋 */}
        <fieldset className="mb-8">
          <legend className="text-lg font-semibold text-gray-700 mb-4">
            고정 확장자
          </legend>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {FIXED_EXTENSIONS.map((extension) => (
                <label key={extension} className="flex items-center space-x-2 cursor-pointer">
                  <input
                      type="checkbox"
                      name="fixedExtension"
                      checked={fixedExtensions.includes(extension)}
                      onChange={(e) => handleFixedExtensionChange(e, extension)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-gray-700 font-medium">.{extension}</span>
                </label>
            ))}
          </div>
        </fieldset>

        {/* 커스텀 확장자 필드셋 */}
        <fieldset>
          <legend className="text-lg font-semibold text-gray-700 mb-4">
            커스텀 확장자
          </legend>

          {/* 입력 영역 */}
          <div className="flex gap-2 mb-4">
            <input
                type="text"
                value={newExtension}
                onChange={(e) => setNewExtension(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="차단할 확장자를 입력하세요"
                className="flex-1 px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
                onClick={handleAddCustomExtension}
                disabled={!newExtension.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              추가
            </button>
          </div>

          {/* 커스텀 확장자 목록 */}
          <div className="space-y-2">
            {customExtensions.length === 0 ? (
                <div className="flex justify-center p-5">
                  <p className="text-gray-500 text-sm">추가된 커스텀 확장자가 없습니다.</p>
                </div>

            ) : (
                <div className="flex flex-wrap gap-2">
                  {customExtensions.map((extension) => (
                    <div
                      key={extension}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-red-200 transition-colors duration-200"
                    >
                      <span className="text-black">.{extension}</span>
                      <button
                        onClick={() => handleDeleteCustomExtension(extension)}
                        className="ml-1 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 rounded-full p-0.5 hover:bg-red-300 transition-colors duration-200"
                        title="삭제"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
            )}
          </div>
        </fieldset>
      </div>
  );
}
