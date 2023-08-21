import Loop from './group/Loop'
import Anotation from './anotation'
import Params from './params'
import RectHtmlNode from './rect-html-node'
import DiamondHtmlNode from './diamond-html-node'
import CircleHtmlNode from './circle-html-node'
class ActionsExtension {
  static pluginName = 'ActionsExtension'
  constructor({ lf }) {
    lf.register(Loop);
    lf.register(DiamondHtmlNode)
    lf.register(CircleHtmlNode)
    lf.register(Anotation)
    lf.register(Params)
    lf.register(RectHtmlNode)
    lf.setTheme({
      snapline: {
        stroke: "#2961EF", // 对齐线颜色
        strokeWidth: 1, // 对齐线宽度
      },
      arrow: {
        offset: 4,
        verticalLength: 3,
      },
      nodeText: { overflowMode: 'ellipsis', lineHeight: 1.5, autoWrap: true },
      edgeText: { overflowMode: 'ellipsis', lineHeight: 1.5 },
    })
    // lf.setDefaultEdgeType('flow-link');
    // this.app = createApp(Palette, {
    //   lf
    // })
  }
  render(lf, domOverlay) {
    // const node = document.createElement('div')
    // node.className = 'node-red-palette'
    // domOverlay.appendChild(node)
    // this.app.mount(node)
  }
}

export default ActionsExtension