import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:123456@localhost:27017/', {dbName: "russian"}),
  ],
  exports: [MongooseModule],
})
export class MongodatabaseModule {}
