export class Observer {
    constructor() {
        this.observable = undefined;
        this.observers = [];
    }

    subscribe(cb) {
        let hasSubscribed = false;

        if(cb instanceof Function) {
            this.observers.push(cb);
            hasSubscribed = true;
        } else {
            console.debug('Callback is not a function');
        }

        return hasSubscribed;
    }

    update(observable) {
        let hasUpdated = false;

        if(observable) {
            this.observable = observable;
            this.refresh();
            hasUpdated = true;
        } else {
            console.debug('Null observable');
        }

        return hasUpdated;
    }

    refresh() {
        if(this.observable) {
            for(let i = 0, j = this.observers.length; i < j; i++) {
                this.observers[i](this.observable);
            }
        }
    }

    reset() {
        this.observable = null;
        this.refresh();
    }
}
