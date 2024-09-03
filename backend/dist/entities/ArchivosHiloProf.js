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
exports.ArchivosHiloProf = void 0;
var typeorm_1 = require("typeorm");
var HiloProfesionales_1 = require("./HiloProfesionales");
var RespuestaProfesionales_1 = require("./RespuestaProfesionales");
var ArchivosHiloProf = /** @class */ (function () {
    function ArchivosHiloProf() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], ArchivosHiloProf.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'longtext' }),
        __metadata("design:type", String)
    ], ArchivosHiloProf.prototype, "archivo_adjunto", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], ArchivosHiloProf.prototype, "id_hilo", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return HiloProfesionales_1.HiloProfesionales; }, function (hilo) { return hilo.id; }),
        (0, typeorm_1.JoinColumn)({ name: 'id_hilo' }),
        __metadata("design:type", HiloProfesionales_1.HiloProfesionales)
    ], ArchivosHiloProf.prototype, "hilo", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], ArchivosHiloProf.prototype, "id_respuesta", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return RespuestaProfesionales_1.RespuestaHiloProfesionales; }, function (respuesta) { return respuesta.id; }),
        (0, typeorm_1.JoinColumn)({ name: 'id_respuesta' }),
        __metadata("design:type", RespuestaProfesionales_1.RespuestaHiloProfesionales)
    ], ArchivosHiloProf.prototype, "respuesta", void 0);
    ArchivosHiloProf = __decorate([
        (0, typeorm_1.Entity)({ name: 'archivos_hilo_prof' })
    ], ArchivosHiloProf);
    return ArchivosHiloProf;
}());
exports.ArchivosHiloProf = ArchivosHiloProf;
//# sourceMappingURL=ArchivosHiloProf.js.map