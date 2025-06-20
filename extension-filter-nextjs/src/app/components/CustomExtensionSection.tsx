import { KeyboardEvent, useState } from 'react';
import { addFilteredExtension, deleteFilteredExtension } from "@/api/filtered-extension";
import { useFilteredExtensionContext } from '@/context/FilteredExtensionContext';

export default function CustomExtensionSection() {
  const {
    customExtensions,
    FIXED_EXTENSIONS,
    MAX_CUSTOM_EXTENSION_CNT,
    MAX_CUSTOM_EXTENSION_LENGTH,
    fetchFilteredExtensions
  } = useFilteredExtensionContext();
  const [newExtension, setNewExtension] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddCustomExtension = async () => {
    // 고정확장자 여부 체크
    if (FIXED_EXTENSIONS.includes(newExtension)) {
      setErrorMsg(`고정 확장자로 등록된 확장자입니다. 상단에서 차단 여부를 체크해주세요. `);
      return;
    }

    // 커스텀 확장자 최대 개수 제한
    if (customExtensions.length >= MAX_CUSTOM_EXTENSION_CNT) {
      setErrorMsg(`커스텀 확장자는 최대 ${MAX_CUSTOM_EXTENSION_CNT}개까지 가능합니다.`);
      return;
    }

    // '.'으로 끝나는지 체크
    if (newExtension.endsWith('.')) {
      setErrorMsg(`확장자명은 알파벳(a-z) 혹은 숫자로 끝나야 합니다. `);
      return;
    }

    const resultMsg = await addFilteredExtension({name: newExtension});

    if (resultMsg === 'success') {
      fetchFilteredExtensions();
      setNewExtension('');
      setErrorMsg('');
    }else {
      setErrorMsg(resultMsg);
    }
  };

  const handleDeleteCustomExtension = async (name: string) => {
    await deleteFilteredExtension({ name });

    fetchFilteredExtensions();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newExtension) {
      handleAddCustomExtension();
    }
  };

  const handleInputChange = (value:string) => {
    let errorMsg = '';

    // 소문자로 치환
    value = value.toLowerCase();

    // 점으로 시작하는지 체크
    if (value.startsWith('.')){
      errorMsg = '확장자명은 알파벳(a-z) 혹은 숫자로 시작하여야 합니다.';
      value = value.slice(1);
    }

    // 입력 문자 제한
    const validCharsRegex = /^[a-z0-9.]+$/;
    if (value && !validCharsRegex.test(value)){
      errorMsg = '알파벳(a-z), 숫자, 점(.)만 입력 가능합니다.';
      value = value.replace(/[^a-z0-9.]/g, "");
    }

    // 연속된 점이 존재하는지 체크
    if (value && /\.{2,}/g.test(value)){
      errorMsg = '점(.)은 연속으로 입력할 수 없습니다. ';
      value = value.replace(/\.{2,}/g, '.');
    }

    // 최대 길이 제한
    if (value.length > MAX_CUSTOM_EXTENSION_LENGTH) {
      errorMsg = `최대 ${MAX_CUSTOM_EXTENSION_LENGTH}자까지 입력 가능합니다.`;
      value = value.slice(0, MAX_CUSTOM_EXTENSION_LENGTH);
    }

    setErrorMsg(errorMsg)
    setNewExtension(value);
  }

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        커스텀 확장자
        <span className="text-sm text-gray-400 ml-1">({customExtensions.length} / {MAX_CUSTOM_EXTENSION_CNT})</span>
      </h3>


      {/* 입력 영역 */}
      <div className="flex gap-2">
        <input
            type="text"
            value={newExtension}
            onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyPress}
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

      <div className="m-2">
        <p className="mr-2 text-sm text-red-600"> { errorMsg } </p>
      </div>

      {/* 커스텀 확장자 목록 */}
      <div className="space-y-2 mt-4">
        {customExtensions.length === 0 ? (
          <div className="flex justify-center p-5">
            <p className="text-gray-500 text-sm">추가된 커스텀 확장자가 없습니다.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mb-4">
            {customExtensions.map((extension) => (
              <div
                key={extension}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
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
    </section>
  );
} 