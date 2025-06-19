import { KeyboardEvent, useState } from 'react';
import { addFilteredExtension, deleteFilteredExtension } from "@/api/filtered-extension";

interface CustomExtensionsFieldsetProps {
  customExtensions: string[];
  fetchExtensions: () => void;
}

export default function CustomExtensionsFieldset({
  customExtensions,
  fetchExtensions
}: CustomExtensionsFieldsetProps) {
  const [newExtension, setNewExtension] = useState('');

  const handleAddCustomExtension = async () => {
    const name = newExtension.trim();
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

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddCustomExtension();
    }
  };

  return (
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
  );
} 