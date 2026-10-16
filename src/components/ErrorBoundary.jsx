import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: false } }
  static getDerivedStateFromError() { return { error: true } }
  componentDidCatch(err) { console.error('[ErrorBoundary]', err) }
  render() {
    if (this.state.error) return this.props.fallback || null
    return this.props.children
  }
}
