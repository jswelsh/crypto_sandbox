(function(_this) {

    function Dashboard(div) {
        if (typeof(div) === 'string') {
            div = document.getElementById(div);
        }
        this._div = div;
        this._panels = [];
    }

    Dashboard.prototype.addPanel = function(title) {
        var panel = new Panel(title);
        this._div.appendChild(panel._div);
        this._panels.push(panel);
        return panel;
    };

    function Panel(title) {
        this._div = document.createElement('div');
        this._div.className = 'dashboard-panel';
        this.values = {};

        var div = document.createElement('div');
        div.className = 'dashboard-heading';
        div.textContent = title;
        this._div.appendChild(div);

        Object.defineProperty(this.values, 'title', {
            get: function() {
                return div.textContent;
            },
            set: function(value) {
                div.textContent = value;
            }
        });
    }

    Panel.prototype.addLabel = function(title, name, value) {
        if (value == null) { value = ''; }

        var div = document.createElement('div');
        div.className = 'dashboard-label';
        this._div.appendChild(div);

        var span = document.createElement('span')
        span.className = 'dashboard-title';
        span.textContent = title;
        div.appendChild(span);

        span = document.createElement('span')
        span.className = 'dashboard-value';
        div.appendChild(span);

        Object.defineProperty(this.values, name, {
            get: function() {
                return span.textContent;
            },
            set: function(value) {
                span.textContent = value;
            }
        });
        this.values[name] = value;
    }

    Panel.prototype._addTextEntry = function(title, name, value) {
        if (value == null) { value = ''; }

        var div = document.createElement('div');
        div.className = 'dashboard-inputbox';
        this._div.appendChild(div);

        var span = document.createElement('span')
        span.className = 'dashboard-title';
        span.textContent = title;
        div.appendChild(span);

        var input = document.createElement('input');
        input.className = 'dashboard-value';
        div.appendChild(input);
        input.value = value;

        div.onclick = function() { input.focus(); }

        return input;
    };

    Panel.prototype.addTextEntry = function(title, name, value) {
        var input = this._addTextEntry(title, name, value);

        if (this.values[name]) { return; }

        Object.defineProperty(this.values, name, {
            get: function() {
                return input.value;
            }
        });
    };

    function setState(input, ok) {
        if (ok) {
            input.parentNode.classList.remove('dashboard-error');
        } else {
            input.parentNode.classList.add('dashboard-error');
        }
    }

    Panel.prototype.addAddressEntry = function(title, name, value) {
        var input = this._addTextEntry(title, name, value);

        input.oninput = function() {
            try {
                ethers.getAddress(input.value);
                setState(input, true);
            } catch (error) {
                console.log(error);
                setState(input, false);
            }
        };

        if (this.values[name]) { return; }

        Object.defineProperty(this.values, name, {
            get: function() {
                return ethers.getAddress(input.value);
            },
            set: function(value) {
                input.value = ethers.getAddress(value)
                setState(input, true);
            }
        });
    };

    Panel.prototype.addEtherEntry = function(title, name, value) {
        if (value == null) { value = '0.0'; }
        value = ethers.formatEther(ethers.parseEther(value));

        var input = this._addTextEntry(title, name, value);

        input.oninput = function() {
            try {
                ethers.parseEther(input.value);
                setState(input, true);
            } catch (error) {
                console.log(error);
                setState(input, false);
            }
        };

        if (this.values[name]) { return; }

        Object.defineProperty(this.values, name, {
            get: function() {
                return ethers.parseEther(input.value);
            },
            set: function(value) {
                input.value = ethers.formatEther(value);
                setState(input, true);
            }
        });
    };

    Panel.prototype.addCheckbox = function(title, name, checked) {
        checked = !!checked;

        var div = document.createElement('div');
        div.className = 'dashboard-checkbox';
        this._div.appendChild(div);

        var check = document.createElement('div')
        check.className = 'dashboard-check'
        check.textContent = ' ';
        div.appendChild(check);

        if (checked) {
            check.classList.add('checked');
        }

        div.onclick = function() {
            if (check.classList.contains('checked')) {
                check.classList.remove('checked');
            } else {
                check.classList.add('checked');
            }
        };

        var span = document.createElement('span')
        span.textContent = title;
        div.appendChild(span);

        if (this.values[name]) { return; }

        Object.defineProperty(this.values, name, {
            get: function() {
                return check.classList.contains('checked');
            }
        });
    };

    Panel.prototype.addButton = function(title, callback) {
        var div = document.createElement('div');
        div.className = 'dashboard-button';
        div.textContent = title;
        this._div.appendChild(div);

        var self = this;
        div.onclick = function() {
            callback(self.values);
        };
    }

    Panel.prototype.addText = function(name, text) {
        if (arguments.length == 1) {
            text = name;
            name = '_text';
        }

        var div = document.createElement('div');
        div.className = 'dashboard-text';
        div.textContent = text;
        this._div.appendChild(div);

        if (this.values[name]) { return; }

        Object.defineProperty(this.values, name, {
            get: function() {
                return div.textContent;
            },
            set: function(value) {
                div.textContent = value;
            }
        });
    }

    _this.Dashboard = Dashboard;
})(this);
