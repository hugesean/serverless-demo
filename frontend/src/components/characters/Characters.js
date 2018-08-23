import React, {Component,PropTypes} from 'react'
import './characters.css';

class Characters extends Component{
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    var sess=this;
    this.getCharacters().then((data) => {
      sess.setState({ characters: data })
    });
  }
  
  getCharacters() {
    var response={};
    var sess=this;
    return new Promise((resolve,reject) => {
        fetch('https://<YOUR APP ID>.execute-api.<YOUR AWS REGION>.amazonaws.com/latest/characters', {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          })
        }).then(results=>{
            results.json().then(function(data) {
              resolve(data);
            });
        });
    });
  }
  
  

  render() {
    var rows;
    if(this.state!=null)
    {
        rows = this.state.characters.map((character) =>{
            return <tr><td>{character.characterId}</td><td>{character.name}</td><td>{character.actor}</td><td>{character.description}</td><td>{character.debut}</td></tr>
        });
    }
    
    return (
      <div className="container">
          <div className="App">
              <table class="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actor</th>
                    <th>Description</th>
                    <th>Debut</th>
                  </tr>
                </thead>
                  {rows}
              </table>
          </div>
      </div>
    );
  }
}

export default Characters;