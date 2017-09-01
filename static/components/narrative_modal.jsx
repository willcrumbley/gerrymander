"use strict"

import React from 'react';
import ReactModal from 'react-modal';
import $ from 'jquery';

import narrative_data from './narrative.jsx';

class NarrativeModal extends React.Component {
    constructor(props) {
        super();
        this.state = {
            // showModal: props.show,
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
        var position = 'fixed';
        var content = {};
        var window_width = $(window).width();
        if (window_width < 800) {
            position = 'inherit';
            content = {
                top:    '0px',
                left:   '0px',
                right:  '0px',
                bottom: '0px'
            }
        }
        var style = {
            overlay: { 
                position: position,
                backgroundColor: 'rgba(255, 255, 255, 1)'
            },
            content: content
        }
        return (
            <div className='col col-12'>
                <ReactModal 
                    isOpen={this.state.showModal}
                    contentLabel="Efficiency Gap Narrative"
                    style={style}
                    >
                    <div className='col col-12'>
                        <div className='row'>
                            <div className='col col-12'>
                                <h4>{narrative_data[this.state.index].title}</h4>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col col-12 col-md-6 px-md-4'>{narrative_data[this.state.index].context}</div>
                            <div id='illustration' className='col-12 col-md-6'>
                                {narrative_data[this.state.index].illustration}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col col-12 col-md-3'>
                                <button onClick={this.handleCloseModal} className="btn btn btn-outline-secondary modal-button" 
                                    hidden={this.state.skipIntroHidden}>Skip Introduction</button>
                            </div>
                            <div className='col col-0 col-md-5'></div>
                            <div className='col col-12 col-md-4'>
                                <button onClick={this.prev} className="btn btn-primary modal-button" 
                                    disabled={!this.state.index}>Previous</button>
                                <button onClick={this.next} className="btn btn-primary modal-button">
                                    {this.state.nextButtonText}</button>
                            </div>
                        </div>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

module.exports = NarrativeModal;