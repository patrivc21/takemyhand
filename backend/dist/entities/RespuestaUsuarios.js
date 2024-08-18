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
exports.RespuestaHiloUsuarios = void 0;
var typeorm_1 = require("typeorm");
var Usuarios_1 = require("./Usuarios");
var HiloUsuarios_1 = require("./HiloUsuarios");
var ArchivosHiloUsuarios_1 = require("./ArchivosHiloUsuarios");
var RespuestaHiloUsuarios = /** @class */ (function () {
    function RespuestaHiloUsuarios() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], RespuestaHiloUsuarios.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], RespuestaHiloUsuarios.prototype, "id_hilo", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return HiloUsuarios_1.HiloUsuarios; }, function (respuesta) { return respuesta.id; }),
        (0, typeorm_1.JoinColumn)({ name: 'id_hilo' }),
        __metadata("design:type", HiloUsuarios_1.HiloUsuarios)
    ], RespuestaHiloUsuarios.prototype, "respuesta", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], RespuestaHiloUsuarios.prototype, "id_usuario", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Usuarios_1.Usuarios; }, function (usuario) { return usuario.id; }),
        (0, typeorm_1.JoinColumn)({ name: 'id_usuario' }),
        __metadata("design:type", Usuarios_1.Usuarios)
    ], RespuestaHiloUsuarios.prototype, "usuario", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], RespuestaHiloUsuarios.prototype, "mensaje", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], RespuestaHiloUsuarios.prototype, "archivo_adjunto", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], RespuestaHiloUsuarios.prototype, "fecha_hora", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], RespuestaHiloUsuarios.prototype, "titulo", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return ArchivosHiloUsuarios_1.ArchivosHiloUsuario; }, function (archivo) { return archivo.respuesta; }) // Alias 'archivos'
        ,
        __metadata("design:type", Array)
    ], RespuestaHiloUsuarios.prototype, "archivos", void 0);
    RespuestaHiloUsuarios = __decorate([
        (0, typeorm_1.Entity)({ name: 'respuesta_hilo_usuarios' })
    ], RespuestaHiloUsuarios);
    return RespuestaHiloUsuarios;
}());
exports.RespuestaHiloUsuarios = RespuestaHiloUsuarios;
//# sourceMappingURL=RespuestaUsuarios.js.map