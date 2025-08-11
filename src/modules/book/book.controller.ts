import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';

@ApiTags('Books') // Group all routes under "Books" in Swagger UI
@Controller('books')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  /**
   * Create a new book in the specified tenant's database.
   * @param tenantDb The name of the tenant-specific database
   * @param dto Book creation data
   */
  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiQuery({ name: 'tenantDb', required: true, description: 'Tenant DB name' })
  create(@Query('tenantDb') tenantDb: string, @Body() body: CreateBookDto) {
    return this.bookService.create(tenantDb, body);
  }

  /**
   * Get all books from the specified tenant's database.
   * @param tenantDb The name of the tenant-specific database
   */

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiQuery({ name: 'tenantDb', required: true, description: 'Tenant DB name' })
  findAll(@Query('tenantDb') tenantDb: string) {
    return this.bookService.findAll(tenantDb);
  }

  /**
   * Get a single book by its ID from the specified tenant's database.
   * @param tenantDb The name of the tenant-specific database
   * @param id The ID of the book
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiQuery({ name: 'tenantDb', required: true, description: 'Tenant DB name' })
  @ApiParam({ name: 'id', type: 'number', description: 'Book ID' })
  findOne(@Query('tenantDb') tenantDb: string, @Param('id') id: string) {
    return this.bookService.findOne(tenantDb, +id);
  }

  /**
   * Update an existing book by its ID in the specified tenant's database.
   * @param tenantDb The name of the tenant-specific database
   * @param id The ID of the book
   * @param dto Updated book data
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiQuery({ name: 'tenantDb', required: true, description: 'Tenant DB name' })
  @ApiParam({ name: 'id', type: 'number', description: 'Book ID' })
  update(
    @Query('tenantDb') tenantDb: string,
    @Param('id') id: string,
    @Body() dto: UpdateBookDto,
  ) {
    return this.bookService.update(tenantDb, +id, dto);
  }

  /**
   * Delete a book by its ID from the specified tenant's database.
   * @param tenantDb The name of the tenant-specific database
   * @param id The ID of the book
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiQuery({ name: 'tenantDb', required: true, description: 'Tenant DB name' })
  @ApiParam({ name: 'id', type: 'number', description: 'Book ID' })
  remove(@Query('tenantDb') tenantDb: string, @Param('id') id: string) {
    return this.bookService.remove(tenantDb, +id);
  }
}
