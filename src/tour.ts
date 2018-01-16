import * as hopscotch from 'hopscotch';
import 'hopscotch/dist/css/hopscotch.css';

declare var saw: any;

export default class Tour {
    constructor() {
    }

    private tourSteps: StepDefinition[];
    private tourInProgress: boolean = false;


    private getTourSteps(): StepDefinition[] {

        this.tourSteps = [];

        const globiHelpElements: Element[] = Array.from(document.getElementsByTagName('globihelp'));

        globiHelpElements.forEach((helpElement) => {

            let titleElements = helpElement.getElementsByTagName('title');
            if (titleElements == null || titleElements.length != 1) {
                saw.dashboard.showMsgDialog("Globi Help System", "Exactly one title tag must be provided for help item " + helpElement.id, true);
            }
            let contentElements = helpElement.getElementsByTagName('content');
            if (contentElements == null || contentElements.length != 1) {
                saw.dashboard.showMsgDialog("Globi Help System", "exactly one Content tag must be provided for help item " + helpElement.id, true);
            }

            this.tourSteps.push({
                target: helpElement.id,
                placement: helpElement.getAttribute('position'),
                title: titleElements[0].textContent,
                content: contentElements[0].textContent

            })


        })

        return this.tourSteps;


    }


    public startStopTour = (startNotifier: () => void, endNotifier: () => void) => {


        if (!this.tourInProgress) {
            var tourDefinition: TourDefinition = {
                id: 'globi-tour',
                steps: this.getTourSteps(),
                skipIfNoElement: false,
                onClose: () => { this.tourInProgress = false; endNotifier(); },
                onEnd: () => { this.tourInProgress = false; endNotifier(); }
            };
            this.tourInProgress = true;
            hopscotch.startTour(tourDefinition);
            startNotifier();
        } else {
            hopscotch.endTour(false);
            this.tourInProgress = false;
            endNotifier();

        }


    }

}
