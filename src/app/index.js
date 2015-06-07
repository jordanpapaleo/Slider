import View             from 'famous-creative/display/View';
import FamousEngine     from 'famous-creative/scaffolding/FamousEngine';
import {Slide}          from './Slide';
import {Controls}       from './Controls';

//Famous Components
const Curves            = FamousPlatform.transitions.Curves;
const Famous            = FamousPlatform.core.Famous;

//GL Components
const AmbientLight      = FamousPlatform.webglRenderables.AmbientLight;
const Color             = FamousPlatform.utilities.Color;
const PointLight        = FamousPlatform.webglRenderables.PointLight;

class App extends View {
    constructor(node) {
        super(node);

        let camera = new FamousPlatform.components.Camera(this.node);
        camera.setDepth(1000);

        this.setAlign(.5, .5).setMountPoint(.5, .5);
        this.setSizeModeRelative().setProportionalSize(1, 1);

        this.clock = FamousPlatform.core.FamousEngine.getClock();

        this.initSlides();
        this.setEvents();

        this.controls = new Controls(this.addChild());
    }

    initSlides() {
        this.slides = [];

        let slides = ['yellow', 'orange', 'blue', 'pink', 'red'];

        let transitionable = {
            curve: Curves.linear,
            duration: 2000
        };

        //let activeSlideIndex = 2;

        // Loop over content for a slide and place it in a slide
        // I think I should be able to pass a node/content so the slide doesnt need know anything about the content, just its behavior
        slides.forEach((content, i) => {
            let model = {
                i,
                exitTransition: {
                    transitionable
                },
                enterTransition: {
                    transitionable
                }
            };

            let slide = new Slide(this.addChild(), model, content);
/*
            if(i === activeSlideIndex) {
                slide.setPosition(0, 0, 0);
            } else {
                slide.setPosition(window.innerWidth, 0, 0)
            }*/

            this.slides.push(slide);
        });
    }

    setEvents() {
        this.on('nextSlide', this._nextSlide());
        this.on('previousSlide', this._previousSlide());
    }

    startSlideShow() {
        this.hasStarted = true;
        this.currentSlide = this.slides[0];
        this.currentSlide.enter();
    }

    _nextSlide() {
        console.log('next slide');
        if(!this.hasStarted) return;

        this.nextSlide = this.slides[this.currentSlide.model.i + 1];  //TODO make sure slide exists
        this.currentSlide.exit();
        this.nextSlide.enter();

        this.currentSlide = this.nextSlide();
        delete this.nextSlide;
    }

    _previousSlide() {
        console.log('previous slide');
        if(!this.hasStarted) return;

        this.previousSlide = this.slides[this.currentSlide.model.i - 1]; //TODO make sure slide exists
        this.currentSlide.exit();
        this.previousSlide.enter();

        this.currentSlide = this.previousSlide();
        delete this.previousSlide;
    }
}

FamousEngine.init();
FamousEngine.createScene('#app');

window.app = new App(FamousEngine.addChild('#app'));
