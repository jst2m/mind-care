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
exports.Utilisateur = void 0;
var typeorm_1 = require("typeorm");
var patient_entity_1 = require("../patient/patient.entity");
var professionnel_entity_1 = require("../professionnel/professionnel.entity");
var Utilisateur = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _uuid_decorators;
    var _uuid_initializers = [];
    var _uuid_extraInitializers = [];
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
    var _telephone_decorators;
    var _telephone_initializers = [];
    var _telephone_extraInitializers = [];
    var _adresse_decorators;
    var _adresse_initializers = [];
    var _adresse_extraInitializers = [];
    var _codePostal_decorators;
    var _codePostal_initializers = [];
    var _codePostal_extraInitializers = [];
    var _ville_decorators;
    var _ville_initializers = [];
    var _ville_extraInitializers = [];
    var _sexe_decorators;
    var _sexe_initializers = [];
    var _sexe_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var _dateCreation_decorators;
    var _dateCreation_initializers = [];
    var _dateCreation_extraInitializers = [];
    var _patient_decorators;
    var _patient_initializers = [];
    var _patient_extraInitializers = [];
    var _professionnel_decorators;
    var _professionnel_initializers = [];
    var _professionnel_extraInitializers = [];
    var Utilisateur = _classThis = /** @class */ (function () {
        function Utilisateur_1() {
            this.uuid = __runInitializers(this, _uuid_initializers, void 0);
            this.email = (__runInitializers(this, _uuid_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.motDePasse = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _motDePasse_initializers, void 0));
            this.prenom = (__runInitializers(this, _motDePasse_extraInitializers), __runInitializers(this, _prenom_initializers, void 0));
            this.nom = (__runInitializers(this, _prenom_extraInitializers), __runInitializers(this, _nom_initializers, void 0));
            this.dateNaissance = (__runInitializers(this, _nom_extraInitializers), __runInitializers(this, _dateNaissance_initializers, void 0));
            this.telephone = (__runInitializers(this, _dateNaissance_extraInitializers), __runInitializers(this, _telephone_initializers, void 0));
            this.adresse = (__runInitializers(this, _telephone_extraInitializers), __runInitializers(this, _adresse_initializers, void 0));
            this.codePostal = (__runInitializers(this, _adresse_extraInitializers), __runInitializers(this, _codePostal_initializers, void 0));
            this.ville = (__runInitializers(this, _codePostal_extraInitializers), __runInitializers(this, _ville_initializers, void 0));
            this.sexe = (__runInitializers(this, _ville_extraInitializers), __runInitializers(this, _sexe_initializers, void 0));
            this.role = (__runInitializers(this, _sexe_extraInitializers), __runInitializers(this, _role_initializers, void 0));
            this.dateCreation = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _dateCreation_initializers, void 0));
            this.patient = (__runInitializers(this, _dateCreation_extraInitializers), __runInitializers(this, _patient_initializers, void 0));
            this.professionnel = (__runInitializers(this, _patient_extraInitializers), __runInitializers(this, _professionnel_initializers, void 0));
            __runInitializers(this, _professionnel_extraInitializers);
        }
        return Utilisateur_1;
    }());
    __setFunctionName(_classThis, "Utilisateur");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _uuid_decorators = [(0, typeorm_1.PrimaryColumn)('char', { length: 36 })];
        _email_decorators = [(0, typeorm_1.Column)({ unique: true })];
        _motDePasse_decorators = [(0, typeorm_1.Column)()];
        _prenom_decorators = [(0, typeorm_1.Column)()];
        _nom_decorators = [(0, typeorm_1.Column)()];
        _dateNaissance_decorators = [(0, typeorm_1.Column)({ type: 'date', nullable: true })];
        _telephone_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _adresse_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _codePostal_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _ville_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _sexe_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: ['Homme', 'Femme', 'Ne préfère pas dire'] })];
        _role_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: ['patient', 'professionnel'] })];
        _dateCreation_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', default: function () { return 'CURRENT_TIMESTAMP'; } })];
        _patient_decorators = [(0, typeorm_1.OneToOne)(function () { return patient_entity_1.Patient; }, function (p) { return p.utilisateur; })];
        _professionnel_decorators = [(0, typeorm_1.OneToOne)(function () { return professionnel_entity_1.Professionnel; }, function (pr) { return pr.utilisateur; })];
        __esDecorate(null, null, _uuid_decorators, { kind: "field", name: "uuid", static: false, private: false, access: { has: function (obj) { return "uuid" in obj; }, get: function (obj) { return obj.uuid; }, set: function (obj, value) { obj.uuid = value; } }, metadata: _metadata }, _uuid_initializers, _uuid_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _motDePasse_decorators, { kind: "field", name: "motDePasse", static: false, private: false, access: { has: function (obj) { return "motDePasse" in obj; }, get: function (obj) { return obj.motDePasse; }, set: function (obj, value) { obj.motDePasse = value; } }, metadata: _metadata }, _motDePasse_initializers, _motDePasse_extraInitializers);
        __esDecorate(null, null, _prenom_decorators, { kind: "field", name: "prenom", static: false, private: false, access: { has: function (obj) { return "prenom" in obj; }, get: function (obj) { return obj.prenom; }, set: function (obj, value) { obj.prenom = value; } }, metadata: _metadata }, _prenom_initializers, _prenom_extraInitializers);
        __esDecorate(null, null, _nom_decorators, { kind: "field", name: "nom", static: false, private: false, access: { has: function (obj) { return "nom" in obj; }, get: function (obj) { return obj.nom; }, set: function (obj, value) { obj.nom = value; } }, metadata: _metadata }, _nom_initializers, _nom_extraInitializers);
        __esDecorate(null, null, _dateNaissance_decorators, { kind: "field", name: "dateNaissance", static: false, private: false, access: { has: function (obj) { return "dateNaissance" in obj; }, get: function (obj) { return obj.dateNaissance; }, set: function (obj, value) { obj.dateNaissance = value; } }, metadata: _metadata }, _dateNaissance_initializers, _dateNaissance_extraInitializers);
        __esDecorate(null, null, _telephone_decorators, { kind: "field", name: "telephone", static: false, private: false, access: { has: function (obj) { return "telephone" in obj; }, get: function (obj) { return obj.telephone; }, set: function (obj, value) { obj.telephone = value; } }, metadata: _metadata }, _telephone_initializers, _telephone_extraInitializers);
        __esDecorate(null, null, _adresse_decorators, { kind: "field", name: "adresse", static: false, private: false, access: { has: function (obj) { return "adresse" in obj; }, get: function (obj) { return obj.adresse; }, set: function (obj, value) { obj.adresse = value; } }, metadata: _metadata }, _adresse_initializers, _adresse_extraInitializers);
        __esDecorate(null, null, _codePostal_decorators, { kind: "field", name: "codePostal", static: false, private: false, access: { has: function (obj) { return "codePostal" in obj; }, get: function (obj) { return obj.codePostal; }, set: function (obj, value) { obj.codePostal = value; } }, metadata: _metadata }, _codePostal_initializers, _codePostal_extraInitializers);
        __esDecorate(null, null, _ville_decorators, { kind: "field", name: "ville", static: false, private: false, access: { has: function (obj) { return "ville" in obj; }, get: function (obj) { return obj.ville; }, set: function (obj, value) { obj.ville = value; } }, metadata: _metadata }, _ville_initializers, _ville_extraInitializers);
        __esDecorate(null, null, _sexe_decorators, { kind: "field", name: "sexe", static: false, private: false, access: { has: function (obj) { return "sexe" in obj; }, get: function (obj) { return obj.sexe; }, set: function (obj, value) { obj.sexe = value; } }, metadata: _metadata }, _sexe_initializers, _sexe_extraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, null, _dateCreation_decorators, { kind: "field", name: "dateCreation", static: false, private: false, access: { has: function (obj) { return "dateCreation" in obj; }, get: function (obj) { return obj.dateCreation; }, set: function (obj, value) { obj.dateCreation = value; } }, metadata: _metadata }, _dateCreation_initializers, _dateCreation_extraInitializers);
        __esDecorate(null, null, _patient_decorators, { kind: "field", name: "patient", static: false, private: false, access: { has: function (obj) { return "patient" in obj; }, get: function (obj) { return obj.patient; }, set: function (obj, value) { obj.patient = value; } }, metadata: _metadata }, _patient_initializers, _patient_extraInitializers);
        __esDecorate(null, null, _professionnel_decorators, { kind: "field", name: "professionnel", static: false, private: false, access: { has: function (obj) { return "professionnel" in obj; }, get: function (obj) { return obj.professionnel; }, set: function (obj, value) { obj.professionnel = value; } }, metadata: _metadata }, _professionnel_initializers, _professionnel_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Utilisateur = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Utilisateur = _classThis;
}();
exports.Utilisateur = Utilisateur;
