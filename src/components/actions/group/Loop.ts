import { GroupNode } from "@logicflow/extension";
import { h } from "@logicflow/core"

class LoopModel extends GroupNode.model {
      /**
   * 初始化
   */
  initNodeData(data) {
    super.initNodeData(data)
    this.width = 400;
    this.height = 200;
    this.radius = 8;
    // this.text.editable = true;
    this.text.x = this.x + 10;
    this.iconPosition = ''; // icon位置，left表示左边，'right'表示右边
    this.defaultFill = 'rgba(220,238,254)';
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
   * 
   */
    getOutlineStyle() {
        const style = super.getOutlineStyle();
        style.stroke = 'transparent';
        style.hover.stroke = 'transparent';
        return style;
      }

    getAddableOutlineStyle() {
        const style = super.getAddableOutlineStyle();
        style.stroke = "#2f54eb";
        // style.strokeDasharray = "3 3";
        return style;
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
        href: 'images/function.svg'
      })
  }
  getShape() {
    const {
      text,
      x,
      y,
      width,
      height,
      radius,
      properties
    } = this.props.model;
    
    console.log('1',this.props.model);
    const style = this.props.model.getNodeStyle()
    return h(
      'g',
      {
        className: 'lf-red-node'
      },
      [
        h('rect', {
          ...style,
          x: x - width / 2,
          y: y - height / 2,
          width,
          height,
          rx: radius,
          ry: radius
        }),
        h(
            'svg',
            {
              x: x - width / 2 + 30,
              y: y - height / 2 + 20,
              width: 25,
              height: 25,
              viewBox: '0 0 1274 1024',
            },
            h('path', {
              fill: style.stroke,
              d:
                'M655.807326 287.35973m-223.989415 0a218.879 218.879 0 1 0 447.978829 0 218.879 218.879 0 1 0-447.978829 0ZM1039.955839 895.482975c-0.490184-212.177424-172.287821-384.030443-384.148513-384.030443-211.862739 0-383.660376 171.85302-384.15056 384.030443L1039.955839 895.482975z',
            }),
          ),
          h('text',
          {
            x:x - width / 2 + 20,
            y:y - height / 2 + 65,
            fill: '#2f54eb',
            fontSize: 14,
            fontWeight:'bold',
            fontFamily: 'Times New Roman'
          },
        properties.loopObjName || '(not set)'
          )
      ]
    )
  }
}

const Loop = {
    type: 'loop',
    view: LoopView,
    model: LoopModel,
  };
  
  export { LoopModel, LoopView };
  export default Loop;
  