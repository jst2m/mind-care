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
exports.Message = void 0;
var typeorm_1 = require("typeorm");
var utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
var Message = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _deUuid_decorators;
    var _deUuid_initializers = [];
    var _deUuid_extraInitializers = [];
    var _aUuid_decorators;
    var _aUuid_initializers = [];
    var _aUuid_extraInitializers = [];
    var _dateEnvoi_decorators;
    var _dateEnvoi_initializers = [];
    var _dateEnvoi_extraInitializers = [];
    var _contenu_decorators;
    var _contenu_initializers = [];
    var _contenu_extraInitializers = [];
    var _emetteur_decorators;
    var _emetteur_initializers = [];
    var _emetteur_extraInitializers = [];
    var _destinataire_decorators;
    var _destinataire_initializers = [];
    var _destinataire_extraInitializers = [];
    var Message = _classThis = /** @class */ (function () {
        function Message_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.deUuid = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _deUuid_initializers, void 0));
            this.aUuid = (__runInitializers(this, _deUuid_extraInitializers), __runInitializers(this, _aUuid_initializers, void 0));
            this.dateEnvoi = (__runInitializers(this, _aUuid_extraInitializers), __runInitializers(this, _dateEnvoi_initializers, void 0));
            this.contenu = (__runInitializers(this, _dateEnvoi_extraInitializers), __runInitializers(this, _contenu_initializers, void 0));
            this.emetteur = (__runInitializers(this, _contenu_extraInitializers), __runInitializers(this, _emetteur_initializers, void 0));
            this.destinataire = (__runInitializers(this, _emetteur_extraInitializers), __runInitializers(this, _destinataire_initializers, void 0));
            __runInitializers(this, _destinataire_extraInitializers);
        }
        return Message_1;
    }());
    __setFunctionName(_classThis, "Message");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _deUuid_decorators = [(0, typeorm_1.Column)('char', { length: 36, name: 'de_uuid' })];
        _aUuid_decorators = [(0, typeorm_1.Column)('char', { length: 36, name: 'a_uuid' })];
        _dateEnvoi_decorators = [(0, typeorm_1.CreateDateColumn)({ name: 'date_envoi' })];
        _contenu_decorators = [(0, typeorm_1.Column)('varbinary', { length: 4096 })];
        _emetteur_decorators = [(0, typeorm_1.ManyToOne)(function () { return utilisateur_entity_1.Utilisateur; }, { onDelete: 'CASCADE' })];
        _destinataire_decorators = [(0, typeorm_1.ManyToOne)(function () { return utilisateur_entity_1.Utilisateur; }, { onDelete: 'CASCADE' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _deUuid_decorators, { kind: "field", name: "deUuid", static: false, private: false, access: { has: function (obj) { return "deUuid" in obj; }, get: function (obj) { return obj.deUuid; }, set: function (obj, value) { obj.deUuid = value; } }, metadata: _metadata }, _deUuid_initializers, _deUuid_extraInitializers);
        __esDecorate(null, null, _aUuid_decorators, { kind: "field", name: "aUuid", static: false, private: false, access: { has: function (obj) { return "aUuid" in obj; }, get: function (obj) { return obj.aUuid; }, set: function (obj, value) { obj.aUuid = value; } }, metadata: _metadata }, _aUuid_initializers, _aUuid_extraInitializers);
        __esDecorate(null, null, _dateEnvoi_decorators, { kind: "field", name: "dateEnvoi", static: false, private: false, access: { has: function (obj) { return "dateEnvoi" in obj; }, get: function (obj) { return obj.dateEnvoi; }, set: function (obj, value) { obj.dateEnvoi = value; } }, metadata: _metadata }, _dateEnvoi_initializers, _dateEnvoi_extraInitializers);
        __esDecorate(null, null, _contenu_decorators, { kind: "field", name: "contenu", static: false, private: false, access: { has: function (obj) { return "contenu" in obj; }, get: function (obj) { return obj.contenu; }, set: function (obj, value) { obj.contenu = value; } }, metadata: _metadata }, _contenu_initializers, _contenu_extraInitializers);
        __esDecorate(null, null, _emetteur_decorators, { kind: "field", name: "emetteur", static: false, private: false, access: { has: function (obj) { return "emetteur" in obj; }, get: function (obj) { return obj.emetteur; }, set: function (obj, value) { obj.emetteur = value; } }, metadata: _metadata }, _emetteur_initializers, _emetteur_extraInitializers);
        __esDecorate(null, null, _destinataire_decorators, { kind: "field", name: "destinataire", static: false, private: false, access: { has: function (obj) { return "destinataire" in obj; }, get: function (obj) { return obj.destinataire; }, set: function (obj, value) { obj.destinataire = value; } }, metadata: _metadata }, _destinataire_initializers, _destinataire_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Message = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Message = _classThis;
}();
exports.Message = Message;
