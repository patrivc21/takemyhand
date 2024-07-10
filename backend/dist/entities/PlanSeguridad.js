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
exports.PlanSeguridad = void 0;
var typeorm_1 = require("typeorm");
var Usuarios_1 = require("./Usuarios");
var PlanSeguridad = /** @class */ (function () {
    function PlanSeguridad() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], PlanSeguridad.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PlanSeguridad.prototype, "nombre_archivo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PlanSeguridad.prototype, "lugares", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PlanSeguridad.prototype, "personas", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PlanSeguridad.prototype, "hobbies", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], PlanSeguridad.prototype, "id_usuario", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Usuarios_1.Usuarios; }, function (usuario) { return usuario.id; }),
        (0, typeorm_1.JoinColumn)({ name: 'id_usuario' }),
        __metadata("design:type", Usuarios_1.Usuarios)
    ], PlanSeguridad.prototype, "usuario", void 0);
    PlanSeguridad = __decorate([
        (0, typeorm_1.Entity)({ name: 'plan_seguridad' })
    ], PlanSeguridad);
    return PlanSeguridad;
}());
exports.PlanSeguridad = PlanSeguridad;
//# sourceMappingURL=PlanSeguridad.js.map