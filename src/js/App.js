import React from 'react';

//import ReactDOM from 'react';

class App extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      name: 'My list',
      tasks: []
    }

    this.eventClick = this.eventClick.bind(this);

    this.eventIndex = this.eventIndex.bind(this);

    this.eventChange = this.eventChange.bind(this); 

    this.eventSend = this.eventSend.bind(this); 
  }

  eventClick(event){
    //eslint-disable-next-line
    eval(this[event.target.name])
    .bind(this)(event)
  }

  eventIndex(index, event){
    //eslint-disable-next-line
    eval(this[event.target.name])
    .bind(this)(index, event)
  }

  eventChange(event){
    //eslint-disable-next-line
    eval(this[event.target.name])
    .bind(this)(event)
  }

  eventSend(event){
    event.preventDefault()
  }

  task(event) {
    this.setState({
      task:event.target.value
    })
  }

  addThing(event){
    if (!this.state.task) return
    const tasks = this.state.tasks || []
    tasks.push(this.state.task)

    this.setState({
      tasks:tasks, task:''
    })
  }

  deleteThing(index, event) {
    const tasks = this.state.tasks
    tasks.splice(index, 1)    
    this.setState({
      tasks
    })
  }


  render(){

    const tasks = (this.state.tasks||[]).map((task,index)=>(
      <center>
      <li>
        {task} <button name="deleteThing" class="btn btn-danger"
        onClick={event=>this.eventIndex(index,event)}>Delete</button>
      </li>
      </center>
    ))

    return (
      <div> 
      <center>

        <h1>{this.state.name}</h1>
        <div>

          <ol>
            {tasks}

            {
              this.state.task &&
              <li>{this.state.task}</li>
            }

          </ol>
          <div>

            <form name="sendTask" onSubmit={this.eventSend}>
              <input name="task" value={this.state.task} class="form-control" style={{maxWidth: 200 + 'px', maxHeight: 50 + 'px'}}
              onChange={this.eventChange}/>

              <button type="submit" name="addThing" class= "btn btn-primary"
              onClick={this.eventClick}>Add</button>
            </form>

          </div>
        </div>

        </center>
      </div>
    )
  }
}


export default App;