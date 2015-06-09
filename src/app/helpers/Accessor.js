import {WebStorage}     from './WebStorage';

export class Accessor {
    constructor() {
        this.value = false;
    }

    get(key) {
        if(key && !this.value) {
            if(!this.session || !this.local) {
                this.m_initWebStorage();
            }

            if(this.session && this.session.get(key)) {
                this.value = this.session.get(key);
            } else if(this.local && this.local.get(key)) {
                this.value = this.local.get(key);
            }
        }

        return this.value;
    }

    set(val, key) {
        this.value = val;

        if(key) {
            this.m_setInLocal(key, val);
            this.m_setInSession(key, val);
        }

        return true;
    }

    clear(key) {
        this.value = false;

        if(key) {
            if(!this.session || !this.local) {
                this._initWebStorage();
            }

            this.local.remove(key);
            this.session.remove(key);
        }
    }

    _setLocal(key, val) {
        if(!this.local) {
            this._initWebStorage();
        }

        this.local.set(key, val);
    }

    _setSession(key, val) {
        if(!this.session) {
            this.m_initWebStorage();
        }

        this.session.set(key, val);
    }

    _initStorage() {
        this.local = new WebStorage('localStorage');
        this.session = new WebStorage('sessionStorage');
    }
}
