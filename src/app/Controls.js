import View             from 'famous-creative/display/View';

export class Controls extends View {
    constructor(node) {
        super(node);

        this.renderPreviousbutton();
        this.renderNextbutton();
        this.renderSlideProgress();
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

    renderSlideProgress() {
        this.slideProgress = new View(this.addChild());
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
