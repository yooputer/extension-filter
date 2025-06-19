const MAX_CUSTOM_EXTENSION_LENGTH = 20;

export const validateExtensionName = (value: string) => {
    // 빈문자열 여부 체크
    if(!value){
        throw new Error('extension name is empty');
    }

    // 문자 구성 체크
    const validCharsRegex = /^[a-z0-9.]+$/;
    if (!validCharsRegex.test(value)){
        throw new Error('detected inappropriate characters');
    }

    // 시작, 종료 문자 체크
    if (value.startsWith('.') || value.endsWith('.')){
        throw new Error(`extension name starts or ends with '.'`);
    }

    if (/\.{2,}/g.test(value)){
        throw new Error(`extension name has consecutive '.' `);
    }

    // 길이 체크
    if (value.length > MAX_CUSTOM_EXTENSION_LENGTH) {
        throw new Error('extension name is too long');
    }
}