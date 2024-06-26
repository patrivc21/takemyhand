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
exports.Pacientes = void 0;
var typeorm_1 = require("typeorm");
var RolPacientes_1 = require("./RolPacientes");
var Usuarios_1 = require("./Usuarios");
var Pacientes = /** @class */ (function () {
    function Pacientes() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Pacientes.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Pacientes.prototype, "nombre", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Pacientes.prototype, "apellidos", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Pacientes.prototype, "username", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Pacientes.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Pacientes.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Pacientes.prototype, "activo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Pacientes.prototype, "rolpaciente", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return RolPacientes_1.RolPaciente; }, function (rolPaciente) { return rolPaciente.id; }),
        (0, typeorm_1.JoinColumn)({ name: 'rolpaciente' }),
        __metadata("design:type", RolPacientes_1.RolPaciente)
    ], Pacientes.prototype, "rolPaciente", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Pacientes.prototype, "id_usuario", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Usuarios_1.Usuarios; }, function (usuario) { return usuario.id; }),
        (0, typeorm_1.JoinColumn)({ name: 'id_usuario' }),
        __metadata("design:type", Usuarios_1.Usuarios)
    ], Pacientes.prototype, "usuario", void 0);
    Pacientes = __decorate([
        (0, typeorm_1.Entity)({ name: 'pacientes' })
    ], Pacientes);
    return Pacientes;
}());
exports.Pacientes = Pacientes;
//# sourceMappingURL=Pacientes.js.map