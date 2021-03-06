import React from 'react'
import {Alert, Table, Tabs} from "antd";
import {MarkdownViewer} from 'web';
import Ux from 'ux';
import Rdr from './Op.Extra';

const {zero} = Ux;

const renderColumn = (columns = []) => columns.map(column => {
    Ux.D.vtCategory(column);
    Ux.D.vtNameOption(column);
    Ux.D.vtSource(column);
    Ux.D.vtConsumer(column);
    return column;
});
const renderPage = (reference, {
    markdown, table, message
}) => {
    const {
        content, // Markdown内容
        ...rest // 其他配置
    } = markdown;
    // 表格数据信息
    const {$datalist = {}} = reference.props;
    let data = $datalist[rest.tab];
    if (data) {
        data.forEach(item => item.key = Ux.randomUUID());
        data = data.sort((left, right) => Ux.sorterAsc(left, right, 'source'));
    }
    // 给$datatree设置Key
    return (
        <Tabs.TabPane {...rest}>
            {Ux.auiTab(reference)
                .mount("tabBarExtraContent", Rdr.renderExtra(reference))
                .to(
                    <MarkdownViewer $source={content}/>,
                    <div>
                        <Alert message={message}
                               type={"warning"} style={{
                            marginBottom: 8
                        }}/>
                        <Table {...table}
                               dataSource={data}/>
                    </div>
                )}
        </Tabs.TabPane>
    )
};

@zero(Ux.rxEtat(require("./Cab.json"))
    .cab("UI.Markdown")
    .to()
)
class Component extends React.PureComponent {
    render() {
        const {$markdown = []} = this.props;
        if (0 < $markdown.length) {
            const key = $markdown[0].key;
            const table = Ux.fromHoc(this, "table");
            const info = Ux.fromHoc(this, "info");
            table.columns = renderColumn(table.columns);
            /** 先不考虑排序
             Ux.D.stString(table.columns,
             "source", "provider", "consumer",
             "name", "category"
             );**/
            return (
                <Tabs className={"page-card-subtab"}
                      tabPosition={"left"}
                      defaultActiveKey={key} size={"small"}>
                    {$markdown.map(markdown => renderPage(this, {
                        markdown,
                        table,
                        message: info.message
                    }))}
                </Tabs>
            )
        } else return false;
    }
}

export default Component