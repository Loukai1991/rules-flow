import { PolygonNode, PolygonNodeModel, h } from '@logicflow/core';

class BaseDiamondNodeModel extends PolygonNodeModel {
    constructor(data, graphModel) {
        super(data, graphModel);
        this.points = [[1,30],[ 45,59],[ 89,30],[ 45,1]]
        // this.points = [
        //     [35, 0],
        //     [70, 35],
        //     [35, 70],
        //     [0, 35],
        // ];
    }
  /**
   * 初始化
   */
  initNodeData(data) {
    super.initNodeData(data)
    this.defaultFill = '#a6bbcf';
    
    this.properties.hasCommonProperty = true;
    this.properties.hasCustomProperty = true;
  }
  /**
   * 重写节点样式
   */
  getNodeStyle() {
    const style = super.getNodeStyle();
    const dataStyle = this.properties.style || {};
    if (this.isSelected) {
      style.strokeWidth = Number(dataStyle.borderWidth) || 2;
      style.stroke = dataStyle.borderColor || '#ff7f0e';
    } else {
      style.strokeWidth = Number(dataStyle.borderWidth) || 1;
      style.stroke = dataStyle.borderColor || '#999';
    }
    style.fill = dataStyle.backgroundColor || this.defaultFill;
    return style;
  }
  /**
   * 重写定义锚点
   */
//   getDefaultAnchor() {
//     const { x, y, id, width, height } = this;
//     const anchors = [
//       {
//         x: x + width / 2,
//         y: y,
//         id: `${id}_right`,
//         type: "right"
//       },
//       {
//         x: x - width / 2,
//         y: y,
//         id: `${id}_left`,
//         type: "left"
//       }
//     ];
//     return anchors;
//   }
  /**
   * 
   */
  getOutlineStyle() {
    const style = super.getOutlineStyle();
    style.stroke = 'transparent';
    style.hover.stroke = 'transparent';
    return style;
  }
}
class BaseDiamondNode extends PolygonNode {
  /**
   * 1.1.7版本后支持在view中重写锚点形状。
   * 重写锚点新增
   */
  getAnchorShape(anchorData) {
    const { x, y, type } = anchorData;
    return h("rect", {
      x: x - 5,
      y: y - 5,
      width: 10,
      height: 10,
      className: 'custom-anchor'
    });
  }
//   getIcon () {
//     return null;
//   }
//   getShape() {
//     const {
//       text,
//       x,
//       y,
//       width,
//       height,
//       radius
//     } = this.props.model;
//     const style = this.props.model.getNodeStyle()
//     return h(
//       'g',
//       {
//         className: 'lf-red-node'
//       },
//       [
//         h('rect', {
//           ...style,
//           x: x - width / 2,
//           y: y - height / 2,
//           width,
//           height,
//           rx: radius,
//           ry: radius
//         }),
//         h('g', {
//           style: 'pointer-events: none;',
//           transform: `translate(${x}, ${y})`
//         }, [
//           h('rect', {
//             x: - width / 2,
//             y: - height / 2,
//             width: 30,
//             height: 30,
//             fill: '#000',
//             fillOpacity: 0.05,
//             stroke: 'none',
//           }),
//           this.getIcon(),
//           h('path', {
//             d: `M ${30 - width / 2} ${1 -height / 2 } l 0 28`,
//             stroke: '#000',
//             strokeOpacity: 0.1,
//             strokeWidth: 1
//           })
//         ])
//       ]
//     )
//   }
}


export default {
  type: 'base-diamond-node',
  model: BaseDiamondNodeModel,
  view: BaseDiamondNode
}
