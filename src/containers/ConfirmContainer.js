import { connect } from 'react-redux';
import { ok, cancel } from '../actions/ConfirmActions';
import { Confirm } from '../components/Confirm';
import { bindState, bindActions } from './utility';

export const ConfirmContainer = connect(
    bindState('confirmList'),
    bindActions({ok, cancel})
)(Confirm);