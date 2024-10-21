"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckMessageModule = void 0;
const common_1 = require("@nestjs/common");
const checkmessage_controller_1 = require("./checkmessage.controller");
const checkmessage_service_1 = require("./checkmessage.service");
let CheckMessageModule = class CheckMessageModule {
};
CheckMessageModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [checkmessage_controller_1.CheckMessageController],
        providers: [checkmessage_service_1.CheckMessageService],
    })
], CheckMessageModule);
exports.CheckMessageModule = CheckMessageModule;
//# sourceMappingURL=checkmessage.module.js.map