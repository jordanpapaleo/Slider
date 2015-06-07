import View             from 'famous-creative/display/View';

//Famous Components
const Curves            = FamousPlatform.transitions.Curves;

/* A slide is really just a container for content that can be manipulated.  It is not a DOM element */
export class Slide extends View {
    constructor(node, model, content) {
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
    }

    enter(cb) {
        if(cb instanceof Function) {
            this.setOpacity(1, this.model.enterTransition, cb);
        } else {
            this.setOpacity(1, this.model.enterTransition);
        }
    }

    exit(cb) {
        if(cb instanceof Function) {
            this.setOpacity(0, this.model.exitTransition, cb);
        } else {
            this.setOpacity(0, this.model.exitTransition);
        }
    }
}
