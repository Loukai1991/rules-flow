import BaseNode from '../BaseCircleNode';
import { getBpmnId } from '../getBpmnId';

class StartEventModel extends BaseNode.model {
  static extendKey = 'StartEventModel';
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
    this.defaultFill = '#67c23a';
  }
  getConnectedTargetRules() {
    const rules = super.getConnectedTargetRules();
    const notAsTarget = {
      message: '起始节点不能作为边的终点',
      validate: () => false,
    };
    rules.push(notAsTarget);
    return rules;
  }
}

class StartEventView extends BaseNode.view {
  static extendKey = 'StartEventNode';
}

const StartEvent = {
  type: 'startEvent',
  view: StartEventView,
  model: StartEventModel,
};

export { StartEventModel, StartEventView };
export default StartEvent;
