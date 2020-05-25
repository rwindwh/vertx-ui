/*
 * 命令按钮基本操作
 */
import React from 'react';
import {Collapse, Menu} from "antd";
import Ux from 'ux';
import DragItem from './Web.Source';

export default (reference) => {
    const {$palette = []} = reference.state;
    const {$height = 120} = reference.props;
    return (
        <Collapse activeKey={["pageBasic", "pageAdv"]}
                  className={"designer-control"}>
            {$palette.map(palette => (
                <Collapse.Panel key={palette.key}
                                showArrow={false}
                                header={palette.title}>
                    <Menu className={"web-items"}
                          style={{
                              height: Ux.toHeight($height)
                          }}>
                        {palette.items.map(item => (
                            <DragItem item={item} key={item.key}/>
                        ))}
                    </Menu>
                </Collapse.Panel>
            ))}
        </Collapse>
    );
}