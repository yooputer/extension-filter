import { ChangeEvent } from 'react';
import { addFilteredExtension, deleteFilteredExtension } from "@/api/filtered-extension";
import { useFilteredExtensionContext } from '@/context/FilteredExtensionContext';

export default function FixedExtensionSection() {
  const {
      fixedExtensions,
      FIXED_EXTENSIONS,
      fetchFilteredExtensions
  } = useFilteredExtensionContext();

  const handleFixedExtensionChange = async (e: ChangeEvent<HTMLInputElement>, extension: string) => {
    if (e.target.checked) {
      await addFilteredExtension({name: extension})
    } else {
      await deleteFilteredExtension({name: extension});
    }

    fetchFilteredExtensions();
  };

  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        고정 확장자
      </h3>
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
    </section>
  );
} 