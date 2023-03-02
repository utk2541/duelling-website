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
exports.duelists = void 0;
const typeorm_1 = require("typeorm");
let duelists = class duelists {
    constructor() {
        this.duelRating = 1500;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], duelists.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], duelists.prototype, "cfhandle", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { default: 1500 }),
    __metadata("design:type", Number)
], duelists.prototype, "duelRating", void 0);
__decorate([
    (0, typeorm_1.Column)("integer"),
    __metadata("design:type", Number)
], duelists.prototype, "cfRating", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], duelists.prototype, "pfp", void 0);
duelists = __decorate([
    (0, typeorm_1.Entity)()
], duelists);
exports.duelists = duelists;
//# sourceMappingURL=duelists.js.map