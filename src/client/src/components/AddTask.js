import React,  {Component}  from 'react';



class AddTask extends Component{

    constructor(props){
        super(props)
        this.state= {
          name:'',
          items: []
        }
    
        this.writing = this.writing.bind(this);
        this.list = this.list.bind(this);
      }
    
      writing(e){
        this.setState({name:e.target.value});
        
      }
    
      list(e){
        e.preventDefault();
        var newItem = `items-${this.state.items.length}`;
        this.setState({ items: this.state.items.concat([newItem]) });
        
      }

    render(){
      return (
            <form onSubmit={this.list}>
                <div className="card bg-light">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-12">
                                {this.state.items.map(input => <input onChange={this.writing} type="text" className="form-control" placeholder="Task Name"  value={input} />)}      
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2 mt-2">
                                <button type="submit" className="btn btn-info"><i className="fas fa-plus"></i></button>
                            </div>
                        </div>
                    </div>     
                </div> 
            </form>
      )
    }

    componentWillMount(){
        fetch('https://randomuser.me/api/?results=50')
            .then(response => response.json())
            .then(users => {

                
            })
    }
}



export default AddTask;