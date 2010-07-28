/*!
 * Copyright(c) 2010, http://www.mcdconsultingllc.com
 * 
 * Licensed under the terms of the Open Source LGPL 3.0
 * http://www.gnu.org/licenses/lgpl.html
 * @author Sean McDaniel <sean@mcdconsulting.com>
 */
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
Ext.ux.form.ToggleSlideField = Ext.extend(Ext.form.Field, {
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
        this.autoCreate = {
            id: this.id,
            name: this.name,
            type: 'hidden',
            tag: 'input'    
        };
        Ext.ux.form.ToggleSlideField.superclass.onRender.call(this, ct, position);
        this.wrap = this.el.wrap({cls: 'x-form-field-wrap'});
        this.resizeEl = this.positionEl = this.wrap;
        this.toggle.render(this.wrap);
        this.setValue(this.toggle.getValue());
    },
 
    /**
     * Initialize any events for this class.
     * @private
     */
    initEvents: function() {
        Ext.ux.form.ToggleSlideField.superclass.initEvents.call(this);
        this.toggle.on('change', this.onChange, this);   
    },

    /**
     * Utility method to set the value of the field when the toggle changes.
     * @param {Object} toggle The toggleSlide object.
     * @param {Object} v The new value.
     * @private
     */
    onChange: function(toggle, state) {
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

Ext.reg('toggleslidefield', Ext.ux.form.ToggleSlideField);