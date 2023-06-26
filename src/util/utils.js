// 创建监听器实例
export function createListenerObject(options, isTask, prefix) {
    const listenerObj = Object.create(null);
    listenerObj.event = options.event;
    isTask && (listenerObj.id = options.id); // 任务监听器特有的 id 字段
    switch (options.listenerType) {
      case "scriptListener":
        listenerObj.script = createScriptObject(options, prefix);
        break;
      case "expressionListener":
        listenerObj.expression = options.expression;
        break;
      case "delegateExpressionListener":
        listenerObj.delegateExpression = options.delegateExpression;
        break;
      default:
        listenerObj.class = options.class;
    }
    // 注入字段
    if (options.fields) {
      listenerObj.fields = options.fields.map((field) => {
        return createFieldObject(field, prefix);
      });
    }
    // 任务监听器的 定时器 设置
    if (isTask && options.event === "timeout" && !!options.eventDefinitionType) {
      const timeDefinition = window.bpmnInstances.moddle.create(
        "bpmn:FormalExpression",
        {
          body: options.eventTimeDefinitions,
        }
      );
      const TimerEventDefinition = window.bpmnInstances.moddle.create(
        "bpmn:TimerEventDefinition",
        {
          id: `TimerEventDefinition_${uuid(8)}`,
          [`time${options.eventDefinitionType.replace(/^\S/, (s) =>
            s.toUpperCase()
          )}`]: timeDefinition,
        }
      );
      listenerObj.eventDefinitions = [TimerEventDefinition];
    }
    return window.bpmnInstances.moddle.create(
      `${prefix}:${isTask ? "TaskListener" : "ExecutionListener"}`,
      listenerObj
    );
  }
  
  // 创建 监听器的注入字段 实例
  export function createFieldObject(option, prefix) {
    const { name, fieldType, string, expression } = option;
    const fieldConfig =
      fieldType === "string" ? { name, string } : { name, expression };
    return window.bpmnInstances.moddle.create(`${prefix}:Field`, fieldConfig);
  }
  
  // 创建脚本实例
  export function createScriptObject(options, prefix) {
    const { scriptType, scriptFormat, value, resource } = options;
    const scriptConfig =
      scriptType === "inlineScript"
        ? { scriptFormat, value }
        : { scriptFormat, resource };
    return window.bpmnInstances.moddle.create(`${prefix}:Script`, scriptConfig);
  }
  
  // 更新元素扩展属性
  export function updateElementExtensions(element, extensionList) {
    const extensions = window.bpmnInstances.moddle.create(
      "bpmn:ExtensionElements",
      {
        values: extensionList,
      }
    );
    window.bpmnInstances.modeling.updateProperties(element, {
      extensionElements: extensions,
    });
  }
  
  // 创建一个id
  export function uuid(length = 8, chars) {
    let result = "";
    let charsString =
      chars || "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = length; i > 0; --i) {
      result += charsString[Math.floor(Math.random() * charsString.length)];
    }
    return result;
  }
  
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
            `${item.k} ${keyMap[item.o]}${
              hasValue.includes(item.o) ? ` ${`${item.v}`.trim()}` : ""
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
        payloadStringify = `${payloadStringify}${
          payloadStringify ? "&" : ""
        }$orderBy=${orderStringify}`;
      }
      const filtersStringify = this.filtersStringify(filters);
      if (filtersStringify) {
        payloadStringify = `${payloadStringify}${
          payloadStringify ? "&" : ""
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
  