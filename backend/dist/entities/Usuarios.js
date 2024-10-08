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
exports.Usuarios = void 0;
var typeorm_1 = require("typeorm");
var RolUsuarios_1 = require("./RolUsuarios");
var Usuarios = /** @class */ (function () {
    function Usuarios() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Usuarios.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Usuarios.prototype, "nombre", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Usuarios.prototype, "apellidos", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Usuarios.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Usuarios.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Usuarios.prototype, "username", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Usuarios.prototype, "rol", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return RolUsuarios_1.RolUsuarios; }, function (rolusuarios) { return rolusuarios.id; }),
        (0, typeorm_1.JoinColumn)({ name: 'rol' }),
        __metadata("design:type", RolUsuarios_1.RolUsuarios)
    ], Usuarios.prototype, "rolusuarios", void 0);
    Usuarios = __decorate([
        (0, typeorm_1.Entity)({ name: 'usuarios' })
    ], Usuarios);
    return Usuarios;
}());
exports.Usuarios = Usuarios;
//# sourceMappingURL=Usuarios.js.map