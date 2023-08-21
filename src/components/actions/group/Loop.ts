import { GroupNode } from "@/vendor";
import { h } from "@logicflow/core"
import LoopImg from '@/icons/svg/loop.svg'
class LoopModel extends GroupNode.model {
  /**
* 初始化
*/
  initNodeData(data) {
    super.initNodeData(data)
    this.width = 600;
    this.height = 300;
    this.radius = 8;
    this.text.editable = false;
    this.text.value = ''
    // this.text.x = this.x + 10;
    this.iconPosition = ''; // icon位置，left表示左边，'right'表示右边
    this.defaultFill = 'rgba(220,238,254)';
    this.resizable = true;
    // this.foldable = true;
  }
  /**
    * 重写节点样式
    */
  getNodeStyle() {
    const style = super.getNodeStyle();
    const dataStyle = this.properties.style || {};
    if (this.isSelected) {
      style.strokeWidth = Number(dataStyle.borderWidth) || 2;
      style.stroke = dataStyle.borderColor || '#0099F2';
    } else {
      style.strokeWidth = Number(dataStyle.borderWidth) || 1;
      style.stroke = dataStyle.borderColor || '#999';
    }
    style.fill = dataStyle.backgroundColor || this.defaultFill;
    return style;
  }
  /**
 * 
 */
  getOutlineStyle() {
    const style = super.getOutlineStyle();
    style.stroke = 'transparent';
    style.hover.stroke = 'transparent';
    return style;
  }
  /**
   * 拖拽节点到分组节点过程中，分组节点的outline样式定义
   */
  getAddableOutlineStyle() {
    const style = super.getAddableOutlineStyle();
    style.stroke = "#2f54eb";
    style.strokeDasharray = "3 3";
    return style;
  }

  /**
   * 重写定义锚点
   */
  getDefaultAnchor() {
    const { x, y, id, width, height } = this;
    const anchors = [
      {
        x: x + width / 2,
        y: y,
        id: `${id}_right`,
        type: "right"
      },
      {
        x: x - width / 2,
        y: y,
        id: `${id}_left`,
        type: "left"
      }
    ];
    return anchors;
  }
  /**
   * 
   * @param nodeData 参数节点和注释节点不允许拖入
   */
  isAllowAppendIn(nodeData) {
    return !['params'].includes(nodeData.type)
  }

}

class LoopView extends GroupNode.view {
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
  // getIcon() {
  //   const { model } = this.props;
  //   const calcx = model.x - model.width / 2 + 15;
  //   const calcy = model.y - model.height / 2 + 15;
  //   // return h('image', {
  //   //   width: 30,
  //   //   height: 30,
  //   //   x: - width / 2,
  //   //   y: - height / 2,
  //   //   href: 'images/function.svg'
  //   // })
  //   return h("g", {}, [
  //     h("rect", {
  //       height: 20,
  //       width: 20,
  //       rx: 2,
  //       ry: 2,
  //       strokeWidth: 1,
  //       fill: "transparent",
  //       stroke: "transparent",
  //       cursor: "pointer",
  //       x: calcx,
  //       y: calcy,
  //       onClick: () => {
  //         // model.deleteGroup();
  //       }
  //     }),
  //     h(
  //       "svg",
  //       {
  //         //transform: "translate(300.000000, 300.000000)",
  //         fill: "#3C96FE",
  //         x: calcx,
  //         y: calcy,
  //         width: 20,
  //         height: 20
  //       },
  //       [
  //         h("path", {
  //           "pointer-events": "none",
  //           d:
  //             "M15.3,1.4 L12.6,1.4 L12.6,0 L5.4,0 L5.4,1.4 L0,1.4 L0,2.8 L2,2.8 L2,17.3 C2,17.6865993 2.31340068,18 2.7,18 L15.3,18 C15.6865993,18 16,17.6865993 16,17.3 L16,2.8 L18,2.8 L18,1.4 L15.3,1.4 Z M14.6,16.6 L3.4,16.6 L3.4,2.8 L14.6,2.8 L14.6,16.6 Z"
  //         }),
  //         h("path", {
  //           "pointer-events": "none",
  //           d:
  //             "M6,5.4 L7.4,5.4 L7.4,14.4 L6,14.4 L6,5.4 Z M10.6,5.4 L12,5.4 L12,14.4 L10.6,14.4 L10.6,5.4 Z"
  //         })
  //       ]
  //     )
  //   ]);
  // }
  getIcon() {
    const { model } = this.props;
    const calcx = model.x - model.width / 2 + 5;
    const calcy = model.y - model.height / 2 + 15;
    const { properties } = model;
    return h('foreignObject',
      { x: calcx, y: calcy, width: 80, height: 60 },
      h('div',
        {
          style: 'display:flex;justify-content:center;align-items:center;flex-direction:column;overflow: hidden;'
        },
        [
          h('div',
            {
              style: "width:40;height:40;  border-radius: 50%;background: #FFF;display:flex;justify-content:center;align-items:center;flex-direction:column;overflow: hidden;"
            },
            h('img', {
              width: 40,
              height: 40,
              src: LoopImg
            }),),
          h('span',
            {
              style: "max-width:100%;overflow: hidden;white-space: nowrap; text-overflow: ellipsis;font-size:12px;font-weight:400;margin-top:10px;line-height:16px;color:rgba(0, 0, 0, 0.68)"
            },
            properties.loopOver || '(not set)'
          ),
          h('span',
            {
              style: "max-width:100%;overflow: hidden;white-space: nowrap; text-overflow: ellipsis;font-size:12px;font-weight:500;color:rgba(0, 0, 0, 0.92)"
            },
            properties.loopObjName || ''
          )
        ])
    );
  }

  getResizeShape() {
    return h("g", {}, [super.getResizeShape(), this.getIcon()]);
  }
}

const Loop = {
  type: 'loop',
  view: LoopView,
  model: LoopModel,
};

export { LoopModel, LoopView };
export default Loop;
