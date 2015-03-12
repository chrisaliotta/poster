// Copyright (c) Jonathan Frederic, see the LICENSE file for more info.

var utils = require('../utils.js');

/**
 * Plugin base class
 */
export class PluginBase extends utils.PosterClass {
    constructor() {
        super.constructor();
        this._renderers = [];
        this.loaded = false;

        // Properties
        this._poster = null;
        this.property('poster', () => this._poster);
    }

    /**
     * Loads the plugin
     */
    _load(manager, poster) {
        this._poster = poster;
        this._manager = manager;
        this.loaded = true;

        this.trigger('load');
    }

    /**
     * Unloads this plugin
     */
    unload() {
        this._manager.unload(this);
    }

    /**
     * Trigger unload event
     */
    _unload() {
        // Unregister all renderers.
        for (let i = 0; i < this._renderers.length; i++) {
            this._unregister_renderer(this._renderers[i]);
        }
        this.loaded = false;
        this.trigger('unload');
    }

    /**
     * Registers a renderer
     * @param  {RendererBase} renderer
     */
    register_renderer(renderer) {
        this._renderers.push(renderer);
        this.poster.view.add_renderer(renderer);
    }

    /**
     * Unregisters a renderer and removes it from the internal list.
     * @param  {RendererBase} renderer
     */
    unregister_renderer(renderer) {
        var index = this._renderers.indexOf(renderer);
        if (index !== -1) {
            this._renderers.splice(index, 1);
        }

        this._unregister_renderer(renderer);
    }

    /**
     * Unregisters a renderer
     * @param  {RendererBase} renderer
     */
    _unregister_renderer(renderer) {
        this.poster.view.remove_renderer(renderer);
    }
}
