
export interface QueryBuilderOptions<T> {
  model: T;
  searchableFields?: string[];
  filterableFields?: string[];
  arrayFields?: string[];
  excludeFields?: string[];
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
  filters?: Record<string, any>;
}

export class PrismaQueryBuilder<
  T extends { findMany: Function; count: Function }
> {
  private model: T;
  private searchableFields: string[];
  private filterableFields: string[];
  private arrayFields: string[];
  private excludeFields: string[];
  private search?: string;
  private sortBy?: string;
  private sortOrder: "asc" | "desc";
  private page: number;
  private limit: number;
  private filters: Record<string, any>;

  private select: any = {};
  private skip = 0;
  private take = 10;
  private orderBy: any = {};
  private where: any = {};

  constructor(options: QueryBuilderOptions<T>) {
    this.model = options.model;
    this.searchableFields = options.searchableFields || [];
    this.filterableFields = options.filterableFields || [];
    this.arrayFields = options.arrayFields || [];
    this.excludeFields = options.excludeFields || [];
    this.search = options.search;
    this.sortBy = options.sortBy || "createdAt";
    this.sortOrder = options.sortOrder || "desc";
    this.page = options.page || 1;
    this.limit = options.limit || 10;
    this.filters = options.filters || {};

    const { page, limit, sortBy, sortOrder, search, ...restFilters } = options.filters || {};
    this.filters = restFilters;
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
    if (!this.search || this.searchableFields.length === 0) return null;

    // return {
    //   OR: this.searchableFields.map((field) => ({
    //     [field]: { contains: this.search, mode: "insensitive" },
    //   })),
    // };

    return {
      OR: this.searchableFields.map( ( field ) =>
      {
        if ( this.arrayFields.includes( field ) )
        {
          
          return { [ field ]: { hasSome: [ this.search ] } };
        }
        else
        {
          return { [ field ]: { contains: this.search, mode: "insensitive" } };
        }
      } ),
    };
  }

  private buildFieldFilters(): any {
    const fieldFilters: any = {};

    Object.entries( this.filters ).forEach( ( [ key, value ] ) =>
    {
      if ( !this.filterableFields.includes( key ) || !value ) return;

      if ( this.arrayFields.includes( key ) )
      {
        const arr = Array.isArray( value )
          ? value
          : typeof value === "string"
            ? value.split( "," ).map( ( v ) => v.trim() )
            : [ value ];

        fieldFilters[ key ] = { hasSome: arr };
      }
      else if ( typeof value === "string" )
      {
        fieldFilters[ key ] = { contains: value, mode: "insensitive" };
      }
      else
      {
        fieldFilters[ key ] = value;
      }
    } );

    return Object.keys(fieldFilters).length > 0 ? fieldFilters : null;
  }

  async build(): Promise<{ data: any[]; meta: any }> {
    const searchFilter = this.buildSearchFilter();
    const fieldFilters = this.buildFieldFilters();

    const conditions: any[] = [];
    if (fieldFilters) conditions.push(fieldFilters);
    if (searchFilter) conditions.push(searchFilter);

    if (conditions.length === 1) this.where = conditions[0];
    else if (conditions.length > 1) this.where = { AND: conditions };

    // console.log( "WHERE CLAUSE =>", JSON.stringify( this.where, null, 2 ) );
    
    const data = await this.model.findMany({
      where: this.where,
      skip: this.skip,
      take: this.take,
      orderBy: this.orderBy,
      select: this.select,
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
