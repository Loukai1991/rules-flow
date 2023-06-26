import { h } from '@logicflow/core'
import BaseReactNode from "../BaseRectNode"

class CreateInstanceNode extends BaseReactNode.view {
  getIcon () {
    return h('image', {
      ...this.getIconBaseAttrs(),
      href: 'images/fetch.svg'
    })
  }
}

class CreateInstanceModel extends BaseReactNode.model {
  initNodeData (data) {
    super.initNodeData(data)
    this.defaultFill = 'rgb(231, 231, 174)'
  }
}

export default {
  type: 'createInstance',
  model: CreateInstanceModel,
  view: CreateInstanceNode
}
