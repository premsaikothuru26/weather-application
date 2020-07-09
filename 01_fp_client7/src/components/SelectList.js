import React from "react";

class SelectList extends React.Component {
    constructor(props){
        super(props)
    }

    // build the list of options
    render(){

        console.log(this.props)
        console.log(this.props.options)

        //build option list

        const option_list=[]

        for(const [index, one_item] of this.props.options.entries()){
            option_list.push(<option value={one_item.value}>{one_item.label}</option>)
        }

        return(
            <div>
                <label>{this.props.text}</label>
                <select name={this.props.name} id={this.props.id}>
                    {option_list}
                </select>
            </div>
        )
    }
}

export default SelectList;