export interface SnabbdomFragment extends DocumentFragment {
  parent: Node | null;
  firstChildNode: ChildNode | null;
  lastChildNode: ChildNode | null;
}

export interface DOMAPI {
  createElement: (
    tagName: any,
    options?: ElementCreationOptions
  ) => HTMLElement;

  /** 创建元素，并且指定命名空间 */
  createElementNS: (
    namespaceURI: string /** 指定与元素相关联的命名空间URI的字符串 */,
    qualifiedName: string /** 指定要创建的元素的类型的字符串 */,
    options?: ElementCreationOptions
  ) => Element;
  /** 创建文档片段对象 */
  createDocumentFragment?: () => SnabbdomFragment;
  /** 创建文本节点 */
  createTextNode: (text: string) => Text;
  /** 创建注释节点 */
  createComment: (text: string) => Comment;
  /** 在父节点parentNode的字节点referenceNode之前插入新节点newNode*/
  insertBefore: (
    parentNode: Node,
    newNode: Node,
    referenceNode: Node | null
  ) => void;
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

function createElement(
  tagName: any,
  options?: ElementCreationOptions
): HTMLElement {
  return document.createElement(tagName, options);
}

function createElementNS(
  namespaceURI: string,
  qualifiedName: string,
  options?: ElementCreationOptions
): Element {
  return document.createElementNS(namespaceURI, qualifiedName, options);
}

function createDocumentFragment(): SnabbdomFragment {
  return parseFragment(document.createDocumentFragment());
}

function createTextNode(text: string): Text {
  return document.createTextNode(text);
}

function createComment(text: string): Comment {
  return document.createComment(text);
}

function insertBefore(
  parentNode: Node,
  newNode: Node,
  referenceNode: Node | null
): void {
  if (isDocumentFragment(parentNode)) {
    let node: Node | null = parentNode;
    while (node && isDocumentFragment(node)) {
      const fragment = parseFragment(node);
      node = fragment.parent;
    }
    parentNode = node ?? parentNode;
  }
  if (isDocumentFragment(newNode)) {
    newNode = parseFragment(newNode, parentNode);
  }
  if (referenceNode && isDocumentFragment(referenceNode)) {
    referenceNode = parseFragment(referenceNode).firstChildNode;
  }
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node: Node, child: Node): void {
  node.removeChild(child);
}

function appendChild(node: Node, child: Node): void {
  if (isDocumentFragment(child)) {
    child = parseFragment(child, node);
  }
  node.appendChild(child);
}

function parentNode(node: Node): Node | null {
  if (isDocumentFragment(node)) {
    while (node && isDocumentFragment(node)) {
      const fragment = parseFragment(node);
      node = fragment.parent as Node;
    }
    return node ?? null;
  }
  return node.parentNode;
}

function nextSibling(node: Node): Node | null {
  if (isDocumentFragment(node)) {
    const fragment = parseFragment(node);
    const parent = parentNode(fragment);
    if (parent && fragment.lastChildNode) {
      const children = Array.from(parent.childNodes);
      const index = children.indexOf(fragment.lastChildNode);
      return children[index + 1] ?? null;
    }
    return null;
  }
  return node.nextSibling;
}

function tagName(elm: Element): string {
  return elm.tagName;
}

function setTextContent(node: Node, text: string | null): void {
  node.textContent = text;
}

function getTextContent(node: Node): string | null {
  return node.textContent;
}

function isElement(node: Node): node is Element {
  return node.nodeType === 1;
}

function isText(node: Node): node is Text {
  return node.nodeType === 3;
}

function isComment(node: Node): node is Comment {
  return node.nodeType === 8;
}

function isDocumentFragment(node: Node): node is DocumentFragment {
  return node.nodeType === 11;
}

function parseFragment(
  fragmentNode: DocumentFragment,
  parentNode?: Node | null
): SnabbdomFragment {
  const fragment = fragmentNode as SnabbdomFragment;
  fragment.parent ??= parentNode ?? null;
  fragment.firstChildNode ??= fragmentNode.firstChild;
  fragment.lastChildNode ??= fragmentNode.lastChild;
  return fragment;
}

export const htmlDomApi: DOMAPI = {
  createElement,
  createElementNS,
  createTextNode,
  createDocumentFragment,
  createComment,
  insertBefore,
  removeChild,
  appendChild,
  parentNode,
  nextSibling,
  tagName,
  setTextContent,
  getTextContent,
  isElement,
  isText,
  isComment,
  isDocumentFragment,
};
