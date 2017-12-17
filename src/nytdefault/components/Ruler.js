import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ResizeObserver from 'resize-observer-polyfill'

class Ruler extends Component {
  state = { width: 0, height: 0 }

  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    this.mounted = true
    this.ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      this.setState({ width, height })
    })
    this.ro.observe(this.element)
  }

  componentWillUnmount = () => {
    if(this.ro) {
      this.ro.disconnect()
      this.ro = undefined
    }
  }

  render = () => {
    const { children, ...props } = this.props
    const { width, height } = this.state

    return (
      <div {...props} ref={ref => {this.element = ref}}>
        {children(width, height)}
      </div>
    )
  }
}

export default Ruler
