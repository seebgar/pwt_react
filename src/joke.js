import React, { Component } from 'react';

const superlink = "https://gateway.marvel.com:443/v1/public/characters?ts=marvelapi&hash=985b84f5b7374243977307c3726b8e88&apikey=72648eeba99211e404e226773f072ecc";


class Joke extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heroes: [],
        }
    }

    componentDidMount() {
        if (!navigator.onLine) {
            this.setState({ heroes: JSON.parse(localStorage.getItem('heroes')) || [] });
        }

        fetch(superlink)
            .then(respose => {
                if (respose) {
                    return respose.json();
                } else {
                    return [];
                }
            })
            .then(respose => {
                this.setState({ heroes: respose.data.results });
                localStorage.setItem('heroes', JSON.stringify(this.state.heroes));
            })
            .catch(err => console.log("Error en fetch :( --> ", err))
    }

    render() {
        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h1>Ejecricio PWA con React</h1>
                    <p>Sebastian Garcia 201630047</p>
                </div>
                {this.state.heroes ? (
                    <React.Fragment>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {this.state.heroes.map((heroe) => {
                                return (
                                    <div style={{ flex: '1' }}>
                                        <h4>id: {heroe.id}</h4>
                                        <h4>Nombre: {heroe.name}</h4>
                                        <h4>Description:</h4>
                                        <p>{heroe.description}</p>
                                        <img src={heroe.thumbnail.path + "/portrait_xlarge.jpg"} />
                                    </div>
                                )
                            })}
                        </div>
                    </React.Fragment>
                ) : (
                        <React.Fragment>
                            <h1>No hay ni mierd</h1>
                        </React.Fragment>
                    )}
            </div>
        );
    }
}

export default Joke;