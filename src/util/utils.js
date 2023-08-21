
/**
 * @Date: 2021/5/19 17:10
 * @Param: filters 过滤参数
 * @Return: void
 * @Description: 过滤条件参数解析器
 */
const FilterHandler = function (filters) {
  this.filters = filters;
  const keyMap = {
    "=": "eq",
    "!=": "ne",
    like: "like",
    null: "null",
  };

  const hasValue = ["=", "!=", "like"];
  const noValue = ["null"];

  this.filtersToArray = (_filters = this.filters) =>
    _filters
      .filter(
        (o) =>
          o &&
          ((!noValue.includes(o.o) &&
            typeof o.v !== "undefined" &&
            o.v !== "") ||
            noValue.includes(o.o))
      )
      .map(
        (item) =>
          `${item.k} ${keyMap[item.o]}${hasValue.includes(item.o) ? ` ${`${item.v}`.trim()}` : ""
          }`
      );

  this.filtersStringify = (_orders = this.orders) =>
    this.filtersToArray(_orders).join(",");
};

/**
 * @Date: 2021/5/19 17:13
 * @Param: orders 排序参数
 * @Return: void
 * @Description: 排序参数解析器
 */
const OrderHandler = function (orders) {
  this.orders = orders;

  const keyMap = {
    ascending: "asc",
    descending: "desc",
  };

  this.ordersToArray = (_orders = this.orders) =>
    Object.keys(_orders)
      .map(
        (key) =>
          `${keyMap[_orders[key]] ? `${key} ${keyMap[_orders[key]]}` : ""}`
      )
      .filter((o) => o);

  this.orderStringify = (_orders = this.orders) =>
    this.ordersToArray(_orders).join(",");
};

/**
 * @Date: 2021/5/19 17:14
 * @Param: pagination 分页参数
 * @Return: void
 * @Description: 分页参数解析器
 */
export const PaginationHandler = function (pagination) {
  this.pagination = pagination;

  const keyMap = {
    page: "page",
    size: "pageSize",
  };

  this.paginationToArray = (_pagination = this.pagination) =>
    JSON.stringify(_pagination) === "{}"
      ? []
      : Object.keys(keyMap).map((key) => `$${keyMap[key]}=${_pagination[key]}`);

  this.paginationStringify = (_pagination = this.pagination) =>
    this.paginationToArray(_pagination).join("&");

  this.paginationParse = (_pagination = {}) => {
    return {
      ...Object.keys(keyMap).reduce((n, i) => {
        n[i] = +_pagination[keyMap[i]];
        return n;
      }, {}),
      total: _pagination.total || 0,
    };
  };

  return this;
};

/**
 * @Date: 2021/5/19 17:14
 * @Param: url 请求地址
 * @Param: options 请求参数
 * @Return: void
 * @Description: 请求参数解析器
 */
export const PayloadHandler = function (
  url = "",
  { filters = [], orders = {}, pagination = {} } = {}
) {
  this.url = url;
  this.filters = filters;
  this.orders = orders;
  this.pagination = pagination;

  FilterHandler.call(this, filters);
  OrderHandler.call(this, orders);
  PaginationHandler.call(this, pagination);

  this.payloadStringify = (
    url = this.url,
    {
      filters = this.filters,
      orders = this.orders,
      pagination = this.pagination,
    } = {}
  ) => {
    let payloadStringify = "";
    const paginationStringify = this.paginationStringify(pagination);
    payloadStringify += paginationStringify;
    const orderStringify = this.orderStringify(orders);
    if (orderStringify) {
      payloadStringify = `${payloadStringify}${payloadStringify ? "&" : ""
        }$orderBy=${orderStringify}`;
    }
    const filtersStringify = this.filtersStringify(filters);
    if (filtersStringify) {
      payloadStringify = `${payloadStringify}${payloadStringify ? "&" : ""
        }$filter=${filtersStringify}`;
    }
    return payloadStringify ? `${url}?${payloadStringify}` : url;
  };
};

export const payloadHandler = new PayloadHandler();

export const stringToJSON = (str) => {
  try {
    str = JSON.parse(str);
  } catch (t) {
    // str = str;
  }
  return str;
};

export const JSONToString = (str, replacer, space) => {
  replacer = replacer || null;
  space = space || 0;
  if (typeof str !== "object") {
    return str;
  }
  try {
    str = JSON.stringify(str, replacer, space);
  } catch (t) {
    // str = str;
  }
  return str;
};

