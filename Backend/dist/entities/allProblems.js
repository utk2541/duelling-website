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
exports.allProblems = exports.dproblem = exports.problem = void 0;
const typeorm_1 = require("typeorm");
class problem {
    constructor(val) {
        this.name = val.name;
        this.contestId = val.contestId;
        this.index = val.index;
    }
}
exports.problem = problem;
class dproblem {
    constructor(val) {
        this.name = val.name;
        this.index = val.index;
        this.solvedBy = "none";
        this.contestId = val.contestId;
    }
}
exports.dproblem = dproblem;
let allProblems = class allProblems {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], allProblems.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], allProblems.prototype, "contestId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], allProblems.prototype, "index", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], allProblems.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true, nullable: true }),
    __metadata("design:type", Array)
], allProblems.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { nullable: true }),
    __metadata("design:type", Number)
], allProblems.prototype, "rating", void 0);
allProblems = __decorate([
    (0, typeorm_1.Entity)()
], allProblems);
exports.allProblems = allProblems;
//# sourceMappingURL=allProblems.js.map