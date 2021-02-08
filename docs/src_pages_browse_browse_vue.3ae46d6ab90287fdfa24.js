(self["webpackChunktiny_files"] = self["webpackChunktiny_files"] || []).push([["src_pages_browse_browse_vue"],{

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-2[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/upload/upload.vue?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-2[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/upload/upload.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-2[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/pages/browse/browse.vue?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-2[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/pages/browse/browse.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/ts-loader/index.js??clonedRuleSet-1[0].rules[0]!./src/components/upload/upload.ts?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader/index.js??clonedRuleSet-1[0].rules[0]!./src/components/upload/upload.ts?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var services_tiny_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! services/tiny-api */ "./src/services/tiny-api.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util */ "./src/util.ts");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (vue__WEBPACK_IMPORTED_MODULE_3__.default.component('tiny-upload', {
    props: {
        files: { type: Array, required: false, default: () => [] },
        dir: { type: String, required: false, default: () => '/' },
        familiar: { type: Boolean, required: false, default: false }
    },
    data() {
        return {
            working: false,
            remFiles: [],
            localFiles: [],
            uploadDir: '/',
            status: '',
            progress: 0,
            dragging: false,
            throttledDragover: null,
        };
    },
    computed: {
        fileList() {
            return [...this.files.filter((_, i) => !this.remFiles.includes(i)), ...this.localFiles].map(file => {
                const type = file.type;
                return {
                    file, type, ...(0,_util__WEBPACK_IMPORTED_MODULE_1__.getFileIcon)(type)
                };
            });
        }
    },
    watch: {
        dir(n, o) {
            if (n && n !== o)
                this.uploadDir = n;
        }
    },
    mounted() {
        this.uploadDir = this.dir || '/';
        this.throttledDragover = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.debounce)(() => this.dragging = !this.dragging, 333, { leading: true, trailing: true });
    },
    methods: {
        async upload() {
            if (this.working)
                return;
            this.working = true;
            if (!this.uploadDir.endsWith('/'))
                this.uploadDir += '/';
            for (const entry of this.fileList) {
                this.status = 'uploading ' + entry.file.name + '...';
                await services_tiny_api__WEBPACK_IMPORTED_MODULE_0__.default.files.write(this.uploadDir + entry.file.name, await entry.file.arrayBuffer(), entry.type, event => this.progress = Math.round(event.loaded * 10000 / event.total) / 100);
            }
            this.status = '';
            this.working = false;
            this.$emit('close', true);
        },
        remFile(file) {
            const oldIdx = this.files.indexOf(file);
            if (oldIdx >= 0)
                this.remFiles.push(oldIdx);
            else
                this.localFiles = this.localFiles.filter(a => a !== file);
        }
    }
}));


/***/ }),

/***/ "./node_modules/ts-loader/index.js??clonedRuleSet-1[0].rules[0]!./src/pages/browse/browse.ts?vue&type=script&lang=js&":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader/index.js??clonedRuleSet-1[0].rules[0]!./src/pages/browse/browse.ts?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var buefy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! buefy */ "./node_modules/buefy/dist/esm/modal.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var services_data_bus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! services/data-bus */ "./src/services/data-bus.ts");
/* harmony import */ var services_tiny_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! services/tiny-api */ "./src/services/tiny-api.ts");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var components_upload_upload__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! components/upload/upload */ "./src/components/upload/upload.vue");






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (vue__WEBPACK_IMPORTED_MODULE_4__.default.component('tiny-browse', {
    data() {
        const data = {
            working: false,
            paths: null,
            dir: '/',
            suppressDragging: false,
            dropFiles: [],
            dragging: false,
            throttledDragover: null,
            getLink: (path) => (data.familiarLayout && data.personal)
                ? path.startsWith('/public')
                    ? services_tiny_api__WEBPACK_IMPORTED_MODULE_2__.default.files.getReadUrl(services_data_bus__WEBPACK_IMPORTED_MODULE_1__.default.publicScope + path.slice('/public'.length))
                    : services_tiny_api__WEBPACK_IMPORTED_MODULE_2__.default.files.getReadUrl(services_data_bus__WEBPACK_IMPORTED_MODULE_1__.default.privateScope + path)
                : services_tiny_api__WEBPACK_IMPORTED_MODULE_2__.default.files.getReadUrl(path),
            familiarLayout: true,
            personal: !services_data_bus__WEBPACK_IMPORTED_MODULE_1__.default.storeScopes.includes('/') && services_data_bus__WEBPACK_IMPORTED_MODULE_1__.default.storeScopes.length === 2
        };
        return data;
    },
    computed: {
        canUpload() {
            return (this.personal && this.familiarLayout)
                || (this.dir && Boolean(services_data_bus__WEBPACK_IMPORTED_MODULE_1__.default.storeScopes.find(s => this.dir.startsWith(s))));
        }
    },
    watch: {
        dropFiles(n, o) {
            if (n.length) {
                this.upload(n);
                this.dropFiles = [];
            }
        }
    },
    async mounted() {
        this.throttledDragover = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.debounce)(() => this.dragging = !this.dragging, 333, { leading: true, trailing: true });
        await this.refresh();
    },
    methods: {
        async refresh() {
            if (this.working)
                return;
            this.working = true;
            const entries = await Promise.all(services_data_bus__WEBPACK_IMPORTED_MODULE_1__.default.storeScopes.map(scope => services_tiny_api__WEBPACK_IMPORTED_MODULE_2__.default.files.listFiles(scope, true).then(res => res.entries)))
                .then(res => res.reduce((acc, c) => Object.assign(acc, c)));
            const bigList = Object.keys(entries);
            let pathData = [];
            for (const path of bigList)
                pathData.push(Object.assign({}, entries[path], { path }));
            if (this.familiarLayout && this.personal) {
                const privateScope = services_data_bus__WEBPACK_IMPORTED_MODULE_1__.default.privateScope, publicScope = services_data_bus__WEBPACK_IMPORTED_MODULE_1__.default.publicScope;
                pathData = pathData.filter(a => !a.path.startsWith(privateScope + '/public'));
                for (const entry of pathData) {
                    if (entry.path.startsWith(privateScope))
                        entry.path = entry.path.slice(privateScope.length);
                    else if (entry.path.startsWith(publicScope))
                        entry.path = '/public' + entry.path.slice(publicScope.length);
                }
                if (!bigList.find(a => a.startsWith(publicScope)))
                    pathData.push({ path: '/public/null', name: 'Nothing here...', type: 'none', size: 0, modified: 0 });
            }
            else {
                for (const scope of services_data_bus__WEBPACK_IMPORTED_MODULE_1__.default.storeScopes)
                    if (!bigList.find(a => a.startsWith(scope)))
                        pathData.push({ path: scope === '/' ? '/null' : scope + '/null', name: 'Nothing here...', type: 'none', size: 0, modified: 0 });
            }
            this.paths = pathData;
            this.working = false;
        },
        open(path) {
            window.open(this.getLink(path), '__blank');
        },
        async remove({ type, path }) {
            if (this.working)
                return;
            this.working = true;
            await services_tiny_api__WEBPACK_IMPORTED_MODULE_2__.default.files.delete(path);
            this.working = false;
            return this.refresh();
        },
        upload(files) {
            buefy__WEBPACK_IMPORTED_MODULE_5__.ModalProgrammatic.open({
                component: components_upload_upload__WEBPACK_IMPORTED_MODULE_3__.default,
                props: { files, familiar: this.familiarLayout && this.personal, dir: this.dir },
                onCancel: () => this.refresh(),
                events: { close: changed => changed ? this.refresh() : null }
            });
        }
    }
}));


/***/ }),

/***/ "./src/components/upload/upload.vue":
/*!******************************************!*\
  !*** ./src/components/upload/upload.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _upload_vue_vue_type_template_id_7982db22___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./upload.vue?vue&type=template&id=7982db22& */ "./src/components/upload/upload.vue?vue&type=template&id=7982db22&");
/* harmony import */ var _upload_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./upload.ts?vue&type=script&lang=js& */ "./src/components/upload/upload.ts?vue&type=script&lang=js&");
/* harmony import */ var _upload_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./upload.vue?vue&type=style&index=0&lang=scss& */ "./src/components/upload/upload.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _upload_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _upload_vue_vue_type_template_id_7982db22___WEBPACK_IMPORTED_MODULE_0__.render,
  _upload_vue_vue_type_template_id_7982db22___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/upload/upload.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/pages/browse/browse.vue":
/*!*************************************!*\
  !*** ./src/pages/browse/browse.vue ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _browse_vue_vue_type_template_id_28fe565b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./browse.vue?vue&type=template&id=28fe565b& */ "./src/pages/browse/browse.vue?vue&type=template&id=28fe565b&");
/* harmony import */ var _browse_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./browse.ts?vue&type=script&lang=js& */ "./src/pages/browse/browse.ts?vue&type=script&lang=js&");
/* harmony import */ var _browse_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./browse.vue?vue&type=style&index=0&lang=scss& */ "./src/pages/browse/browse.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _browse_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _browse_vue_vue_type_template_id_28fe565b___WEBPACK_IMPORTED_MODULE_0__.render,
  _browse_vue_vue_type_template_id_28fe565b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/pages/browse/browse.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/upload/upload.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************!*\
  !*** ./src/components/upload/upload.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_2_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_upload_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-2[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./upload.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-2[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/upload/upload.vue?vue&type=style&index=0&lang=scss&");


/***/ }),

/***/ "./src/pages/browse/browse.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************!*\
  !*** ./src/pages/browse/browse.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_2_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_browse_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-2[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./browse.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-2[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/pages/browse/browse.vue?vue&type=style&index=0&lang=scss&");


/***/ }),

/***/ "./src/components/upload/upload.ts?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./src/components/upload/upload.ts?vue&type=script&lang=js& ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_ts_loader_index_js_clonedRuleSet_1_0_rules_0_upload_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader/index.js??clonedRuleSet-1[0].rules[0]!./upload.ts?vue&type=script&lang=js& */ "./node_modules/ts-loader/index.js??clonedRuleSet-1[0].rules[0]!./src/components/upload/upload.ts?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_ts_loader_index_js_clonedRuleSet_1_0_rules_0_upload_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./src/pages/browse/browse.ts?vue&type=script&lang=js&":
/*!*************************************************************!*\
  !*** ./src/pages/browse/browse.ts?vue&type=script&lang=js& ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_ts_loader_index_js_clonedRuleSet_1_0_rules_0_browse_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader/index.js??clonedRuleSet-1[0].rules[0]!./browse.ts?vue&type=script&lang=js& */ "./node_modules/ts-loader/index.js??clonedRuleSet-1[0].rules[0]!./src/pages/browse/browse.ts?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_ts_loader_index_js_clonedRuleSet_1_0_rules_0_browse_ts_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./src/components/upload/upload.vue?vue&type=template&id=7982db22&":
/*!*************************************************************************!*\
  !*** ./src/components/upload/upload.vue?vue&type=template&id=7982db22& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_upload_vue_vue_type_template_id_7982db22___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_upload_vue_vue_type_template_id_7982db22___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_upload_vue_vue_type_template_id_7982db22___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./upload.vue?vue&type=template&id=7982db22& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/upload/upload.vue?vue&type=template&id=7982db22&");


/***/ }),

/***/ "./src/pages/browse/browse.vue?vue&type=template&id=28fe565b&":
/*!********************************************************************!*\
  !*** ./src/pages/browse/browse.vue?vue&type=template&id=28fe565b& ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_browse_vue_vue_type_template_id_28fe565b___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_browse_vue_vue_type_template_id_28fe565b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_browse_vue_vue_type_template_id_28fe565b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./browse.vue?vue&type=template&id=28fe565b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/pages/browse/browse.vue?vue&type=template&id=28fe565b&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/upload/upload.vue?vue&type=template&id=7982db22&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/upload/upload.vue?vue&type=template&id=7982db22& ***!
  \****************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    {
      staticClass: "tiny-upload modal-card",
      on: {
        dragover: function($event) {
          $event.preventDefault()
          return _vm.throttledDragover()
        }
      }
    },
    [
      _c("header", { staticClass: "modal-card-head" }, [
        _c("p", { staticClass: "modal-card-title" }, [
          _c("span", [_vm._v("Upload Files ")]),
          _c("span", { staticStyle: { "font-size": "1rem" } }, [
            _vm._v("- " + _vm._s(_vm.uploadDir))
          ])
        ]),
        _vm._v(" "),
        _c("button", {
          staticClass: "delete",
          attrs: { type: "button" },
          on: {
            click: function($event) {
              return _vm.$emit("close")
            }
          }
        })
      ]),
      _vm._v(" "),
      _c(
        "section",
        { staticClass: "modal-card-body" },
        [
          _vm.fileList.length
            ? [
                _c(
                  "div",
                  { staticClass: "files" },
                  [
                    _vm._l(_vm.fileList, function(entry, i) {
                      return _c(
                        "div",
                        { key: "file-" + i, staticClass: "file-entry" },
                        [
                          _c("b-icon", {
                            style: { color: entry.fileIconColor },
                            attrs: { icon: entry.fileIcon, title: entry.type }
                          }),
                          _vm._v(" "),
                          _c("span", [_vm._v(_vm._s(entry.file.name))]),
                          _vm._v(" "),
                          _c("button", {
                            staticClass: "delete",
                            attrs: { type: "button" },
                            on: {
                              click: function($event) {
                                return _vm.remFile(entry.file)
                              }
                            }
                          })
                        ],
                        1
                      )
                    }),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        key: "file-" + _vm.fileList.length,
                        staticClass: "file-entry",
                        staticStyle: { "margin-top": "0.5rem" }
                      },
                      [
                        _c("b-icon", {
                          attrs: {
                            icon: "file-multiple has-text-info",
                            title: ""
                          }
                        }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticStyle: {
                              "font-style": "italic",
                              opacity: "0.5"
                            }
                          },
                          [
                            _vm._v(
                              "Drop files here, or click the button below to upload"
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c("span")
                      ],
                      1
                    )
                  ],
                  2
                )
              ]
            : _c(
                "b-field",
                [
                  _c(
                    "b-upload",
                    {
                      attrs: { multiple: "", "drag-drop": "" },
                      model: {
                        value: _vm.localFiles,
                        callback: function($$v) {
                          _vm.localFiles = $$v
                        },
                        expression: "localFiles"
                      }
                    },
                    [
                      _c("section", { staticClass: "section" }, [
                        _c(
                          "div",
                          { staticClass: "content has-text-centered" },
                          [
                            _c(
                              "p",
                              [
                                _c("b-icon", {
                                  attrs: { icon: "upload", size: "is-large" }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c("p", [
                              _vm._v("Drop your files here or click to upload")
                            ])
                          ]
                        )
                      ])
                    ]
                  )
                ],
                1
              )
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "footer",
        { staticClass: "modal-card-foot" },
        [
          _c(
            "b-field",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !_vm.status,
                  expression: "!status"
                }
              ],
              staticClass: "file is-info"
            },
            [
              _c(
                "b-upload",
                {
                  attrs: { multiple: "" },
                  model: {
                    value: _vm.localFiles,
                    callback: function($$v) {
                      _vm.localFiles = $$v
                    },
                    expression: "localFiles"
                  }
                },
                [
                  _c(
                    "span",
                    { staticClass: "file-cta" },
                    [
                      _c("b-icon", {
                        staticClass: "file-icon",
                        attrs: { icon: "upload" }
                      }),
                      _vm._v(" "),
                      _c("span", { staticClass: "file-label" }, [
                        _vm._v("Upload files")
                      ])
                    ],
                    1
                  )
                ]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "span",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.status,
                  expression: "status"
                }
              ]
            },
            [_vm._v(_vm._s(_vm.status) + " (" + _vm._s(_vm.progress) + "%)")]
          ),
          _vm._v(" "),
          _c("div", { staticStyle: { "flex-grow": "1" } }),
          _vm._v(" "),
          _c("b-button", {
            attrs: { label: "close", disabled: _vm.working },
            on: {
              click: function($event) {
                return _vm.$emit("close")
              }
            }
          }),
          _vm._v(" "),
          _c("b-button", {
            attrs: {
              type: "is-primary",
              label: "upload",
              disabled: _vm.working || !_vm.fileList.length,
              loading: _vm.working
            },
            on: {
              click: function($event) {
                return _vm.upload()
              }
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _vm.dragging
        ? _c(
            "section",
            {
              attrs: { id: "upload-section" },
              on: {
                dragover: function($event) {
                  $event.preventDefault()
                  return _vm.throttledDragover()
                }
              }
            },
            [
              _c(
                "b-field",
                [
                  _c(
                    "b-upload",
                    {
                      attrs: { multiple: "", "drag-drop": "" },
                      model: {
                        value: _vm.localFiles,
                        callback: function($$v) {
                          _vm.localFiles = $$v
                        },
                        expression: "localFiles"
                      }
                    },
                    [
                      _c("section", { staticClass: "section" }, [
                        _c(
                          "div",
                          { staticClass: "content has-text-centered" },
                          [
                            _c(
                              "p",
                              [
                                _c("b-icon", {
                                  attrs: { icon: "upload", size: "is-large" }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c("p", [
                              _vm._v(
                                "Drop your files here or click to upload (or "
                              ),
                              _c(
                                "a",
                                {
                                  on: {
                                    click: function($event) {
                                      $event.preventDefault()
                                      _vm.dragging = false
                                    }
                                  }
                                },
                                [_vm._v("cancel")]
                              ),
                              _vm._v(")")
                            ])
                          ]
                        )
                      ])
                    ]
                  )
                ],
                1
              )
            ],
            1
          )
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/pages/browse/browse.vue?vue&type=template&id=28fe565b&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/pages/browse/browse.vue?vue&type=template&id=28fe565b& ***!
  \***********************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    {
      class: { blur: _vm.dragging },
      attrs: { id: "tiny-browse" },
      on: {
        dragover: function($event) {
          $event.preventDefault()
          return _vm.throttledDragover()
        }
      }
    },
    [
      _c("h1", { staticClass: "title" }, [_vm._v("tiny-files browser")]),
      _vm._v(" "),
      _c(
        "button",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.canUpload,
              expression: "canUpload"
            }
          ],
          staticClass: "has-background-info",
          attrs: { id: "upload-fab" },
          on: {
            click: function($event) {
              return _vm.upload()
            }
          }
        },
        [_c("b-icon", { attrs: { icon: "file-upload" } })],
        1
      ),
      _vm._v(" "),
      _vm.paths
        ? _c("tiny-explorer", {
            attrs: {
              paths: _vm.paths,
              mapLink: _vm.getLink,
              rootRoute: "/browse",
              rootName: _vm.familiarLayout && _vm.personal ? "personal" : "root"
            },
            on: {
              "update:dir": function($event) {
                _vm.dir = $event
              },
              open: _vm.open,
              delete: _vm.remove,
              dragging: function($event) {
                _vm.suppressDrag = true
              },
              draggingEnd: function($event) {
                _vm.suppressDrag = false
              }
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.dragging
        ? _c(
            "section",
            {
              attrs: { id: "upload-section" },
              on: {
                dragover: function($event) {
                  $event.preventDefault()
                  return _vm.throttledDragover()
                }
              }
            },
            [
              _c(
                "b-field",
                [
                  _c(
                    "b-upload",
                    {
                      attrs: { multiple: "", "drag-drop": "" },
                      model: {
                        value: _vm.dropFiles,
                        callback: function($$v) {
                          _vm.dropFiles = $$v
                        },
                        expression: "dropFiles"
                      }
                    },
                    [
                      _c("section", { staticClass: "section" }, [
                        _c(
                          "div",
                          { staticClass: "content has-text-centered" },
                          [
                            _c(
                              "p",
                              [
                                _c("b-icon", {
                                  attrs: { icon: "upload", size: "is-large" }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c("p", [
                              _vm._v(
                                "Drop your files here or click to upload (or "
                              ),
                              _c(
                                "a",
                                {
                                  on: {
                                    click: function($event) {
                                      $event.preventDefault()
                                      _vm.dragging = false
                                    }
                                  }
                                },
                                [_vm._v("cancel")]
                              ),
                              _vm._v(")")
                            ])
                          ]
                        )
                      ])
                    ]
                  )
                ],
                1
              )
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c("b-loading", { attrs: { active: _vm.working } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW55LWZpbGVzLy4vc3JjL2NvbXBvbmVudHMvdXBsb2FkL3VwbG9hZC52dWU/Zjg3YSIsIndlYnBhY2s6Ly90aW55LWZpbGVzLy4vc3JjL3BhZ2VzL2Jyb3dzZS9icm93c2UudnVlPzkwNjIiLCJ3ZWJwYWNrOi8vdGlueS1maWxlcy8uL3NyYy9jb21wb25lbnRzL3VwbG9hZC91cGxvYWQudHMiLCJ3ZWJwYWNrOi8vdGlueS1maWxlcy8uL3NyYy9wYWdlcy9icm93c2UvYnJvd3NlLnRzIiwid2VicGFjazovL3RpbnktZmlsZXMvLi9zcmMvY29tcG9uZW50cy91cGxvYWQvdXBsb2FkLnZ1ZT9iMTNhIiwid2VicGFjazovL3RpbnktZmlsZXMvLi9zcmMvcGFnZXMvYnJvd3NlL2Jyb3dzZS52dWU/MTY4NSIsIndlYnBhY2s6Ly90aW55LWZpbGVzLy4vc3JjL2NvbXBvbmVudHMvdXBsb2FkL3VwbG9hZC50cz9jMTk3Iiwid2VicGFjazovL3RpbnktZmlsZXMvLi9zcmMvcGFnZXMvYnJvd3NlL2Jyb3dzZS50cz84NGZjIiwid2VicGFjazovL3RpbnktZmlsZXMvLi9zcmMvY29tcG9uZW50cy91cGxvYWQvdXBsb2FkLnZ1ZT9lMGM2Iiwid2VicGFjazovL3RpbnktZmlsZXMvLi9zcmMvcGFnZXMvYnJvd3NlL2Jyb3dzZS52dWU/YjExMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQXdDO0FBQ0M7QUFDbkI7QUFDWTtBQUNsQyxpRUFBZSxrREFBYTtBQUM1QjtBQUNBLGdCQUFnQixrREFBa0Q7QUFDbEUsY0FBYyxvREFBb0Q7QUFDbEUsbUJBQW1CO0FBQ25CLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMs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Q0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsZ0NBQWdDO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxxQ0FBcUMseUJBQXlCO0FBQzlEO0FBQ0E7QUFDQSwyQkFBMkIsMkNBQTJDO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUMsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTLHNCQUFzQixFQUFFO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzcmNfcGFnZXNfYnJvd3NlX2Jyb3dzZV92dWUuM2FlNDZkNmFiOTAyODdmZGZhMjQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgdGlueUFwaSBmcm9tICdzZXJ2aWNlcy90aW55LWFwaSc7XHJcbmltcG9ydCB7IGdldEZpbGVJY29uIH0gZnJvbSAnLi4vLi4vdXRpbCc7XHJcbmltcG9ydCBWdWUgZnJvbSAndnVlJztcclxuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICdsb2Rhc2gnO1xyXG5leHBvcnQgZGVmYXVsdCBWdWUuY29tcG9uZW50KCd0aW55LXVwbG9hZCcsIHtcclxuICAgIHByb3BzOiB7XHJcbiAgICAgICAgZmlsZXM6IHsgdHlwZTogQXJyYXksIHJlcXVpcmVkOiBmYWxzZSwgZGVmYXVsdDogKCkgPT4gW10gfSxcclxuICAgICAgICBkaXI6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogZmFsc2UsIGRlZmF1bHQ6ICgpID0+ICcvJyB9LFxyXG4gICAgICAgIGZhbWlsaWFyOiB7IHR5cGU6IEJvb2xlYW4sIHJlcXVpcmVkOiBmYWxzZSwgZGVmYXVsdDogZmFsc2UgfVxyXG4gICAgfSxcclxuICAgIGRhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd29ya2luZzogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlbUZpbGVzOiBbXSxcclxuICAgICAgICAgICAgbG9jYWxGaWxlczogW10sXHJcbiAgICAgICAgICAgIHVwbG9hZERpcjogJy8nLFxyXG4gICAgICAgICAgICBzdGF0dXM6ICcnLFxyXG4gICAgICAgICAgICBwcm9ncmVzczogMCxcclxuICAgICAgICAgICAgZHJhZ2dpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICB0aHJvdHRsZWREcmFnb3ZlcjogbnVsbCxcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGNvbXB1dGVkOiB7XHJcbiAgICAgICAgZmlsZUxpc3QoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbLi4udGhpcy5maWxlcy5maWx0ZXIoKF8sIGkpID0+ICF0aGlzLnJlbUZpbGVzLmluY2x1ZGVzKGkpKSwgLi4udGhpcy5sb2NhbEZpbGVzXS5tYXAoZmlsZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gZmlsZS50eXBlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWxlLCB0eXBlLCAuLi5nZXRGaWxlSWNvbih0eXBlKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHdhdGNoOiB7XHJcbiAgICAgICAgZGlyKG4sIG8pIHtcclxuICAgICAgICAgICAgaWYgKG4gJiYgbiAhPT0gbylcclxuICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkRGlyID0gbjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW91bnRlZCgpIHtcclxuICAgICAgICB0aGlzLnVwbG9hZERpciA9IHRoaXMuZGlyIHx8ICcvJztcclxuICAgICAgICB0aGlzLnRocm90dGxlZERyYWdvdmVyID0gZGVib3VuY2UoKCkgPT4gdGhpcy5kcmFnZ2luZyA9ICF0aGlzLmRyYWdnaW5nLCAzMzMsIHsgbGVhZGluZzogdHJ1ZSwgdHJhaWxpbmc6IHRydWUgfSk7XHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIGFzeW5jIHVwbG9hZCgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud29ya2luZylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy53b3JraW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnVwbG9hZERpci5lbmRzV2l0aCgnLycpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGxvYWREaXIgKz0gJy8nO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIHRoaXMuZmlsZUxpc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gJ3VwbG9hZGluZyAnICsgZW50cnkuZmlsZS5uYW1lICsgJy4uLic7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aW55QXBpLmZpbGVzLndyaXRlKHRoaXMudXBsb2FkRGlyICsgZW50cnkuZmlsZS5uYW1lLCBhd2FpdCBlbnRyeS5maWxlLmFycmF5QnVmZmVyKCksIGVudHJ5LnR5cGUsIGV2ZW50ID0+IHRoaXMucHJvZ3Jlc3MgPSBNYXRoLnJvdW5kKGV2ZW50LmxvYWRlZCAqIDEwMDAwIC8gZXZlbnQudG90YWwpIC8gMTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLndvcmtpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2xvc2UnLCB0cnVlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbUZpbGUoZmlsZSkge1xyXG4gICAgICAgICAgICBjb25zdCBvbGRJZHggPSB0aGlzLmZpbGVzLmluZGV4T2YoZmlsZSk7XHJcbiAgICAgICAgICAgIGlmIChvbGRJZHggPj0gMClcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtRmlsZXMucHVzaChvbGRJZHgpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsRmlsZXMgPSB0aGlzLmxvY2FsRmlsZXMuZmlsdGVyKGEgPT4gYSAhPT0gZmlsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIiwiaW1wb3J0IHsgTW9kYWxQcm9ncmFtbWF0aWMgfSBmcm9tICdidWVmeSc7XHJcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IGRhdGFCdXMgZnJvbSAnc2VydmljZXMvZGF0YS1idXMnO1xyXG5pbXBvcnQgdGlueUFwaSBmcm9tICdzZXJ2aWNlcy90aW55LWFwaSc7XHJcbmltcG9ydCBWdWUgZnJvbSAndnVlJztcclxuaW1wb3J0IFVwbG9hZE1vZGFsIGZyb20gJ2NvbXBvbmVudHMvdXBsb2FkL3VwbG9hZCc7XHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZS5jb21wb25lbnQoJ3RpbnktYnJvd3NlJywge1xyXG4gICAgZGF0YSgpIHtcclxuICAgICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgICB3b3JraW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgcGF0aHM6IG51bGwsXHJcbiAgICAgICAgICAgIGRpcjogJy8nLFxyXG4gICAgICAgICAgICBzdXBwcmVzc0RyYWdnaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgZHJvcEZpbGVzOiBbXSxcclxuICAgICAgICAgICAgZHJhZ2dpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICB0aHJvdHRsZWREcmFnb3ZlcjogbnVsbCxcclxuICAgICAgICAgICAgZ2V0TGluazogKHBhdGgpID0+IChkYXRhLmZhbWlsaWFyTGF5b3V0ICYmIGRhdGEucGVyc29uYWwpXHJcbiAgICAgICAgICAgICAgICA/IHBhdGguc3RhcnRzV2l0aCgnL3B1YmxpYycpXHJcbiAgICAgICAgICAgICAgICAgICAgPyB0aW55QXBpLmZpbGVzLmdldFJlYWRVcmwoZGF0YUJ1cy5wdWJsaWNTY29wZSArIHBhdGguc2xpY2UoJy9wdWJsaWMnLmxlbmd0aCkpXHJcbiAgICAgICAgICAgICAgICAgICAgOiB0aW55QXBpLmZpbGVzLmdldFJlYWRVcmwoZGF0YUJ1cy5wcml2YXRlU2NvcGUgKyBwYXRoKVxyXG4gICAgICAgICAgICAgICAgOiB0aW55QXBpLmZpbGVzLmdldFJlYWRVcmwocGF0aCksXHJcbiAgICAgICAgICAgIGZhbWlsaWFyTGF5b3V0OiB0cnVlLFxyXG4gICAgICAgICAgICBwZXJzb25hbDogIWRhdGFCdXMuc3RvcmVTY29wZXMuaW5jbHVkZXMoJy8nKSAmJiBkYXRhQnVzLnN0b3JlU2NvcGVzLmxlbmd0aCA9PT0gMlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9LFxyXG4gICAgY29tcHV0ZWQ6IHtcclxuICAgICAgICBjYW5VcGxvYWQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5wZXJzb25hbCAmJiB0aGlzLmZhbWlsaWFyTGF5b3V0KVxyXG4gICAgICAgICAgICAgICAgfHwgKHRoaXMuZGlyICYmIEJvb2xlYW4oZGF0YUJ1cy5zdG9yZVNjb3Blcy5maW5kKHMgPT4gdGhpcy5kaXIuc3RhcnRzV2l0aChzKSkpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgd2F0Y2g6IHtcclxuICAgICAgICBkcm9wRmlsZXMobiwgbykge1xyXG4gICAgICAgICAgICBpZiAobi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkKG4pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wRmlsZXMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBtb3VudGVkKCkge1xyXG4gICAgICAgIHRoaXMudGhyb3R0bGVkRHJhZ292ZXIgPSBkZWJvdW5jZSgoKSA9PiB0aGlzLmRyYWdnaW5nID0gIXRoaXMuZHJhZ2dpbmcsIDMzMywgeyBsZWFkaW5nOiB0cnVlLCB0cmFpbGluZzogdHJ1ZSB9KTtcclxuICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2goKTtcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgYXN5bmMgcmVmcmVzaCgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud29ya2luZylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy53b3JraW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc3QgZW50cmllcyA9IGF3YWl0IFByb21pc2UuYWxsKGRhdGFCdXMuc3RvcmVTY29wZXMubWFwKHNjb3BlID0+IHRpbnlBcGkuZmlsZXMubGlzdEZpbGVzKHNjb3BlLCB0cnVlKS50aGVuKHJlcyA9PiByZXMuZW50cmllcykpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5yZWR1Y2UoKGFjYywgYykgPT4gT2JqZWN0LmFzc2lnbihhY2MsIGMpKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJpZ0xpc3QgPSBPYmplY3Qua2V5cyhlbnRyaWVzKTtcclxuICAgICAgICAgICAgbGV0IHBhdGhEYXRhID0gW107XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgcGF0aCBvZiBiaWdMaXN0KVxyXG4gICAgICAgICAgICAgICAgcGF0aERhdGEucHVzaChPYmplY3QuYXNzaWduKHt9LCBlbnRyaWVzW3BhdGhdLCB7IHBhdGggfSkpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mYW1pbGlhckxheW91dCAmJiB0aGlzLnBlcnNvbmFsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcml2YXRlU2NvcGUgPSBkYXRhQnVzLnByaXZhdGVTY29wZSwgcHVibGljU2NvcGUgPSBkYXRhQnVzLnB1YmxpY1Njb3BlO1xyXG4gICAgICAgICAgICAgICAgcGF0aERhdGEgPSBwYXRoRGF0YS5maWx0ZXIoYSA9PiAhYS5wYXRoLnN0YXJ0c1dpdGgocHJpdmF0ZVNjb3BlICsgJy9wdWJsaWMnKSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIHBhdGhEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5LnBhdGguc3RhcnRzV2l0aChwcml2YXRlU2NvcGUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyeS5wYXRoID0gZW50cnkucGF0aC5zbGljZShwcml2YXRlU2NvcGUubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChlbnRyeS5wYXRoLnN0YXJ0c1dpdGgocHVibGljU2NvcGUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyeS5wYXRoID0gJy9wdWJsaWMnICsgZW50cnkucGF0aC5zbGljZShwdWJsaWNTY29wZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFiaWdMaXN0LmZpbmQoYSA9PiBhLnN0YXJ0c1dpdGgocHVibGljU2NvcGUpKSlcclxuICAgICAgICAgICAgICAgICAgICBwYXRoRGF0YS5wdXNoKHsgcGF0aDogJy9wdWJsaWMvbnVsbCcsIG5hbWU6ICdOb3RoaW5nIGhlcmUuLi4nLCB0eXBlOiAnbm9uZScsIHNpemU6IDAsIG1vZGlmaWVkOiAwIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzY29wZSBvZiBkYXRhQnVzLnN0b3JlU2NvcGVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYmlnTGlzdC5maW5kKGEgPT4gYS5zdGFydHNXaXRoKHNjb3BlKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhEYXRhLnB1c2goeyBwYXRoOiBzY29wZSA9PT0gJy8nID8gJy9udWxsJyA6IHNjb3BlICsgJy9udWxsJywgbmFtZTogJ05vdGhpbmcgaGVyZS4uLicsIHR5cGU6ICdub25lJywgc2l6ZTogMCwgbW9kaWZpZWQ6IDAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wYXRocyA9IHBhdGhEYXRhO1xyXG4gICAgICAgICAgICB0aGlzLndvcmtpbmcgPSBmYWxzZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9wZW4ocGF0aCkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3Blbih0aGlzLmdldExpbmsocGF0aCksICdfX2JsYW5rJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyByZW1vdmUoeyB0eXBlLCBwYXRoIH0pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud29ya2luZylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy53b3JraW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgYXdhaXQgdGlueUFwaS5maWxlcy5kZWxldGUocGF0aCk7XHJcbiAgICAgICAgICAgIHRoaXMud29ya2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGxvYWQoZmlsZXMpIHtcclxuICAgICAgICAgICAgTW9kYWxQcm9ncmFtbWF0aWMub3Blbih7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFVwbG9hZE1vZGFsLFxyXG4gICAgICAgICAgICAgICAgcHJvcHM6IHsgZmlsZXMsIGZhbWlsaWFyOiB0aGlzLmZhbWlsaWFyTGF5b3V0ICYmIHRoaXMucGVyc29uYWwsIGRpcjogdGhpcy5kaXIgfSxcclxuICAgICAgICAgICAgICAgIG9uQ2FuY2VsOiAoKSA9PiB0aGlzLnJlZnJlc2goKSxcclxuICAgICAgICAgICAgICAgIGV2ZW50czogeyBjbG9zZTogY2hhbmdlZCA9PiBjaGFuZ2VkID8gdGhpcy5yZWZyZXNoKCkgOiBudWxsIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi91cGxvYWQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTc5ODJkYjIyJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL3VwbG9hZC50cz92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vdXBsb2FkLnRzP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL3VwbG9hZC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPXNjc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXG10YzEyXFxcXERvY3VtZW50c1xcXFxXb3JrXFxcXE1lXFxcXHRpbnktZmlsZXNcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnNzk4MmRiMjInKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNzk4MmRiMjInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNzk4MmRiMjInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL3VwbG9hZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9Nzk4MmRiMjImXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNzk4MmRiMjInLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInNyYy9jb21wb25lbnRzL3VwbG9hZC91cGxvYWQudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9icm93c2UudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTI4ZmU1NjViJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL2Jyb3dzZS50cz92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vYnJvd3NlLnRzP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL2Jyb3dzZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPXNjc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXG10YzEyXFxcXERvY3VtZW50c1xcXFxXb3JrXFxcXE1lXFxcXHRpbnktZmlsZXNcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnMjhmZTU2NWInKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMjhmZTU2NWInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMjhmZTU2NWInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL2Jyb3dzZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MjhmZTU2NWImXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMjhmZTU2NWInLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInNyYy9wYWdlcy9icm93c2UvYnJvd3NlLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzLWxvYWRlci9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0xWzBdLnJ1bGVzWzBdIS4vdXBsb2FkLnRzP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy90cy1sb2FkZXIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMVswXS5ydWxlc1swXSEuL3VwbG9hZC50cz92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzLWxvYWRlci9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0xWzBdLnJ1bGVzWzBdIS4vYnJvd3NlLnRzP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy90cy1sb2FkZXIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMVswXS5ydWxlc1swXSEuL2Jyb3dzZS50cz92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7XG4gICAgICBzdGF0aWNDbGFzczogXCJ0aW55LXVwbG9hZCBtb2RhbC1jYXJkXCIsXG4gICAgICBvbjoge1xuICAgICAgICBkcmFnb3ZlcjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICByZXR1cm4gX3ZtLnRocm90dGxlZERyYWdvdmVyKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgW1xuICAgICAgX2MoXCJoZWFkZXJcIiwgeyBzdGF0aWNDbGFzczogXCJtb2RhbC1jYXJkLWhlYWRcIiB9LCBbXG4gICAgICAgIF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcIm1vZGFsLWNhcmQtdGl0bGVcIiB9LCBbXG4gICAgICAgICAgX2MoXCJzcGFuXCIsIFtfdm0uX3YoXCJVcGxvYWQgRmlsZXPCoFwiKV0pLFxuICAgICAgICAgIF9jKFwic3BhblwiLCB7IHN0YXRpY1N0eWxlOiB7IFwiZm9udC1zaXplXCI6IFwiMXJlbVwiIH0gfSwgW1xuICAgICAgICAgICAgX3ZtLl92KFwiLSBcIiArIF92bS5fcyhfdm0udXBsb2FkRGlyKSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJidXR0b25cIiwge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImRlbGV0ZVwiLFxuICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiYnV0dG9uXCIgfSxcbiAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICByZXR1cm4gX3ZtLiRlbWl0KFwiY2xvc2VcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJzZWN0aW9uXCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwibW9kYWwtY2FyZC1ib2R5XCIgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF92bS5maWxlTGlzdC5sZW5ndGhcbiAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZmlsZXNcIiB9LFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLmZpbGVMaXN0LCBmdW5jdGlvbihlbnRyeSwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogXCJmaWxlLVwiICsgaSwgc3RhdGljQ2xhc3M6IFwiZmlsZS1lbnRyeVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiYi1pY29uXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogeyBjb2xvcjogZW50cnkuZmlsZUljb25Db2xvciB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGljb246IGVudHJ5LmZpbGVJY29uLCB0aXRsZTogZW50cnkudHlwZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgW192bS5fdihfdm0uX3MoZW50cnkuZmlsZS5uYW1lKSldKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJidXR0b25cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImRlbGV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiYnV0dG9uXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnJlbUZpbGUoZW50cnkuZmlsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcImZpbGUtXCIgKyBfdm0uZmlsZUxpc3QubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZmlsZS1lbnRyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgXCJtYXJnaW4tdG9wXCI6IFwiMC41cmVtXCIgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJiLWljb25cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmlsZS1tdWx0aXBsZSBoYXMtdGV4dC1pbmZvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udC1zdHlsZVwiOiBcIml0YWxpY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogXCIwLjVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRHJvcCBmaWxlcyBoZXJlLCBvciBjbGljayB0aGUgYnV0dG9uIGJlbG93IHRvIHVwbG9hZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiKVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgOiBfYyhcbiAgICAgICAgICAgICAgICBcImItZmllbGRcIixcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJiLXVwbG9hZFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgbXVsdGlwbGU6IFwiXCIsIFwiZHJhZy1kcm9wXCI6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5sb2NhbEZpbGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ubG9jYWxGaWxlcyA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwibG9jYWxGaWxlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJzZWN0aW9uXCIsIHsgc3RhdGljQ2xhc3M6IFwic2VjdGlvblwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbnRlbnQgaGFzLXRleHQtY2VudGVyZWRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJiLWljb25cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGljb246IFwidXBsb2FkXCIsIHNpemU6IFwiaXMtbGFyZ2VcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInBcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiRHJvcCB5b3VyIGZpbGVzIGhlcmUgb3IgY2xpY2sgdG8gdXBsb2FkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAyXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImZvb3RlclwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcIm1vZGFsLWNhcmQtZm9vdFwiIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiYi1maWVsZFwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJzaG93XCIsXG4gICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtc2hvd1wiLFxuICAgICAgICAgICAgICAgICAgdmFsdWU6ICFfdm0uc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIhc3RhdHVzXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZpbGUgaXMtaW5mb1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImItdXBsb2FkXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgbXVsdGlwbGU6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ubG9jYWxGaWxlcyxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5sb2NhbEZpbGVzID0gJCR2XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwibG9jYWxGaWxlc1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZmlsZS1jdGFcIiB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJiLWljb25cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZmlsZS1pY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBpY29uOiBcInVwbG9hZFwiIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImZpbGUtbGFiZWxcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJVcGxvYWQgZmlsZXNcIilcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJzaG93XCIsXG4gICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtc2hvd1wiLFxuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInN0YXR1c1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLnN0YXR1cykgKyBcIiAoXCIgKyBfdm0uX3MoX3ZtLnByb2dyZXNzKSArIFwiJSlcIildXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljU3R5bGU6IHsgXCJmbGV4LWdyb3dcIjogXCIxXCIgfSB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiYi1idXR0b25cIiwge1xuICAgICAgICAgICAgYXR0cnM6IHsgbGFiZWw6IFwiY2xvc2VcIiwgZGlzYWJsZWQ6IF92bS53b3JraW5nIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF92bS4kZW1pdChcImNsb3NlXCIpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiYi1idXR0b25cIiwge1xuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgdHlwZTogXCJpcy1wcmltYXJ5XCIsXG4gICAgICAgICAgICAgIGxhYmVsOiBcInVwbG9hZFwiLFxuICAgICAgICAgICAgICBkaXNhYmxlZDogX3ZtLndvcmtpbmcgfHwgIV92bS5maWxlTGlzdC5sZW5ndGgsXG4gICAgICAgICAgICAgIGxvYWRpbmc6IF92bS53b3JraW5nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdm0udXBsb2FkKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmRyYWdnaW5nXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcInNlY3Rpb25cIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYXR0cnM6IHsgaWQ6IFwidXBsb2FkLXNlY3Rpb25cIiB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGRyYWdvdmVyOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnRocm90dGxlZERyYWdvdmVyKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiYi1maWVsZFwiLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcImItdXBsb2FkXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBtdWx0aXBsZTogXCJcIiwgXCJkcmFnLWRyb3BcIjogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmxvY2FsRmlsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5sb2NhbEZpbGVzID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJsb2NhbEZpbGVzXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcInNlY3Rpb25cIiwgeyBzdGF0aWNDbGFzczogXCJzZWN0aW9uXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29udGVudCBoYXMtdGV4dC1jZW50ZXJlZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImItaWNvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgaWNvbjogXCJ1cGxvYWRcIiwgc2l6ZTogXCJpcy1sYXJnZVwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRHJvcCB5b3VyIGZpbGVzIGhlcmUgb3IgY2xpY2sgdG8gdXBsb2FkIChvciBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5kcmFnZ2luZyA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiY2FuY2VsXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIilcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKVxuICAgIF1cbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7XG4gICAgICBjbGFzczogeyBibHVyOiBfdm0uZHJhZ2dpbmcgfSxcbiAgICAgIGF0dHJzOiB7IGlkOiBcInRpbnktYnJvd3NlXCIgfSxcbiAgICAgIG9uOiB7XG4gICAgICAgIGRyYWdvdmVyOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIHJldHVybiBfdm0udGhyb3R0bGVkRHJhZ292ZXIoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBbXG4gICAgICBfYyhcImgxXCIsIHsgc3RhdGljQ2xhc3M6IFwidGl0bGVcIiB9LCBbX3ZtLl92KFwidGlueS1maWxlcyBicm93c2VyXCIpXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IFwic2hvd1wiLFxuICAgICAgICAgICAgICByYXdOYW1lOiBcInYtc2hvd1wiLFxuICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmNhblVwbG9hZCxcbiAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJjYW5VcGxvYWRcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaGFzLWJhY2tncm91bmQtaW5mb1wiLFxuICAgICAgICAgIGF0dHJzOiB7IGlkOiBcInVwbG9hZC1mYWJcIiB9LFxuICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybiBfdm0udXBsb2FkKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtfYyhcImItaWNvblwiLCB7IGF0dHJzOiB7IGljb246IFwiZmlsZS11cGxvYWRcIiB9IH0pXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0ucGF0aHNcbiAgICAgICAgPyBfYyhcInRpbnktZXhwbG9yZXJcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgcGF0aHM6IF92bS5wYXRocyxcbiAgICAgICAgICAgICAgbWFwTGluazogX3ZtLmdldExpbmssXG4gICAgICAgICAgICAgIHJvb3RSb3V0ZTogXCIvYnJvd3NlXCIsXG4gICAgICAgICAgICAgIHJvb3ROYW1lOiBfdm0uZmFtaWxpYXJMYXlvdXQgJiYgX3ZtLnBlcnNvbmFsID8gXCJwZXJzb25hbFwiIDogXCJyb290XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICBcInVwZGF0ZTpkaXJcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX3ZtLmRpciA9ICRldmVudFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBvcGVuOiBfdm0ub3BlbixcbiAgICAgICAgICAgICAgZGVsZXRlOiBfdm0ucmVtb3ZlLFxuICAgICAgICAgICAgICBkcmFnZ2luZzogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX3ZtLnN1cHByZXNzRHJhZyA9IHRydWVcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZHJhZ2dpbmdFbmQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIF92bS5zdXBwcmVzc0RyYWcgPSBmYWxzZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uZHJhZ2dpbmdcbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwic2VjdGlvblwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhdHRyczogeyBpZDogXCJ1cGxvYWQtc2VjdGlvblwiIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgZHJhZ292ZXI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0udGhyb3R0bGVkRHJhZ292ZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJiLWZpZWxkXCIsXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiYi11cGxvYWRcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IG11bHRpcGxlOiBcIlwiLCBcImRyYWctZHJvcFwiOiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uZHJvcEZpbGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZHJvcEZpbGVzID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJkcm9wRmlsZXNcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwic2VjdGlvblwiLCB7IHN0YXRpY0NsYXNzOiBcInNlY3Rpb25cIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjb250ZW50IGhhcy10ZXh0LWNlbnRlcmVkXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiYi1pY29uXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBpY29uOiBcInVwbG9hZFwiLCBzaXplOiBcImlzLWxhcmdlXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJEcm9wIHlvdXIgZmlsZXMgaGVyZSBvciBjbGljayB0byB1cGxvYWQgKG9yIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmRyYWdnaW5nID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJjYW5jZWxcIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiKVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiYi1sb2FkaW5nXCIsIHsgYXR0cnM6IHsgYWN0aXZlOiBfdm0ud29ya2luZyB9IH0pXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iXSwic291cmNlUm9vdCI6IiJ9