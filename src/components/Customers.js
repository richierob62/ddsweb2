import buildPage from "../page_utils/page_builder";
import { Component } from "react";

class pageToRender extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const { dispatch, action } = this.props;
    dispatch(action);
  }

  render() {
    return buildPage("customers");
  }
}

export default pageToRender;
