import { QueryBuilderOptions } from "./type.util";


export class PrismaQueryBuilder<
  T extends { findMany: Function; count: Function }
> {
  private model: T;
  private searchableFields: string[];
  private excludeFields: string[];
  private search?: string;
  private sortBy?: string;
  private sortOrder: "asc" | "desc";
  private page: number;
  private limit: number;

  private select: any = {};
  private skip = 0;
  private take = 10;
  private orderBy: any = {};
  private where: any = {};

  constructor(options: QueryBuilderOptions<T>) {
    this.model = options.model;
    this.searchableFields = options.searchableFields || [];
    this.excludeFields = options.excludeFields || [];
    this.search = options.search;
    this.sortBy = options.sortBy || "createdAt";
    this.sortOrder = options.sortOrder || "desc";
    this.page = options.page || 1;
    this.limit = options.limit || 10;
  }

  fields(allFields: string[]): this {
    if (this.excludeFields.length > 0) {
      allFields.forEach((field) => {
        if (!this.excludeFields.includes(field)) this.select[field] = true;
      });
    } else {
      allFields.forEach((field) => (this.select[field] = true));
    }
    return this;
  }

  sort(): this {
    if (this.sortBy && !this.excludeFields.includes(this.sortBy)) {
      this.orderBy = { [this.sortBy]: this.sortOrder };
    } else {
      this.orderBy = { createdAt: "desc" };
    }
    return this;
  }

  pagination(): this {
    this.skip = (this.page - 1) * this.limit;
    this.take = this.limit;
    return this;
  }

  private buildSearchFilter(): any {
    if (!this.search || this.searchableFields.length === 0) return {};

    return {
      OR: this.searchableFields.map((field) => ({
        [field]: { contains: this.search, mode: "insensitive" },
      })),
    };
  }

  async build(): Promise<{ data: any[]; meta: any }> {
    // Merge filters
    this.where = {
      ...this.where,
      ...this.buildSearchFilter(),
    };

    const data = await this.model.findMany({
      where: this.where,
      skip: this.skip,
      take: this.take,
      orderBy: this.orderBy,
    });

    const totalDocuments = await this.model.count({ where: this.where });
    const totalPages = Math.ceil(totalDocuments / this.take);

    return {
      data,
      meta: {
        page: this.page,
        limit: this.limit,
        totalPages,
        totalDocuments,
      },
    };
  }
}