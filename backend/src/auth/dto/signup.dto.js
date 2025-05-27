"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupDto = void 0;
var class_validator_1 = require("class-validator");
var SignupDto = function () {
    var _a;
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _motDePasse_decorators;
    var _motDePasse_initializers = [];
    var _motDePasse_extraInitializers = [];
    var _prenom_decorators;
    var _prenom_initializers = [];
    var _prenom_extraInitializers = [];
    var _nom_decorators;
    var _nom_initializers = [];
    var _nom_extraInitializers = [];
    var _dateNaissance_decorators;
    var _dateNaissance_initializers = [];
    var _dateNaissance_extraInitializers = [];
    var _sexe_decorators;
    var _sexe_initializers = [];
    var _sexe_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SignupDto() {
                this.email = __runInitializers(this, _email_initializers, void 0);
                this.motDePasse = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _motDePasse_initializers, void 0));
                this.prenom = (__runInitializers(this, _motDePasse_extraInitializers), __runInitializers(this, _prenom_initializers, void 0));
                this.nom = (__runInitializers(this, _prenom_extraInitializers), __runInitializers(this, _nom_initializers, void 0));
                this.dateNaissance = (__runInitializers(this, _nom_extraInitializers), __runInitializers(this, _dateNaissance_initializers, void 0));
                this.sexe = (__runInitializers(this, _dateNaissance_extraInitializers), __runInitializers(this, _sexe_initializers, void 0));
                this.role = (__runInitializers(this, _sexe_extraInitializers), __runInitializers(this, _role_initializers, void 0));
                __runInitializers(this, _role_extraInitializers);
            }
            return SignupDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _email_decorators = [(0, class_validator_1.IsEmail)()];
            _motDePasse_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(8)];
            _prenom_decorators = [(0, class_validator_1.IsString)()];
            _nom_decorators = [(0, class_validator_1.IsString)()];
            _dateNaissance_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            _sexe_decorators = [(0, class_validator_1.IsEnum)(['Homme', 'Femme', 'Ne préfère pas dire'])];
            _role_decorators = [(0, class_validator_1.IsEnum)(['patient', 'professionnel'])];
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _motDePasse_decorators, { kind: "field", name: "motDePasse", static: false, private: false, access: { has: function (obj) { return "motDePasse" in obj; }, get: function (obj) { return obj.motDePasse; }, set: function (obj, value) { obj.motDePasse = value; } }, metadata: _metadata }, _motDePasse_initializers, _motDePasse_extraInitializers);
            __esDecorate(null, null, _prenom_decorators, { kind: "field", name: "prenom", static: false, private: false, access: { has: function (obj) { return "prenom" in obj; }, get: function (obj) { return obj.prenom; }, set: function (obj, value) { obj.prenom = value; } }, metadata: _metadata }, _prenom_initializers, _prenom_extraInitializers);
            __esDecorate(null, null, _nom_decorators, { kind: "field", name: "nom", static: false, private: false, access: { has: function (obj) { return "nom" in obj; }, get: function (obj) { return obj.nom; }, set: function (obj, value) { obj.nom = value; } }, metadata: _metadata }, _nom_initializers, _nom_extraInitializers);
            __esDecorate(null, null, _dateNaissance_decorators, { kind: "field", name: "dateNaissance", static: false, private: false, access: { has: function (obj) { return "dateNaissance" in obj; }, get: function (obj) { return obj.dateNaissance; }, set: function (obj, value) { obj.dateNaissance = value; } }, metadata: _metadata }, _dateNaissance_initializers, _dateNaissance_extraInitializers);
            __esDecorate(null, null, _sexe_decorators, { kind: "field", name: "sexe", static: false, private: false, access: { has: function (obj) { return "sexe" in obj; }, get: function (obj) { return obj.sexe; }, set: function (obj, value) { obj.sexe = value; } }, metadata: _metadata }, _sexe_initializers, _sexe_extraInitializers);
            __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SignupDto = SignupDto;
