'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getAllFilteredExtension } from '@/api/filtered-extension';

const FIXED_EXTENSIONS = ['bat', 'cmd', 'com', 'cpl', 'exe', 'src', 'js'];
const MAX_CUSTOM_EXTENSION_CNT = 200;
const MAX_CUSTOM_EXTENSION_LENGTH = 20;

interface FilteredExtensionContextType {
    fixedExtensions: string[];
    customExtensions: string[];
    FIXED_EXTENSIONS: string[];
    MAX_CUSTOM_EXTENSION_CNT: number;
    MAX_CUSTOM_EXTENSION_LENGTH: number;
    fetchFilteredExtensions: () => Promise<void>;
}

const FilteredExtensionContext = createContext<FilteredExtensionContextType | undefined>(undefined);

export function FilteredExtensionProvider({ children }: { children: ReactNode }) {
    const [fixedExtensions, setFixedExtensions] = useState<string[]>([]);
    const [customExtensions, setCustomExtensions] = useState<string[]>([]);

    const fetchFilteredExtensions = async () => {
        const filteredExtensions = await getAllFilteredExtension();
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

    useEffect(() => {
        fetchFilteredExtensions();
    }, []);

    return (
        <FilteredExtensionContext.Provider value={{
            fixedExtensions,
            customExtensions,
            FIXED_EXTENSIONS,
            MAX_CUSTOM_EXTENSION_CNT,
            MAX_CUSTOM_EXTENSION_LENGTH,
            fetchFilteredExtensions }}>
            {children}
        </FilteredExtensionContext.Provider>
    );
}

export function useFilteredExtensionContext() {
    const context = useContext(FilteredExtensionContext);
    if (context === undefined) {
        throw new Error('useFilteredExtensionContext must be used within a FilteredExtensionContext');
    }
    return context;
} 