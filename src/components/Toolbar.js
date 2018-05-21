import React from 'react'

class Toolbar extends React.Component {
  
  checkSelected = (messages) => {
    if(this.props.countMsgProps('selected') === 0) {
      return 'fa fa-square-o'
    } else if (this.props.countMsgProps('selected') < messages.length) {
      return 'fa fa-minus-square-o'
    } else {
      return 'fa fa-check-square-o'
    }
  }

  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">
              {this.props.messages.length - this.props.countMsgProps("read")}
            </span>
            unread messages
          </p>

          <a className="btn btn-danger">
            <i className="fa fa-plus"
              onClick={() => {
                this.props.clickComposeMsg()}}>
            </i>
          </a>

          <button className="btn btn-default"
                  onClick={() => {
                    this.props.bulkSelectUnselect()}}>
            <i className={this.checkSelected(this.props.messages)}></i>
          </button>

          <button className="btn btn-default"
                  onClick={() => {
                    this.props.markReadUnread(true)}}>
            Mark As Read
          </button>

          <button className="btn btn-default"
                  onClick={() => {
                    this.props.markReadUnread(false)}}>
            Mark As Unread
          </button>

          <select className="form-control label-select"
                  onChange={(e) => {
                    this.props.updateMsgLabels(e.target.value, true)
                  }}>
            <option value={false}>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select"
                  onChange={(e) => {
                    this.props.updateMsgLabels(e.target.value, false)
                  }}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default"
                  onClick={() => {
                    this.props.deleteMsg()
                  }}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}
export default Toolbar
