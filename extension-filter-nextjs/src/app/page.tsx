'use client';

import FixedExtensionSection from './components/FixedExtensionSection';
import CustomExtensionSection from './components/CustomExtensionSection';
import ResetButton from "@/app/components/ResetButton";
export default function Page() {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                ⚙️ 파일 확장자 차단 설정
            </h1>

            <FixedExtensionSection />

            <CustomExtensionSection />

            <div className="flex justify-center">
                <ResetButton/>
            </div>
        </div>
    );
}
