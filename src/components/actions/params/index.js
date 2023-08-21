
import { HtmlNode, HtmlNodeModel } from '@logicflow/core'
import { NODE_HEIGHT, NODE_WIDTH } from '@/constants/graph.ts'
import VueNode from './index.vue'
import { createApp, ref, h } from 'vue';

class ParamsNodeView extends HtmlNode {

    constructor(props) {
        super(props)
        this.isMounted = false
        this.r = h(VueNode, {
            // text: props.model.inputData,
            // model: props.model,
            // graphModel: props.graphModel,
            // disabled: props.graphModel.editConfigModel.isSilentMode,
            isSelected: props.model.isSelected,
            isHovered: props.model.isHovered,
            properties: props.model.getProperties()
        })
        this.app = createApp({
            render: () => this.r
        })
        console.log('出发0')
    }
    shouldUpdate() {
        const data = {
            ...this.props.model.properties,
            isSelected: this.props.model.isSelected,
            isHovered: this.props.model.isHovered
        }
        if (this.preProperties && this.preProperties === JSON.stringify(data)) return
        console.log('do you update')
        this.preProperties = JSON.stringify(data)
        return true
    }
    setHtml(rootEl) {
        if (!this.isMounted) {
            this.isMounted = true
            const node = document.createElement('div')
            rootEl.appendChild(node)
            this.app.mount(node)
            console.log('出发1')
        } else {
            console.log('出发2', this.props.model.getProperties())
            this.r.component.props.properties = this.props.model.getProperties()
            this.r.component.props.isSelected = this.props.model.isSelected
            this.r.component.props.isHovered = this.props.model.isHovered
        }
    }

    // getAnchorShape(anchorData) {
    //     const { x, y, type } = anchorData
    //     return h('rect', {
    //         x: x - 3,
    //         y: y - 3,
    //         width: 6,
    //         height: 6,
    //         className: `custom-anchor ${type === 'incomming' ? 'incomming-anchor' : 'outgoing-anchor'}`
    //     })
    // }
    getText() {
        return null
    }
}
class ParamsNodeModel extends HtmlNodeModel {
    initNodeData(data) {
        super.initNodeData(data)
        // this.nestable = false;
        // this.width = 400;
        // this.height = 200;
        // this.radius = 8;
        // // this.text.editable = true;
        // this.text.x = this.x + 10;
        // this.iconPosition = ''; // icon位置，left表示左边，'right'表示右边
        // this.defaultFill = 'rgba(220,238,254)';
        // this.resizable = true;
        // this.foldable = true;
    }
    setAttributes() {
        this.width = 48
        this.height = 48
        this.text.editable = false
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
        return []
    }
    getConnectedTargetRules() {
        const rules = super.getConnectedTargetRules();
        const notAsTarget = {
            message: '参数不能被连接',
            validate: () => false
        };
        rules.push(notAsTarget);
        return rules;
    }
    getConnectedSourceRules() {
        const rules = super.getConnectedSourceRules();
        const notAsSource = {
            message: '参数不能被连接',
            validate: () => false
        };
        rules.push(notAsSource);
        return rules;
    }
}

export default {
    type: 'params',
    model: ParamsNodeModel,
    view: ParamsNodeView
}