import React, { Component } from "react";
import Navigation from "./Navigation";

class App extends Component {

  constructor() {

    super();

    this.state = {
      name: "",
      category: "",
      tasks:[],
      _id:''
    };

    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
 

  componentDidMount() {
    this.fetchTasks();
}



  addTask(e) {
    if(this.state._id){
        fetch(`/api/tasks/${this.state._id}`,{
            method:'PUT',
            body:JSON.stringify(this.state),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              }

        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            M.toast({html:'Date Updated!'});
            this.setState({
                name:'',
                category:'',
                _id:''
            });
            this.fetchTasks()
        })

    }else{
        fetch("/api/tasks", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html:'Date Saved!'})
                this.setState({
                    name:'',
                    category:''
                });
                this.fetchTasks();
            })
            .catch(err => console.log(err));
    }
    e.preventDefault();
  }

  

  fetchTasks(){
      fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
          this.setState({tasks:data})
          console.log(this.state.tasks)
      });
  }



  deleteTask(id){
      fetch(`/api/tasks/${id}`,{
          method:'DELETE',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
      })
      .then(res => res.json())
      .then(data=>{
          console.log(data)
          M.toast({html:'Date Deleted!'});
          this.fetchTasks();
      })
  }


  editTask(id){
      fetch(`/api/tasks/${id}`)
         .then(res => res.json())
         .then(data => {
             console.log(data)
             this.setState({
                 name:data.name,
                 category:data.category,
                 _id:data._id
             })
         })

  }



  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }



  render() {

    return (

      <div>

        <Navigation />

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col-s12">
                        <input
                          name="name"
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.name}
                          placeholder="Name"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col-s12"> 
                        <input
                          name="category"
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.category}
                          placeholder="Category"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn light-blue darken-4">
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col s7">
                   <table>
                       <thead>
                            <tr>
                                 <th>Name:</th>
                                 <th>Category:</th>
                            </tr>
                       </thead>
                       <tbody>
                           {
                               this.state.tasks.map(task => {
                                       return(
                                           <tr key={task._id}>
                                               <td>{task.name}</td>
                                               <td>{task.category}</td>
                                               <td>
                                                   <button className="btn red darken-4" onClick={ () => this.deleteTask(task._id)}><i className="material-icons">clear</i></button>
                                                   <button className="btn light-blue darken-4" onClick={ () => this.editTask(task._id) } style={{margin:'8px'}}><i className="material-icons">edit</i></button>
                                               </td>
                                           </tr>
                                       )
                               })
                           }


                       </tbody>
                   </table>
                  
            </div>


          </div>
        </div>
      </div>
    );
  }
}

export default App;
