"use strict"

import React from 'react';
import ReactModal from 'react-modal';

import StateMap from './state_map.jsx';
import narrative_data from './narrative.jsx';
import efficiency_gap_ge_8 from '../efficiency_gap_ge_8.js';
import efficiency_gap_lt_8 from '../efficiency_gap_lt_8.js';
import efficiency_gap_all from '../efficiency_gap_all.js';

class NarrativeModal extends React.Component {
    constructor(props) {
        super();
        this.state = {
            showModal: props.show,
            index: 0,
            skipIntroHidden: false,
            nextButtonText: "Next",
            stateData: {
                ge_8: this.calculateForNarrativeMap(props.states, efficiency_gap_ge_8),
                lt_8: this.calculateForNarrativeMap(props.states, efficiency_gap_lt_8),
                all: this.calculateForNarrativeMap(props.states, efficiency_gap_all)
            }
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

    calculateForNarrativeMap(states, algorithm) {
        for (let statex of states) {
            var options = {"state": statex}
            let fn = new Function("options", algorithm);
            let result = fn(options)

            statex.metric = result.metric.toFixed(2);
            statex.include = result.include;
            statex.seats_flipped = result.seats_flipped.toFixed(1);
        }
        return states.filter(function(state) {
            return state.include;
        });
    }

    getIllustration(directive) {
        if (directive === '@map-ge-8') {
            return <div className="mx-auto d-block">
                    <StateMap states={this.state.stateData.ge_8} width={550}/>
                   </div>
        } 
        else if (directive === '@map-lt-8') {
            return <div className="mx-auto d-block">
                    <StateMap states={this.state.stateData.lt_8} width={550}/>
                   </div>
        } 
        else if (directive === '@map-all') {
            return <div className="mx-auto d-block">
                    <StateMap states={this.state.stateData.all} width={550}/>
                   </div>
        }
        else if (directive === '@nh-map') {
            return <div className="mx-auto d-block">
                    <StateMap mapType={'CD'} states={this.state.stateData.all} width={550}/>
                   </div>
        }
        return directive;
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
                            <h4>An exploration of the efficiency gap and other measures of partisan gerrymandering</h4>
                        </div>
                        <div className='row m-5'>
                            <div className='col-3'>{narrative_data[this.state.index].context}</div>
                            <div id='illustration' className='col-9'>
                                {this.getIllustration(narrative_data[this.state.index].illustration)}
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