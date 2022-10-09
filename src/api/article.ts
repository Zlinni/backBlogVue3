import { AxiosPromise } from "axios";
import request from "./request";

//获取文章list
export interface GetListParams {
  page?: number;
  pageSize?: number;
  title?: string;
  categories?: string;
  tags?: string;
  date?: string;
}
//获取文章总览的接口
export function getPost(params: GetListParams): AxiosPromise<Post.GetListRes> {
  return request({
    url: "/posts/getList",
    method: "GET",
    params,
  });
}
// 获取目录的信息的接口
export function getCategories(): AxiosPromise<Category.GetCategoriesRes> {
  return request({
    url: "/category/getCategories",
    method: "GET",
  });
}
// 获取标签的信息的接口
export function getTags(): AxiosPromise<Tag.GetTagsRes> {
  return request({
    url: "/tag/getTags",
    method: "GET",
  });
}
export interface ReadpostParams {
  _id: string;
}
// 获取文章详细信息的接口
export function readPost(
  params: ReadpostParams
): AxiosPromise<Post.ReadPostRes> {
  return request({
    url: "/posts/readPost",
    method: "GET",
    params,
  });
}
export interface AddPostParams {
  textValue: string;
  textTitle: string;
  categories: string;
}
export function addPost(data: AddPostParams): AxiosPromise<any> {
  return request({
    url: "/posts/addPost",
    method: "POST",
    data,
  });
}
interface DeletePostParams {
  _id:string
}
type ModifyPostParams = AddPostParams & DeletePostParams
export function modifyPost(data: ModifyPostParams): AxiosPromise<any> {
  return request({
    url: "/posts/modifyPost",
    method: "POST",
    data,
  });
}
export function deletePost(data: DeletePostParams): AxiosPromise<any> {
  return request({
    url: "/posts/deletePost",
    method: "POST",
    data,
  });
}
// 导出文章
export function outputPost(params:DeletePostParams):AxiosPromise<any> {
  return request({
    url: "/posts/outputPost",
    method: "GET",
    params,
    responseType: 'blob',
    headers: {
        Accept: 'application/octet-stream',
    },
  });
}