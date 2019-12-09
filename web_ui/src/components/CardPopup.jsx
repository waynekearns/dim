import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import TruncText from "../helpers/TruncText.jsx";
import IMDbLogo from "../assets/imdb.png";

import "./CardPopup.scss";

class CardPopup extends Component {
    constructor(props) {
        super(props);

        this.popup = React.createRef();

        this.state = {
            overflowing: false,
            class: "card-popup-right"
        };
    }

    componentDidMount() {
        if (this.popup.current) {
            this.props.setCardPopup(this.popup.current);
        }

        const { x, width } = this.popup.current.getBoundingClientRect();
        const overflowing = (x + width > window.innerWidth - 5);

        this.setState({
            accent: this.props.accent
        });

        if (!overflowing) return;

        this.setState({
            overflowing: true,
            class: "card-popup-left"
        });

    }

    render() {
        const {
            id,
            name,
            rating,
            description,
            genres,
            year,
            duration
        } = this.props.data;

        const { accent } = this.props;
        const genre = genres[Math.floor(Math.random() * genres.length)];

        const length = {
            hh: ("0" + Math.floor(duration / 3600)).slice(-2),
            mm: ("0" + Math.floor(duration % 3600 / 60)).slice(-2),
            ss: ("0" + Math.floor(duration % 3600 % 60)).slice(-2)
        };

        const accentCSS = {
            background: accent.background,
            color: accent.text
        };

        return (
            <div className={this.state.class} ref={this.popup}>
                <div className="clipped"/>
                <section className="header">
                    <h1><TruncText content={name} max={8}/></h1>
                    <div className="rating">
                        <img alt="imdb" src={IMDbLogo}/>
                        <p>{rating}</p>
                        <p>10</p>
                    </div>
                </section>
                <section className="content">
                    <section className="description">
                        <h4>DESCRIPTION</h4>
                        {description.length > 0
                            ? <p><TruncText content={description} max={21}/></p>
                            : <p>No description found.</p>
                        }
                    </section>
                    <section className="info">
                        <div className="tags">
                            <p style={accentCSS}>{year}</p>
                            <p style={accentCSS}>{genre}</p>
                        </div>
                        <FontAwesomeIcon className="edit" icon="edit"/>
                    </section>
                    <section className="separator"/>
                    <section className="footer">
                        <div className="length">
                            <p>{length.hh}:{length.mm}:{length.ss}</p>
                            <p>HH MM SS</p>
                        </div>
                        <Link to={`/play/${id}`} className="play-btn">
                            <p style={accentCSS}>PLAY</p>
                            <FontAwesomeIcon icon="play"/>
                        </Link>
                    </section>
                </section>
            </div>
        );
    }
}

export default CardPopup;