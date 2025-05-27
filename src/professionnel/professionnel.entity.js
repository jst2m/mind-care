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
exports.Professionnel = void 0;
var typeorm_1 = require("typeorm");
var utilisateur_entity_1 = require("../utilisateur/utilisateur.entity");
var Professionnel = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _uuid_decorators;
    var _uuid_initializers = [];
    var _uuid_extraInitializers = [];
    var _specialite_decorators;
    var _specialite_initializers = [];
    var _specialite_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _telephonePro_decorators;
    var _telephonePro_initializers = [];
    var _telephonePro_extraInitializers = [];
    var _siteWeb_decorators;
    var _siteWeb_initializers = [];
    var _siteWeb_extraInitializers = [];
    var _dateCreation_decorators;
    var _dateCreation_initializers = [];
    var _dateCreation_extraInitializers = [];
    var _dateMaj_decorators;
    var _dateMaj_initializers = [];
    var _dateMaj_extraInitializers = [];
    var _utilisateur_decorators;
    var _utilisateur_initializers = [];
    var _utilisateur_extraInitializers = [];
    var Professionnel = _classThis = /** @class */ (function () {
        function Professionnel_1() {
            this.uuid = __runInitializers(this, _uuid_initializers, void 0);
            this.specialite = (__runInitializers(this, _uuid_extraInitializers), __runInitializers(this, _specialite_initializers, void 0));
            this.description = (__runInitializers(this, _specialite_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.telephonePro = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _telephonePro_initializers, void 0));
            this.siteWeb = (__runInitializers(this, _telephonePro_extraInitializers), __runInitializers(this, _siteWeb_initializers, void 0));
            this.dateCreation = (__runInitializers(this, _siteWeb_extraInitializers), __runInitializers(this, _dateCreation_initializers, void 0));
            this.dateMaj = (__runInitializers(this, _dateCreation_extraInitializers), __runInitializers(this, _dateMaj_initializers, void 0));
            this.utilisateur = (__runInitializers(this, _dateMaj_extraInitializers), __runInitializers(this, _utilisateur_initializers, void 0));
            __runInitializers(this, _utilisateur_extraInitializers);
        }
        return Professionnel_1;
    }());
    __setFunctionName(_classThis, "Professionnel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _uuid_decorators = [(0, typeorm_1.PrimaryColumn)('char', { length: 36 })];
        _specialite_decorators = [(0, typeorm_1.Column)()];
        _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _telephonePro_decorators = [(0, typeorm_1.Column)({ name: 'telephone_pro', nullable: true })];
        _siteWeb_decorators = [(0, typeorm_1.Column)({ name: 'site_web', nullable: true })];
        _dateCreation_decorators = [(0, typeorm_1.CreateDateColumn)({ name: 'date_creation' })];
        _dateMaj_decorators = [(0, typeorm_1.UpdateDateColumn)({ name: 'date_maj' })];
        _utilisateur_decorators = [(0, typeorm_1.OneToOne)(function () { return utilisateur_entity_1.Utilisateur; }, function (u) { return u.professionnel; }), (0, typeorm_1.JoinColumn)({ name: 'uuid' })];
        __esDecorate(null, null, _uuid_decorators, { kind: "field", name: "uuid", static: false, private: false, access: { has: function (obj) { return "uuid" in obj; }, get: function (obj) { return obj.uuid; }, set: function (obj, value) { obj.uuid = value; } }, metadata: _metadata }, _uuid_initializers, _uuid_extraInitializers);
        __esDecorate(null, null, _specialite_decorators, { kind: "field", name: "specialite", static: false, private: false, access: { has: function (obj) { return "specialite" in obj; }, get: function (obj) { return obj.specialite; }, set: function (obj, value) { obj.specialite = value; } }, metadata: _metadata }, _specialite_initializers, _specialite_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _telephonePro_decorators, { kind: "field", name: "telephonePro", static: false, private: false, access: { has: function (obj) { return "telephonePro" in obj; }, get: function (obj) { return obj.telephonePro; }, set: function (obj, value) { obj.telephonePro = value; } }, metadata: _metadata }, _telephonePro_initializers, _telephonePro_extraInitializers);
        __esDecorate(null, null, _siteWeb_decorators, { kind: "field", name: "siteWeb", static: false, private: false, access: { has: function (obj) { return "siteWeb" in obj; }, get: function (obj) { return obj.siteWeb; }, set: function (obj, value) { obj.siteWeb = value; } }, metadata: _metadata }, _siteWeb_initializers, _siteWeb_extraInitializers);
        __esDecorate(null, null, _dateCreation_decorators, { kind: "field", name: "dateCreation", static: false, private: false, access: { has: function (obj) { return "dateCreation" in obj; }, get: function (obj) { return obj.dateCreation; }, set: function (obj, value) { obj.dateCreation = value; } }, metadata: _metadata }, _dateCreation_initializers, _dateCreation_extraInitializers);
        __esDecorate(null, null, _dateMaj_decorators, { kind: "field", name: "dateMaj", static: false, private: false, access: { has: function (obj) { return "dateMaj" in obj; }, get: function (obj) { return obj.dateMaj; }, set: function (obj, value) { obj.dateMaj = value; } }, metadata: _metadata }, _dateMaj_initializers, _dateMaj_extraInitializers);
        __esDecorate(null, null, _utilisateur_decorators, { kind: "field", name: "utilisateur", static: false, private: false, access: { has: function (obj) { return "utilisateur" in obj; }, get: function (obj) { return obj.utilisateur; }, set: function (obj, value) { obj.utilisateur = value; } }, metadata: _metadata }, _utilisateur_initializers, _utilisateur_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Professionnel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Professionnel = _classThis;
}();
exports.Professionnel = Professionnel;
