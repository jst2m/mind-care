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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exercice = void 0;
var typeorm_1 = require("typeorm");
var Exercice = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _titre_decorators;
    var _titre_initializers = [];
    var _titre_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _dateCreation_decorators;
    var _dateCreation_initializers = [];
    var _dateCreation_extraInitializers = [];
    var _dateMaj_decorators;
    var _dateMaj_initializers = [];
    var _dateMaj_extraInitializers = [];
    var Exercice = _classThis = /** @class */ (function () {
        function Exercice_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.titre = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _titre_initializers, void 0));
            this.description = (__runInitializers(this, _titre_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.dateCreation = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _dateCreation_initializers, void 0));
            this.dateMaj = (__runInitializers(this, _dateCreation_extraInitializers), __runInitializers(this, _dateMaj_initializers, void 0));
            __runInitializers(this, _dateMaj_extraInitializers);
        }
        return Exercice_1;
    }());
    __setFunctionName(_classThis, "Exercice");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _titre_decorators = [(0, typeorm_1.Column)()];
        _description_decorators = [(0, typeorm_1.Column)('text')];
        _dateCreation_decorators = [(0, typeorm_1.CreateDateColumn)({ name: 'date_creation' })];
        _dateMaj_decorators = [(0, typeorm_1.UpdateDateColumn)({ name: 'date_maj' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _titre_decorators, { kind: "field", name: "titre", static: false, private: false, access: { has: function (obj) { return "titre" in obj; }, get: function (obj) { return obj.titre; }, set: function (obj, value) { obj.titre = value; } }, metadata: _metadata }, _titre_initializers, _titre_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _dateCreation_decorators, { kind: "field", name: "dateCreation", static: false, private: false, access: { has: function (obj) { return "dateCreation" in obj; }, get: function (obj) { return obj.dateCreation; }, set: function (obj, value) { obj.dateCreation = value; } }, metadata: _metadata }, _dateCreation_initializers, _dateCreation_extraInitializers);
        __esDecorate(null, null, _dateMaj_decorators, { kind: "field", name: "dateMaj", static: false, private: false, access: { has: function (obj) { return "dateMaj" in obj; }, get: function (obj) { return obj.dateMaj; }, set: function (obj, value) { obj.dateMaj = value; } }, metadata: _metadata }, _dateMaj_initializers, _dateMaj_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Exercice = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Exercice = _classThis;
}();
exports.Exercice = Exercice;
