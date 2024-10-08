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
exports.ArchivosHiloUsuario = void 0;
var typeorm_1 = require("typeorm");
var HiloUsuarios_1 = require("./HiloUsuarios");
var RespuestaUsuarios_1 = require("./RespuestaUsuarios");
var ArchivosHiloUsuario = /** @class */ (function () {
    function ArchivosHiloUsuario() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], ArchivosHiloUsuario.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'longtext' }),
        __metadata("design:type", String)
    ], ArchivosHiloUsuario.prototype, "archivo_adjunto", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], ArchivosHiloUsuario.prototype, "id_hilo", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return HiloUsuarios_1.HiloUsuarios; }, function (hilo) { return hilo.id; }),
        (0, typeorm_1.JoinColumn)({ name: 'id_hilo' }),
        __metadata("design:type", HiloUsuarios_1.HiloUsuarios)
    ], ArchivosHiloUsuario.prototype, "hilo", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], ArchivosHiloUsuario.prototype, "id_respuesta", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return RespuestaUsuarios_1.RespuestaHiloUsuarios; }, function (respuesta) { return respuesta.id; }),
        (0, typeorm_1.JoinColumn)({ name: 'id_respuesta' }),
        __metadata("design:type", RespuestaUsuarios_1.RespuestaHiloUsuarios)
    ], ArchivosHiloUsuario.prototype, "respuesta", void 0);
    ArchivosHiloUsuario = __decorate([
        (0, typeorm_1.Entity)({ name: 'archivos_hilo_usuarios' })
    ], ArchivosHiloUsuario);
    return ArchivosHiloUsuario;
}());
exports.ArchivosHiloUsuario = ArchivosHiloUsuario;
//# sourceMappingURL=ArchivosHiloUsuarios.js.map