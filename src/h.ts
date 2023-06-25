import { vnode, VNode, VNodeData } from "./vnode";
import * as is from "./is";

export type VNodes = VNode[];
export type VNodeChildElement =
  | VNode
  | string
  | number
  | String
  | Number
  | undefined
  | null;
export type ArrayOrElement<T> = T | T[];
export type VNodeChildren = ArrayOrElement<VNodeChildElement>;


/** 类似于函数重载 */
export function h(sel: string): VNode;
export function h(sel: string, data: VNodeData | null): VNode;
export function h(sel: string, children: VNodeChildren): VNode;
export function h(
  sel: string,
  data: VNodeData | null,
  children: VNodeChildren
): VNode;
export function h(sel: any, b?: any, c?: any) :VNode {
  let data: VNodeData = {};
  let children: any;
  let text: any;
  let i: number;

  if (c !== undefined) {
    // 第三个参数不为空，h('div',{},'文本') 或 h('div',{},[]) 或 h('div',{},h())
    if (b !== null) {
      //第二个参数不为空，数据对象data
      data = b;
    }
    if (is.array(c)) {
      children = c;
    } else if (is.primitive(c)) {
      text = c.toString();
    } else if (c && c.sel) {
      //第三个参数是vnode
      children = [c];
    }
  } else if (b !== undefined && b !== null) {
    if (is.array(b)) {
      // h('div',[])
      children = b;
    } else if (is.primitive(b)) {
      // h('div','文本')
      text = b.toString();
    } else if (b && b.sel) {
      // h('div',vnode)
      children = [b];
    } else {
      data = b; // h('div',{})
    }
  }

  if (children !== undefined) {
    for (i = 0; i < children.length; ++i) {
      if (is.primitive(children[i]))
        children[i] = vnode(
          undefined,
          undefined,
          undefined,
          children[i],
          undefined
        );
    }
  }

  return vnode(sel, data, children, text, undefined);
}