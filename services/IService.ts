interface PaginatedResponse<T> {
  data: T[];
  nextPageUrl?: string;
  previousPageUrl?: string;
}

export interface IService<T> {
  add: (T: T) => Promise<void>;
  update: (T: T) => Promise<T>;
  delete: (id: string) => Promise<T>;
  list: () => Promise<T[]>;
}
