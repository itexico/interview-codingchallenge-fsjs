import React,  {Component}  from 'react';



class AddTask extends Component{
    render(){
      return (
            <form onSubmit={this.props.onSubmit}>
                <div className="card bg-light">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-12">
                                <input onKeyPress={this.props.onChange} type="text" className="form-control" placeholder="Task Name"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2 mt-2">
                                <button type="submit" className="btn btn-info"><i className="fas fa-plus"></i></button>
                            </div>
                            <div className="col-3 mt-2 mr-2">
                                <button type="submit" className="btn btn-info">Create List</button>
                            </div> 
                        </div>
                    </div>     
                </div>
            </form>
      )
    }
}



export default AddTask;