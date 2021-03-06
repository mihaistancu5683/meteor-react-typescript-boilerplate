import * as React from 'react';
import { Component } from 'react';

interface IStringInputRowProps {
    tooltipValue: string;
    inputId: string;
    inputName: string;
    inputPlaceholder: string;
    inputType: string;
    onChange(fieldId: string, fieldValue: string);
}

interface IStringInputRowState {
    visibility: string;
}

export default class StringInputRow extends Component<IStringInputRowProps, IStringInputRowState> {
  constructor(props: IStringInputRowProps) {
    super(props);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  public componentWillMount() {
    this.setState({visibility: 'hidden'});
  }

  public handleChangeSinglePost(value, id){
    this.props.onChange(value, id);
  }

  public render() {
    const { visibility } = this.state;
    return (
          <div className="row">
            <div className="input-field col s12">
              <p style={{visibility : this.state.visibility}}>{this.props.tooltipValue}</p>
              <input
                placeholder={this.props.inputPlaceholder}
                name={this.props.inputName}
                id={this.props.inputId}
                type={this.props.inputType}
                onFocus={this.toggleVisibility}
                onBlur={this.toggleVisibility}
                onChange = {e=>this.handleChangeSinglePost(e.target.value, this.props.inputId)}
              />
            </div>
          </div>
    );
  }

  public toggleVisibility() {
      if (this.state.visibility === 'visible') {
          this.setState({visibility: 'hidden'});
      }else{
          this.setState({visibility: 'visible'});
      }
  }
}
