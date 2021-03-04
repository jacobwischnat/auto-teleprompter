/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/audiobuffer-to-wav/index.js":
/*!**************************************************!*\
  !*** ./node_modules/audiobuffer-to-wav/index.js ***!
  \**************************************************/
/***/ ((module) => {

eval("module.exports = audioBufferToWav;\n\nfunction audioBufferToWav(buffer, opt) {\n  opt = opt || {};\n  var numChannels = buffer.numberOfChannels;\n  var sampleRate = buffer.sampleRate;\n  var format = opt.float32 ? 3 : 1;\n  var bitDepth = format === 3 ? 32 : 16;\n  var result;\n\n  if (numChannels === 2) {\n    result = interleave(buffer.getChannelData(0), buffer.getChannelData(1));\n  } else {\n    result = buffer.getChannelData(0);\n  }\n\n  return encodeWAV(result, format, sampleRate, numChannels, bitDepth);\n}\n\nfunction encodeWAV(samples, format, sampleRate, numChannels, bitDepth) {\n  var bytesPerSample = bitDepth / 8;\n  var blockAlign = numChannels * bytesPerSample;\n  var buffer = new ArrayBuffer(44 + samples.length * bytesPerSample);\n  var view = new DataView(buffer);\n  /* RIFF identifier */\n\n  writeString(view, 0, 'RIFF');\n  /* RIFF chunk length */\n\n  view.setUint32(4, 36 + samples.length * bytesPerSample, true);\n  /* RIFF type */\n\n  writeString(view, 8, 'WAVE');\n  /* format chunk identifier */\n\n  writeString(view, 12, 'fmt ');\n  /* format chunk length */\n\n  view.setUint32(16, 16, true);\n  /* sample format (raw) */\n\n  view.setUint16(20, format, true);\n  /* channel count */\n\n  view.setUint16(22, numChannels, true);\n  /* sample rate */\n\n  view.setUint32(24, sampleRate, true);\n  /* byte rate (sample rate * block align) */\n\n  view.setUint32(28, sampleRate * blockAlign, true);\n  /* block align (channel count * bytes per sample) */\n\n  view.setUint16(32, blockAlign, true);\n  /* bits per sample */\n\n  view.setUint16(34, bitDepth, true);\n  /* data chunk identifier */\n\n  writeString(view, 36, 'data');\n  /* data chunk length */\n\n  view.setUint32(40, samples.length * bytesPerSample, true);\n\n  if (format === 1) {\n    // Raw PCM\n    floatTo16BitPCM(view, 44, samples);\n  } else {\n    writeFloat32(view, 44, samples);\n  }\n\n  return buffer;\n}\n\nfunction interleave(inputL, inputR) {\n  var length = inputL.length + inputR.length;\n  var result = new Float32Array(length);\n  var index = 0;\n  var inputIndex = 0;\n\n  while (index < length) {\n    result[index++] = inputL[inputIndex];\n    result[index++] = inputR[inputIndex];\n    inputIndex++;\n  }\n\n  return result;\n}\n\nfunction writeFloat32(output, offset, input) {\n  for (var i = 0; i < input.length; i++, offset += 4) {\n    output.setFloat32(offset, input[i], true);\n  }\n}\n\nfunction floatTo16BitPCM(output, offset, input) {\n  for (var i = 0; i < input.length; i++, offset += 2) {\n    var s = Math.max(-1, Math.min(1, input[i]));\n    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);\n  }\n}\n\nfunction writeString(view, offset, string) {\n  for (var i = 0; i < string.length; i++) {\n    view.setUint8(offset + i, string.charCodeAt(i));\n  }\n}\n\n//# sourceURL=webpack://speech/./node_modules/audiobuffer-to-wav/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var audiobuffer_to_wav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! audiobuffer-to-wav */ \"./node_modules/audiobuffer-to-wav/index.js\");\n/* harmony import */ var audiobuffer_to_wav__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(audiobuffer_to_wav__WEBPACK_IMPORTED_MODULE_0__);\n\nconsole.dir((audiobuffer_to_wav__WEBPACK_IMPORTED_MODULE_0___default()));\nconst [prompter, rate, h1] = document.querySelectorAll('div');\n\nconst init = async () => {\n  try {\n    // const stream = await navigator.mediaDevices.getUserMedia({audio: true});\n    const expected = `Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, “and what is the use of a book,” thought Alice “without pictures or conversations?” So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her. There was nothing so very remarkable in that; nor did Alice think it so very much out of the way to hear the Rabbit say to itself, “Oh dear! Oh dear! I shall be late!” (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural); but when the Rabbit actually took a watch out of its waistcoat-pocket, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.`;\n    prompter.textContent = expected;\n    const symbols = ',.-\"()?!';\n    const uniqueWords = expected.split(' ').map(w => w.toLowerCase()).map(w => w.split('').filter(c => !symbols.includes(c)).join('')).reduce((a, v) => {\n      if (!a.includes(v)) a.push(v);\n      return a;\n    }, []).filter(w => w.length >= 5);\n    console.log(uniqueWords);\n    const speech = new webkitSpeechRecognition();\n    speech.continuous = true;\n    speech.interimResults = true;\n    let keyword; // let rate = 0;\n\n    let firstResult = null;\n\n    speech.onerror = e => console.error(e);\n\n    speech.onresult = ({\n      results\n    }) => {\n      if (!firstResult) firstResult = Date.now() / 1000; // console.log(results);\n\n      const res = [...results];\n      const result = res.reduce((a, v) => {\n        a.push(v[0].transcript);\n        return a;\n      }, []).join(' ');\n      h1.textContent = result;\n      const words = expected.split(' ');\n      const now = Date.now() / 1000; // const {length} = result.split(' ');\n\n      let index = 0;\n      if (keyword) index = uniqueWords.findIndex(w => w === keyword);\n      const key = uniqueWords.slice(index).reduce((a, kword) => {\n        if (a) return a;\n\n        if (res[res.length - 1][0].transcript.includes(kword)) {\n          return kword;\n        }\n\n        ;\n        return a;\n      }, null);\n      if (key) keyword = key;\n      console.log({\n        keyword\n      });\n      let length = 0;\n      let ahead = 0;\n\n      if (keyword) {\n        length = words.findIndex(word => word.toLowerCase().includes(keyword)) + 1;\n        const transwords = res[res.length - 1][0].transcript.split(' ');\n        ahead = transwords.length - transwords.findIndex(word => word.toLowerCase().includes(keyword)) - 1;\n        if (ahead < 0) ahead = 0;\n      }\n\n      console.log({\n        length,\n        ahead\n      });\n      prompter.innerHTML = `<s>${words.slice(0, length).join(' ')}</s> <em>${ahead ? words.slice(length, length + ahead).join(' ') : ''}</em> ${words.slice(length + ahead).join(' ')}`;\n    };\n\n    speech.start(); // const ws = new WebSocket('ws://127.0.0.1:8080/speech');\n    // ws.onopen = async () => {\n    //     console.log('Socket open');\n    // ws.send();\n    // const stream = await navigator.mediaDevices.getUserMedia({audio: true});\n    // const [track] = await stream.getAudioTracks();\n    // const settings = track.getSettings();\n    // console.log({settings});\n    // const audio = new AudioContext();\n    // const micsource = audio.createMediaStreamSource(stream);\n    // const processor = audio.createScriptProcessor(1024, 1, 1);\n    // const dest = audio.createMediaStreamDestination();\n    // micsource.connect(processor);\n    // processor.connect(dest);\n    // dest.onaudioprocess = ({outputBuffer}) => {\n    //     const data = new Blob([outputBuffer.getChannelData(0)], {type: 'audio/wav'});\n    //     // const wav = toWav(outputBuffer);\n    //     console.log(new Uint8Array(outputBuffer.getChannelData(0).buffer));\n    //     ws.send(data);\n    // }\n    // const recorder = new MediaRecorder(stream, {mimeType: 'audio/webm\\;codecs=opus'});\n    // recorder.ondataavailable = ({data}) => {\n    //     ws.send(data);\n    //     console.log(data);\n    // }\n    // recorder.onstart = () => console.log('Started');\n    // recorder.start();\n    // setTimeout(() => recorder.stop(), 5000);\n    // };\n  } catch (ex) {\n    console.error(ex);\n  }\n};\n\ndocument.querySelector('button').onclick = () => init();\n\n//# sourceURL=webpack://speech/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;