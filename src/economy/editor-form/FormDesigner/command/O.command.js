import Ux from 'ux';

const showPopover = (reference, item) => {
    // 屏蔽主操作
    reference.setState({
        $forbidden: true,    // 禁止屏幕主操作
        $popover: item.key,  // 打开 Popover
    });
}
const showDrawer = (reference, item, config = {}) => {
    // 屏蔽主操作
    let {rowIndex} = config;
    reference.setState({
        $drawer: item.key,      // 打开 Popover
        $setting: {
            type: "row",
            className: "web-form-designer-drawer",
            rowIndex,
        }
    })
}
/*
 * 绘图过程中添加行操作
 */
const rowAdd = (reference, item, config) => {
    let {rowIndex} = config;
    Ux.fn(reference).rxRowAdd(rowIndex);
}
const rowDel = (reference, item, config) => {
    let {rowIndex} = config;
    Ux.fn(reference).rxRowDel(rowIndex);
}

export default {
    layout: showPopover,
    "deployment-unit": showPopover,
    "eye-invisible": showPopover,
    code: showPopover,
    database: showPopover,
    // 画布上的操作
    "plus-circle": rowAdd,
    "minus-circle": rowDel,
    setting: showDrawer,
}