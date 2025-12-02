/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   useWeather: () => (/* binding */ useWeather)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _styles_App_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/App.css */ \"./styles/App.css\");\n/* harmony import */ var _styles_App_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_App_css__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n// Create Context for global state\nconst WeatherContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\n// Custom hook to use the context\nconst useWeather = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(WeatherContext);\n// Provider component\nfunction WeatherProvider({ children }) {\n    // Global State for Location and Data\n    const [locationName, setLocationName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"London\");\n    const [coords, setCoords] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        lat: 51.5074,\n        lon: -0.1278\n    });\n    const [weatherData, setWeatherData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [lastUpdated, setLastUpdated] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [errorMsg, setErrorMsg] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    // Function to Fetch Weather Data (Now requests 7 past days + 10 future days)\n    const fetchWeather = async (latitude, longitude)=>{\n        setLoading(true);\n        setErrorMsg(\"\");\n        try {\n            // **API Update:** Added &forecast_days=10\n            const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&past_days=7&forecast_days=10&timezone=auto`;\n            const response = await fetch(API_URL);\n            if (!response.ok) throw new Error(\"Failed to fetch weather data\");\n            const data = await response.json();\n            setWeatherData(data);\n            setLastUpdated(new Date().toLocaleTimeString());\n        } catch (error) {\n            console.error(error);\n            setErrorMsg(\"Error fetching weather data. Please try again.\");\n        } finally{\n            setLoading(false);\n        }\n    };\n    // Effect: Fetch data when coords change AND sets up the 60s timer\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        fetchWeather(coords.lat, coords.lon);\n        const intervalId = setInterval(()=>{\n            fetchWeather(coords.lat, coords.lon);\n        }, 60000); // 60 seconds\n        return ()=>clearInterval(intervalId);\n    }, [\n        coords\n    ]);\n    // Handlers for passing down to children components\n    const handleSetCoords = (newCoords)=>setCoords(newCoords);\n    const handleSetLocationName = (name)=>setLocationName(name);\n    const handleSetErrorMsg = (msg)=>setErrorMsg(msg);\n    const value = {\n        locationName,\n        coords,\n        weatherData,\n        loading,\n        lastUpdated,\n        errorMsg,\n        setCoords: handleSetCoords,\n        setLocationName: handleSetLocationName,\n        setErrorMsg: handleSetErrorMsg\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(WeatherContext.Provider, {\n        value: value,\n        children: children\n    }, void 0, false, {\n        fileName: \"/home/codezeros/weather-tracker/pages/_app.js\",\n        lineNumber: 72,\n        columnNumber: 5\n    }, this);\n}\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(WeatherProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"/home/codezeros/weather-tracker/pages/_app.js\",\n            lineNumber: 81,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/home/codezeros/weather-tracker/pages/_app.js\",\n        lineNumber: 80,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQThFO0FBQ2pEO0FBQ0Y7QUFFM0Isa0NBQWtDO0FBQ2xDLE1BQU1NLCtCQUFpQkgsb0RBQWFBO0FBRXBDLGlDQUFpQztBQUMxQixNQUFNSSxhQUFhLElBQU1ILGlEQUFVQSxDQUFDRSxnQkFBZ0I7QUFFM0QscUJBQXFCO0FBQ3JCLFNBQVNFLGdCQUFnQixFQUFFQyxRQUFRLEVBQUU7SUFDbkMscUNBQXFDO0lBQ3JDLE1BQU0sQ0FBQ0MsY0FBY0MsZ0JBQWdCLEdBQUdWLCtDQUFRQSxDQUFDO0lBQ2pELE1BQU0sQ0FBQ1csUUFBUUMsVUFBVSxHQUFHWiwrQ0FBUUEsQ0FBQztRQUFFYSxLQUFLO1FBQVNDLEtBQUssQ0FBQztJQUFPO0lBQ2xFLE1BQU0sQ0FBQ0MsYUFBYUMsZUFBZSxHQUFHaEIsK0NBQVFBLENBQUM7SUFDL0MsTUFBTSxDQUFDaUIsU0FBU0MsV0FBVyxHQUFHbEIsK0NBQVFBLENBQUM7SUFDdkMsTUFBTSxDQUFDbUIsYUFBYUMsZUFBZSxHQUFHcEIsK0NBQVFBLENBQUM7SUFDL0MsTUFBTSxDQUFDcUIsVUFBVUMsWUFBWSxHQUFHdEIsK0NBQVFBLENBQUM7SUFFekMsNkVBQTZFO0lBQzdFLE1BQU11QixlQUFlLE9BQU9DLFVBQVVDO1FBQ3BDUCxXQUFXO1FBQ1hJLFlBQVk7UUFDWixJQUFJO1lBQ0YsMENBQTBDO1lBQzFDLE1BQU1JLFVBQVUsQ0FBQyxnREFBZ0QsRUFBRUYsU0FBUyxXQUFXLEVBQUVDLFVBQVUsK0lBQStJLENBQUM7WUFFblAsTUFBTUUsV0FBVyxNQUFNQyxNQUFNRjtZQUM3QixJQUFJLENBQUNDLFNBQVNFLEVBQUUsRUFBRSxNQUFNLElBQUlDLE1BQU07WUFFbEMsTUFBTUMsT0FBTyxNQUFNSixTQUFTSyxJQUFJO1lBQ2hDaEIsZUFBZWU7WUFDZlgsZUFBZSxJQUFJYSxPQUFPQyxrQkFBa0I7UUFDOUMsRUFBRSxPQUFPQyxPQUFPO1lBQ2RDLFFBQVFELEtBQUssQ0FBQ0E7WUFDZGIsWUFBWTtRQUNkLFNBQVU7WUFDUkosV0FBVztRQUNiO0lBQ0Y7SUFFQSxrRUFBa0U7SUFDbEVqQixnREFBU0EsQ0FBQztRQUNSc0IsYUFBYVosT0FBT0UsR0FBRyxFQUFFRixPQUFPRyxHQUFHO1FBRW5DLE1BQU11QixhQUFhQyxZQUFZO1lBQzdCZixhQUFhWixPQUFPRSxHQUFHLEVBQUVGLE9BQU9HLEdBQUc7UUFDckMsR0FBRyxRQUFRLGFBQWE7UUFFeEIsT0FBTyxJQUFNeUIsY0FBY0Y7SUFDN0IsR0FBRztRQUFDMUI7S0FBTztJQUVYLG1EQUFtRDtJQUNuRCxNQUFNNkIsa0JBQWtCLENBQUNDLFlBQWM3QixVQUFVNkI7SUFDakQsTUFBTUMsd0JBQXdCLENBQUNDLE9BQVNqQyxnQkFBZ0JpQztJQUN4RCxNQUFNQyxvQkFBb0IsQ0FBQ0MsTUFBUXZCLFlBQVl1QjtJQUUvQyxNQUFNQyxRQUFRO1FBQ1pyQztRQUNBRTtRQUNBSTtRQUNBRTtRQUNBRTtRQUNBRTtRQUNBVCxXQUFXNEI7UUFDWDlCLGlCQUFpQmdDO1FBQ2pCcEIsYUFBYXNCO0lBQ2Y7SUFFQSxxQkFDRSw4REFBQ3ZDLGVBQWUwQyxRQUFRO1FBQUNELE9BQU9BO2tCQUM3QnRDOzs7Ozs7QUFHUDtBQUVBLFNBQVN3QyxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ3JDLHFCQUNFLDhEQUFDM0M7a0JBQ0MsNEVBQUMwQztZQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7O0FBRzlCO0FBRUEsaUVBQWVGLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLXRyYWNrZXIvLi9wYWdlcy9fYXBwLmpzP2UwYWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xuaW1wb3J0ICcuLi9zdHlsZXMvQXBwLmNzcyc7XG5cbi8vIENyZWF0ZSBDb250ZXh0IGZvciBnbG9iYWwgc3RhdGVcbmNvbnN0IFdlYXRoZXJDb250ZXh0ID0gY3JlYXRlQ29udGV4dCgpO1xuXG4vLyBDdXN0b20gaG9vayB0byB1c2UgdGhlIGNvbnRleHRcbmV4cG9ydCBjb25zdCB1c2VXZWF0aGVyID0gKCkgPT4gdXNlQ29udGV4dChXZWF0aGVyQ29udGV4dCk7XG5cbi8vIFByb3ZpZGVyIGNvbXBvbmVudFxuZnVuY3Rpb24gV2VhdGhlclByb3ZpZGVyKHsgY2hpbGRyZW4gfSkge1xuICAvLyBHbG9iYWwgU3RhdGUgZm9yIExvY2F0aW9uIGFuZCBEYXRhXG4gIGNvbnN0IFtsb2NhdGlvbk5hbWUsIHNldExvY2F0aW9uTmFtZV0gPSB1c2VTdGF0ZShcIkxvbmRvblwiKTtcbiAgY29uc3QgW2Nvb3Jkcywgc2V0Q29vcmRzXSA9IHVzZVN0YXRlKHsgbGF0OiA1MS41MDc0LCBsb246IC0wLjEyNzggfSk7XG4gIGNvbnN0IFt3ZWF0aGVyRGF0YSwgc2V0V2VhdGhlckRhdGFdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2xhc3RVcGRhdGVkLCBzZXRMYXN0VXBkYXRlZF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2Vycm9yTXNnLCBzZXRFcnJvck1zZ10gPSB1c2VTdGF0ZShcIlwiKTtcblxuICAvLyBGdW5jdGlvbiB0byBGZXRjaCBXZWF0aGVyIERhdGEgKE5vdyByZXF1ZXN0cyA3IHBhc3QgZGF5cyArIDEwIGZ1dHVyZSBkYXlzKVxuICBjb25zdCBmZXRjaFdlYXRoZXIgPSBhc3luYyAobGF0aXR1ZGUsIGxvbmdpdHVkZSkgPT4ge1xuICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgc2V0RXJyb3JNc2coXCJcIik7XG4gICAgdHJ5IHtcbiAgICAgIC8vICoqQVBJIFVwZGF0ZToqKiBBZGRlZCAmZm9yZWNhc3RfZGF5cz0xMFxuICAgICAgY29uc3QgQVBJX1VSTCA9IGBodHRwczovL2FwaS5vcGVuLW1ldGVvLmNvbS92MS9mb3JlY2FzdD9sYXRpdHVkZT0ke2xhdGl0dWRlfSZsb25naXR1ZGU9JHtsb25naXR1ZGV9JmN1cnJlbnQ9dGVtcGVyYXR1cmVfMm0sd2luZF9zcGVlZF8xMG0mZGFpbHk9dGVtcGVyYXR1cmVfMm1fbWF4LHRlbXBlcmF0dXJlXzJtX21pbixwcmVjaXBpdGF0aW9uX3N1bSZwYXN0X2RheXM9NyZmb3JlY2FzdF9kYXlzPTEwJnRpbWV6b25lPWF1dG9gO1xuICAgICAgXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKEFQSV9VUkwpO1xuICAgICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHdlYXRoZXIgZGF0YVwiKTtcbiAgICAgIFxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHNldFdlYXRoZXJEYXRhKGRhdGEpO1xuICAgICAgc2V0TGFzdFVwZGF0ZWQobmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgc2V0RXJyb3JNc2coXCJFcnJvciBmZXRjaGluZyB3ZWF0aGVyIGRhdGEuIFBsZWFzZSB0cnkgYWdhaW4uXCIpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gRWZmZWN0OiBGZXRjaCBkYXRhIHdoZW4gY29vcmRzIGNoYW5nZSBBTkQgc2V0cyB1cCB0aGUgNjBzIHRpbWVyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZmV0Y2hXZWF0aGVyKGNvb3Jkcy5sYXQsIGNvb3Jkcy5sb24pO1xuXG4gICAgY29uc3QgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGZldGNoV2VhdGhlcihjb29yZHMubGF0LCBjb29yZHMubG9uKTtcbiAgICB9LCA2MDAwMCk7IC8vIDYwIHNlY29uZHNcblxuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICB9LCBbY29vcmRzXSk7XG4gIFxuICAvLyBIYW5kbGVycyBmb3IgcGFzc2luZyBkb3duIHRvIGNoaWxkcmVuIGNvbXBvbmVudHNcbiAgY29uc3QgaGFuZGxlU2V0Q29vcmRzID0gKG5ld0Nvb3JkcykgPT4gc2V0Q29vcmRzKG5ld0Nvb3Jkcyk7XG4gIGNvbnN0IGhhbmRsZVNldExvY2F0aW9uTmFtZSA9IChuYW1lKSA9PiBzZXRMb2NhdGlvbk5hbWUobmFtZSk7XG4gIGNvbnN0IGhhbmRsZVNldEVycm9yTXNnID0gKG1zZykgPT4gc2V0RXJyb3JNc2cobXNnKTtcblxuICBjb25zdCB2YWx1ZSA9IHtcbiAgICBsb2NhdGlvbk5hbWUsXG4gICAgY29vcmRzLFxuICAgIHdlYXRoZXJEYXRhLFxuICAgIGxvYWRpbmcsXG4gICAgbGFzdFVwZGF0ZWQsXG4gICAgZXJyb3JNc2csXG4gICAgc2V0Q29vcmRzOiBoYW5kbGVTZXRDb29yZHMsXG4gICAgc2V0TG9jYXRpb25OYW1lOiBoYW5kbGVTZXRMb2NhdGlvbk5hbWUsXG4gICAgc2V0RXJyb3JNc2c6IGhhbmRsZVNldEVycm9yTXNnLFxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPFdlYXRoZXJDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9XZWF0aGVyQ29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XG4gIHJldHVybiAoXG4gICAgPFdlYXRoZXJQcm92aWRlcj5cbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICA8L1dlYXRoZXJQcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwiTGluayIsIldlYXRoZXJDb250ZXh0IiwidXNlV2VhdGhlciIsIldlYXRoZXJQcm92aWRlciIsImNoaWxkcmVuIiwibG9jYXRpb25OYW1lIiwic2V0TG9jYXRpb25OYW1lIiwiY29vcmRzIiwic2V0Q29vcmRzIiwibGF0IiwibG9uIiwid2VhdGhlckRhdGEiLCJzZXRXZWF0aGVyRGF0YSIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwibGFzdFVwZGF0ZWQiLCJzZXRMYXN0VXBkYXRlZCIsImVycm9yTXNnIiwic2V0RXJyb3JNc2ciLCJmZXRjaFdlYXRoZXIiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsIkFQSV9VUkwiLCJyZXNwb25zZSIsImZldGNoIiwib2siLCJFcnJvciIsImRhdGEiLCJqc29uIiwiRGF0ZSIsInRvTG9jYWxlVGltZVN0cmluZyIsImVycm9yIiwiY29uc29sZSIsImludGVydmFsSWQiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJoYW5kbGVTZXRDb29yZHMiLCJuZXdDb29yZHMiLCJoYW5kbGVTZXRMb2NhdGlvbk5hbWUiLCJuYW1lIiwiaGFuZGxlU2V0RXJyb3JNc2ciLCJtc2ciLCJ2YWx1ZSIsIlByb3ZpZGVyIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./styles/App.css":
/*!************************!*\
  !*** ./styles/App.css ***!
  \************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_app.js")));
module.exports = __webpack_exports__;

})();