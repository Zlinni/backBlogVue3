interface GetCategoryList {
  data: Post.Post[];
}

declare namespace Category {
  interface GetCategories {
    data: Category[];
  }
  type Category = Tag.Tag;
  type GetCategoriesRes = Omit<Common.PaginUsual & GetCategories, "count">;
  type GetCategoryListRes = Omit<Common.PaginUsual & GetCategoryList, "count">;
}
