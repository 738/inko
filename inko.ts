// (c) 2018 Humphrey Ahn

export interface Option {
    allowDoubleConsonant: boolean;
}
// Inko class
export class Inko {
    _allowDoubleConsonant!: boolean;
    VERSION = '1.0.6';
    constructor(option? : Option) {
        if (option != undefined) {
            this._allowDoubleConsonant = option.allowDoubleConsonant
        }
        else {
            this._allowDoubleConsonant = false;
        }
        return this;
    }   
    config(option? : Option) { }
    en2ko(eng : string, option? : Option) : string{
        return '';
    }
    ko2en(kor: string, option?: Option) : string {
        return '';   
    }
    // need to work on cuz theres no character in typescript
    koGenerate(choSung: string, jungSung: string, jongSung: string): string {
        return '';
    }
    koSeparate(kor?: string): string[] {
        return [''];
    }
    isKorean(char: string): boolean {
        return false
    }
}