import axios from "axios";
// import Cookies from "js-cookie";
// import { Message } from "element-ui";
import { PayloadHandler } from "./utils";
const getCookie = (name) => {
  let arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  // eslint-disable-next-line no-cond-assign
  return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
};
const getPortalKeyByUrl = () => {
  const pathname = location.pathname;
  const portalInfo = window.parent?.$common?.$util?.getStore({
    name: "portalInfo",
  });
  const defaultPortal = portalInfo ? portalInfo.nameEn : "test";
  console.log("por", portalInfo);
  console.log("def", defaultPortal);
  // const defaultPortal =
  //   (window?.parent?.$GLOBAL_BASE_CONFIG &&
  //     window?.parent?.$GLOBAL_BASE_CONFIG?.defaultPortalKey) ||
  //   (window?.parent?.Vue &&
  //     window?.parent?.Vue?.prototype?.website?.defaultPortalKey);
  // console.log("defa", defaultPortal);
  // const defaultPortal = "admin";
  // 兼容微服务路由
  const portalPath = pathname.match(/\/portal\/[a-z].*/);
  if (portalPath && !!portalPath.length) {
    const paths = portalPath[0].split("/");
    if (paths.length > 2 && paths[2]) {
      return paths[2] || defaultPortal;
    }
  }
  console.log(window);
  return defaultPortal;
};
const getQueryVariable = (variable) => {
  const hash = window.location.hash;
  const query = hash.split("?")[1] || "";
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
};
//token 主要依靠url传递过来
const getDynamicToken = () => {
  const TokenKey = getPortalKeyByUrl() + "-IVA-access-token";
  const token = getQueryVariable("token");
  return token || getCookie(TokenKey);
  // return token;
};
// const getPortalKeyByUrl = () => {
//   const pathname = window.location.pathname;
//   if (pathname) {
//     const paths = pathname.split("/");
//     if (paths.length > 2 && paths[2]) {
//       return paths[2];
//     }
//   }
//   // return 'mvp1';
//   // 苏州工厂
//   return "test";
// };
const getToken = () => {
  const deadToken = "YWRjM2Q0NjYtNjM1My00ZmNhLTlmZTUtOWMzMDNkNzhjOTlk";
  const dynamicToken = getDynamicToken();
  const isDev = window.location.hostname === "localhost";
  return isDev ? deadToken : dynamicToken;
};
// const getTokenNak = function () {
//   const deadToken = "M2M1OGE5NmYtMDY0ZC00NTM0LWJhNjEtYjZlMzYyODAxMDBh";
//   const TokenKey = getPortalKeyByUrl() + "-IVA-access-token";
//   console.log("tokenkey", TokenKey);
//   // const TokenKey = "isc-IVA-access-token";
//   // console.log('tokenKey', tok)
//   // const cookieToken = Cookies.get(TokenKey) ? Cookies.get(TokenKey) : "";
//   const cookieToken = getCookie(TokenKey) ? getCookie(TokenKey) : "";
//   console.log("1", TokenKey);
//   console.log("what cooke", getCookie(TokenKey), cookieToken);
//   const isDev = window.location.hostname === "localhost";
//   return isDev ? deadToken : cookieToken;
//   // let StoreToken = window.localStorage.getItem("IVA-admin-token")
//   //   ? window.localStorage.getItem("IVA-admin-token")
//   //   : window.localStorage.getItem("IVA-test-token");
//   // return window.location.hostname === "localhost"
//   //   ? deadToken
//   //   : JSON.parse(StoreToken)
//   //   ? JSON.parse(StoreToken).content
//   //   : "";
// };
// 默认超时时间
axios.defaults.timeout = 1000 * 60;
// 返回其他状态码
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500;
};
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    console.log("fuck token", token);
    config.headers["Authorization"] = `bearer ${token}`;
    config.headers.Accept = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// http response 拦截
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

const successStatus = [200, 201];
const successCode = [200, 201];
// const msgLen = 60;
const STATIC_ERROR_MAP = {
  400: "服务器未能理解请求",
  401: "未授权",
  403: "对被请求页面的访问被禁止",
  404: "服务器无法找到被请求的页面",
  405: "请求中指定的方法不被允许",
  500: "服务器遇到不可预知的情况",
  502: "服务器从上游服务器收到一个无效的响应",
  504: "网关超时",
};

// const authErrorCode = {
//   81020007: "access token 不合法",
//   81020008: "refresh token 不合法",
//   81020009: "refresh token 过期",
//   81010026: "access token 不合法",
// };
//
// const moreInfoCode = ["8101001a"];

const successHandler = (
  res,
  resolve,
  reject,
  validate,
  hideMessage,
  errorValidator
) => {
  if (res && successStatus.includes(res.status)) {
    if (validate) {
      return resolve(res.data);
    } else {
      if (res.data && successCode.includes(res.data.code)) {
        return resolve(res.data.data);
      } else {
        return errorHandler(
          {
            message: res.data.message || res.message,
            data: res.data,
          },
          reject,
          hideMessage,
          errorValidator
        );
      }
    }
  } else {
    const codeList = Object.keys(STATIC_ERROR_MAP);
    const data = res.data || {};
    let msg = data.error && data.error.message ? data.error.message : "";
    const errorCode =
      data.error && data.error.errorCode ? data.error.errorCode : "";
    msg =
      msg ||
      (codeList.includes(`${data.status}`)
        ? STATIC_ERROR_MAP[`${data.status}`]
        : data.message || data);
    return errorHandler(
      {
        code: errorCode,
        message: msg,
        data,
      },
      reject,
      hideMessage,
      errorValidator
    );
  }
};

const errorHandler = (res, reject) => {
  // TODO 401、403校验 以及异常定位
  const { code = "", message = res, data = {} } = res || {};

  return reject({
    code,
    message: new Error(`获取请求失败！原因：${message}`),
    moreInfo: data.error && data.error.moreInfo ? data.error.moreInfo : message,
  });
};

export const request = (options = {}) =>
  new Promise((resolve, reject) => {
    // validate 为true可跳过内部successCode验证，转自行验证
    // hideMessage 不进行错误弹出，直接返回错误
    // errorValidator 非公共错误校验
    const {
      validate,
      hideMessage = false,
      errorValidator,
    } = options.meta || {};
    return axios(options)
      .then((res) =>
        successHandler(
          res,
          resolve,
          reject,
          validate,
          hideMessage,
          errorValidator
        )
      )
      .catch((error) =>
        errorHandler(error, reject, hideMessage, errorValidator)
      );
  });

const payloadHandler = new PayloadHandler();
export const payloadStringify = payloadHandler.payloadStringify;
