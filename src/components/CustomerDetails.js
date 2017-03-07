import React from 'react';
import { connect } from 'react-redux';
import * as sel from '../selectors';
import * as act from '../actions';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Panel from 'react-bootstrap/lib/Panel';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Panel';
import Col from 'react-bootstrap/lib/Col';

const det = (props) => {

    if (!props.active_selection) return null;

    const handleChange = (field, e) => {
        props.update({
            [field]: e.currentTarget.value
        });
    }

    const tabs = <div className="tabs">
        <div className="tab_name active_tab">Contact Info</div>
        <div className="tab_name">Tab 2</div>
        <div className="tab_name">Tab 3</div>
    </div>

    return (
        <div className="cust-details">
            <Panel header={tabs} bsStyle="primary">
                <form>
                    <div className="row-1">
                        <FormGroup bsSize="small" controlId="cust_name">
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                type="text"
                                value={props.details.get('name')}
                                onChange={handleChange.bind(null, 'name')}
                                />
                        </FormGroup>
                    </div>
                    <div className="multi-row row-2">
                        <FormGroup bsSize="small" controlId="cust_address" className="cust_address">
                            <ControlLabel>Address</ControlLabel>
                            <FormControl
                                type="text"
                                value={props.details.get('address')}
                                onChange={handleChange.bind(null, 'address')}
                                />
                        </FormGroup>
                        <FormGroup bsSize="small" controlId="cust_city" className="cust_city">
                            <ControlLabel>City</ControlLabel>
                            <FormControl
                                type="text"
                                value={props.details.get('city')}
                                onChange={handleChange.bind(null, 'city')}
                                />
                        </FormGroup>
                        <FormGroup bsSize="small" controlId="cust_state" className="cust_state">
                            <ControlLabel>State</ControlLabel>
                            <FormControl
                                type="text"
                                value={props.details.get('state')}
                                onChange={handleChange.bind(null, 'state')}
                                />
                        </FormGroup>
                        <FormGroup bsSize="small" controlId="cust_zip" className="cust_zip">
                            <ControlLabel>Zip</ControlLabel>
                            <FormControl
                                type="text"
                                value={props.details.get('zip')}
                                onChange={handleChange.bind(null, 'zip')}
                                />
                        </FormGroup>
                    </div>
                </form>
            </Panel>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        details: sel.getCustomerDetails(state),
        selected_id: sel.getSelectedCustomerID(state),
        active_selection: sel.getCustomerIsSelected(state),
        mode: sel.getCustomerMode(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        update(payload) { dispatch(act.updateCustomer(payload)); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(det);