export interface SnabbdomFragment extends DocumentFragment {
    parent: Node | null;
    firstChildNode: ChildNode | null;
    lastChildNode: ChildNode | null;
}
export interface DOMAPI {
    createElement: (tagName: any, options?: ElementCreationOptions) => HTMLElement;
    /** 创建元素，并且指定命名空间 */
    createElementNS: (namespaceURI: string /** 指定与元素相关联的命名空间URI的字符串 */, qualifiedName: string /** 指定要创建的元素的类型的字符串 */, options?: ElementCreationOptions) => Element;
    /** 创建文档片段对象 */
    createDocumentFragment?: () => SnabbdomFragment;
    /** 创建文本节点 */
    createTextNode: (text: string) => Text;
    /** 创建注释节点 */
    createComment: (text: string) => Comment;
    /** 在父节点parentNode的字节点referenceNode之前插入新节点newNode*/
    insertBefore: (parentNode: Node, newNode: Node, referenceNode: Node | null) => void;
    /** 删除子节点 */
    removeChild: (node: Node, child: Node) => void;
    /** 追加子节点 */
    appendChild: (node: Node, child: Node) => void;
    parentNode: (node: Node) => Node | null;
    /** 获取下一个兄弟节点 */
    nextSibling: (node: Node) => Node | null;
    /** 获取元素标签名称 */
    tagName: (elm: Element) => string;
    /** 设置文本内容 */
    setTextContent: (node: Node, text: string | null) => void;
    /** 获取文本内容 */
    getTextContent: (node: Node) => string | null;
    /** 是否是dom元素 */
    isElement: (node: Node) => node is Element;
    /** 是否是文本 */
    isText: (node: Node) => node is Text;
    /** 是否是注释 */
    isComment: (node: Node) => node is Comment;
    /** 是否是文档片段 */
    isDocumentFragment?: (node: Node) => node is DocumentFragment;
}
export declare const htmlDomApi: DOMAPI;
