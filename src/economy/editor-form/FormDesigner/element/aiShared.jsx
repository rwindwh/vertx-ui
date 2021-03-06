import Op from "../op";
import Ux from "ux";
import Image from "../images";
import React from "react";
import ValueSource from '../../ValueSource/UI';
import RestfulApi from "../../RestfulApi/UI";
import ParamInput from "../../ParamInput/UI";
import DatumUnique from '../../DatumUnique/UI';

import LoadingContent from "../../../loading/LoadingContent/UI";

const field = (reference, jsx) => {
    Op.Setting.field(reference, jsx);
    return Ux.aiSelect(reference, jsx);
};
const render = (reference, jsx) => {
    const {$inited = {}} = reference.props;
    const item = Ux.elementUniqueDatum(reference,
        "model.components", "key", $inited.render)
    const img = Image[item.key];
    return (
        <span className={"render"}>
            <img src={img} alt={item.key}/>
            <label>
                {item.text}
            </label>
        </span>
    )
}
export default {
    yiComponent: (reference, configuration = {}) => {
        let {renders = {}, id = ""} = configuration;
        renders.field = field;
        renders.render = render;
        const state = {};
        Ux.raftForm(reference, {
            id,
            renders,
        }).then(raft => {
            state.raft = raft;
            // Action 提交专用配置
            state.$op = Op.actions;
            return Ux.promise(state);
        }).then(Ux.ready).then(Ux.pipe(reference));
    },
    yoComponent: (reference, $inited = {}) => {
        return (
            <div className={"viewer-layout"}>
                {Ux.xtReady(reference, () => Ux.aiForm(reference, $inited),
                    {component: LoadingContent}
                )}
            </div>
        )
    },
    yoRenders: {
        // 级联选择 API
        cascadeValue: (reference, jsx) => {
            return (
                <ValueSource {...jsx}
                             reference={reference}
                             field={"cascadeTarget"}/>
            )
        },
        // 上传部分 API
        uploadUpApi: (reference, jsx) => {
            const {rxApi} = reference.props;
            return (
                <RestfulApi rxSource={rxApi}
                            reference={reference}
                            {...jsx} />
            )
        },
        uploadUpParam: (reference, jsx) => {
            return (<ParamInput {...jsx} reference={reference} $query/>)
        },
        uploadDownApi: (reference, jsx) => {
            const {rxApi} = reference.props;
            return (
                <RestfulApi rxSource={rxApi}
                            reference={reference}
                            {...jsx} />
            )
        },
        // 地址选择 API
        addrCountryApi: (reference, jsx) => {
            const {rxApi} = reference.props;
            return (
                <RestfulApi rxSource={rxApi}
                            reference={reference}
                            {...jsx} />
            )
        },
        addrStateApi: (reference, jsx) => {
            const {rxApi} = reference.props;
            return (
                <RestfulApi rxSource={rxApi}
                            reference={reference}
                            {...jsx} />
            )
        },
        addrCityApi: (reference, jsx) => {
            const {rxApi} = reference.props;
            return (
                <RestfulApi rxSource={rxApi}
                            reference={reference}
                            {...jsx} />
            )
        },
        addrRegionApi: (reference, jsx) => {
            const {rxApi} = reference.props;
            return (
                <RestfulApi rxSource={rxApi}
                            reference={reference}
                            {...jsx} />
            )
        },
        addrInitApi: (reference, jsx) => {
            const {rxApi} = reference.props;
            return (
                <RestfulApi rxSource={rxApi}
                            reference={reference}
                            {...jsx} />
            )
        },
        ajaxSource: (reference, jsx) => {
            const {rxApi} = reference.props;
            return (
                <RestfulApi rxSource={rxApi}
                            reference={reference}
                            {...jsx} />
            )
        },
        ajaxMagic: (reference, jsx) => {
            return (<ParamInput reference={reference} {...jsx} $query/>)
        },
        remoteSource: (reference, jsx) => {
            const {rxApi} = reference.props;
            return (
                <RestfulApi rxSource={rxApi}
                            reference={reference}
                            {...jsx} />
            )
        },
        serverSource: (reference, jsx) => {
            const {rxApi} = reference.props;
            return (
                <RestfulApi rxSource={rxApi}
                            reference={reference}
                            {...jsx} />
            )
        },
        server2Source: (reference, jsx) => {
            const {rxApi} = reference.props;
            return (
                <RestfulApi rxSource={rxApi}
                            reference={reference}
                            {...jsx} />
            )
        },
        datumInput: (reference, jsx) => {
            return (
                <DatumUnique {...jsx} reference={reference}/>
            )
        },
    }
}