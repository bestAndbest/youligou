import request from "./network.js";
export function getData(params){
  return request({
    ...params
  })
};
