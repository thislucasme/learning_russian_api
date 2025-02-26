"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('PDV - App')
        .setDescription('Api para aplicação pdv')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document, {
        customfavIcon: "src/resources/logologo.jpeg",
        swaggerOptions: {
            backgroundColor: '#000000'
        }
    });
    console.log("waiting: 3066");
    await app.listen(3066);
}
bootstrap();
//# sourceMappingURL=main.js.map