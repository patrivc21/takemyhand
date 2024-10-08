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
exports.Profesionales = void 0;
var typeorm_1 = require("typeorm");
var Usuarios_1 = require("./Usuarios");
var Profesionales = /** @class */ (function () {
    function Profesionales() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Profesionales.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Profesionales.prototype, "nombre", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Profesionales.prototype, "apellidos", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Profesionales.prototype, "username", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Profesionales.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Profesionales.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Profesionales.prototype, "activo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Profesionales.prototype, "id_usuario", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Usuarios_1.Usuarios; }, function (usuario) { return usuario.id; }),
        (0, typeorm_1.JoinColumn)({ name: 'id_usuario' }),
        __metadata("design:type", Usuarios_1.Usuarios)
    ], Profesionales.prototype, "usuario", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Profesionales.prototype, "ciudad", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Profesionales.prototype, "direccion", void 0);
    __decorate([
        (0, typeorm_1.Column)('float', { precision: 10, scale: 6 }),
        __metadata("design:type", Number)
    ], Profesionales.prototype, "latitud", void 0);
    __decorate([
        (0, typeorm_1.Column)('float', { precision: 10, scale: 6 }),
        __metadata("design:type", Number)
    ], Profesionales.prototype, "longitud", void 0);
    Profesionales = __decorate([
        (0, typeorm_1.Entity)({ name: 'profesionales' })
    ], Profesionales);
    return Profesionales;
}());
exports.Profesionales = Profesionales;
//# sourceMappingURL=Profesional.js.map