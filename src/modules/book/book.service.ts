import { Injectable, NotFoundException } from '@nestjs/common';
import { DynamicPrismaService } from 'src/prisma/dynamic-prisma.service';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(private readonly dynamicPrisma: DynamicPrismaService) {}

  async getClient(tenantDb: string) {
    return this.dynamicPrisma.getPrismaForDb(tenantDb);
  }

  async create(tenantDb: string, dto: CreateBookDto) {
    // await this.ensureBookTableExists(tenantDb);
    const prisma = await this.getClient(tenantDb);
    // return prisma.book.create({ data: dto });
  }

  async findAll(tenantDb: string) {
    const prisma = await this.getClient(tenantDb);
    // return prisma.book.findMany();
  }

  async findOne(tenantDb: string, id: number) {
    const prisma = await this.getClient(tenantDb);
    // const book = await prisma.book.findUnique({ where: { id } });
    // if (!book) throw new NotFoundException('Book not found');
    // return book;
  }

  async update(tenantDb: string, id: number, dto: UpdateBookDto) {
    const prisma = await this.getClient(tenantDb);
    // return prisma.book.update({ where: { id }, data: dto });
  }

  async remove(tenantDb: string, id: number) {
    const prisma = await this.getClient(tenantDb);
    // return prisma.book.delete({ where: { id } });
  }
}
