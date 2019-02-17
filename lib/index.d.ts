export interface Option {
    allowDoubleConsonant?: boolean;
}
export declare class Inko {
    _allowDoubleConsonant?: boolean;
    VERSION: string;
    constructor(option?: Option);
    config(option?: Option): this;
    en2ko(eng: string, _option?: Option): string;
    ko2en(kor: string, option?: Option): string;
    koGenerate(choSung: number, jungSung: number, jongSung: number): string;
    koSeparate(kor: string): number[];
    isKorean(char: string): boolean;
}
