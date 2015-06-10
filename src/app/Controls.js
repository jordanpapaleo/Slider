import View             from 'famous-creative/display/View';
import Modifier         from 'famous-creative/display/Modifier';
//import Layout           from './helpers/LayoutService';

export class Controls extends View {
    constructor(node, model) {
        super(node);

        this.model = model || {};
        this.renderPreviousbutton();
        this.renderNextbutton();
        this.renderSlideNav();
        this.setKeyPressEvents();
    }

    renderNextbutton() {
        this.nextButton = new View(this.addChild());
        this.nextButton.setAlign(1, .5).setMountPoint(1, .5);
        this.nextButton.setSizeModeAbsolute().setAbsoluteSize(30, 110);
        this.nextButton.setOpacity(.75);
        this.nextButton.createDOMElement({
            tagName: 'div',
            classes: ['next-button'],
            properties: {
                'background-color': '#000000'
            }
        });

        this.nextButton.node.addUIEvent('mousedown');
        this.nextButton.node.onReceive = (type, ev) => {
            if (type === 'mousedown') {
                this.nextButton.node.emit('nextSlide', ev);
            }
            this.nextButton.node.receive(type, ev);
        };
    }

    renderPreviousbutton() {
        this.previousButton = new View(this.addChild());
        this.previousButton.setAlign(0, .5).setMountPoint(0, .5);
        this.previousButton.setSizeModeAbsolute().setAbsoluteSize(30, 110);
        this.previousButton.setOpacity(.75);
        this.previousButton.createDOMElement({
            tagName: 'div',
            classes: ['previous-button'],
            properties: {
                'background-color': '#000000'
            }
        });

        this.previousButton.node.addUIEvent('mousedown');
        this.previousButton.node.onReceive = (type, ev) => {
            if (type === 'mousedown') {
                this.previousButton.node.emit('previousSlide', ev);
            }

            this.previousButton.node.receive(type, ev);
        };
    }

    renderSlideNav() {
        const navWidth = 150;

        this.slideNav = new Modifier(this.addChild());
        this.slideNav.setAlign(.5, 1).setMountPoint(.5, 1);
        this.slideNav.setSizeMode(1, 1).setAbsoluteSize(navWidth, 25);

        //space between nodes
        let totalPadding = (this.model.slideCount - 1)  * 10;
        let linkSize = (navWidth - totalPadding) / this.model.slideCount;
        let runningPos = 0;

        for(let i = 0, j = this.model.slideCount; i < j; i++) {
            let slideLink = new View(this.slideNav.addChild(), { i });

            slideLink.setSizeMode(1, 0).setAbsoluteSize(linkSize).setProportionalSize(null, 1);
            slideLink.setPositionX(runningPos);
            runningPos += linkSize;

            slideLink.createDOMElement({
                tagName: 'a',
                content: i + "",
                classes: ['slide-link'],
                properties: {
                    'text-align': 'center'
                }
            });

            slideLink.node.addUIEvent('mouseup');
            slideLink.node.onReceive = (type, ev) => {
                if (type === 'mouseup') {
                    slideLink.node.emit('gotoSlide', i);
                }

                slideLink.node.receive(type, ev);
            };
        }
    }

    setKeyPressEvents() {
        window.addEventListener('keyup', (e) => {
            switch (e.keyCode) {
                case 37: //Right arrow pushed
                    this.previousButton.node.emit('previousSlide', e);
                    break;
                case 39: //Left arrow pushed
                    this.nextButton.node.emit('nextSlide', e);
                    break;
            }
        });
    }
}
