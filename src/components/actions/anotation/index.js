
import { HtmlResize } from '@logicflow/extension'
import { HtmlNode, HtmlNodeModel, h as LogicH } from '@logicflow/core'
import { NODE_HEIGHT, NODE_WIDTH } from '@/constants/graph.ts'
import VueNode from './index.vue'
import { createApp, ref, h } from 'vue';

class AnotationNodeView extends HtmlResize.view {
    constructor(props) {
        super(props)
        this.isMounted = false
        this.r = h(VueNode, {
            // text: props.model.inputData,
            model: props.model,
            graphModel: props.graphModel,
            disabled: props.graphModel.editConfigModel.isSilentMode,
            isSelected: props.model.isSelected,
            isHovered: props.model.isHovered,
            properties: props.model.getProperties()
        })
        this.app = createApp({
            render: () => this.r
        })
    }
    shouldUpdate() {
        const data = {
            ...this.props.model.properties,
            isSelected: this.props.model.isSelected,
            isHovered: this.props.model.isHovered
        }
        if (this.preProperties && this.preProperties === JSON.stringify(data)) return
        this.preProperties = JSON.stringify(data)
        return true
    }

    setHtml(rootEl) {
        if (!this.isMounted) {
            this.isMounted = true
            const node = document.createElement('div')
            node.style = 'width:100%;height:100%';
            rootEl.appendChild(node)
            this.app.mount(node)
        } else {
            this.r.component.props.properties = this.props.model.getProperties()
        }
    }

    getAnchorShape(anchorData) {
        const { x, y, type } = anchorData
        return LogicH('rect', {
            x: x - 3,
            y: y - 3,
            width: 6,
            height: 6,
            className: `custom-anchor ${type === 'incomming' ? 'incomming-anchor' : 'outgoing-anchor'}`
        })
    }
    getText() {
        return null
    }
}
class AnotationNodeModel extends HtmlResize.model {
    setAttributes() {
        // this.width = 128
        // this.height = 60
        this.minWidth = 60;
        this.text.editable = false
        this.properties.notAllowAutoInsertNode = true;
        this.properties.nodeSize = {
            width: 128,
            height: 60
        }
        // this.inputData = this.text.value
        // this.sourceRules.push({
        //     message: '只允许从右边的锚点连出',
        //     validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
        //         return targetAnchor.type === 'incomming'
        //     }
        // })
    }
    getData() {
        const data = super.getData()
        // data.text.value = this.inputData
        return data
    }
    // setHeight(val) {
    //     this.height = val
    // }
    getOutlineStyle() {
        const style = super.getOutlineStyle()
        style.stroke = 'none'
        style.hover.stroke = 'none'
        return style
    }
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
            },
            {
                x: x,
                y: y - height / 2,
                id: `${id}_top`,
                type: "top"
            },
            {
                x: x,
                y: y + height / 2,
                id: `${id}_bottom`,
                type: "bottom"
            }
        ];
        return anchors;
    }
}

export default {
    type: 'anotation',
    model: AnotationNodeModel,
    view: AnotationNodeView
}