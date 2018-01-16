
import HelpButton from './helpButton'
import Tour from './tour';


export default class Main {


    constructor() {


    }


    mountGlobiTourer = () => {
        let tour = new Tour();
        let helpButton: HelpButton = new HelpButton(tour.startStopTour);
        helpButton.mountHelpButton(document.getElementById('DashboardPageContentDiv'));

    }




}



let main = new Main();
main.mountGlobiTourer();
