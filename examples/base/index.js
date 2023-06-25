import { h ,init} from "../../lib/index.esm.js"

const node1 = h('div', {}, 'dom')
const node2 = h('ul', [
  h('li', {}, '苹果'),
  h('li', {},"梨")
])
const path  = init([])
const container = document.getElementById("container")

path(container,node2)

