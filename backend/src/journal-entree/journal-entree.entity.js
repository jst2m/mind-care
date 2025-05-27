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
exports.JournalEntree = void 0;
var typeorm_1 = require("typeorm");
var patient_entity_1 = require("../patient/patient.entity");
var JournalEntree = function () {
    var _classDecorators = [(0, typeorm_1.Entity)(), (0, typeorm_1.Index)(['patientUuid', 'dateJournal'])];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _patientUuid_decorators;
    var _patientUuid_initializers = [];
    var _patientUuid_extraInitializers = [];
    var _dateJournal_decorators;
    var _dateJournal_initializers = [];
    var _dateJournal_extraInitializers = [];
    var _titre_decorators;
    var _titre_initializers = [];
    var _titre_extraInitializers = [];
    var _contenu_decorators;
    var _contenu_initializers = [];
    var _contenu_extraInitializers = [];
    var _humeur_decorators;
    var _humeur_initializers = [];
    var _humeur_extraInitializers = [];
    var _tags_decorators;
    var _tags_initializers = [];
    var _tags_extraInitializers = [];
    var _confidentiel_decorators;
    var _confidentiel_initializers = [];
    var _confidentiel_extraInitializers = [];
    var _dateCreation_decorators;
    var _dateCreation_initializers = [];
    var _dateCreation_extraInitializers = [];
    var _dateMaj_decorators;
    var _dateMaj_initializers = [];
    var _dateMaj_extraInitializers = [];
    var _patient_decorators;
    var _patient_initializers = [];
    var _patient_extraInitializers = [];
    var JournalEntree = _classThis = /** @class */ (function () {
        function JournalEntree_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.patientUuid = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _patientUuid_initializers, void 0));
            this.dateJournal = (__runInitializers(this, _patientUuid_extraInitializers), __runInitializers(this, _dateJournal_initializers, void 0));
            this.titre = (__runInitializers(this, _dateJournal_extraInitializers), __runInitializers(this, _titre_initializers, void 0));
            this.contenu = (__runInitializers(this, _titre_extraInitializers), __runInitializers(this, _contenu_initializers, void 0));
            this.humeur = (__runInitializers(this, _contenu_extraInitializers), __runInitializers(this, _humeur_initializers, void 0));
            this.tags = (__runInitializers(this, _humeur_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
            this.confidentiel = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _confidentiel_initializers, void 0));
            this.dateCreation = (__runInitializers(this, _confidentiel_extraInitializers), __runInitializers(this, _dateCreation_initializers, void 0));
            this.dateMaj = (__runInitializers(this, _dateCreation_extraInitializers), __runInitializers(this, _dateMaj_initializers, void 0));
            this.patient = (__runInitializers(this, _dateMaj_extraInitializers), __runInitializers(this, _patient_initializers, void 0));
            __runInitializers(this, _patient_extraInitializers);
        }
        return JournalEntree_1;
    }());
    __setFunctionName(_classThis, "JournalEntree");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _patientUuid_decorators = [(0, typeorm_1.Column)('char', { length: 36, name: 'patient_uuid' })];
        _dateJournal_decorators = [(0, typeorm_1.Column)({ type: 'date', name: 'date_journal' })];
        _titre_decorators = [(0, typeorm_1.Column)()];
        _contenu_decorators = [(0, typeorm_1.Column)('text')];
        _humeur_decorators = [(0, typeorm_1.Column)({ type: 'tinyint', nullable: true })];
        _tags_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
        _confidentiel_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _dateCreation_decorators = [(0, typeorm_1.CreateDateColumn)({ name: 'date_creation' })];
        _dateMaj_decorators = [(0, typeorm_1.UpdateDateColumn)({ name: 'date_maj' })];
        _patient_decorators = [(0, typeorm_1.ManyToOne)(function () { return patient_entity_1.Patient; }, function (p) { return p.uuid; }, { onDelete: 'CASCADE' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _patientUuid_decorators, { kind: "field", name: "patientUuid", static: false, private: false, access: { has: function (obj) { return "patientUuid" in obj; }, get: function (obj) { return obj.patientUuid; }, set: function (obj, value) { obj.patientUuid = value; } }, metadata: _metadata }, _patientUuid_initializers, _patientUuid_extraInitializers);
        __esDecorate(null, null, _dateJournal_decorators, { kind: "field", name: "dateJournal", static: false, private: false, access: { has: function (obj) { return "dateJournal" in obj; }, get: function (obj) { return obj.dateJournal; }, set: function (obj, value) { obj.dateJournal = value; } }, metadata: _metadata }, _dateJournal_initializers, _dateJournal_extraInitializers);
        __esDecorate(null, null, _titre_decorators, { kind: "field", name: "titre", static: false, private: false, access: { has: function (obj) { return "titre" in obj; }, get: function (obj) { return obj.titre; }, set: function (obj, value) { obj.titre = value; } }, metadata: _metadata }, _titre_initializers, _titre_extraInitializers);
        __esDecorate(null, null, _contenu_decorators, { kind: "field", name: "contenu", static: false, private: false, access: { has: function (obj) { return "contenu" in obj; }, get: function (obj) { return obj.contenu; }, set: function (obj, value) { obj.contenu = value; } }, metadata: _metadata }, _contenu_initializers, _contenu_extraInitializers);
        __esDecorate(null, null, _humeur_decorators, { kind: "field", name: "humeur", static: false, private: false, access: { has: function (obj) { return "humeur" in obj; }, get: function (obj) { return obj.humeur; }, set: function (obj, value) { obj.humeur = value; } }, metadata: _metadata }, _humeur_initializers, _humeur_extraInitializers);
        __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: function (obj) { return "tags" in obj; }, get: function (obj) { return obj.tags; }, set: function (obj, value) { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
        __esDecorate(null, null, _confidentiel_decorators, { kind: "field", name: "confidentiel", static: false, private: false, access: { has: function (obj) { return "confidentiel" in obj; }, get: function (obj) { return obj.confidentiel; }, set: function (obj, value) { obj.confidentiel = value; } }, metadata: _metadata }, _confidentiel_initializers, _confidentiel_extraInitializers);
        __esDecorate(null, null, _dateCreation_decorators, { kind: "field", name: "dateCreation", static: false, private: false, access: { has: function (obj) { return "dateCreation" in obj; }, get: function (obj) { return obj.dateCreation; }, set: function (obj, value) { obj.dateCreation = value; } }, metadata: _metadata }, _dateCreation_initializers, _dateCreation_extraInitializers);
        __esDecorate(null, null, _dateMaj_decorators, { kind: "field", name: "dateMaj", static: false, private: false, access: { has: function (obj) { return "dateMaj" in obj; }, get: function (obj) { return obj.dateMaj; }, set: function (obj, value) { obj.dateMaj = value; } }, metadata: _metadata }, _dateMaj_initializers, _dateMaj_extraInitializers);
        __esDecorate(null, null, _patient_decorators, { kind: "field", name: "patient", static: false, private: false, access: { has: function (obj) { return "patient" in obj; }, get: function (obj) { return obj.patient; }, set: function (obj, value) { obj.patient = value; } }, metadata: _metadata }, _patient_initializers, _patient_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        JournalEntree = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return JournalEntree = _classThis;
}();
exports.JournalEntree = JournalEntree;
