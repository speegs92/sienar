"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@sienar/utils");
var plugins_core_1 = require("@sienar/plugins-core");
var plugins_identity_1 = require("@sienar/plugins-identity");
var ui_1 = require("@sienar/ui");
var index_tsx_1 = require("./plugin/index.tsx");
(0, utils_1.registerPlugins)(plugins_core_1.plugin, plugins_identity_1.plugin, ui_1.plugin, index_tsx_1.default);
(0, utils_1.createApp)();
