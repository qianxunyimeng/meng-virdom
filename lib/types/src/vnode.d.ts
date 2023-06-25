import { Hooks } from "./hooks";
import { Props } from "./modules/props";
import { Attrs } from "./modules/attributes";
import { Classes } from "./modules/class";
import { VNodeStyle } from "./modules/style";
import { Dataset } from "./modules/dataset";
import { On } from "./modules/eventlisteners";
import { AttachData } from "./helpers/attachto";
export declare type Key = string | number | symbol;
export interface VNode {
    sel: string | undefined;
    data: VNodeData | undefined;
    children: Array<VNode | string> | undefined;
    elm: Node | undefined;
    text: string | undefined;
    key: Key | undefined;
}
export interface VNodeData {
    props?: Props;
    attrs?: Attrs;
    class?: Classes;
    style?: VNodeStyle;
    dataset?: Dataset;
    on?: On;
    attachData?: AttachData;
    hook?: Hooks;
    key?: Key;
    ns?: string;
    fn?: () => VNode;
    args?: any[];
    is?: string;
    [key: string]: any;
}
/**
 *
 * @param sel 字符串类型的 标签或选择器
 * @param data 一个数据对象，以便在创建时访问或操作 DOM 元素、添加样式、操作 CSS classes、attributes 等
 * @param children 子节点数组
 * @param text 文本子节点
 * @param elm 指向由 vnode 创建的真实 DOM 节点
 * @returns
 */
export declare function vnode(sel: string | undefined, data: any | undefined, children: Array<VNode | string> | undefined, text: string | undefined, elm: Element | DocumentFragment | Text | undefined): VNode;
