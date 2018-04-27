import {Modal} from 'antd';
import Prop from './Ux.Prop';
import Expr from './Ux.Expr';
import U from 'underscore'

const _captureKey = (reference, key) => {
    const {$hoc} = reference.state;
    if ($hoc) {
        const dialog = $hoc._("dialog");
        return dialog[key];
    } else {
        return "";
    }
};

const _buildConfig = (reference, message, fnSuccess, key) => {
    const config = {
        title: _captureKey(reference, key),
        content: message
    };
    if (U.isFunction(fnSuccess)) {
        config.onOk = fnSuccess;
    }
    return config;
};

const showError = (reference, message, fnSuccess) => Modal.error(_buildConfig(reference, message, fnSuccess, "error"));

const showSuccess = (reference, message, fnSuccess) => Modal.success(_buildConfig(reference, message, fnSuccess, "success"));

const _dialogFun = {
    success: showSuccess,
    error: showError
};
/**
 * 添加参数信息
 * @param reference
 * @param key
 * @param fnSuccess
 * @param params
 */
const showDialog = (reference, key, fnSuccess, params) => {
    const modal = Prop.fromHoc(reference, "modal");
    const fun = _dialogFun[modal.type];
    let message = modal.message[key];
    if (params) {
        message = Expr.formatExpr(message, params);
    }
    fun(reference, message, fnSuccess);
};
const fadeIn = (reference = {}) => {
    const {fnShow} = reference.props;
    if (fnShow) fnShow();
};
const fadeOut = (reference = {}) => {
    const {fnHide} = reference.props;
    if (fnHide) fnHide();
};
export default {
    fadeIn,
    fadeOut,
    showError,
    showSuccess,
    showDialog
}
