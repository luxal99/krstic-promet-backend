import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {CONFIG, DATABASE_CONFIG} from "./constant/constant";

@Module({
    imports: [CONFIG, DATABASE_CONFIG],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
