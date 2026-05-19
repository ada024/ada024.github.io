"use strict";

class BarChartUI {
    constructor() {
        this._callbacks = null
        this._container = document.getElementById('bar-chart');
    }

    clear() {
        this._container.replaceChildren();
    }

    addBarChart(items) {
        if (!items || items.length === 0) {
            return;
        }

        const maxValue = Math.max(...items.map(d => d.value));

        items.forEach(item => {
                const bar = document.createElement('div');
                bar.className = 'bar';

                // Bar fill
                const fill = document.createElement('div');
                fill.className = 'bar__fill';
                fill.style.height = (item.value / maxValue * 100) + '%';
                fill.style.backgroundColor = item.color;

                // Tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'bar__tooltip';
                tooltip.textContent = item.value;

                // Label
                const label = document.createElement('div');
                label.className = 'bar__label';
                label.textContent = item.label;

                // Build
                bar.appendChild(tooltip);
                bar.appendChild(fill);
                bar.appendChild(label);
            this._container.appendChild(bar);
        });
    }


    registerCallbacks(hooks) {
        this._callbacks = hooks
    }


}