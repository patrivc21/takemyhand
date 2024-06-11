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
exports.ChatPrivado = void 0;
var typeorm_1 = require("typeorm");
var Profesional_1 = require("./Profesional");
var Pacientes_1 = require("./Pacientes");
var ChatPrivado = /** @class */ (function () {
    function ChatPrivado() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], ChatPrivado.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int', nullable: true }),
        __metadata("design:type", Number)
    ], ChatPrivado.prototype, "id_profesional", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int', nullable: true }),
        __metadata("design:type", Number)
    ], ChatPrivado.prototype, "id_paciente", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], ChatPrivado.prototype, "duracion", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
        __metadata("design:type", Date)
    ], ChatPrivado.prototype, "fecha_hora_inicio", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
        __metadata("design:type", Date)
    ], ChatPrivado.prototype, "fecha_hora_fin", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Profesional_1.Profesionales; }, function (profesional) { return profesional.id; }),
        (0, typeorm_1.JoinColumn)({ name: 'id_profesional' }),
        __metadata("design:type", Profesional_1.Profesionales)
    ], ChatPrivado.prototype, "profesional", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Pacientes_1.Pacientes; }, function (paciente) { return paciente.id; }),
        (0, typeorm_1.JoinColumn)({ name: 'id_paciente' }),
        __metadata("design:type", Pacientes_1.Pacientes)
    ], ChatPrivado.prototype, "paciente", void 0);
    ChatPrivado = __decorate([
        (0, typeorm_1.Entity)({ name: 'chat_privado' })
    ], ChatPrivado);
    return ChatPrivado;
}());
exports.ChatPrivado = ChatPrivado;
//# sourceMappingURL=ChatPrivado.js.map