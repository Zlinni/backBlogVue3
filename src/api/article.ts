import { AxiosPromise } from "axios";
import request from "./request";

//获取文章list
interface GetListParams{
    page?:number,
    pageSize?:number,
    postName?:string,
    categoryName?:string,
    tagName?:string,
    range?:[number, number] | null
}
//获取文章总览的接口
export function getPost(params:GetListParams):AxiosPromise<Post.GetListRes>{
  return request({
    url: "/posts/getList",
    method: "GET",
    params
  });
};
// 获取目录的信息的接口
export function getCategories():AxiosPromise<Category.GetCategoriesRes>{
  return request({
    url: "/category/getCategories",
    method: "GET",
  });
};
// 获取标签的信息的接口
export function getTags():AxiosPromise<Tag.GetTagsRes>{
  return request({
    url: "/category/getCategories",
    method: "GET",
  });
};