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
exports.RendezVous = void 0;
var typeorm_1 = require("typeorm");
var patient_entity_1 = require("../patient/patient.entity");
var professionnel_entity_1 = require("../professionnel/professionnel.entity");
var RendezVous = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _patientUuid_decorators;
    var _patientUuid_initializers = [];
    var _patientUuid_extraInitializers = [];
    var _professionnelUuid_decorators;
    var _professionnelUuid_initializers = [];
    var _professionnelUuid_extraInitializers = [];
    var _dateProgrammee_decorators;
    var _dateProgrammee_initializers = [];
    var _dateProgrammee_extraInitializers = [];
    var _statut_decorators;
    var _statut_initializers = [];
    var _statut_extraInitializers = [];
    var _motif_decorators;
    var _motif_initializers = [];
    var _motif_extraInitializers = [];
    var _dateCreation_decorators;
    var _dateCreation_initializers = [];
    var _dateCreation_extraInitializers = [];
    var _dateMaj_decorators;
    var _dateMaj_initializers = [];
    var _dateMaj_extraInitializers = [];
    var _patient_decorators;
    var _patient_initializers = [];
    var _patient_extraInitializers = [];
    var _professionnel_decorators;
    var _professionnel_initializers = [];
    var _professionnel_extraInitializers = [];
    var RendezVous = _classThis = /** @class */ (function () {
        function RendezVous_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.patientUuid = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _patientUuid_initializers, void 0));
            this.professionnelUuid = (__runInitializers(this, _patientUuid_extraInitializers), __runInitializers(this, _professionnelUuid_initializers, void 0));
            this.dateProgrammee = (__runInitializers(this, _professionnelUuid_extraInitializers), __runInitializers(this, _dateProgrammee_initializers, void 0));
            this.statut = (__runInitializers(this, _dateProgrammee_extraInitializers), __runInitializers(this, _statut_initializers, void 0));
            this.motif = (__runInitializers(this, _statut_extraInitializers), __runInitializers(this, _motif_initializers, void 0));
            this.dateCreation = (__runInitializers(this, _motif_extraInitializers), __runInitializers(this, _dateCreation_initializers, void 0));
            this.dateMaj = (__runInitializers(this, _dateCreation_extraInitializers), __runInitializers(this, _dateMaj_initializers, void 0));
            this.patient = (__runInitializers(this, _dateMaj_extraInitializers), __runInitializers(this, _patient_initializers, void 0));
            this.professionnel = (__runInitializers(this, _patient_extraInitializers), __runInitializers(this, _professionnel_initializers, void 0));
            __runInitializers(this, _professionnel_extraInitializers);
        }
        return RendezVous_1;
    }());
    __setFunctionName(_classThis, "RendezVous");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _patientUuid_decorators = [(0, typeorm_1.Column)('char', { length: 36, name: 'patient_uuid' })];
        _professionnelUuid_decorators = [(0, typeorm_1.Column)('char', { length: 36, name: 'professionnel_uuid' })];
        _dateProgrammee_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', name: 'date_programmee' })];
        _statut_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: ['scheduled', 'done', 'cancelled'], default: 'scheduled' })];
        _motif_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _dateCreation_decorators = [(0, typeorm_1.CreateDateColumn)({ name: 'date_creation' })];
        _dateMaj_decorators = [(0, typeorm_1.UpdateDateColumn)({ name: 'date_maj' })];
        _patient_decorators = [(0, typeorm_1.ManyToOne)(function () { return patient_entity_1.Patient; }, { onDelete: 'CASCADE' })];
        _professionnel_decorators = [(0, typeorm_1.ManyToOne)(function () { return professionnel_entity_1.Professionnel; }, { onDelete: 'CASCADE' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _patientUuid_decorators, { kind: "field", name: "patientUuid", static: false, private: false, access: { has: function (obj) { return "patientUuid" in obj; }, get: function (obj) { return obj.patientUuid; }, set: function (obj, value) { obj.patientUuid = value; } }, metadata: _metadata }, _patientUuid_initializers, _patientUuid_extraInitializers);
        __esDecorate(null, null, _professionnelUuid_decorators, { kind: "field", name: "professionnelUuid", static: false, private: false, access: { has: function (obj) { return "professionnelUuid" in obj; }, get: function (obj) { return obj.professionnelUuid; }, set: function (obj, value) { obj.professionnelUuid = value; } }, metadata: _metadata }, _professionnelUuid_initializers, _professionnelUuid_extraInitializers);
        __esDecorate(null, null, _dateProgrammee_decorators, { kind: "field", name: "dateProgrammee", static: false, private: false, access: { has: function (obj) { return "dateProgrammee" in obj; }, get: function (obj) { return obj.dateProgrammee; }, set: function (obj, value) { obj.dateProgrammee = value; } }, metadata: _metadata }, _dateProgrammee_initializers, _dateProgrammee_extraInitializers);
        __esDecorate(null, null, _statut_decorators, { kind: "field", name: "statut", static: false, private: false, access: { has: function (obj) { return "statut" in obj; }, get: function (obj) { return obj.statut; }, set: function (obj, value) { obj.statut = value; } }, metadata: _metadata }, _statut_initializers, _statut_extraInitializers);
        __esDecorate(null, null, _motif_decorators, { kind: "field", name: "motif", static: false, private: false, access: { has: function (obj) { return "motif" in obj; }, get: function (obj) { return obj.motif; }, set: function (obj, value) { obj.motif = value; } }, metadata: _metadata }, _motif_initializers, _motif_extraInitializers);
        __esDecorate(null, null, _dateCreation_decorators, { kind: "field", name: "dateCreation", static: false, private: false, access: { has: function (obj) { return "dateCreation" in obj; }, get: function (obj) { return obj.dateCreation; }, set: function (obj, value) { obj.dateCreation = value; } }, metadata: _metadata }, _dateCreation_initializers, _dateCreation_extraInitializers);
        __esDecorate(null, null, _dateMaj_decorators, { kind: "field", name: "dateMaj", static: false, private: false, access: { has: function (obj) { return "dateMaj" in obj; }, get: function (obj) { return obj.dateMaj; }, set: function (obj, value) { obj.dateMaj = value; } }, metadata: _metadata }, _dateMaj_initializers, _dateMaj_extraInitializers);
        __esDecorate(null, null, _patient_decorators, { kind: "field", name: "patient", static: false, private: false, access: { has: function (obj) { return "patient" in obj; }, get: function (obj) { return obj.patient; }, set: function (obj, value) { obj.patient = value; } }, metadata: _metadata }, _patient_initializers, _patient_extraInitializers);
        __esDecorate(null, null, _professionnel_decorators, { kind: "field", name: "professionnel", static: false, private: false, access: { has: function (obj) { return "professionnel" in obj; }, get: function (obj) { return obj.professionnel; }, set: function (obj, value) { obj.professionnel = value; } }, metadata: _metadata }, _professionnel_initializers, _professionnel_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RendezVous = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RendezVous = _classThis;
}();
exports.RendezVous = RendezVous;
