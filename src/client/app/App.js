import React, { Component } from 'react';

class App extends Component {
    constructor(){
        super();
        this.state = {
            listTitle: '',
            listItem: '',
            itemTitle: '',
            lists: []
        }
        this.addList = this.addList.bind(this);
        this.addItem = this.addItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.getLists();
    }

    getLists() {
        fetch('/api/lists')
        .then(res => res.json())
        .then(data => {
            this.setState({lists: data});          
        });
    }

    addList(e){
        var list = {
            title: this.state.listTitle
        }
        fetch('/api/lists', {
            method: 'POST',
            body: JSON.stringify(list),
            headers: {
                'Accept':  'application/json',
                'Content-Type':  'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            M.toast({html: 'List saved'});
            this.setState({listTitle: ''});
            this.getLists();
        })
        .catch(err => console.log(err));
        e.preventDefault();
    }

    addItem(e){
        if(this.state.itemTitle != ''){
            var item = {
                title: this.state.itemTitle
            }
            fetch('/api/lists/item/'+this.state.listItem, {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Accept':  'application/json',
                    'Content-Type':  'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Item saved'});
                this.setState({listItem: '', itemTitle: ''});
                this.getLists();
            })
            .catch(err => console.log(err));
        }
        e.preventDefault();
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
        
    }

    deleteList(id){
        fetch('/api/lists/'+id,{
            method: 'DELETE',
            headers: {
                'Accept':  'application/json',
                'Content-Type':  'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            M.toast({html: 'List deleted'});
            this.getLists();
        })
        .catch(err => console.log(err));  
    }

    deleteItem(id, idItem){
        fetch('/api/lists/item/'+id+'/'+idItem,{
            method: 'DELETE',
            headers: {
                'Accept':  'application/json',
                'Content-Type':  'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            M.toast({html: 'Item deleted'});
            this.getLists();
        })
        .catch(err => console.log(err));    
    }

    render() {
        return (
            <div>
                {/* NAVIGATION */}
                <nav className="amber accent-3">
                    <div className="container">
                        <a className="brand-logo" href="/">Favorites</a>
                        <ul id="nav-mobile" className="right">
                            <form onSubmit={this.addList}>
                                <li style={{marginRight:30}}>
                                    <input name="listTitle" type="text" onChange={this.handleChange}  style={{ color: '#000000', borderBottomWidth: 0, backgroundColor:'#FFFFFF', paddingLeft:10,paddingRight:10,borderRadius:3}} placeholder="New List"/>
                                </li>
                                <li>
                                    <button type='submit' className='btn-floating btn-small waves-effect waves-light grey lighten-5'>
                                        <i className='material-icons' style={{color:'#ffc400'}}>add</i>
                                    </button>
                                </li>
                            </form>
                        </ul>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        {
                            this.state.lists.map(list =>{
                                return (
                                    <div className="col s6" key={list._id}>
                                        <div className="card">
                                            <div className="card-content">
                                                <div className="row">
                                                    <span className="card-title col s10" style={{ color: '#00000', borderBottomWidth: 0 }}>{list.title}</span>
                                                    <div className="col s2">
                                                        <button onClick={()=>this.deleteList(list._id)} className='btn-floating btn-small waves-effect waves-light grey lighten-5'>
                                                            <i className='material-icons' style={{ color: '#D1D1D1' }}>delete</i>
                                                        </button>
                                                    </div>
                                                </div>
                                                {
                                                    list.items.map(item =>{
                                                        return(
                                                            <div className="row" key={item._id}>
                                                                <div className="col s10" style={{ color: '#00000', borderBottomWidth: 0 }}>{item.title}</div>
                                                                <div className="col s2">
                                                                    <button onClick={()=>this.deleteItem(list._id,item._id)} className='btn-floating btn-small transparent' style={{ borderWidth: 0, boxShadow: 0 }}>
                                                                        <i className='material-icons' style={{ color: '#D1D1D1' }}>close</i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div className="row" style={{ marginTop: 30 }}>
                                                <form onSubmit={this.addItem}>
                                                    <input name="itemTitle" type="text" onChange={this.handleChange} className="col s10" style={{ color: '#00000', borderBottomWidth: 0 }} placeholder="New item"/>
                                                    <div className="col s2">
                                                        <button type='submit' onClick={()=>this.setState({listItem:list._id})} className='btn-floating btn-small transparent' style={{ borderWidth: 0, boxShadow: 0 }}>
                                                            <i className='material-icons' style={{ color: '#D1D1D1' }}>add</i>
                                                        </button>
                                                    </div>
                                                </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default App;