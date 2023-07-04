const setMenu = (lf, {toggleDialogVisible}) => {
    lf.extension.menu.setMenuByType({
        type: "lf:defaultSelectionMenu",
        menu: [
            {
                text: "提取为子规则",
                callback(elements) {
                  console.log("分享成功222！");
                },
              },
              {
                text: '删除',
                callback: (elements) => {
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
                text: "创建自定义java action",
                callback() {
                    toggleDialogVisible('customJavaActionDialog')
                },
              },
              {
                text: '创建自定义决策规则',
                callback: () => {
                  toggleDialogVisible('customRuleDialog')
                //   lf.clearSelectElements();
                //   elements.edges.forEach(edge => lf.deleteEdge(edge.id));
                //   elements.nodes.forEach(node => lf.deleteNode(node.id));
                },
              },
        ],
      });
  };
  
  export default setMenu;
  