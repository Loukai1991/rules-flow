import {
  addDialog, closeDialog
} from "@/components/re-dialog";
import { ref, getCurrentInstance } from 'vue'
import router from '@/router/index.ts'
import { addFlow } from '@/api'
import { useTagsViewStore } from '@/store';
import { merge } from 'lodash-unified';
const tagsViewStore = useTagsViewStore()
const instance = getCurrentInstance()
console.log('route', router, instance)
// debugger
const setMenu = (lf) => {
  lf.extension.menu.setMenuByType({
    type: "lf:defaultSelectionMenu",
    menu: [
      {
        text: "提取为子规则",
        callback(elements) {
          const ruleName = ref('')
          addDialog({
            title: "提取为子规则",
            width: 500,
            footerRenderer: ({ options, index }) => (
              <el-button onClick={() => handleSubmit(options, index)}>
                确定
              </el-button>
            ),
            contentRenderer: () => <el-form ref="ruleFormRef" class="demo-ruleForm" status-icon>
              <el-form-item label="填写规则名称" >
                <el-input v-model={ruleName.value}
                />
              </el-form-item>
            </el-form>
          });
          const addTagsView = (newId) => {
            const fullPath = router.currentRoute.value.path + '?name=' + ruleName.value + '&id=' + newId
            const newRoute = merge({}, router.currentRoute.value, { fullPath: fullPath, meta: { title: ruleName.value }, query: { name: ruleName.value, id: newId } })
            console.log('2', newRoute)
            tagsViewStore.addVisitedView(newRoute)
            tagsViewStore.addCachedView(newRoute)
          }
          const replaceCurrentSelected = (ruleName, ruleId) => {

            const { nodes, edges } = lf.getSelectElements();
            const { startPoint, endPoint } = lf.extension.selectionSelect;
            lf.clearSelectElements();
            //删除选中
            nodes.forEach(node => {
              lf.deleteNode(node.id)
            })
            edges.forEach(edge => {
              lf.deleteEdge(edge.id)
            })
            console.log(1, lf)
            console.log(2, lf.getSelectElements())

            const { transformModel } = lf.graphModel;
            const [x1, y1] = transformModel.HtmlPointToCanvasPoint([
              startPoint.x,
              startPoint.y
            ]);
            const [x2, y2] = transformModel.HtmlPointToCanvasPoint([
              endPoint.x,
              endPoint.y
            ]);
            console.log(x1, x2, y1, y2)
            const width = x2 - x1;
            const height = y2 - y1;
            // if (width < 175 && height < 40) {
            //   // 分组节点太小容易丢失，而且没必要这么小，没法缩小。。。
            //   return;
            // }
            lf.addNode({
              type: "callMicroflow",
              x: x1 + width / 2,
              y: y1 + height / 2,
              properties: {
                name: ruleName,
                ruleId: ruleId
              }
              // width,
              // height,
              // children: nodes.map((item) => item.id)
            });
          }
          const handleSubmit = async (options, index) => {
            //调用接口新增一条规则，把框选的节点连带开始节点和结束节点都带过去
            const { nodes, edges } = lf.getSelectElements();
            let res = await addFlow({ ruleName: ruleName.value, nodes, edges })
            const newId = res.data.id; //TODO 更改接口返回
            //添加tag
            addTagsView(newId);
            //将当前框选的节点移除，并替换为调用规则引擎节点
            replaceCurrentSelected(ruleName.value, newId)
            //关闭弹窗结束
            closeDialog(options, index)
          }
          // console.log("分享成功222！");
        },
      },
      {
        text: '删除',
        callback: (elements) => {
          console.log('ele', elements)
          debugger
          lf.clearSelectElements();
          elements.edges.forEach(edge => lf.deleteEdge(edge.id));
          elements.nodes.forEach(node => lf.deleteNode(node.id));
        },
      },
    ],
  });

  lf.extension.menu.setMenuByType({
    type: "lf:defaultGraphMenu",
    menu: [
      {
        text: "设置为工具活动",
        callback() {
          alert('设置了就能被拖拽了')
        },
      },
      {
        text: '查看规则引擎引用',
        callback: () => {
          alert('弹出引用列表')
          // toggleDialogVisible('customRuleDialog')
          //   lf.clearSelectElements();
          //   elements.edges.forEach(edge => lf.deleteEdge(edge.id));
          //   elements.nodes.forEach(node => lf.deleteNode(node.id));
        },
      },
      // {
      //   text: '创建自定义决策规则',
      //   callback: () => {
      //     toggleDialogVisible('customRuleDialog')
      //   //   lf.clearSelectElements();
      //   //   elements.edges.forEach(edge => lf.deleteEdge(edge.id));
      //   //   elements.nodes.forEach(node => lf.deleteNode(node.id));
      //   },
      // },
    ],
  });
};

export default setMenu;
