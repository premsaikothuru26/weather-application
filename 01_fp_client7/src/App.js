import React from "react";
import ReactDOM from 'react-dom';

import Titles from "./components/Titles";
import SearchForm from "./components/SearchForm.js";
import Track from "./components/Track.js";
import TracksB from "./components/TracksB.js";
import ReactTable from "./components/ReactTable.js";

import './App.css';


const token = "yUnnVXRpRpCAvYADxUYaAjKDVjWoPjhuZKyPWHJh";

const genre = [{
    key: "1",
    value: "Default"
    }, {
    key: "2",
    value: "Acoustique"
    }, {
    key: "3",
    value: "Classique"
    }, {
    key: "4",
    value: "Country"
    }, {
    key: "5",
    value: "Metal"
    }, {
    key: "6",
    value: "Pop/Dance"
    },{
    key: "7",
    value: "Rock"
}]

const axios = require('axios');

var newtrackarray = [];

    axios.get('http://localhost:3001/track')
      .then(function (response) {
        // handle success
        console.log('-----<<<<---------')
        console.log(response);
        newtrackarray =response.data;
        console.log(newtrackarray)
        ReactDOM.render(<TrackList name="tracks" text="Playlist - My Tracks in DB" id = "tracks_div" options={newtrackarray} />, document.getElementById('root2'));
    })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        console.log("Request was sent, some response received!")
      });


    class TrackList extends React.Component {
        constructor(props){
            super(props)
        }

        // build the list of options
        render(){

            console.log(this.props)
            console.log(this.props.options)

            //build option list
            console.log('-->>>>>>>>>>>>>>>>>-----------------------------------');
            const track_list=[]

            track_list.push(<tr><th>ID</th><th>Playlist_id</th><th>Title</th><th>URI</th><th>Master_id</th></tr>)
            for(const [index, one_item] of this.props.options.entries()){
                console.log(index)
                console.log(one_item)
                track_list.push(<tr><td>{one_item.id}</td><td>{one_item.playlist_id}</td><td>{one_item.title}</td><td>{one_item.uri}</td><td>{one_item.master_id}</td></tr>)
            }
            console.log(track_list);
            return(
                <div>
                    <fieldset>
                    <legend>{this.props.text}</legend>
                    <table name={this.props.name} id={this.props.id}>
                        {track_list}
                    </table>
                    </fieldset>
                </div>
            )
        }
    }



class App extends React.Component {
    state = {
        id: undefined,
        playlist_id: undefined,
        title: undefined,
        uri:undefined,
        master_id:undefined,
        error:""
    }

    getTracks = async (e) => {
        e.preventDefault();
        const searchinput = e.target.elements.searchinput.value;
        const genreinput = e.target.elements.genreinput.value;

        let genrenumberinput = 0
        genre.forEach(function(obj) { if(obj.value===genreinput)genrenumberinput = obj.key });

        //console.log(genrenumberinput)

        const api_call = await fetch(`https://api.discogs.com/database/search?q=${searchinput}&genre=${genreinput}&per_page=5&page=1&token=${token}`)
        //const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchinput}&appid=${API_KEY}&units=metric`)
        //convert response to json
        const data = await api_call.json();
        if(searchinput){
            console.log(data);
            this.setState({
                id: data.results[0].id,
                playlist_id: genrenumberinput,
                title: data.results[0].title,
                uri:data.results[0].uri,
                master_id:data.results[0].master_id,
                error:""
            });
        } else {
            this.setState({
                id: undefined,
                playlist_id: undefined,
                title: undefined,
                uri:undefined,
                master_id:undefined,
                error:"Please enter the values."
            });
        }
    }

    render(){
        return(
            <div>
                <Titles />
                <SearchForm getTracks={this.getTracks}/>
                <Track
                id={this.state.id}
                playlist_id={this.state.playlist_id}
                title={this.state.title}
                uri={this.state.uri}
                master_id={this.state.master_id}
                error={this.state.error}
                />
                <ReactTable/>
            </div>
            );
        }
};

export default App;