import Ux from "ux";
import uiColumn from "../Web.Column";
import uiTotal from '../Web.Total';

export default (reference) => {
    const state = {};
    state.$ready = true;
    const {$inited = {}} = reference.props;
    /* 是否包含了初始化数据 */
    if (Ux.isEmpty($inited)) {
        state.$data = [];
    } else {
        const normalized = [];
        Object.keys($inited).forEach(key => {
            const hitted = $inited[key];
            if (hitted && hitted.uri) {
                /* 读取 assert 数据 */
                const assist = {};
                assist.name = key;
                assist.key = key;
                /* 三种分离 */
                assist.method = hitted.method ? hitted.method : "GET";
                assist.uri = hitted.uri;
                /* magic 参数节点 */
                if (hitted.magic) {
                    assist.magic = hitted.magic;
                }
                normalized.push(assist);
            }
        })
        state.$data = normalized;
    }
    /* 选择类型 */
    const selection = Ux.fromHoc(reference, "selection");
    if (selection && Ux.isArray(selection.options)) {
        const $selection = Ux.clone(selection);
        $selection.items = [];
        selection.options.forEach(option => {
            const item = {};
            if ("string" === typeof option) {
                const optionArr = option.split(',');
                const [key, text] = optionArr;
                item.value = key;
                item.label = text;
            } else {
                Object.assign(item, option);
            }
            $selection.items.push(item);
        });
        state.$selection = $selection;
    }
    /* 已选中的表格配置 */
    const table = Ux.fromHoc(reference, "table");
    const $table = Ux.clone(table);
    $table.columns = [uiColumn(reference)].concat(Ux.configColumn(reference, $table.columns));
    $table.pagination.showTotal = uiTotal(reference)
    state.$table = $table;
    /* 处理 raft 处理 */
    state.$ready = true;
    reference.setState(state);
}