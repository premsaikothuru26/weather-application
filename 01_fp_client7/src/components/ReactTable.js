import React from "react";

const axios = require('axios');

var newtrackarray = [];

    axios.get('http://localhost:3001/track')
      .then(function (response) {
        // handle success
        console.log('-**-**--**--**----')
        //console.log(response);
        newtrackarray =response.data;
        console.log(newtrackarray)
        //ReactDOM.render(<TracksB name="tracks" text="Playlist - My Tracks in DB" id = "tracks_div" options={newtrackarray} />, document.getElementById('root3'));
    })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        console.log("Request was sent, some response received!")
      });



class ReactTable extends React.Component {
    state = {
      rows: [{}]
    };
    handleChange = idx => e => {
      const { id, playlist_id, title, uri, master_id } = e.target;
      const rows = [...this.state.rows];
      rows[idx] = {
        [id]: playlist_id, title, uri, master_id
      };
      this.setState({
        rows
      });
    };
    handleAddRow = () => {
      const item = {
        id: "",
        playlist_id: "",
        title: "",
        uri: "",
        master_id: "",
      };
      this.setState({
        rows: [...this.state.rows, item]
      });
    };
    handleRemoveRow = () => {
      this.setState({
        rows: this.state.rows.slice(0, -1)
      });
    };
    handleRemoveSpecificRow = (idx) => () => {
      const rows = [...this.state.rows]
      rows.splice(idx, 1)
      this.setState({ rows })
    }
    render() {
      return (
        <div>
          <div className="container">
            <div className="row clearfix">
              <div className="col-md-12 column">
                <table
                  className="table table-bordered table-hover"
                  id="tab_logic"
                >
                  <thead>
                    <tr>
                      <th className="text-center"> # </th>
                      <th className="text-center"> ID </th>
                      <th className="text-center"> Playlist_id </th>
                      <th className="text-center"> Title </th>
                      <th className="text-center"> URI </th>
                      <th className="text-center"> Master_id </th>
                      <th className="text-center"> Remove Button </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.rows.map((item, idx) => (
                      <tr id="addr0" key={idx}>
                        <td>{idx}</td>
                        <td>
                          <input
                            type="text"
                            name="id"
                            value={this.state.rows[idx].id}
                            onChange={this.handleChange(idx)}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="playlist_id"
                            value={this.state.rows[idx].playlist_id}
                            onChange={this.handleChange(idx)}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="title"
                            value={this.state.rows[idx].title}
                            onChange={this.handleChange(idx)}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="uri"
                            value={this.state.rows[idx].uri}
                            onChange={this.handleChange(idx)}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="master_id"
                            value={this.state.rows[idx].master_id}
                            onChange={this.handleChange(idx)}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={this.handleRemoveSpecificRow(idx)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button onClick={this.handleAddRow} className="btn btn-primary">
                  Add Row
                </button>
                <button
                  onClick={this.handleRemoveRow}
                  className="btn btn-danger float-right"
                >
                  Delete Last Row
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  export default ReactTable;