import React from "react";
//import SelectList from "./components/SelectList.js";

const OPTIONS = [{
    label: "Default",
    value: "1"
    }, {
    label: "Acoustique",
    value: "2"
    }, {
    label: "Classique",
    value: "3"
    }, {
    label: "Country",
    value: "4"
    }, {
    label: "Metal",
    value: "5"
    }, {
    label: "Pop/Dance",
    value: "6"
    },{
    label: "Rock",
    value: "7"
    }]

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
                option_list.push(<option value={one_item.label}>{one_item.label}</option>)
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

class SearchForm extends React.Component {
    render(){
        return (
            <div>
            <fieldset><legend><h4>Search for artists, albums, etc... on discogs</h4></legend>
            <form onSubmit={this.props.getTracks}>
                Enter String to Search : <input type ="text" name="searchinput" placeholder="Enter Search String..." />
                <SelectList name="genreinput" text="Select Genre : " id = "genre_div" options={OPTIONS} />
                <button>Search</button>
            </form>
            </fieldset>
            </div>
        );
    }
};

export default SearchForm;