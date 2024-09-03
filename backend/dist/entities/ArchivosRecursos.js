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
exports.ArchivosRecursos = void 0;
var typeorm_1 = require("typeorm");
var Recursos_1 = require("./Recursos");
var ArchivosRecursos = /** @class */ (function () {
    function ArchivosRecursos() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], ArchivosRecursos.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'longtext' }),
        __metadata("design:type", String)
    ], ArchivosRecursos.prototype, "nombre_archivo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ArchivosRecursos.prototype, "tipo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], ArchivosRecursos.prototype, "id_recurso", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Recursos_1.Recursos; }, function (recurso) { return recurso.id; }),
        (0, typeorm_1.JoinColumn)({ name: 'id_recurso' }),
        __metadata("design:type", Recursos_1.Recursos)
    ], ArchivosRecursos.prototype, "recurso", void 0);
    ArchivosRecursos = __decorate([
        (0, typeorm_1.Entity)({ name: 'archivos_recursos' })
    ], ArchivosRecursos);
    return ArchivosRecursos;
}());
exports.ArchivosRecursos = ArchivosRecursos;
//# sourceMappingURL=ArchivosRecursos.js.map