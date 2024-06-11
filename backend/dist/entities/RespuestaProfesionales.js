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
exports.RespuestaHiloProfesionales = void 0;
var typeorm_1 = require("typeorm");
var Profesional_1 = require("./Profesional");
var HiloProfesionales_1 = require("./HiloProfesionales");
var RespuestaHiloProfesionales = /** @class */ (function () {
    function RespuestaHiloProfesionales() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], RespuestaHiloProfesionales.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return HiloProfesionales_1.HiloProfesionales; }, function (respuesta) { return respuesta.id; }),
        (0, typeorm_1.JoinColumn)({ name: 'id_respuesta' }),
        __metadata("design:type", HiloProfesionales_1.HiloProfesionales)
    ], RespuestaHiloProfesionales.prototype, "id_respuesta", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Profesional_1.Profesionales; }, function (profesional) { return profesional.id; }),
        (0, typeorm_1.JoinColumn)({ name: 'id_profesional' }),
        __metadata("design:type", Profesional_1.Profesionales)
    ], RespuestaHiloProfesionales.prototype, "id_profesional", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], RespuestaHiloProfesionales.prototype, "mensaje", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], RespuestaHiloProfesionales.prototype, "archivo_adjunto", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], RespuestaHiloProfesionales.prototype, "fecha_hora", void 0);
    RespuestaHiloProfesionales = __decorate([
        (0, typeorm_1.Entity)({ name: 'respuesta_hilo_profesionales' })
    ], RespuestaHiloProfesionales);
    return RespuestaHiloProfesionales;
}());
exports.RespuestaHiloProfesionales = RespuestaHiloProfesionales;
//# sourceMappingURL=RespuestaProfesionales.js.map