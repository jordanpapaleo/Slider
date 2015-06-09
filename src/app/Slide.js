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

        if(!this.model.hasOwnProperty('enterTransition')) {
            this.model.enterTransition = {
                curve: Curves.easeOut,
                duration: 1000
            };
        }

        if(!this.model.hasOwnProperty('exitTransition')) {
            this.model.exitTransition = {
                curve: Curves.easeIn,
                duration: 1000
            };
        }

        this.addChild(this.model.content);

        this.setEvents();
    }

    setEvents() {
        ResizeObserver.subscribe((ev) => {
            this._reposition(ev);
        });
    }

    _reposition(pos) {
        if(!this.model.isVisible) {
            this.setPositionX(pos[0]);
        }
    }

    enter(cb) {
        this.model.isVisible = true;
        if(cb instanceof Function) {
            this.setPositionX(0, this.model.enterTransition.transitionable, cb);
        } else {
            this.setPositionX(0, this.model.enterTransition.transitionable);
        }
    }

    exit(cb) {
        this.model.isVisible = false;
        if(cb instanceof Function) {
            this.setPositionX(window.innerWidth, this.model.exitTransition.transitionable, cb);
        } else {
            this.setPositionX(window.innerWidth, this.model.exitTransition.transitionable);
        }
    }
}
