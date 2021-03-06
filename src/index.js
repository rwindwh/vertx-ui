import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {BrowserRouter} from "react-router-dom";
import workers from "./environment/workers";
// 统一引入AntDesign样式
import 'ant-design-pro/dist/ant-design-pro.css';

import createStore from "./environment/store";
import routes from "./environment/routes";

const store = createStore();

/**
 * @typedef JObject 从Json文件中读取的JsonObject
 * @typedef EmptyActionCreator redux-act 的返回值
 * @typedef ReactComponent React组件引用，通常是 reference
 * @typedef WebColor 值为 #XXXXXX 的Web颜色值（字符串格式）
 * @typedef Ux 全局工具类，核心调用入口
 */
/**
 * @overview
 *
 * # Zero UI框架文档
 *
 * > 确认系统中已经安装了 `> node 8.x`环境，就可执行下边操作了，Windows用户直接参考脚本内容查看生成流程。
 *
 * 主代码调用（主站点：`http://localhost:1017`）
 *
 * ```js
 *
 * // --------------- Zero标准包（Standard）
 * // Zero UI 工具包使用方式
 * import Ux from 'ux';
 *
 * // Zero UI Component 标准组件使用，如：GraphicEditor
 * import {GraphicEditor} from 'web';
 *
 * ```
 *
 * ## 1. 文档配置环境
 *
 * ```shell
 * npm install jsdoc
 * npm install docdash
 * ```
 *
 * 由于项目中本身不存在上述的 dependency 的第三方依赖包，您可以直接安装，也可以加上`-g`参数安装
 * 在全局环境中，安装完成后，直接执行根目录下的 `run-doc-generate.sh` 脚本生成相关文档。
 *
 * ## 2. 文档服务器
 *
 * 如果您要使用文档服务器，先在机器上安装`live-server`（建议使用全局模式）：
 *
 * ```shell
 * npm install live-server -g
 * ```
 *
 * ## 3. 运行服务器
 *
 * 安装完成后，直接执行根目录下的 `/run-doc.sh` 脚本
 *
 * ```shell
 * // 生成 Zero UI/Extension 文档
 * ./run-doc.sh doc
 *
 * // 运行 Zero UI 文档
 * ./run-doc.sh zero
 * ```
 *
 * ## 4. 基本规则
 *
 * ### 4.1. 基本使用
 *
 * 1. Zero Ui模块中的函数全部使用 `Ux.xxx` 的方式调用。
 * 2. Zero Ui Extension模块中的函数全部使用 `Ex.xxx` 的方式调用。
 *
 * ### 4.2. 关于标记
 *
 * 如果有特殊函数，整个文档会使用加粗的方式标记该函数，主要标记如下：
 *
 * * 「Qr」：和查询引擎直接相关的核心函数。
 * * 「Monad」：通常用于函数链中的核心函数。
 * * 「Dev」：只能在开发环境中使用的函数，生产环境不可使用，辅助开发人员调试。
 * * 「Ambiguity」：二义性 or 多义性函数，Zero UI中的特殊函数，具有多重功能。
 * * 「Twins」：特殊的二义性函数，同时作用于`Object`和`Array`。
 * * 「Zero」：和 Zero 框架兼容的核心函数，可直接和 Zero 执行数据交互。
 * * 「Jsx」：最终返回值为 false 或合法的 Jsx 界面渲染内容。
 *
 * ### 4.3. 基本标记规则
 *
 * * 方法定义之前有 `(inner)` 修饰标记，这种类型的方法都可以直接通过 `Ux.xxx` 的方式调用。
 * * 方法定义中的参数 `(arguments)` 为可变长度参数，引用`arguments`默认JS参数处理。
 * * 如果方法返回值中返回`{Promise.<T>}` 则表示该方法支持**同步**和**异步**两种。
 * * 方法定义之前有 `(static)` 修饰标记，则属于类中静态方法，可直接调用。
 *
 * ### 4.4. 章节说明
 *
 * 整个代码说明区域主要包含几个章节
 *
 * * 特殊函数：特殊函数区域，特殊函数会包含和 Zero UI 相关的内容。
 * * 标准函数：在整个 JavaScript 的运行时可用。
 * * 集成函数：直接调用第三方依赖库的专用函数，内置无逻辑。
 * * 引擎函数：位于`engine`专用库中的函数入口。
 *
 * 所有代码中都存在的部分
 *
 * * 参数函数：在调用的API中有特殊的`Function`类型的函数参数说明。
 * * 技巧：演示新旧函数调用的核心技巧，带上【巧】备注。
 *
 * ## 5. 总结
 *
 * 如果您有什么疑问，请联系：[silentbalanceyh@126.com](mailto:silentbalanceyh@126.com)，整体框架相关链接参考左侧菜单。
 * @author 戒子猪
 */
ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <BrowserRouter>
                {routes}
            </BrowserRouter>
        </Provider>
    </ConfigProvider>, document.getElementById("root"));
workers();
