import View             from 'famous-creative/display/View';
import FamousEngine     from 'famous-creative/scaffolding/FamousEngine';
import {Slide}          from './Slide';
import {Controls}       from './Controls';
import ResizeObserver   from './ResizeObserver';

//Famous Components
const Curves            = FamousPlatform.transitions.Curves;
const Node              = FamousPlatform.core.Node;

class App extends View {
    constructor(node) {
        super(node);

        console.log('ResizeObserver',ResizeObserver);

        let camera = new FamousPlatform.components.Camera(this.node);
        camera.setDepth(1000);

        this.setAlign(.5, .5).setMountPoint(.5, .5);
        this.setSizeModeRelative().setProportionalSize(1, 1);

        this.initSlides();
        this.setEvents();
        this.startSlideShow();

        this.controls = new Controls(this.addChild());
    }

    initSlides() {
        this.slides = [];

        let template = require('./data/slides.html');
        let dom = document.createElement('div');
        dom.innerHTML = template;
        let slides = dom.querySelectorAll('slide');

        let transitionable = {
            curve: Curves.inOutBack,
            duration: 1500
        };

        for(let i = 0, j = slides.length; i < j; i++) {
            //Put html content into a view to allow for manipulation if needed
            let content = new View(new Node());
            content.createDOMElement({
                content: slides[i].innerHTML
            });

            let model = {
                i,
                isVisible: (i === 0),
                content: content.node,
                exitTransition: {
                    transitionable
                },
                enterTransition: {
                    transitionable
                }
            };

            let slide = new Slide(this.addChild(), model);

            if(i !== 0) {
                slide.setPositionX(window.innerWidth);
            }

            this.slides.push(slide);
        }
    }

    setEvents() {
        this.node.onReceive = (type, ev) => {
            if (type === 'nextSlide') {
                this._nextSlide(ev);
            } else if(type === 'previousSlide') {
                this._previousSlide(ev)
            }

            this.node.receive(type, ev);
        };

        this.node.addComponent({
            onSizeChange: (ev) => {
                ResizeObserver.update(ev);
            }
        });
    }

    startSlideShow() {
        this.hasStarted = true;
        this.currentSlide = this.slides[0];
        this.currentSlide.enter();
    }

    _nextSlide(ev) {
        if(!this.hasStarted) return;

        if(this.currentSlide.model.i + 1 < this.slides.length) {
            this.nextSlide = this.slides[this.currentSlide.model.i + 1];
            this.currentSlide.exit(function() {
                console.info('_nextSlide: current exited');
            });
            this.nextSlide.enter(function() {
                console.info('_nextSlide: next entered');
            });

            this.currentSlide = this.nextSlide;
            delete this.nextSlide;
        }
    }

    _previousSlide(ev) {
        if(!this.hasStarted) return;

        if(this.currentSlide.model.i - 1 >= 0 ) {
            this.previousSlide = this.slides[this.currentSlide.model.i - 1];
            this.currentSlide.exit(function() {
                console.info('_previousSlide: next exited');
            });
            this.previousSlide.enter(function() {
                console.info('_previousSlide: next entered');
            });

            this.currentSlide = this.previousSlide;
            delete this.previousSlide
        }
    }
}

FamousEngine.init();
FamousEngine.createScene('#app');

window.app = new App(FamousEngine.addChild('#app'));
