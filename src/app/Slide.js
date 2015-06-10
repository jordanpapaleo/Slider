import View             from 'famous-creative/display/View';
import ResizeObserver   from './ResizeObserver';

//Famous Components
const Curves            = FamousPlatform.transitions.Curves;

/* A slide is really just a container for content that can be manipulated.  It is not a DOM element */
export class Slide extends View {
    constructor(node, model) {
        super(node);

        this.model = model || {};
        this.setAlign(0.5, 0.5).setMountPoint(0.5, 0.5);
        this.setSizeModeRelative().setProportionalSize(1, 1, 1);
        this.addChild(this.model.content);

        this.setOpacity(1);
        this.setScale(1, 1, 1);
        this.setPosition(0, 0, 0);
        this.setRotation(0, 0, 0);

        this.setEvents();
    }

    setEvents() {
        ResizeObserver.subscribe((ev) => {
            this._reposition(ev);
        });
    }

    defineEntrance(obj) {
        this.entrance = obj;
    }

    defineDeparture(obj) {
        this.departure = obj;
    }

    _reposition(pos) {
        if(!this.model.isVisible) {
            this.setPositionX(pos[0]);
        }
    }

    enter(cb) {
        this.model.isVisible = true;
        this.departure.modifier.halt();
        console.log('',this.opacity);

        let params = this.entrance.value.slice();
        params.push(this.entrance.transition);

        if(cb instanceof Function) {
            params.push(cb);
        }

        console.log('enter params',params);

        this.entrance.modifier.set.apply(this.entrance.modifier, params);
    }

    depart(cb) {
        this.entrance.modifier.halt();
        this.model.isVisible = false;

        let params = this.departure.value.slice();
        params.push(this.departure.transition);

        if(cb instanceof Function) {
            params.push(cb);
        }

        console.log('depart params',params);
        this.departure.modifier.set.apply(this.departure.modifier, params);
    }
}
