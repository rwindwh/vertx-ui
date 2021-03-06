import Ux from "ux";
import {Dsl} from 'entity';

export default (reference) => (pagination, filters, sorter) => {
    /*
     * 表格条件变更
     * 1. pagination：分页变更
     * 2. filters：筛选表更
     * 3. sorter：排序变更
     */
    reference.setState({
        $loading: true,
        // FIX：带有 filters 的列同时使用排序和过滤时的排序不生效的问题
        $sorter: sorter,
    });
    Ux.dgDebug({
        pagination,
        filters,
        sorter
    }, "[ ExTable ] 改变条件专用事件");
    /*
         * 结合 Ant Design 中 Table 的特殊属性
         * filters 一般的格式是：field = []
         * 这种情况下，直接删除掉本身条件，即不包含 length = 0 的情况
         * 解决BUG
         * 1）后端 500
         * 2）主要原因 code,=: [] 这种格式会非法，= 和 [] 冲突
         */
    const $filters = {};
    Object.keys(filters)
        .filter(key => undefined !== filters[key])
        .filter(key => 1 < filters[key].length)
        .forEach(key => $filters[key] = filters[key]);
    /*
     * 由于当前引用的 props 中包含了 $query
     * 构造四个核心参数
     */
    const {$query = {}, $condition = {}, $terms = {}} = reference.props;    // 默认的 $query
    /*
     * 最终条件计算
     */
    Ux.dgQuery(reference, "Table 组件：$loading = false, onChange");
    const query = Ux.qrComplex($query, {state: {$condition, $terms, $filters}});
    const queryRef = Dsl.getQuery(query, reference);
    /*
     * 分页参数处理
     */
    if (pagination) {
        const {current, pageSize} = pagination;
        /*
         * 分页动作触发
         */
        if (current && pageSize) {
            /*
             * 分页信息
             * 1. current 是当前页
             * 2. pageSize 是每页数据
             */
            queryRef.page(current).size(pageSize);
        }
    }
    /*
     * 执行排序操作
     */
    if (!sorter.hasOwnProperty('order')) {
        queryRef.sort([]);
    } else {
        const {field = "", order = "ascend"} = sorter;
        const isAsc = "ascend" === order;
        /**
         * 排序信息
         * 设置排序字段和排序模式
         * 1. field是排序的字段
         * 2. isAsc是排序模式
         */
        queryRef.sort(field, isAsc);
    }
    const request = queryRef.to();
    /*
     * 最终的 Query 变更
     */
    // Ex.rx(reference).query(queryRef.to());
    reference.setState({$query: request});
};