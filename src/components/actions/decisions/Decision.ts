import { h } from '@logicflow/core';
import { getBpmnId } from '../getBpmnId';
import BaseDiamondNode from '../BaseDiamondNode';

class DecisionModel extends BaseDiamondNode.model {
    static extendKey = 'DecisiionModel';
    constructor(data, graphModel) {
        if (!data.id) {
            data.id = `Decision_${getBpmnId()}`;
        }
        super(data, graphModel);
    }
    /**
  * 初始化
  */
    initNodeData(data) {
        super.initNodeData(data)
        this.defaultFill = 'yellow';
    }

}

class DecisionView extends BaseDiamondNode.view {
    static extendKey = 'DecisionNode';
}

const Decision = {
    type: 'decision',
    view: DecisionView,
    model: DecisionModel,
};

export { DecisionView, DecisionModel };
export default Decision;
