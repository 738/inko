import { CharIndexSignature, CharKeyValuePair } from './interfaces'
import * as constants from './constants';

// 한글, 영어 index 통합
// export function index(input: string): number {
//     let keyValuePair: CharIndexSignature = {};
//     input.split('').forEach((item, index) => { keyValuePair[item] = index })
//     return keyValuePair[input];
// }

export const indexOfEnglish = (function (en) {
    var x: CharIndexSignature = {};
    for (var i = 0; i < en.length; ++i) x[en[i]] = i;
    return x;
}(constants.engSyllabi));

export const indexOfKorean = (function (kr) {
    var x: CharIndexSignature = {};
    for (var i = 0; i < kr.length; ++i) x[kr[i]] = i;
    return x;
}(constants.korSyllabi));

export function isVowel(e: string): boolean {
    return indexOfKorean[e] >= constants.firstVowelCharCode;
}

export function last(list: string): string {
    return list.charAt(list.length - 1);
}

// combine function needed improvement but dunno how it works...

// export function combine(arr: string): void {
//     let group: any = [];
//     arr.split('').forEach((item, index) => {
//         if (index === 0 || isVowel(last(group)[0]) !== isVowel(constants.korSyllabi[index])) {
//             group.push([]);
//         }
//         last(group).push(constants.korSyllabi[item])
//     });
//     group = group.map((e: string) => {
//         var w = e.join('');
//         return constants.CONNECTABLE_CONSONANT[w] || constants.CONNECTABLE_VOWEL[w] || w;
//     })

// }

