import { connect } from 'react-redux';
import * as act from '../actions';
import { pageBuilder } from '../utils/page_builder';

const state_part = 'customers';

const comp = (props) => pageBuilder(props)

const mapStateToProps = (state) => ({ data: state[state_part] });
const mapDispatchToProps = (dispatch) => ({ dispatch, act });

export default connect(mapStateToProps, mapDispatchToProps)(comp);