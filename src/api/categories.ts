import { AxiosPromise } from "axios";
import request from "./request";

export interface GetCategoriesParams{
    searchText:string;
    page:number;
    pageSize:number;
}
// 查询目录
export function getCategories(params?:GetCategoriesParams):AxiosPromise<Category.GetCategoriesRes> {
    return request({
      url: "/category/getCategories",
      method: "GET",
      params,
    });
  }