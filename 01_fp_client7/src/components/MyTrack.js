import React from "react";

class Track extends React.Component{
    render(){
        return(
            <div>
                {this.props.playlist_id && <p>Playlist_id:  {this.props.playlist_id }</p>}
                {this.props.title && <p>Title: { this.props.title }</p>}
                {this.props.cover_image && <p>Cover_image: { this.props.cover_image }</p>}
                {this.props.resource_url && <p>Resource_url: { this.props.resource_url }</p>}
                {this.props.type && <p>Type: { this.props.type }</p>}
                {this.props.error && <p>{this.props.error}</p>}
            </div>
        );
    }
};

export default Track;