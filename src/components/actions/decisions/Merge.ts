import { h } from '@logicflow/core';
import { getBpmnId } from '../getBpmnId';
import BaseDiamondNode from '../BaseDiamondNode';

class MergeModel extends BaseDiamondNode.model {
    static extendKey = 'MergeModel';
    constructor(data, graphModel) {
        if (!data.id) {
            data.id = `Merge_${getBpmnId()}`;
        }
        super(data, graphModel);
    }
    /**
  * 初始化
  */
    initNodeData(data) {
        super.initNodeData(data)
        this.defaultFill = 'red';
        this.properties.hasCustomProperty = false;
    }

}

class MergeView extends BaseDiamondNode.view {
    static extendKey = 'MergeNode';
}

const Merge = {
    type: 'merge',
    view: MergeView,
    model: MergeModel,
};

export { MergeView, MergeModel };
export default Merge;
