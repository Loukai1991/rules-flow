import BaseNode from '../BaseCircleNode';
import { getBpmnId } from '../getBpmnId';

class EndEventModel extends BaseNode.model {
  static extendKey = 'EndEventModel';
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
    this.defaultFill = '#595959';
    this.properties.hasCustomProperty = true;
  }
  getConnectedSourceRules() {
    const rules = super.getConnectedSourceRules();
    const notAsSource = {
      message: '结束事件不能作为边的起点',
      validate: () => false,
    };
    rules.push(notAsSource);
    return rules;
  }
}

class EndEventView extends BaseNode.view {
  static extendKey = 'EndEventNode';
}

const EndEvent = {
  type: 'endEvent',
  view: EndEventView,
  model: EndEventModel,
};

export { EndEventModel, EndEventView };
export default EndEvent;
