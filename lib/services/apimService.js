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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var xml_1 = __importDefault(require("xml"));
var arm_apimanagement_1 = require("@azure/arm-apimanagement");
var functionAppService_1 = require("./functionAppService");
var baseService_1 = require("./baseService");
var guard_1 = require("../shared/guard");
var apim_1 = require("../armTemplates/resources/apim");
/**
 * APIM Service handles deployment and integration with Azure API Management
 */
var ApimService = /** @class */ (function (_super) {
    __extends(ApimService, _super);
    function ApimService(serverless, options) {
        var _this = _super.call(this, serverless, options) || this;
        _this.apimConfig = _this.config.provider.apim;
        if (!_this.apimConfig) {
            return _this;
        }
        if (typeof (_this.apimConfig) === "boolean") {
            _this.apimConfig = {
                name: null,
                apis: [],
            };
        }
        if (!_this.apimConfig.name) {
            _this.apimConfig.name = apim_1.ApimResource.getResourceName(_this.config);
        }
        if (!_this.apimConfig.apis) {
            _this.apimConfig.apis = [];
        }
        if (!_this.apimConfig.backends) {
            _this.apimConfig.backends = [];
        }
        _this.apimClient = new arm_apimanagement_1.ApiManagementClient(_this.credentials, _this.subscriptionId);
        _this.functionAppService = new functionAppService_1.FunctionAppService(serverless, options);
        return _this;
    }
    /**
     * Gets the configured APIM resource
     */
    ApimService.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.apimConfig && this.apimConfig.name)) {
                            return [2 /*return*/, null];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.apimClient.apiManagementService.get(this.resourceGroup, this.apimConfig.name)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets the APIM API by API name
     * @param apiName The API to retrieve
     */
    ApimService.prototype.getApi = function (apiName) {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        guard_1.Guard.empty(apiName);
                        if (!(this.apimConfig && this.apimConfig.name)) {
                            return [2 /*return*/, null];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.apimClient.api.get(this.resourceGroup, this.apimConfig.name, apiName)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Deploys the APIM top level api
     */
    ApimService.prototype.deploy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var functionApp, resource, apiTasks, backendTasks;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.apimConfig && this.apimConfig.name)) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.functionAppService.get()];
                    case 1:
                        functionApp = _a.sent();
                        this.setApimDefaults(functionApp);
                        return [4 /*yield*/, this.ensureFunctionAppKeys(functionApp)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.get()];
                    case 3:
                        resource = _a.sent();
                        apiTasks = this.apimConfig.apis.map(function (api) { return _this.ensureApi(api); });
                        backendTasks = this.apimConfig.backends.map(function (backend) { return _this.ensureBackend(functionApp, backend); });
                        return [4 /*yield*/, Promise.all(apiTasks)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, Promise.all(backendTasks)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.deployFunctions(functionApp, resource)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Deploys all the functions of the serverless service to APIM
     */
    ApimService.prototype.deployFunctions = function (functionApp, resource) {
        return __awaiter(this, void 0, void 0, function () {
            var deployApiTasks;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        guard_1.Guard.null(resource);
                        if (!(this.apimConfig && this.apimConfig.name)) {
                            return [2 /*return*/, null];
                        }
                        this.log("-> Deploying API Operations: " + this.apimConfig.name);
                        deployApiTasks = this.serverless.service
                            .getAllFunctions()
                            .map(function (functionName) { return _this.deployFunction(functionApp, resource, functionName); });
                        return [4 /*yield*/, Promise.all(deployApiTasks)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Deploys the specified serverless function  to APIM
     * @param options
     */
    ApimService.prototype.deployFunction = function (functionApp, resource, functionName) {
        return __awaiter(this, void 0, void 0, function () {
            var functionConfig, httpEvent, httpConfig, operations, apiContract, backendContract, tasks;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        guard_1.Guard.null(functionApp);
                        guard_1.Guard.null(resource);
                        guard_1.Guard.empty(functionName);
                        functionConfig = this.serverless.service["functions"][functionName];
                        functionConfig.name = functionName;
                        httpEvent = functionConfig.events.find(function (event) { return event.http; });
                        if (!httpEvent) {
                            return [2 /*return*/];
                        }
                        httpConfig = httpEvent["x-azure-settings"];
                        // Default to GET method if not specified
                        if (!httpConfig.methods) {
                            httpConfig.methods = ["GET"];
                        }
                        // Infer APIM operation configuration from HTTP event if not already set
                        if (!functionConfig.apim) {
                            operations = httpConfig.methods.map(function (method) {
                                return {
                                    name: method + "-" + functionConfig.name,
                                    displayName: functionConfig.name + " (" + method + ")",
                                    urlTemplate: httpConfig.route || functionConfig.name,
                                    method: method,
                                    templateParameters: _this.getTemplateParameters(httpConfig.route)
                                };
                            });
                            functionConfig.apim = { operations: operations };
                        }
                        apiContract = functionConfig.apim.api
                            ? this.apimConfig.apis.find(function (api) { return api.name === functionConfig.apim.api; })
                            : this.apimConfig.apis[0];
                        backendContract = functionConfig.apim.backend
                            ? this.apimConfig.backends.find(function (backend) { return backend.name === functionConfig.apim.backend; })
                            : this.apimConfig.backends[0];
                        tasks = functionConfig.apim.operations
                            .map(function (operation) { return _this.deployOperation(resource, apiContract, backendContract, operation, functionName); });
                        return [4 /*yield*/, Promise.all(tasks)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves the template parameter referenced in the route template
     * @param route The route template to inspect
     */
    ApimService.prototype.getTemplateParameters = function (route) {
        var regex = new RegExp(/{(\w+)}/g);
        var matches = [];
        while (true) {
            var match = regex.exec(route);
            if (!match) {
                break;
            }
            matches.push(match);
        }
        ;
        if (matches.length === 0) {
            return null;
        }
        return matches.map(function (match) { return ({
            name: match[1],
            type: "string",
        }); });
    };
    /**
     * Deploys the APIM API referenced by the serverless service
     */
    ApimService.prototype.ensureApi = function (apiContract) {
        return __awaiter(this, void 0, void 0, function () {
            var api, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log("-> Deploying API: " + apiContract.name);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.apimClient.api.createOrUpdate(this.resourceGroup, this.apimConfig.name, apiContract.name, __assign({}, apiContract, { isCurrent: true }))];
                    case 2:
                        api = _a.sent();
                        if (!this.apimConfig.cors) return [3 /*break*/, 4];
                        this.log("-> Deploying CORS policy: " + apiContract.name);
                        return [4 /*yield*/, this.apimClient.apiPolicy.createOrUpdate(this.resourceGroup, this.apimConfig.name, apiContract.name, {
                                format: "rawxml",
                                value: this.createCorsXmlPolicy(this.apimConfig.cors)
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, api];
                    case 5:
                        e_1 = _a.sent();
                        this.log("Error creating APIM API");
                        this.log(this.stringify(e_1.body));
                        throw e_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Deploys the APIM Backend referenced by the serverless service
     * @param functionAppUrl The host name for the deployed function app
     */
    ApimService.prototype.ensureBackend = function (functionApp, backendContract) {
        return __awaiter(this, void 0, void 0, function () {
            var backendUrl, functionAppResourceId, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        backendUrl = "https://" + functionApp.defaultHostName + "/" + backendContract.url;
                        this.log("-> Deploying API Backend: " + backendContract.name + " => " + backendUrl);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        functionAppResourceId = "https://management.azure.com" + functionApp.id;
                        return [4 /*yield*/, this.apimClient.backend.createOrUpdate(this.resourceGroup, this.apimConfig.name, backendContract.name, {
                                credentials: {
                                    header: {
                                        "x-functions-key": ["{{" + this.serviceName + "-key}}"],
                                    },
                                },
                                name: backendContract.name,
                                title: backendContract.title || functionApp.name,
                                tls: backendContract.tls,
                                proxy: backendContract.proxy,
                                description: backendContract.description,
                                protocol: backendContract.protocol || "http",
                                resourceId: functionAppResourceId,
                                url: backendUrl,
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        e_2 = _a.sent();
                        this.log("Error creating APIM Backend");
                        this.log(this.stringify(e_2.body));
                        throw e_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Deploys a single APIM api operation for the specified function
     * @param serverless The serverless framework
     * @param options The plugin options
     */
    ApimService.prototype.deployOperation = function (resource, api, backend, operation, functionName) {
        return __awaiter(this, void 0, void 0, function () {
            var client, operationConfig, operationPath, operationUrl, result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        client = new arm_apimanagement_1.ApiManagementClient(this.credentials, this.subscriptionId);
                        operationConfig = {
                            name: operation.name || functionName,
                            displayName: operation.displayName || functionName,
                            description: operation.description || "",
                            method: operation.method,
                            urlTemplate: operation.urlTemplate,
                            templateParameters: operation.templateParameters || [],
                            responses: operation.responses || [],
                        };
                        operationPath = ("/" + api.path + "/" + operationConfig.urlTemplate).replace(/\/+/g, "/");
                        operationUrl = "" + resource.gatewayUrl + operationPath;
                        this.log("--> " + operationConfig.name + ": [" + operationConfig.method.toUpperCase() + "] " + operationUrl);
                        return [4 /*yield*/, client.apiOperation.createOrUpdate(this.resourceGroup, this.apimConfig.name, api.name, operationConfig.name, operationConfig)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, client.apiOperationPolicy.createOrUpdate(this.resourceGroup, this.apimConfig.name, api.name, operationConfig.name, {
                                format: "rawxml",
                                value: this.createApiOperationXmlPolicy(backend.name),
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        e_3 = _a.sent();
                        this.log("Error deploying API operation " + functionName);
                        this.log(this.stringify(e_3.body));
                        throw e_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets the master key for the function app and stores a reference in the APIM instance
     * @param functionAppUrl The host name for the Azure function app
     */
    ApimService.prototype.ensureFunctionAppKeys = function (functionApp) {
        return __awaiter(this, void 0, void 0, function () {
            var masterKey, keyName, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log("-> Deploying API keys");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.functionAppService.getMasterKey(functionApp)];
                    case 2:
                        masterKey = _a.sent();
                        keyName = this.serviceName + "-key";
                        return [4 /*yield*/, this.apimClient.property.createOrUpdate(this.resourceGroup, this.apimConfig.name, keyName, {
                                displayName: keyName,
                                secret: true,
                                value: masterKey,
                            })];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        e_4 = _a.sent();
                        this.log("Error creating APIM Property");
                        this.log(this.stringify(e_4.body));
                        throw e_4;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creates the XML payload that defines the API operation policy to link to the configured backend
     */
    ApimService.prototype.createApiOperationXmlPolicy = function (backendId) {
        var operationPolicy = [{
                policies: [
                    {
                        inbound: [
                            { base: null },
                            {
                                "set-backend-service": [
                                    {
                                        "_attr": {
                                            "id": "apim-generated-policy",
                                            "backend-id": backendId,
                                        }
                                    },
                                ],
                            },
                        ],
                    },
                    { backend: [{ base: null }] },
                    { outbound: [{ base: null }] },
                    { "on-error": [{ base: null }] },
                ]
            }];
        return xml_1.default(operationPolicy);
    };
    /**
     * Creates the XML payload that defines the specified CORS policy
     * @param corsPolicy The CORS policy
     */
    ApimService.prototype.createCorsXmlPolicy = function (corsPolicy) {
        var origins = corsPolicy.allowedOrigins ? corsPolicy.allowedOrigins.map(function (origin) { return ({ origin: origin }); }) : null;
        var methods = corsPolicy.allowedMethods ? corsPolicy.allowedMethods.map(function (method) { return ({ method: method }); }) : null;
        var allowedHeaders = corsPolicy.allowedHeaders ? corsPolicy.allowedHeaders.map(function (header) { return ({ header: header }); }) : null;
        var exposeHeaders = corsPolicy.exposeHeaders ? corsPolicy.exposeHeaders.map(function (header) { return ({ header: header }); }) : null;
        var policy = [{
                policies: [
                    {
                        inbound: [
                            { base: null },
                            {
                                cors: [
                                    { "_attr": { "allow-credentials": corsPolicy.allowCredentials } },
                                    { "allowed-origins": origins },
                                    { "allowed-methods": methods },
                                    { "allowed-headers": allowedHeaders },
                                    { "expose-headers": exposeHeaders },
                                ]
                            }
                        ],
                    },
                    { backend: [{ base: null }] },
                    { outbound: [{ base: null }] },
                    { "on-error": [{ base: null }] },
                ]
            }];
        return xml_1.default(policy, { indent: "\t" });
    };
    /**
     * Sets up APIM defaults if not explicitly defined
     * @param functionApp The function app resource
     */
    ApimService.prototype.setApimDefaults = function (functionApp) {
        var defaultApi = {
            isCurrent: true,
            name: this.serviceName + "-api",
            subscriptionRequired: false,
            displayName: "API",
            description: "",
            path: "api",
            protocols: ["http", "https"]
        };
        if (this.apimConfig.apis.length === 0) {
            this.apimConfig.apis.push(defaultApi);
        }
        var functionAppResourceId = "https://management.azure.com" + functionApp.id;
        // Configure a default backend link if not explicity defined
        var defaultBackend = {
            credentials: {
                header: {
                    "x-functions-key": ["{{" + this.serviceName + "-key}}"],
                },
            },
            name: this.serviceName + "-backend",
            title: functionApp.name,
            description: "Function App Backend",
            protocol: "http",
            resourceId: functionAppResourceId,
            url: "api"
        };
        if (this.apimConfig.backends.length === 0) {
            this.apimConfig.backends.push(defaultBackend);
        }
    };
    return ApimService;
}(baseService_1.BaseService));
exports.ApimService = ApimService;
