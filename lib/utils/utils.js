"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants = __importStar(require("./constants"));
// 한글, 영어 index 통합
// export function index(input: string): number {
//     let keyValuePair: CharIndexSignature = {};
//     input.split('').forEach((item, index) => { keyValuePair[item] = index })
//     return keyValuePair[input];
// }
exports.indexOfEnglish = (function (en) {
    var x = {};
    for (var i = 0; i < en.length; ++i)
        x[en[i]] = i;
    return x;
}(constants.engSyllabi));
exports.indexOfKorean = (function (kr) {
    var x = {};
    for (var i = 0; i < kr.length; ++i)
        x[kr[i]] = i;
    return x;
}(constants.korSyllabi));
function isVowel(e) {
    return exports.indexOfKorean[e] >= constants.firstVowelCharCode;
}
exports.isVowel = isVowel;
function last(list) {
    return list.charAt(list.length - 1);
}
exports.last = last;
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
