/*!
 * Copyright(c) 2010, http://www.mcdconsultingllc.com
 * 
 * Licensed under the terms of the Open Source LGPL 3.0
 * http://www.gnu.org/licenses/lgpl.html
 * @author Sean McDaniel <sean@mcdconsulting.com>
 */
/*globals Ext:true*/
Ext.ns('Ext.ux.form');

/**
 * @class Ext.ux.form.ToggleSlideField
 * @extends Ext.form.Field
 * Wraps a {@link Ext.ux.ToggleSlide toggle} so it can be used as a form field.
 * @constructor
 * Creates a new ToggleSlideField
 * @param {Object} config Configuration options. Note that you can pass in any ToogleSlide configuration options, as well as
 * as any field configuration options.
 * @xtype toggleslidefield
 */
(function() { "use strict";
Ext.define('Ext.ux.form.ToggleSlideField', {
    extend: 'Ext.form.Field',
    alias : 'widget.toggleslidefield',

    /**
     * @cfg {String} type of input field element
     * @private
     */
    inputType: 'hidden',

    /**
     * Initialize the component.
     * @private
     */
    initComponent : function() {
        var cfg = {id: this.id + '-toggle-slide'};
        cfg = Ext.copyTo(cfg, this.initialConfig, [
            'onText',
            'offText', 
            'resizeHandle',
            'resizeContainer',
            'background',
            'onLabelCls',
            'offLabelCls',
            'handleCls',
            'handleCenterCls',
            'handleRightCls',
            'state',
            'booleanMode'
        ]);

        this.toggle = new Ext.ux.ToggleSlide(cfg);
        Ext.ux.form.ToggleSlideField.superclass.initComponent.call(this);
    },    
    
    /**
     * Render this including the hidden field.
     * @param {Object} ct The container to render to.
     * @param {Object} position The position in the container to render to.
     * @private
     */
    onRender: function(ct, position){
        Ext.ux.form.ToggleSlideField.superclass.onRender.call(this, ct, position);
        this.toggle.render(this.bodyEl);
        this.setValue(this.toggle.getValue());
    },
 
    /**
     * Initialize any events for this class.
     * @private
     */
    initEvents: function() {
        Ext.ux.form.ToggleSlideField.superclass.initEvents.call(this);
        this.toggle.on('change', this.onChangeToggle, this);
    },

    /**
     * Utility method to set the value of the field when the toggle changes.
     * @param {Object} toggle The toggleSlide object.
     * @param {Object} v The new value.
     * @private
     */
    onChangeToggle: function(toggle, state) {
        return this.setValue(state);
    },

    /**
     * Enable the toggle when the field is enabled.
     * @private
     */
    onEnable: function(){
        Ext.ux.form.ToggleSlideField.superclass.onEnable.call(this);
        this.toggle.enable();
    },
    
    /**
     * Disable the toggle when the field is disabled.
     * @private
     */
    onDisable: function(){
        Ext.ux.form.ToggleSlideField.superclass.onDisable.call(this);
        this.toggle.disable();
    },

    /**
     * Ensure the toggle is destroyed when the field is destroyed.
     * @private
     */
    beforeDestroy: function(){
        Ext.destroy(this.toggle);
        Ext.ux.form.ToggleSlideField.superclass.beforeDestroy.call(this);
    }
});
})();