import { h } from '@logicflow/core'
import BaseReactNode from "../BaseRectNode"

class EditInstanceNode extends BaseReactNode.view {
  getIcon () {
    const {
      width,
      height,
    } = this.props.model;
    return h('image', {
      width: 30,
      height: 30,
      x: - width / 2,
      y: - height / 2,
      href: 'images/fetch.svg'
    })
  }
}

class EditInstanceModel extends BaseReactNode.model {
  initNodeData (data) {
    super.initNodeData(data)
    this.defaultFill = 'rgb(231, 231, 174)'
  }
}

export default {
  type: 'editInstance',
  model: EditInstanceModel,
  view: EditInstanceNode
}
