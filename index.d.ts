declare namespace Inko {
  interface InkoOption {
    allowDoubleConsonant?: boolean;
  }
}

declare class Inko {
  VERSION: string;
  constructor(option?: Inko.InkoOption);
  config(option?: Inko.InkoOption): void;
  en2ko(input: string, option?: Inko.InkoOption): string;
  ko2en(input: string): string;
  한글생성(초: number, 중: number, 종: number): string;
  한글분리(_한글: string): [number, number, number, number, number];
  is한글(char: string): boolean;
}

export = Inko;
export as namespace Inko;
