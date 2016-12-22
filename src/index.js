import uuid from "node-uuid"
import React from "react"
import {manageAppendedComponents} from "./manage-appended"
let ManageAppendedComponents = manageAppendedComponents()

export function unMountComponentWillAppendToBody() {
  ManageAppendedComponents = manageAppendedComponents()
}

export function componentWillAppendToBody(NewComponent) {

  return class AppendedComponent extends ManageAppendedComponents {
    constructor(props) {
      super(props)
    }

    componentDidMount() {
      this.uniqueId = uuid.v1()
      this.setAppendElementId(this.uniqueId)
      this.update()
    }

    componentDidUpdate() {
      this.update()
    }

    componentWillUnmount() {
      this.deleteAppendElement(this.uniqueId)
    }

    update() {
      this.updateAppendElement(
        <NewComponent
          key={this.uniqueId}
          {...this.props}
        />
      )
    }

    render() {
      // NOTE: since this is an append body component, we need to manage the rendering ourselves
      return null
    }
  }
}