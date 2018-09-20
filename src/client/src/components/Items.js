import React from 'react';

class Items extends Comment {
    render(){
        return (
                <form onSubmit={this.props.onSubmit} >
                    <input onKeyPress={this.props.onChange}/>
                </form>
        );
    }
}

export default Items;