import BaseNode from '../BaseCircleNode';
import { getBpmnId } from '../getBpmnId';

class BreakEventModel extends BaseNode.model {
  static extendKey = 'BreakEventModel';
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
    this.defaultFill = '#e6a23c';
  }
}

class BreakEventView extends BaseNode.view {
  static extendKey = 'BreakEventNode';
}

const StartEvent = {
  type: 'breakEvent',
  view: BreakEventView,
  model: BreakEventModel,
};

export { BreakEventModel, BreakEventView };
export default StartEvent;
