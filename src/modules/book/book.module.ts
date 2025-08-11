import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DynamicPrismaService } from 'src/prisma/dynamic-prisma.service';

@Module({
  controllers: [BookController],
  providers: [BookService, DynamicPrismaService],
})
export class BookModule {}
