import { TtsModule } from './tts/tts.module';
import { BotModule } from './bot/bot.module';
import { CheckMessageModule } from './checktext/checkmessage.module';
import { FlashcardModule } from './flashcards/flashcard.module';
import { MessageModule } from './message/message.module';
import { ConversationModule } from './conversation/conversation.module';
import { MongodatabaseModule } from './database/mongodatabase.module';
import { ChartsModule } from './charts/charts.module';
import { PedidoModule } from './pedido/pedido.module';
import { ClienteModule } from './cliente/cliente.module';
import { ProdutosModule } from './produtos/produtos.module';
import { DatabaseAppModule } from './database/database-app.module';
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import configuracao from './config/configuracao'
import { SiteSuccessDatabaseService } from './database/site-success-database.service'
import { UserModule } from './user/user.module'
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [
    TtsModule,
    BotModule,
    CheckMessageModule,
    FlashcardModule,
    MessageModule,
    ConversationModule,
    MongodatabaseModule,
    ChartsModule,
    PedidoModule,
    ClienteModule,
    ProdutosModule,
    DatabaseAppModule,
    MulterModule.register({
      dest: './uploads', // Define o diretório de destino para salvar os arquivos
    }),
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      load: [configuracao],
      isGlobal: true,
    }),
  ],
})
export class AppModule { }
