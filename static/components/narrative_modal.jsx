"use strict"

import React from 'react';
import ReactModal from 'react-modal';

import StateMap from './state_map.jsx';
import narrative_data from './narrative.jsx';

class NarrativeModal extends React.Component {
    constructor(props) {
        super();
        this.state = {
            showModal: props.show,
            index: 0,
            skipIntroHidden: false,
            nextButtonText: "Next",
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
        var illustration = narrative_data[this.state.index].illustration
        if (illustration === '@map8') {
            illustration = <StateMap states={this.props.states} width={550}/>
        }

        return (
            <div>
                <ReactModal 
                    isOpen={this.state.showModal}
                    contentLabel="Efficiency Gap Narrative"
                    >
                    <div className='container'>
                        <div className='row'>
                            <h4>An exploration of the efficiency gap and other measures of partisan gerrymandering</h4>
                        </div>
                        <div className='row m-5'>
                            <div className='col-3'>{narrative_data[this.state.index].context}</div>
                            <div id='illustration' className='col-9'>{illustration}</div>
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