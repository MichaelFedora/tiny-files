(self["webpackChunktiny_files"] = self["webpackChunktiny_files"] || []).push([["src_pages_login_login_vue"],{

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-2[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/pages/login/login.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-2[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/pages/login/login.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/ts-loader/index.js??clonedRuleSet-1[0].rules[0]!./src/pages/login/login.ts?vue&type=script&lang=js&":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader/index.js??clonedRuleSet-1[0].rules[0]!./src/pages/login/login.ts?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var services_data_bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! services/data-bus */ "./src/services/data-bus.ts");
/* harmony import */ var services_tiny_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! services/tiny-api */ "./src/services/tiny-api.ts");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (vue__WEBPACK_IMPORTED_MODULE_2__.default.component('tiny-login', {
    data() {
        return {
            working: false,
            origin: '',
        };
    },
    watch: {
        registering(n, o) {
            if (!n === !o)
                return;
            this.origin = '';
        }
    },
    async mounted() {
        if (this.$route.query.code && services_data_bus__WEBPACK_IMPORTED_MODULE_0__.default.homeUrl) {
            this.working = true;
            const res = await services_tiny_api__WEBPACK_IMPORTED_MODULE_1__.default.auth.getTokens(services_data_bus__WEBPACK_IMPORTED_MODULE_0__.default.homeUrl, '' + this.$route.query.code).then(() => true, e => false);
            if (res)
                this.$router.push('/browse');
            else {
                services_data_bus__WEBPACK_IMPORTED_MODULE_0__.default.clear();
                this.$router.replace('/login');
            }
            this.working = false;
        }
    },
    methods: {
        async login(personal) {
            if (this.working || !this.origin || !/\w+@.+/.test(this.origin))
                return;
            this.working = true;
            const success = await services_tiny_api__WEBPACK_IMPORTED_MODULE_1__.default.auth.login(this.origin, personal).then(() => true, e => false);
            if (success) {
                if (this.$route.query.goto && !(this.$route.query.goto instanceof Array))
                    this.$router.push(this.$route.query.goto);
                else
                    this.$router.push('/');
            }
            this.working = false;
        }
    }
}));


/***/ }),

/***/ "./src/pages/login/login.vue":
/*!***********************************!*\
  !*** ./src/pages/login/login.vue ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _login_vue_vue_type_template_id_23b3be22___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.vue?vue&type=template&id=23b3be22& */ "./src/pages/login/login.vue?vue&type=template&id=23b3be22&");
/* harmony import */ var _login_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.ts?vue&type=script&lang=js& */ "./src/pages/login/login.ts?vue&type=script&lang=js&");
/* harmony import */ var _login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.vue?vue&type=style&index=0&lang=scss& */ "./src/pages/login/login.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _login_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _login_vue_vue_type_template_id_23b3be22___WEBPACK_IMPORTED_MODULE_0__.render,
  _login_vue_vue_type_template_id_23b3be22___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/pages/login/login.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/pages/login/login.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************!*\
  !*** ./src/pages/login/login.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_2_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-2[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./login.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-2[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/pages/login/login.vue?vue&type=style&index=0&lang=scss&");


/***/ }),

/***/ "./src/pages/login/login.ts?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./src/pages/login/login.ts?vue&type=script&lang=js& ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_ts_loader_index_js_clonedRuleSet_1_0_rules_0_login_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader/index.js??clonedRuleSet-1[0].rules[0]!./login.ts?vue&type=script&lang=js& */ "./node_modules/ts-loader/index.js??clonedRuleSet-1[0].rules[0]!./src/pages/login/login.ts?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_ts_loader_index_js_clonedRuleSet_1_0_rules_0_login_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./src/pages/login/login.vue?vue&type=template&id=23b3be22&":
/*!******************************************************************!*\
  !*** ./src/pages/login/login.vue?vue&type=template&id=23b3be22& ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_23b3be22___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_23b3be22___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_23b3be22___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./login.vue?vue&type=template&id=23b3be22& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/pages/login/login.vue?vue&type=template&id=23b3be22&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/pages/login/login.vue?vue&type=template&id=23b3be22&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/pages/login/login.vue?vue&type=template&id=23b3be22& ***!
  \*********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "content", attrs: { id: "tiny-login" } }, [
    _c("h1", [_vm._v("login")]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "form" },
      [
        _c(
          "b-field",
          [
            _c("b-input", {
              attrs: {
                placeholder: "username@tinyhome.site",
                pattern: "\\w+@.+",
                "icon-right": "account"
              },
              nativeOn: {
                keyup: function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                  ) {
                    return null
                  }
                  return _vm.login()
                }
              },
              model: {
                value: _vm.origin,
                callback: function($$v) {
                  _vm.origin = $$v
                },
                expression: "origin"
              }
            })
          ],
          1
        )
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      { attrs: { id: "buttons" } },
      [
        _c(
          "a",
          {
            class: {
              disabled: !_vm.origin || _vm.working,
              "has-text-grey-lighter": _vm.origin && !_vm.working,
              "hover-warning": _vm.origin && !_vm.working
            },
            on: {
              click: function($event) {
                return _vm.login(false)
              }
            }
          },
          [_vm._v("login (root)")]
        ),
        _vm._v(" "),
        _c("div", { staticStyle: { "flex-grow": "1" } }),
        _vm._v(" "),
        _c(
          "b-button",
          {
            attrs: {
              type: "is-primary",
              disabled: !_vm.origin || _vm.working,
              loading: _vm.working
            },
            on: {
              click: function($event) {
                return _vm.login()
              }
            }
          },
          [_vm._v("login")]
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW55LWZpbGVzLy4vc3JjL3BhZ2VzL2xvZ2luL2xvZ2luLnZ1ZT9kZTIyIiwid2VicGFjazovL3RpbnktZmlsZXMvLi9zcmMvcGFnZXMvbG9naW4vbG9naW4udHMiLCJ3ZWJwYWNrOi8vdGlueS1maWxlcy8uL3NyYy9wYWdlcy9sb2dpbi9sb2dpbi52dWU/Y2VhZSIsIndlYnBhY2s6Ly90aW55LWZpbGVzLy4vc3JjL3BhZ2VzL2xvZ2luL2xvZ2luLnRzP2Y4ZjEiLCJ3ZWJwYWNrOi8vdGlueS1maWxlcy8uL3NyYy9wYWdlcy9sb2dpbi9sb2dpbi52dWU/OGMxMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBd0M7QUFDQTtBQUNsQjtBQUN0QixpRUFBZSxrREFBYTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHNDQUFzQyw4REFBZTtBQUNyRDtBQUNBLDhCQUE4QixxRUFBc0IsQ0FBQyw4REFBZTtBQUNwRTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNERBQWE7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxpRUFBa0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0NpRjtBQUM1QjtBQUNMO0FBQ25ELENBQWtFOzs7QUFHbEU7QUFDNkY7QUFDN0YsZ0JBQWdCLG9HQUFVO0FBQzFCLEVBQUUsdUVBQU07QUFDUixFQUFFLDZFQUFNO0FBQ1IsRUFBRSxzRkFBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksS0FBVSxFQUFFLFlBaUJmO0FBQ0Q7QUFDQSxpRUFBZSxpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QytHLENBQUMsaUVBQWUsaUlBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBbEo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaUNBQWlDLG1CQUFtQixFQUFFO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxzQkFBc0I7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxTQUFTLGdCQUFnQixFQUFFO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZUFBZSxtQkFBbUIsRUFBRTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNyY19wYWdlc19sb2dpbl9sb2dpbl92dWUuNzRkMGFjMTI5MTgzMGRiNWNmODkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgZGF0YUJ1cyBmcm9tICdzZXJ2aWNlcy9kYXRhLWJ1cyc7XHJcbmltcG9ydCB0aW55QXBpIGZyb20gJ3NlcnZpY2VzL3RpbnktYXBpJztcclxuaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xyXG5leHBvcnQgZGVmYXVsdCBWdWUuY29tcG9uZW50KCd0aW55LWxvZ2luJywge1xyXG4gICAgZGF0YSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3b3JraW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgb3JpZ2luOiAnJyxcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIHdhdGNoOiB7XHJcbiAgICAgICAgcmVnaXN0ZXJpbmcobiwgbykge1xyXG4gICAgICAgICAgICBpZiAoIW4gPT09ICFvKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLm9yaWdpbiA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBtb3VudGVkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLiRyb3V0ZS5xdWVyeS5jb2RlICYmIGRhdGFCdXMuaG9tZVVybCkge1xyXG4gICAgICAgICAgICB0aGlzLndvcmtpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aW55QXBpLmF1dGguZ2V0VG9rZW5zKGRhdGFCdXMuaG9tZVVybCwgJycgKyB0aGlzLiRyb3V0ZS5xdWVyeS5jb2RlKS50aGVuKCgpID0+IHRydWUsIGUgPT4gZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAocmVzKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goJy9icm93c2UnKTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhQnVzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucmVwbGFjZSgnL2xvZ2luJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy53b3JraW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBhc3luYyBsb2dpbihwZXJzb25hbCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy53b3JraW5nIHx8ICF0aGlzLm9yaWdpbiB8fCAhL1xcdytALisvLnRlc3QodGhpcy5vcmlnaW4pKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLndvcmtpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zdCBzdWNjZXNzID0gYXdhaXQgdGlueUFwaS5hdXRoLmxvZ2luKHRoaXMub3JpZ2luLCBwZXJzb25hbCkudGhlbigoKSA9PiB0cnVlLCBlID0+IGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLiRyb3V0ZS5xdWVyeS5nb3RvICYmICEodGhpcy4kcm91dGUucXVlcnkuZ290byBpbnN0YW5jZW9mIEFycmF5KSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh0aGlzLiRyb3V0ZS5xdWVyeS5nb3RvKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCgnLycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMud29ya2luZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vbG9naW4udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTIzYjNiZTIyJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL2xvZ2luLnRzP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9sb2dpbi50cz92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9sb2dpbi52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPXNjc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXG10YzEyXFxcXERvY3VtZW50c1xcXFxXb3JrXFxcXE1lXFxcXHRpbnktZmlsZXNcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnMjNiM2JlMjInKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMjNiM2JlMjInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMjNiM2JlMjInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL2xvZ2luLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yM2IzYmUyMiZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCcyM2IzYmUyMicsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwic3JjL3BhZ2VzL2xvZ2luL2xvZ2luLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzLWxvYWRlci9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0xWzBdLnJ1bGVzWzBdIS4vbG9naW4udHM/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzLWxvYWRlci9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0xWzBdLnJ1bGVzWzBdIS4vbG9naW4udHM/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIF92bSA9IHRoaXNcclxuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcclxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcclxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb250ZW50XCIsIGF0dHJzOiB7IGlkOiBcInRpbnktbG9naW5cIiB9IH0sIFtcclxuICAgIF9jKFwiaDFcIiwgW192bS5fdihcImxvZ2luXCIpXSksXHJcbiAgICBfdm0uX3YoXCIgXCIpLFxyXG4gICAgX2MoXHJcbiAgICAgIFwiZGl2XCIsXHJcbiAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZm9ybVwiIH0sXHJcbiAgICAgIFtcclxuICAgICAgICBfYyhcclxuICAgICAgICAgIFwiYi1maWVsZFwiLFxyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICBfYyhcImItaW5wdXRcIiwge1xyXG4gICAgICAgICAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJ1c2VybmFtZUB0aW55aG9tZS5zaXRlXCIsXHJcbiAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIlxcXFx3K0AuK1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpY29uLXJpZ2h0XCI6IFwiYWNjb3VudFwiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBuYXRpdmVPbjoge1xyXG4gICAgICAgICAgICAgICAga2V5dXA6IGZ1bmN0aW9uKCRldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgISRldmVudC50eXBlLmluZGV4T2YoXCJrZXlcIikgJiZcclxuICAgICAgICAgICAgICAgICAgICBfdm0uX2soJGV2ZW50LmtleUNvZGUsIFwiZW50ZXJcIiwgMTMsICRldmVudC5rZXksIFwiRW50ZXJcIilcclxuICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmxvZ2luKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIG1vZGVsOiB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLm9yaWdpbixcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcclxuICAgICAgICAgICAgICAgICAgX3ZtLm9yaWdpbiA9ICQkdlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwib3JpZ2luXCJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgMVxyXG4gICAgICAgIClcclxuICAgICAgXSxcclxuICAgICAgMVxyXG4gICAgKSxcclxuICAgIF92bS5fdihcIiBcIiksXHJcbiAgICBfYyhcclxuICAgICAgXCJkaXZcIixcclxuICAgICAgeyBhdHRyczogeyBpZDogXCJidXR0b25zXCIgfSB9LFxyXG4gICAgICBbXHJcbiAgICAgICAgX2MoXHJcbiAgICAgICAgICBcImFcIixcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgY2xhc3M6IHtcclxuICAgICAgICAgICAgICBkaXNhYmxlZDogIV92bS5vcmlnaW4gfHwgX3ZtLndvcmtpbmcsXHJcbiAgICAgICAgICAgICAgXCJoYXMtdGV4dC1ncmV5LWxpZ2h0ZXJcIjogX3ZtLm9yaWdpbiAmJiAhX3ZtLndvcmtpbmcsXHJcbiAgICAgICAgICAgICAgXCJob3Zlci13YXJuaW5nXCI6IF92bS5vcmlnaW4gJiYgIV92bS53b3JraW5nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uOiB7XHJcbiAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF92bS5sb2dpbihmYWxzZSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBbX3ZtLl92KFwibG9naW4gKHJvb3QpXCIpXVxyXG4gICAgICAgICksXHJcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcclxuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY1N0eWxlOiB7IFwiZmxleC1ncm93XCI6IFwiMVwiIH0gfSksXHJcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcclxuICAgICAgICBfYyhcclxuICAgICAgICAgIFwiYi1idXR0b25cIixcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgICAgICB0eXBlOiBcImlzLXByaW1hcnlcIixcclxuICAgICAgICAgICAgICBkaXNhYmxlZDogIV92bS5vcmlnaW4gfHwgX3ZtLndvcmtpbmcsXHJcbiAgICAgICAgICAgICAgbG9hZGluZzogX3ZtLndvcmtpbmdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb246IHtcclxuICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmxvZ2luKClcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBbX3ZtLl92KFwibG9naW5cIildXHJcbiAgICAgICAgKVxyXG4gICAgICBdLFxyXG4gICAgICAxXHJcbiAgICApXHJcbiAgXSlcclxufVxyXG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cclxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXHJcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSJdLCJzb3VyY2VSb290IjoiIn0=