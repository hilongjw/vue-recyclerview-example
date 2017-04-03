function numDomNodes (node) {
  if (!node.children || node.children.length === 0) return 0
  var childrenCount = Array.from(node.children).map(numDomNodes)
  return node.children.length + childrenCount.reduce((p, c) => { return p + c }, 0)
}

export default function initStat () {
  const fpsStat = new window.Stats()
  fpsStat.showPanel(0)
  document.body.appendChild(fpsStat.dom)

  fpsStat.dom.style.top = '98px'

  function animate () {
    fpsStat.update()
    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)

  const stats = new window.Stats()
  const domPanel = new window.Stats.Panel('DOM Nodes', '#0ff', '#002')
  stats.addPanel(domPanel)
  stats.showPanel(3)

  domPanel.dom.style.display = ''
  stats.dom.style.top = '50px'

  document.body.appendChild(stats.dom)
  const TIMEOUT = 500

  if (window.requestIdleCallback) {
    setTimeout(function timeoutFunc () {
      requestIdleCallback(function () {
        domPanel.update(numDomNodes(document.body), 1500)
        setTimeout(timeoutFunc, TIMEOUT)
      })
    }, TIMEOUT)
  } else {
    setInterval(() => {
      domPanel.update(numDomNodes(document.body), 1500)
    }, TIMEOUT)
  }
}
