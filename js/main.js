'use strict';

var Shuffle = window.shuffle;

var Demo = function (element) {
    this.element = element;

    // Log out events.
    this.addShuffleEventListeners();

    this.shuffle = new Shuffle(element, {
        itemSelector: '.timeline-block',
        sizer: element.querySelector('.my-sizer-element'),
    });

    this._activeFilters = [];

    this.addFilterButtons();

    this.mode = 'exclusive';
};

Demo.prototype.toArray = function (arrayLike) {
    return Array.prototype.slice.call(arrayLike);
};


/**
 * Shuffle uses the CustomEvent constructor to dispatch events. You can listen
 * for them like you normally would (with jQuery for example). The extra event
 * data is in the `detail` property.
 */
Demo.prototype.addShuffleEventListeners = function () {
    var handler = function (event) {
        console.log('type: %s', event.type, 'detail:', event.detail);
    };

    this.element.addEventListener(Shuffle.EventType.LAYOUT, handler, false);
    this.element.addEventListener(Shuffle.EventType.REMOVED, handler, false);
};

Demo.prototype.addFilterButtons = function () {
    var options = document.querySelector('.filter-options');

    if (!options) {
        return;
    }

    var filterButtons = this.toArray(
        options.children
    );

    filterButtons.forEach(function (button) {
        button.addEventListener('click', this._handleFilterClick.bind(this), false);
    }, this);
};

Demo.prototype._handleFilterClick = function (evt) {
    var btn = evt.currentTarget;
    var isActive = btn.classList.contains('active');
    var btnGroup = btn.getAttribute('data-group');
    var filterGroup;

    this._removeActiveClassFromChildren(btn.parentNode);

    btn.classList.add('active');

    filterGroup = btnGroup;
    this.shuffle.filter(filterGroup);

};

Demo.prototype._removeActiveClassFromChildren = function (parent) {
    var children = parent.children;
    for (var i = children.length - 1; i >= 0; i--) {
        children[i].classList.remove('active');
    }
};

document.addEventListener('DOMContentLoaded', function () {
    window.demo = new Demo(document.getElementById('grid'));
});


