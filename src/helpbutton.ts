import './helpbutton.css'

export default class HelpButton {

  constructor(private startStopTour: (startNotifier: () => void, endNotifier: () => void) => void) {

  }

  content: Element;


  tourStartedNotification = () => {

    this.content.getElementsByClassName('guided-tour-link')[0].innerHTML = `<a href='javascript:void(0);'>Cancel Tour</a>`

  }

  tourEndedNotification = () => {

    console.log('end notification received')

    this.content.getElementsByClassName('guided-tour-link')[0].innerHTML = `<a href='javascript:void(0);'>Guided Tour</a>`


  }

  clickHandler = () => {

    this.startStopTour(this.tourStartedNotification, this.tourEndedNotification);

  }


  public mountHelpButton = (container: Element) => {

    this.content = document.createElement('div');

    this.content.innerHTML = `<div class="help-button-wrapper">
        <ul class="help-list">
          <li class="guided-tour-link"><a href='javascript:void(0);'>Guided Tour</a></li>
        </ul>
        <button class="help-button">
          <span>?</span>
        </button>
      </div>`;

    container.appendChild(this.content);

    this.content.getElementsByClassName('guided-tour-link')[0].addEventListener('click', this.clickHandler);


    this.content.getElementsByClassName('help-button')[0].addEventListener('click', () => {
      this.content.getElementsByClassName('help-button-wrapper')[0].classList.toggle('expanded');

    });


  }


}