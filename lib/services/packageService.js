"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var rimraf_1 = __importDefault(require("rimraf"));
var utils_1 = require("../shared/utils");
var baseService_1 = require("./baseService");
/**
 * Adds service packing support
 */
var PackageService = /** @class */ (function (_super) {
    __extends(PackageService, _super);
    function PackageService(serverless, options) {
        return _super.call(this, serverless, options, false) || this;
    }
    PackageService.prototype.cleanUpServerlessDir = function () {
        var serverlessDir = path_1.default.join(this.serverless.config.servicePath, ".serverless");
        if (fs_1.default.existsSync(serverlessDir)) {
            this.log("Removing .serverless directory");
            rimraf_1.default.sync(serverlessDir);
        }
    };
    /**
     * Creates the function.json binding files required for the serverless service
     */
    PackageService.prototype.createBindings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var createEventsPromises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        createEventsPromises = this.serverless.service.getAllFunctions()
                            .map(function (functionName) {
                            var metaData = utils_1.Utils.getFunctionMetaData(functionName, _this.serverless);
                            return _this.createBinding(functionName, metaData);
                        });
                        return [4 /*yield*/, Promise.all(createEventsPromises)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Prepares a serverless project for webpack and copies required files including
     * host.json and function.json files
     */
    PackageService.prototype.prepareWebpack = function () {
        var _this = this;
        var filesToCopy = [];
        if (fs_1.default.existsSync("host.json")) {
            filesToCopy.push("host.json");
        }
        this.serverless.service.getAllFunctions().forEach(function (functionName) {
            var functionJsonPath = path_1.default.join(functionName, "function.json");
            if (fs_1.default.existsSync(functionJsonPath)) {
                filesToCopy.push(functionJsonPath);
            }
        });
        this.serverless.cli.log("Copying files for webpack");
        filesToCopy.forEach(function (filePath) {
            var destinationPath = path_1.default.join(".webpack", "service", filePath);
            var destinationDirectory = path_1.default.dirname(destinationPath);
            if (!fs_1.default.existsSync(destinationDirectory)) {
                fs_1.default.mkdirSync(destinationDirectory);
            }
            fs_1.default.copyFileSync(filePath, destinationPath);
            _this.serverless.cli.log("-> " + destinationPath);
        });
        return Promise.resolve();
    };
    /**
     * Cleans up generated function.json files after packaging has completed
     */
    PackageService.prototype.cleanUp = function () {
        this.serverless.service.getAllFunctions().map(function (functionName) {
            // Delete function.json if exists in function folder
            var filePath = path_1.default.join(functionName, "function.json");
            if (fs_1.default.existsSync(filePath)) {
                fs_1.default.unlinkSync(filePath);
            }
            // Delete function folder if empty
            var items = fs_1.default.readdirSync(functionName);
            if (items.length === 0) {
                fs_1.default.rmdirSync(functionName);
            }
        });
        return Promise.resolve();
    };
    /**
     * Creates the function.json for for the specified function
     */
    PackageService.prototype.createBinding = function (functionName, functionMetadata) {
        var functionJSON = functionMetadata.params.functionsJson;
        functionJSON.entryPoint = functionMetadata.entryPoint;
        functionJSON.scriptFile = functionMetadata.handlerPath;
        var functionObject = this.configService.getFunctionConfig()[functionName];
        var bindingAzureSettings = utils_1.Utils.getIncomingBindingConfig(functionObject)["x-azure-settings"];
        if (bindingAzureSettings.route) {
            // Find incoming binding within functionJSON and set the route
            var index = functionJSON.bindings
                .findIndex(function (binding) { return (!binding.direction || binding.direction === "in"); });
            functionJSON.bindings[index].route = bindingAzureSettings.route;
        }
        var functionDirPath = path_1.default.join(this.serverless.config.servicePath, functionName);
        if (!fs_1.default.existsSync(functionDirPath)) {
            fs_1.default.mkdirSync(functionDirPath);
        }
        var functionJsonString = this.stringify(functionJSON);
        fs_1.default.writeFileSync(path_1.default.join(functionDirPath, "function.json"), functionJsonString);
        return Promise.resolve();
    };
    return PackageService;
}(baseService_1.BaseService));
exports.PackageService = PackageService;
