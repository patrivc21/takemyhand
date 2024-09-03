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
exports.ArchivosPlan = void 0;
var typeorm_1 = require("typeorm");
var Usuarios_1 = require("./Usuarios");
var PlanSeguridad_1 = require("./PlanSeguridad");
var ArchivosPlan = /** @class */ (function () {
    function ArchivosPlan() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], ArchivosPlan.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'longtext' }),
        __metadata("design:type", String)
    ], ArchivosPlan.prototype, "nombre_archivo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], ArchivosPlan.prototype, "id_usuario", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Usuarios_1.Usuarios; }, function (usuario) { return usuario.id; }),
        (0, typeorm_1.JoinColumn)({ name: 'id_usuario' }),
        __metadata("design:type", Usuarios_1.Usuarios)
    ], ArchivosPlan.prototype, "usuario", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], ArchivosPlan.prototype, "id_plan", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return PlanSeguridad_1.PlanSeguridad; }, function (plan) { return plan.id; }),
        (0, typeorm_1.JoinColumn)({ name: 'id_plan' }),
        __metadata("design:type", PlanSeguridad_1.PlanSeguridad)
    ], ArchivosPlan.prototype, "plan", void 0);
    ArchivosPlan = __decorate([
        (0, typeorm_1.Entity)({ name: 'archivos_plan' })
    ], ArchivosPlan);
    return ArchivosPlan;
}());
exports.ArchivosPlan = ArchivosPlan;
//# sourceMappingURL=ArchivosPlan.js.map