var ENG_KEY = "rRseEfaqQtTdwWczxvgkoiOjpuPhynbml";
var KOR_KEY = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣ";
var CHO_DATA = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
var JUNG_DATA = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
var JONG_DATA = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";

function doConvert() {
	if (optEtoH.checked)
		txtConv.value = engTypeToKor(txtSource.value);
	else
		txtConv.value = korTypeToEng(txtSource.value);
}

function engTypeToKor(src) {
	var res = "";
	if (src.length == 0)
		return res;

	var nCho = -1, nJung = -1, nJong = -1;		// 초성, 중성, 종성

	for (var i = 0; i < src.length; i++) {
		var ch = src.charAt(i);
		var p = ENG_KEY.indexOf(ch);
		if (p == -1) {				// 영자판이 아님
			// 남아있는 한글이 있으면 처리
			if (nCho != -1) {
				if (nJung != -1)				// 초성+중성+(종성)
					res += makeHangul(nCho, nJung, nJong);
				else							// 초성만
					res += CHO_DATA.charAt(nCho);
			} else {
				if (nJung != -1)				// 중성만
					res += JUNG_DATA.charAt(nJung);
				else if (nJong != -1)			// 복자음
					res += JONG_DATA.charAt(nJong);
			}
			nCho = -1;
			nJung = -1;
			nJong = -1;
			res += ch;
		} else if (p < 19) {			// 자음
			if (nJung != -1) {
				if (nCho == -1) {					// 중성만 입력됨, 초성으로
					res += JUNG_DATA.charAt(nJung);
					nJung = -1;
					nCho = CHO_DATA.indexOf(KOR_KEY.charAt(p));
				} else {							// 종성이다
					if (nJong == -1) {				// 종성 입력 중
						nJong = JONG_DATA.indexOf(KOR_KEY.charAt(p));
						if (nJong == -1) {			// 종성이 아니라 초성이다
							res += makeHangul(nCho, nJung, nJong);
							nCho = CHO_DATA.indexOf(KOR_KEY.charAt(p));
							nJung = -1;
						}
					} else if (nJong == 0 && p == 9) {			// ㄳ
						nJong = 2;
					} else if (nJong == 3 && p == 12) {			// ㄵ
						nJong = 4;
					} else if (nJong == 3 && p == 18) {			// ㄶ
						nJong = 5;
					} else if (nJong == 7 && p == 0) {			// ㄺ
						nJong = 8;
					} else if (nJong == 7 && p == 6) {			// ㄻ
						nJong = 9;
					} else if (nJong == 7 && p == 7) {			// ㄼ
						nJong = 10;
					} else if (nJong == 7 && p == 9) {			// ㄽ
						nJong = 11;
					} else if (nJong == 7 && p == 16) {			// ㄾ
						nJong = 12;
					} else if (nJong == 7 && p == 17) {			// ㄿ
						nJong = 13;
					} else if (nJong == 7 && p == 18) {			// ㅀ
						nJong = 14;
					} else if (nJong == 16 && p == 9) {			// ㅄ
						nJong = 17;
					} else {						// 종성 입력 끝, 초성으로
						res += makeHangul(nCho, nJung, nJong);
						nCho = CHO_DATA.indexOf(KOR_KEY.charAt(p));
						nJung = -1;
						nJong = -1;
					}
				}
			} else {								// 초성 또는 (단/복)자음이다
				if (nCho == -1) {					// 초성 입력 시작
					if (nJong != -1) {				// 복자음 후 초성
						res += JONG_DATA.charAt(nJong);
						nJong = -1;
					}
					nCho = CHO_DATA.indexOf(KOR_KEY.charAt(p));
				} else if (nCho == 0 && p == 9) {			// ㄳ
					nCho = -1;
					nJong = 2;
				} else if (nCho == 2 && p == 12) {			// ㄵ
					nCho = -1;
					nJong = 4;
				} else if (nCho == 2 && p == 18) {			// ㄶ
					nCho = -1;
					nJong = 5;
				} else if (nCho == 5 && p == 0) {			// ㄺ
					nCho = -1;
					nJong = 8;
				} else if (nCho == 5 && p == 6) {			// ㄻ
					nCho = -1;
					nJong = 9;
				} else if (nCho == 5 && p == 7) {			// ㄼ
					nCho = -1;
					nJong = 10;
				} else if (nCho == 5 && p == 9) {			// ㄽ
					nCho = -1;
					nJong = 11;
				} else if (nCho == 5 && p == 16) {			// ㄾ
					nCho = -1;
					nJong = 12;
				} else if (nCho == 5 && p == 17) {			// ㄿ
					nCho = -1;
					nJong = 13;
				} else if (nCho == 5 && p == 18) {			// ㅀ
					nCho = -1;
					nJong = 14;
				} else if (nCho == 7 && p == 9) {			// ㅄ
					nCho = -1;
					nJong = 17;
				} else {							// 단자음을 연타
					res += CHO_DATA.charAt(nCho);
					nCho = CHO_DATA.indexOf(KOR_KEY.charAt(p));
				}
			}
		} else {									// 모음
			if (nJong != -1) {						// (앞글자 종성), 초성+중성
				// 복자음 다시 분해
				var newCho;			// (임시용) 초성
				if (nJong == 2) {					// ㄱ, ㅅ
					nJong = 0;
					newCho = 9;
				} else if (nJong == 4) {			// ㄴ, ㅈ
					nJong = 3;
					newCho = 12;
				} else if (nJong == 5) {			// ㄴ, ㅎ
					nJong = 3;
					newCho = 18;
				} else if (nJong == 8) {			// ㄹ, ㄱ
					nJong = 7;
					newCho = 0;
				} else if (nJong == 9) {			// ㄹ, ㅁ
					nJong = 7;
					newCho = 6;
				} else if (nJong == 10) {			// ㄹ, ㅂ
					nJong = 7;
					newCho = 7;
				} else if (nJong == 11) {			// ㄹ, ㅅ
					nJong = 7;
					newCho = 9;
				} else if (nJong == 12) {			// ㄹ, ㅌ
					nJong = 7;
					newCho = 16;
				} else if (nJong == 13) {			// ㄹ, ㅍ
					nJong = 7;
					newCho = 17;
				} else if (nJong == 14) {			// ㄹ, ㅎ
					nJong = 7;
					newCho = 18;
				} else if (nJong == 17) {			// ㅂ, ㅅ
					nJong = 16;
					newCho = 9;
				} else {							// 복자음 아님
					newCho = CHO_DATA.indexOf(JONG_DATA.charAt(nJong));
					nJong = -1;
				}
				if (nCho != -1)			// 앞글자가 초성+중성+(종성)
					res += makeHangul(nCho, nJung, nJong);
				else                    // 복자음만 있음
					res += JONG_DATA.charAt(nJong);

				nCho = newCho;
				nJung = -1;
				nJong = -1;
			}
			if (nJung == -1) {						// 중성 입력 중
				nJung = JUNG_DATA.indexOf(KOR_KEY.charAt(p));
			} else if (nJung == 8 && p == 19) {            // ㅘ
				nJung = 9;
			} else if (nJung == 8 && p == 20) {            // ㅙ
				nJung = 10;
			} else if (nJung == 8 && p == 32) {            // ㅚ
				nJung = 11;
			} else if (nJung == 13 && p == 23) {           // ㅝ
				nJung = 14;
			} else if (nJung == 13 && p == 24) {           // ㅞ
				nJung = 15;
			} else if (nJung == 13 && p == 32) {           // ㅟ
				nJung = 16;
			} else if (nJung == 18 && p == 32) {           // ㅢ
				nJung = 19;
			} else {			// 조합 안되는 모음 입력
				if (nCho != -1) {			// 초성+중성 후 중성
					res += makeHangul(nCho, nJung, nJong);
					nCho = -1;
				} else						// 중성 후 중성
					res += JUNG_DATA.charAt(nJung);
				nJung = -1;
				res += KOR_KEY.charAt(p);
			}
		}
	}

	// 마지막 한글이 있으면 처리
	if (nCho != -1) {
		if (nJung != -1)			// 초성+중성+(종성)
			res += makeHangul(nCho, nJung, nJong);
		else                		// 초성만
			res += CHO_DATA.charAt(nCho);
	} else {
		if (nJung != -1)			// 중성만
			res += JUNG_DATA.charAt(nJung);
		else {						// 복자음
			if (nJong != -1)
				res += JONG_DATA.charAt(nJong);
		}
	}

	return res;
}

function makeHangul(nCho, nJung, nJong) {
	return String.fromCharCode(0xac00 + nCho * 21 * 28 + nJung * 28 + nJong + 1);
}

function korTypeToEng(src) {
	var res = "";
	if (src.length == 0)
		return res;

	for (var i = 0; i < src.length; i++) {
		var ch = src.charAt(i);
		var nCode = ch.charCodeAt(0);
		var nCho = CHO_DATA.indexOf(ch), nJung = JUNG_DATA.indexOf(ch), nJong = JONG_DATA.indexOf(ch);
		var arrKeyIndex = [-1, -1, -1, -1, -1];

		if (0xac00 <= nCode && nCode <= 0xd7a3) {
			nCode -= 0xac00;
			arrKeyIndex[0] = Math.floor(nCode / (21 * 28));			// 초성
			arrKeyIndex[1] = Math.floor(nCode / 28) % 21;			// 중성
			arrKeyIndex[3] = nCode % 28 - 1;						// 종성
		} else if (nCho != -1)			// 초성 자음
			arrKeyIndex[0] = nCho;
		else if (nJung != -1)			// 중성
			arrKeyIndex[1] = nJung;
		else if (nJong != -1)			// 종성 자음
			arrKeyIndex[3] = nJong;
		else							// 한글이 아님
			res += ch;

		// 실제 Key Index로 변경. 초성은 순서 동일
		if (arrKeyIndex[1] != -1) {
			if (arrKeyIndex[1] == 9) {					// ㅘ
				arrKeyIndex[1] = 27;
				arrKeyIndex[2] = 19;
			} else if (arrKeyIndex[1] == 10) {			// ㅙ
				arrKeyIndex[1] = 27;
				arrKeyIndex[2] = 20;
			} else if (arrKeyIndex[1] == 11) {			// ㅚ
				arrKeyIndex[1] = 27;
				arrKeyIndex[2] = 32;
			} else if (arrKeyIndex[1] == 14) {			// ㅝ
				arrKeyIndex[1] = 29;
				arrKeyIndex[2] = 23;
			} else if (arrKeyIndex[1] == 15) {			// ㅞ
				arrKeyIndex[1] = 29;
				arrKeyIndex[2] = 24;
			} else if (arrKeyIndex[1] == 16) {			// ㅟ
				arrKeyIndex[1] = 29;
				arrKeyIndex[2] = 32;
			} else if (arrKeyIndex[1] == 19) {			// ㅢ
				arrKeyIndex[1] = 31;
				arrKeyIndex[2] = 32;
			} else {
				arrKeyIndex[1] = KOR_KEY.indexOf(JUNG_DATA.charAt(arrKeyIndex[1]));
				arrKeyIndex[2] = -1;
			}
		}
		if (arrKeyIndex[3] != -1) {
			if (arrKeyIndex[3] == 2) {					// ㄳ
				arrKeyIndex[3] = 0
				arrKeyIndex[4] = 9;
			} else if (arrKeyIndex[3] == 4) {			// ㄵ
				arrKeyIndex[3] = 2;
				arrKeyIndex[4] = 12;
			} else if (arrKeyIndex[3] == 5) {			// ㄶ
				arrKeyIndex[3] = 2;
				arrKeyIndex[4] = 18;
			} else if (arrKeyIndex[3] == 8) {			// ㄺ
				arrKeyIndex[3] = 5;
				arrKeyIndex[4] = 0;
			} else if (arrKeyIndex[3] == 9) {			// ㄻ
				arrKeyIndex[3] = 5;
				arrKeyIndex[4] = 6;
			} else if (arrKeyIndex[3] == 10) {			// ㄼ
				arrKeyIndex[3] = 5;
				arrKeyIndex[4] = 7;
			} else if (arrKeyIndex[3] == 11) {			// ㄽ
				arrKeyIndex[3] = 5;
				arrKeyIndex[4] = 9;
			} else if (arrKeyIndex[3] == 12) {			// ㄾ
				arrKeyIndex[3] = 5;
				arrKeyIndex[4] = 16;
			} else if (arrKeyIndex[3] == 13) {			// ㄿ
				arrKeyIndex[3] = 5;
				arrKeyIndex[4] = 17;
			} else if (arrKeyIndex[3] == 14) {			// ㅀ
				arrKeyIndex[3] = 5;
				arrKeyIndex[4] = 18;
			} else if (arrKeyIndex[3] == 17) {			// ㅄ
				arrKeyIndex[3] = 7;
				arrKeyIndex[4] = 9;
			} else {
				arrKeyIndex[3] = KOR_KEY.indexOf(JONG_DATA.charAt(arrKeyIndex[3]));
				arrKeyIndex[4] = -1;
			}
		}

		for (var j = 0; j < 5; j++) {
			if (arrKeyIndex[j] != -1)
				res += ENG_KEY.charAt(arrKeyIndex[j]);
		}
	}

	return res;
}

console.log(engTypeToKor('rrrrr'));
console.log(engTypeToKor('qjshs  123'));
console.log(engTypeToKor('tpdy!'));
console.log(engTypeToKor('fnffnfkffk'));
console.log(engTypeToKor('diffkfl'));
console.log(engTypeToKor('fnffn'));
console.log(engTypeToKor('zzzzz'));
console.log(engTypeToKor('nnnn'));