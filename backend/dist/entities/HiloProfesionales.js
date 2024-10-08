"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HiloProfesionales = void 0;
var typeorm_1 = require("typeorm");
var Profesional_1 = require("./Profesional");
var ArchivosHiloProf_1 = require("./ArchivosHiloProf");
var HiloProfesionales = /** @class */ (function () {
    function HiloProfesionales() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], HiloProfesionales.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], HiloProfesionales.prototype, "titulo", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], HiloProfesionales.prototype, "mensaje", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], HiloProfesionales.prototype, "fecha_hora", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], HiloProfesionales.prototype, "id_profesional", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Profesional_1.Profesionales; }, function (profesional) { return profesional.id; }),
        (0, typeorm_1.JoinColumn)({ name: 'id_profesional' }),
        __metadata("design:type", Profesional_1.Profesionales)
    ], HiloProfesionales.prototype, "profesional", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return ArchivosHiloProf_1.ArchivosHiloProf; }, function (archivo) { return archivo.hilo; }) // Alias 'archivos'
        ,
        __metadata("design:type", Array)
    ], HiloProfesionales.prototype, "archivos", void 0);
    HiloProfesionales = __decorate([
        (0, typeorm_1.Entity)({ name: 'hilo_profesionales' })
    ], HiloProfesionales);
    return HiloProfesionales;
}());
exports.HiloProfesionales = HiloProfesionales;
//# sourceMappingURL=HiloProfesionales.js.map