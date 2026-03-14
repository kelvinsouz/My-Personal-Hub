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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContasReceberController = void 0;
const common_1 = require("@nestjs/common");
const contas_receber_service_1 = require("./contas-receber.service");
const create_conta_receber_dto_1 = require("./dto/create-conta-receber.dto");
let ContasReceberController = class ContasReceberController {
    accountsReceivableServiceFunctions;
    constructor(accountsReceivableServiceFunctions) {
        this.accountsReceivableServiceFunctions = accountsReceivableServiceFunctions;
    }
    createAccountReceivable(accountReceivable) {
        return this.accountsReceivableServiceFunctions.insertAccountReceivable(accountReceivable);
    }
    ;
    getAllAccountsReceivable() {
        return this.accountsReceivableServiceFunctions.getAllAccountsReceivable();
    }
};
exports.ContasReceberController = ContasReceberController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_conta_receber_dto_1.CreateContaReceberDto]),
    __metadata("design:returntype", void 0)
], ContasReceberController.prototype, "createAccountReceivable", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContasReceberController.prototype, "getAllAccountsReceivable", null);
exports.ContasReceberController = ContasReceberController = __decorate([
    (0, common_1.Controller)('contas-receber'),
    __metadata("design:paramtypes", [contas_receber_service_1.ContasReceberService])
], ContasReceberController);
//# sourceMappingURL=contas-receber.controller.js.map