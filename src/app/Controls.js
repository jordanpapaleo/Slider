import View             from 'famous-creative/display/View';

export class Controls extends View {
    constructor(node) {
        super(node);

        this.renderPreviousbutton();
        this.renderNextbutton();
        this.renderSlideProgress();
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

        this.nextButton.on('mousedown', () => {
            this.trigger('nextSlide');
        });
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

        this.previousButton.on('mousedown', () => {
            this.trigger('previousSlide');
        });
    }

    renderSlideProgress() {
        this.slideProgress = new View(this.addChild());
    }
}
