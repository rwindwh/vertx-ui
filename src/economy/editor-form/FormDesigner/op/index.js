import dragging from './dragging/O.dragging';
import event from './O.event';
import yiPage from './O.yi.page';
import editor from './editor/O.editor';
import Cmn from './library';

const exported = {
    /* yi 系列方法 */
    yiPage,

    ...editor,
    ...dragging,
    ...event,
    DragTypes: {
        FormDesigner: "FormDesigner",
        RowDesigner: "RowDesigner",
        CellDesigner: "CellDesigner"
    },
    /* 开放的函数区域 */
    ...Cmn,
    /* 特殊方法 */
    dataIn: event.actions.$opDataIn,
}
console.info(exported);
export default exported;