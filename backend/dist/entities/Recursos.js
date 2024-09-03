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
exports.Recursos = void 0;
var typeorm_1 = require("typeorm");
var ArchivosRecursos_1 = require("./ArchivosRecursos");
var Recursos = /** @class */ (function () {
    function Recursos() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Recursos.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Recursos.prototype, "contenido", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Recursos.prototype, "titulo", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'longtext' }),
        __metadata("design:type", String)
    ], Recursos.prototype, "url_video", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return ArchivosRecursos_1.ArchivosRecursos; }, function (archivo) { return archivo.recurso; }),
        __metadata("design:type", Array)
    ], Recursos.prototype, "archivos", void 0);
    Recursos = __decorate([
        (0, typeorm_1.Entity)({ name: 'recursos' })
    ], Recursos);
    return Recursos;
}());
exports.Recursos = Recursos;
//# sourceMappingURL=Recursos.js.map