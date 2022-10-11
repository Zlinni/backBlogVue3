import { AxiosPromise } from "axios";
import request from "./request";

export interface GetCategoriesParams {
  searchText: string;
  page: number;
  pageSize: number;
}
// 查询目录
export function getCategories(params?: GetCategoriesParams): AxiosPromise<Category.GetCategoriesRes> {
  return request({
    url: "/category/getCategories",
    method: "GET",
    params,
  });
}
export interface AddCategoriesParams {
  name: string,
  color: string
}
// 新增目录
export function addCategories(data?: AddCategoriesParams): AxiosPromise<Category.GetCategoriesRes> {
  return request({
    url: "/category/addCategories",
    method: "POST",
    data,
  });
}
export type ModifyCategoriesParams = AddCategoriesParams & DeleteCategoriesParams
// 修改目录
export function modifyCategories(data?: ModifyCategoriesParams): AxiosPromise<Category.GetCategoriesRes> {
  return request({
    url: "/category/modifyCategories",
    method: "POST",
    data,
  });
}
// 删除目录
export interface DeleteCategoriesParams {
  _id: string,
}
export function deleteCategories(data?: DeleteCategoriesParams): AxiosPromise<Category.GetCategoriesRes> {
  return request({
    url: "/category/deleteCategories",
    method: "POST",
    data,
  });
}