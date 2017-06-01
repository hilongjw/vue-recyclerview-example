import RecyclerView from './recyclerview'
import './recyclerview.css'

function install (Vue, options = {}) {
  const component = RecyclerView(Vue)
  Vue.component(component.name, component)
  return component
}

export default install
