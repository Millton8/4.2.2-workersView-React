import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      this.setState({ hasError: true });
      console.log("ERR", error)
      console.log("info", info)
  
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>Критическая ошибка. Зайдите заново</h1>;
      }
      return this.props.children;
    }
  }