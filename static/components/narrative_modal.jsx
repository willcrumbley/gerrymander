"use strict"

import React from 'react';
import ReactModal from 'react-modal';

import narrative_data from './narrative.jsx';

class NarrativeModal extends React.Component {
    constructor(props) {
        super();
        this.state = {
            showModal: props.show,
            index: 0,
            skipIntroHidden: false,
            nextButtonText: "Next"
        };

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }

    handleCloseModal() {
        this.setState({ showModal: false });
        this.props.onCloseModal();
    }

    prev() {
        var prevIndex = this.state.index - 1;
        if (prevIndex >= 0) {
            this.setState({ index: prevIndex });
            this.setState({ skipIntroHidden: false });
            this.setState({ nextButtonText: "Next" });
        }
    }

    next() {
        var nextIndex = this.state.index + 1;
        if (nextIndex < narrative_data.length) {
            this.setState({ index: nextIndex });
        } else {
            this.handleCloseModal();
        }
        if (nextIndex === narrative_data.length - 1) {
            this.setState({ skipIntroHidden: true });
            this.setState({ nextButtonText: "Explore the Algorithm" });
        }
    }

    render() {
        var style = {overlay: { backgroundColor: 'rgba(255, 255, 255, 1)'}}
        return (
            <div>
                <ReactModal 
                    isOpen={this.state.showModal}
                    contentLabel="Efficiency Gap Narrative"
                    style={style}
                    >
                    <div className='container'>
                        <div className='row'>
                            <h4>{narrative_data[this.state.index].title}</h4>
                        </div>
                        <div className='row m-5'>
                            <div className='col-6'>{narrative_data[this.state.index].context}</div>
                            <div id='illustration' className='col-6'>
                                {narrative_data[this.state.index].illustration}
                            </div>
                        </div>
                        <div className='row float-left'>
                            <button onClick={this.handleCloseModal} className="btn btn btn-outline-secondary" 
                                hidden={this.state.skipIntroHidden}>Skip Introduction</button>
                        </div>
                        <div className='row float-right'>
                            <button onClick={this.prev} className="btn btn-primary modal-button" 
                                disabled={!this.state.index}>Previous</button>
                            <button onClick={this.next} className="btn btn-primary modal-button">
                                {this.state.nextButtonText}</button>
                        </div>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

module.exports = NarrativeModal;