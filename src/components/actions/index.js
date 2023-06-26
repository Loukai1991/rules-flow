import StartEvent from "./events/StartEvent";
import EndEvent from "./events/EndEvent";
import ErrorEvent from "./events/ErrorEvent";
import ContinueEvent from './events/ContinueEvent'
import BreakEvent from './events/BreakEvent'
import Loop from './group/Loop'
import Decision from "./decisions/Decision";
import Merge from "./decisions/Merge";
import CreateInstance from "./objects/CreateInstance";
import EditInstance from "./objects/EditInstance";
import DeleteInstance from "./objects/DeleteInstance";
import RetriveInstance from "./objects/RetriveInstance";
import CreateList from "./lists/CreateList";
import ChangeList from "./lists/ChangeList";
import ListOperation from "./lists/ListOperation";
import AggregateList from "./lists/AggregateList";
import CreateVariable from "./variables/CreateVariable";
import ChangeVariable from "./variables/ChangeVariable";
import Log from "./logs/Log";
import CallJava from "./call/CallJava";
import CallJs from "./call/CallJs";
import CallMicroflow from "./call/CallMicroflow";
import ExportExcel from "./files/ExportExcel";
import RestApi from "./integration/RestApi";
class ActionsExtension {
  static pluginName = 'ActionsExtension'
  constructor({ lf }) {
    lf.register(StartEvent);
    lf.register(EndEvent);
    lf.register(ErrorEvent);
    lf.register(BreakEvent);
    lf.register(ContinueEvent);
    lf.register(Loop);
    lf.register(Decision);
    lf.register(Merge)
    lf.register(CreateInstance)
    lf.register(EditInstance)
    lf.register(DeleteInstance)
    lf.register(RetriveInstance)
    lf.register(CreateList)
    lf.register(ChangeList)
    lf.register(ListOperation)
    lf.register(AggregateList)
    lf.register(Log)
    lf.register(CreateVariable)
    lf.register(ChangeVariable)
    lf.register(CallJava)
    lf.register(CallJs)
    lf.register(CallMicroflow)
    lf.register(ExportExcel)
    lf.register(RestApi)
    lf.setTheme({
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