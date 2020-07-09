import React from "react";
import ReactDOM from 'react-dom';



const axios = require('axios');

var newtrackarray = [];

    axios.get('http://localhost:3001/track')
      .then(function (response) {
        // handle success
        console.log('-----<<<<---------')
        console.log(response);
        newtrackarray =response.data;
        console.log(newtrackarray)
        ReactDOM.render(<TracksB name="tracks" text="Playlist - My Tracks in DB" id = "tracks_div" options={newtrackarray} />, document.getElementById('root3'));
    })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        console.log("Request was sent, some response received!")
      });


    class TracksB extends React.Component {
        constructor(props){
            super(props)
        }

        deleteclick = (id) => {
            console.log(id)
            console.log(id+'delete button is clicked')

            axios.delete('http://localhost:3001/track/'+id).then(function (response) {
                // handle success
                console.log('Row Deleted Successfully')
                console.log(response);
                alert('Row Deleted Successfully')

            })
              .catch(function (error) {
                // handle error
                console.log(error);
              })
              .finally(function () {
                // always executed
                console.log("Delete Request was sent, some response received!")
              });
        }
        editclick = () => {
            console.log('edit button is clicked')
        }
        playclick = () => {
            console.log('play button is clicked')
        }

        // build the list of options
        render(){

            console.log(this.props)
            console.log(this.props.options)

            //build option list
            console.log('-->>>>>>>>>>>>>>>>>-----------------------------------');
            const track_list=[]

            track_list.push(<tr><th>ID</th><th>Playlist_id</th><th>Title</th><th>URI</th><th>Master_id</th><th>Delete Row</th><th>Edit Row</th><th>Play</th></tr>)
            for(const [index, one_item] of this.props.options.entries()){
                console.log(index)
                console.log(one_item)
                track_list.push(<tr><td>{one_item.id}</td><td>{one_item.playlist_id}</td><td>{one_item.title}</td><td>{one_item.uri}</td><td>{one_item.master_id}</td><th><button id = {"btn"+one_item.id} type="button" onClick={()=>this.deleteclick(one_item.id)}>Delete</button></th><th><button type="button" onClick={this.editclick}>Edit</button></th><th><button type="button" onClick={this.playclick}>Play</button></th></tr>)
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

/*
class TracksB extends React.Component{
    render(){
        return(
            <div>
                <h5>My Tracks in Database</h5>
            </div>
        );
    }
};
*/
export default TracksB;