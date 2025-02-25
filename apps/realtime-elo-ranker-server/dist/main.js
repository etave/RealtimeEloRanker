"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exeception_filter_1 = require("./common/filters/http-exeception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    });
    app.useGlobalFilters(new http_exeception_filter_1.HttpExceptionFilter());
    app.setGlobalPrefix('api');
    await app.listen(process.env.PORT ?? 8080);
}
void bootstrap();
//# sourceMappingURL=main.js.map