import * as React from 'react';
import * as pick from 'lodash/pick';
import {isMind} from '../../utils';
import global from '../../common/global';
import {
    GraphCanvasEvent,
    GraphCommonEvent,
    GraphCustomEvent,
    GraphEdgeEvent,
    GraphNodeEvent,
    GraphType,
} from '../../common/constants';
import {FlowData, GraphNativeEvent, GraphReactEvent, GraphReactEventProps, MindData} from '../../common/interfaces';
import {EditorPrivateContextProps, withEditorPrivateContext} from '../EditorContext';

import './command';
import './behavior';

interface GraphProps extends Partial<GraphReactEventProps>, EditorPrivateContextProps {
    style?: React.CSSProperties;
    className?: string;
    containerId: string;
    data: FlowData | MindData;

    parseData(data: object): void;

    initGraph(width: number, height: number): G6.Graph;
}

interface GraphState {
}

class Graph extends React.Component<GraphProps, GraphState> {
    graph: G6.Graph | null = null;

    componentDidMount() {
        this.initGraph();
        this.bindEvent();
    }

    componentDidUpdate(prevProps: GraphProps) {
        const {data} = this.props;

        if (data !== prevProps.data) {
            this.changeData(data);
        }
    }

    focusRootNode(graph: G6.Graph, data: FlowData | MindData) {
        if (!isMind(graph)) {
            return;
        }

        const {id} = data as MindData;

        graph.focusItem(id);
    }

    initGraph() {
        const {containerId, parseData, initGraph, setGraph} = this.props;
        const {clientWidth = 0, clientHeight = 0} = document.getElementById(containerId) || {};

        // 解析数据
        const data = {...this.props.data};

        parseData(data);

        // 初始画布
        this.graph = initGraph(clientWidth, clientHeight);

        this.graph.read(data);
        this.focusRootNode(this.graph, data);
        this.graph.setMode('default');

        setGraph(this.graph);

        // 发送埋点
        if (global.trackable) {
            const graphType = isMind(this.graph) ? GraphType.Mind : GraphType.Flow;

        }
    }

    bindEvent() {
        const {graph, props} = this;

        if (!graph) {
            return;
        }

        const events: {
            [propName in GraphReactEvent]: GraphNativeEvent;
        } = {
            ...GraphCommonEvent,
            ...GraphNodeEvent,
            ...GraphEdgeEvent,
            ...GraphCanvasEvent,
            ...GraphCustomEvent,
        };
        (Object.keys(events) as GraphReactEvent[]).forEach(event => {
            if (typeof props[event] === 'function') {
                graph.on(events[event], props[event]);
            }
        });
    }

    changeData(data: any) {
        const {graph} = this;
        const {parseData} = this.props;

        if (!graph) {
            return;
        }

        parseData(data);

        graph.changeData(data);
        this.focusRootNode(graph, data);
    }

    render() {
        const {containerId, children} = this.props;
        return (
            <div id={containerId} {...pick(this.props, ['className', 'style'])}>
                {children}
            </div>
        );
    }
}

export default withEditorPrivateContext(Graph);
