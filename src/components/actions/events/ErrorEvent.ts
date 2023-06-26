import BaseNode from '../BaseCircleNode';
import { getBpmnId } from '../getBpmnId';

class ErrorEventModel extends BaseNode.model {
  static extendKey = 'ErrorEventModel';
  constructor(data, graphModel) {
    if (!data.id) {
      data.id = `Event_${getBpmnId()}`;
    }
    if (!data.text) {
      data.text = '';
    }
    if (data.text && typeof data.text === 'string') {
      data.text = {
        value: '',
        x: data.x,
        y: data.y + 40,
        editable: false
      };
    }
    // data.text = '';
    // fix: 不能直接全部加，会导致下载后再次上传，位置错误。
    // data.text.y += 40;
    super(data, graphModel);
  }
   /**
   * 初始化
   */
   initNodeData(data) {
    super.initNodeData(data)
    this.defaultFill = '#f56c6c';
  }
}

class ErrorEventView extends BaseNode.view {
  static extendKey = 'ErrorEventNode';
}

const ErrorEvent = {
  type: 'errorEvent',
  view: ErrorEventView,
  model: ErrorEventModel,
};

export { ErrorEventModel, ErrorEventView };
export default ErrorEvent;
