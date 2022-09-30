import { AxiosPromise } from "axios";
import request from "./request";

//获取文章list
export interface GetListParams {
  page?: number,
  pageSize?: number,
  postName?: string,
  categoryName?: string,
  tagName?: string,
  range?: string
}
//获取文章总览的接口
export function getPost(params: GetListParams): AxiosPromise<Post.GetListRes> {
  return request({
    url: "/posts/getList",
    method: "GET",
    params
  });
};
// 获取目录的信息的接口
export function getCategories(): AxiosPromise<Category.GetCategoriesRes> {
  return request({
    url: "/category/getCategories",
    method: "GET",
  });
};
// 获取标签的信息的接口
export function getTags(): AxiosPromise<Tag.GetTagsRes> {
  return request({
    url: "/tag/getTags",
    method: "GET",
  });
};
export interface ReadpostParams {
  abbrlink: number | string
}
// 获取文章详细信息的接口
export function readPost(params:ReadpostParams): AxiosPromise<Post.ReadPostRes> {
  return request({
    url: "/posts/readPost",
    method: "GET",
    params
  })
}