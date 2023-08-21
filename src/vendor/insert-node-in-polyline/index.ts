import LogicFlow, { PolylineEdgeModel, EventType, formateAnchorConnectValidateData } from '@logicflow/core';
import type { ConnectRuleResult } from '@logicflow/core/types';
import { cloneDeep } from 'lodash-es';
import { isNodeInSegment } from './edge';

class InsertNodeInPolyline {
  static pluginName = 'insertNodeInPolyline';
  _lf: LogicFlow;
  dndAdd: boolean; // dnd 添加节点到折线上的开关
  dropAdd: boolean; // 移动节点到折线上的开关
  deviation: number; // 节点中心距离直接距离小于该值时，认为节点在折线上
  constructor({ lf }) {
    this._lf = lf;
    // fix https://github.com/didi/LogicFlow/issues/754
    this.deviation = 20;
    this.dndAdd = true;
    this.dropAdd = true;
    this.eventHandler();
  }
  nodeNotAllowAutoInsert(data) {
    return data.properties && data.properties.notAllowAutoInsertNode;
  }
  eventHandler() {
    // 监听事件
    if (this.dndAdd) {
      this._lf.on('node:dnd-add', ({ data }) => {
        if (this.nodeNotAllowAutoInsert(data)) {
          return;
        }
        this.insetNode(data);
      });
    }
    if (this.dropAdd) {
      this._lf.on('node:drop', ({ data }) => {
        const { edges } = this._lf.graphModel;
        const { id } = data;
        // 只有游离节点才能插入到连线上
        let pureNode = true;
        for (let i = 0; i < edges.length; i++) {
          if (edges[i].sourceNodeId === id || edges[i].targetNodeId === id) {
            pureNode = false;
            break;
          }
        }
        if (pureNode) {
          if (this.nodeNotAllowAutoInsert(data)) {
            return;
          }
          this.insetNode(data);
        }
      });
    }
  }

  /**
   * 插入节点前校验规则
   * @param sourceNodeId
   * @param targetNodeId
   * @param sourceAnchorId
   * @param targetAnchorId
   * @param nodeData
   */
  // fix: https://github.com/didi/LogicFlow/issues/1078
  checkRuleBeforeInsetNode(
    sourceNodeId,
    targetNodeId,
    sourceAnchorId,
    targetAnchorId,
    nodeData,
  ) {
    const nodeModel = this._lf.getNodeModelById(nodeData.id);
    const sourceNodeModel = this._lf.getNodeModelById(sourceNodeId);
    const targetNodeModel = this._lf.getNodeModelById(targetNodeId);

    const sourceAnchorInfo = sourceNodeModel.getAnchorInfo(sourceAnchorId);
    const targetAnchorInfo = targetNodeModel.getAnchorInfo(targetAnchorId);

    const sourceRuleResultData:
      Boolean | ConnectRuleResult = sourceNodeModel.isAllowConnectedAsSource(
        nodeData,
        sourceAnchorInfo,
        targetAnchorInfo,
      );
    const targetRuleResultData:
      Boolean | ConnectRuleResult = targetNodeModel.isAllowConnectedAsTarget(
        nodeData,
        sourceAnchorInfo,
        targetAnchorInfo,
      );

    const modelSourceRuleResultData:
      Boolean | ConnectRuleResult = nodeModel.isAllowConnectedAsSource(
        nodeData,
        sourceAnchorInfo,
        targetAnchorInfo,
      );
    const modelTargetRuleResultData:
      Boolean | ConnectRuleResult = nodeModel.isAllowConnectedAsTarget(
        nodeData,
        sourceAnchorInfo,
        targetAnchorInfo,
      );

    const {
      isAllPass: isSourcePass,
      msg: sourceMsg,
    } = formateAnchorConnectValidateData(sourceRuleResultData);
    const {
      isAllPass: isTargetPass,
      msg: targetMsg,
    } = formateAnchorConnectValidateData(targetRuleResultData);

    const {
      isAllPass: isModelSourcePass,
      msg: modelSourceMsg,
    } = formateAnchorConnectValidateData(modelSourceRuleResultData);
    const {
      isAllPass: isModelTargetPass,
      msg: modelTargetMsg,
    } = formateAnchorConnectValidateData(modelTargetRuleResultData);


    return {
      isPass: isSourcePass && isTargetPass && isModelSourcePass && isModelTargetPass,
      sourceMsg,
      targetMsg,
      modelSourceMsg,
      modelTargetMsg
    };
  }

  insetNode(nodeData): void {
    const { edges } = this._lf.graphModel;
    const nodeModel = this._lf.getNodeModelById(nodeData.id);
    for (let i = 0; i < edges.length; i++) {
      // eslint-disable-next-line max-len
      const { crossIndex, crossPoints } = isNodeInSegment(
        nodeModel,
        edges[i] as PolylineEdgeModel,
        this.deviation,
      );
      if (crossIndex >= 0) {
        const {
          sourceNodeId,
          targetNodeId,
          id,
          type,
          pointsList,
          sourceAnchorId,
          targetAnchorId,
        } = edges[i];
        // fix https://github.com/didi/LogicFlow/issues/996
        const startPoint = cloneDeep(pointsList[0]);
        const endPoint = cloneDeep(crossPoints.startCrossPoint);
        //这里我fix过bug 1
        const checkResult = this.checkRuleBeforeInsetNode(
          sourceNodeId,
          targetNodeId,
          sourceAnchorId,
          targetAnchorId,
          nodeData,
        );

        if (!checkResult.isPass) {
          this._lf.graphModel.eventCenter.emit(
            EventType.CONNECTION_NOT_ALLOWED,
            {
              data: nodeData,
              msg: checkResult.targetMsg || checkResult.sourceMsg || checkResult.modelSourceMsg || checkResult.modelTargetMsg,
            },
          );
          // FIXME:在关闭了历史记录的情况下，撤销操作会不生效。
          // setTimeout(() => {
          //   this._lf.undo();
          // }, 200);
          break;
        } else {
          this._lf.deleteEdge(id);
          this._lf.addEdge({
            type,
            sourceNodeId,
            targetNodeId: nodeData.id,
            startPoint,
            endPoint,
            pointsList: [
              ...pointsList.slice(0, crossIndex),
              crossPoints.startCrossPoint,
            ],
          });
          this._lf.addEdge({
            type,
            sourceNodeId: nodeData.id,
            targetNodeId,
            startPoint: cloneDeep(crossPoints.endCrossPoint),
            endPoint: cloneDeep(pointsList[pointsList.length - 1]),
            pointsList: [
              crossPoints.endCrossPoint,
              ...pointsList.slice(crossIndex),
            ],
          });
          break;
        }



        this._lf.deleteEdge(id);
        this._lf.addEdge({
          type,
          sourceNodeId,
          targetNodeId: nodeData.id,
          startPoint,
          endPoint,
          pointsList: [
            ...pointsList.slice(0, crossIndex),
            crossPoints.startCrossPoint,
          ],
        });
        this._lf.addEdge({
          type,
          sourceNodeId: nodeData.id,
          targetNodeId,
          startPoint: cloneDeep(crossPoints.endCrossPoint),
          endPoint: cloneDeep(pointsList[pointsList.length - 1]),
          pointsList: [
            crossPoints.endCrossPoint,
            ...pointsList.slice(crossIndex),
          ],
        });
        debugger
        if (!checkResult.isPass) {
          this._lf.graphModel.eventCenter.emit(
            EventType.CONNECTION_NOT_ALLOWED,
            {
              data: nodeData,
              msg: checkResult.targetMsg || checkResult.sourceMsg,
            },
          );
          // FIXME:在关闭了历史记录的情况下，撤销操作会不生效。
          setTimeout(() => {
            this._lf.undo();
          }, 200);
          break;
        } else {
          break;
        }
      }
    }
  }
}

export { InsertNodeInPolyline };

export default InsertNodeInPolyline;