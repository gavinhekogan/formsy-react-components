/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');
var Icon = require('./icon');
var propUtilities = require('./prop-utilities');
var classNames = require('classnames/dedupe');

var Input = React.createClass({

    mixins: [Formsy.Mixin, ComponentMixin],

    propTypes: {
        type: React.PropTypes.oneOf([
            'color',
            'date',
            'datetime',
            'datetime-local',
            'email',
            'hidden',
            'month',
            'number',
            'password',
            'range',
            'search',
            'tel',
            'text',
            'time',
            'url',
            'week'
        ]),
        addonBefore: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.node
        ]),
        addonAfter: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.node
        ]),
        inputWrapperClassName: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.array,
            React.PropTypes.object
        ]),
        btnWrapperClassName: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.array,
            React.PropTypes.object
        ]),
        buttonBefore: React.PropTypes.node,
        buttonAfter: React.PropTypes.node
    },

    getDefaultProps: function() {
        return {
            type: 'text',
            addonBefore: null,
            addonAfter: null,
            buttonBefore: null,
            buttonAfter: null,
            inputWrapperClassName: '',
            btnWrapperClassName: ''
        };
    },

    changeValue: function(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    render: function() {
        var element = this.renderElement();

        if (this.props.type === 'hidden') {
            return element;
        }

        if (this.props.addonBefore || this.props.addonAfter || this.props.buttonBefore || this.props.buttonAfter) {
            element = this.renderInputGroup(element);
        }

        if (this.getLayout() === 'elementOnly') {
            return element;
        }

        var warningIcon = null;
        if (this.showErrors()) {
            warningIcon = (
                <Icon symbol="remove" className="form-control-feedback" />
            );
        }

        return (
            <Row
                {...this.getRowProperties()}
                htmlFor={this.getId()}
            >
                {element}
                {warningIcon}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    },

    renderElement: function() {
        var className = 'form-control';
        if (['range'].indexOf(this.props.type) !== -1) {
            className = null;
        }
        return (
            <input
                ref={(c) => this.element = c}
                className={className}
                {...propUtilities.cleanProps(this.props)}
                id={this.getId()}
                value={this.getValue()}
                onChange={this.changeValue}
                disabled={this.isFormDisabled() || this.props.disabled}
            />
        );
    },

    renderInputGroup: function(element) {
        var cssClasses = {
            inputWrapper: ['input-group']
        };
        if (this.props.inputWrapperClassName) {
            cssClasses.inputWrapper.push(this.props.inputWrapperClassName)
        }
        element = <span className="formsyInputWrapper">{element}</span>;
        return (
            <div className={classNames(cssClasses.inputWrapper)}>
                {this.renderAddon(this.props.addonBefore)}
                {this.renderButton(this.props.buttonBefore)}
                {element}
                {this.renderAddon(this.props.addonAfter)}
                {this.renderButton(this.props.buttonAfter)}
            </div>
        );
    },

    renderAddon: function(addon) {
        if (!addon) {
            return false;
        }
        return (
            <span className="input-group-addon">{addon}</span>
        );
    },

    renderButton: function(button) {
        if (!button) {
            return false;
        }
        var btnWrapperClass = ['input-group-btn'];
        if (this.props.btnWrapperClassName) {
            btnWrapperClass.push(this.props.btnWrapperClassName)
        }
        return (
            <span className={classNames(btnWrapperClass)}>{button}</span>
        );
    }

});

module.exports = Input;
