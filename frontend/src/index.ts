import Cookies from 'js-cookie';

import './styles/learn.scss';
import './ts/theme';
import {Carousel} from './ts/carousel';
import {ContactForm} from './ts/contact';
import {Widget, LabWidget} from './ts/widget';


(function(): void {
  $(window).on('scroll', () => {
    if ($(window).scrollTop() > 300) {
      $('#scrollToTopBtn').fadeIn('slow');
    } else {
      $('#scrollToTopBtn').fadeOut('slow');
    }
  });

  $('#scrollToTopBtn').on('click', () => {
    $('html, body').animate({
      scrollTop: 0,
    }, 300);
    return false;
  });

  // widget entry point
  // The on version doesn't work for some, probably, ridiculous reason...
  // $(document).on('ready', () => {
  $(document).ready(() => {
    $('div.widget_editor').each((index: number, element: HTMLElement) => {
      const exampleServer = $(element).attr('example_server');

      if (exampleServer) {
        const isLab = $(element).attr('lab');
        const widget =
          isLab ? new LabWidget($(element), exampleServer) :
            new Widget($(element), exampleServer);

        widget.render();
      } else {
        throw Error('Malformed widget! No server address specified.');
      }
    });

    // carousel entry point
    const carousel: Carousel = new Carousel();
    carousel.render();

    // contact form entry point
    $('div.contact-form').each((index: number, element: HTMLElement) => {
      const exampleServer = $(element).attr('example_server');

      if (exampleServer) {
        new ContactForm($(element), exampleServer);
      } else {
        throw Error('Malformed contact form. No server address specified.');
      }
    });

    if (!Cookies.get('AdaCore_staff') && !Cookies.get('learn_tester')) {
      const msg = 'You have reached learn.adacore.com staging site. This is ' +
      'a place for testing new features and is not meant for public ' +
      'consumption. Please select "Cancel" to be redirected to the main ' +
      'learn.adacore.com. Select "Ok" to continue to the DANGER ZONE.';
      if (confirm(msg)) {
        // set a session cookie so this doesn't pop up on every page
        Cookies.set('learn_tester', 'TRUE');
      } else {
        const pathname = $(location).attr('pathname');
        window.location.replace('http://learn.adacore.com' + pathname);
      }
    }
  });
}());
