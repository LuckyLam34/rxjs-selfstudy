// import { Observable } from 'rxjs/Observable';
// import { Observer } from 'rxjs/Observer';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/filter';

import { Observable } from "rxjs";

let numbers = [3, 5, 6, 7, 4];

/* Observable.from() */
/*
let source = Observable.from(numbers);

class MyObserver implements Observer<number> {

  next(value) {
    console.log(`value ${value}`);
  }

  error(err: any) {
    console.log(`Error: ${err}`);
  }

  complete() {
    console.log('Complete!');
  }
}

// source.subscribe(new MyObserver());

// Another way
source.subscribe(
  value => console.log(`value ${value}`),
  err => console.log(`Error: ${err}`),
  () => console.log('Complete!')
);
*/

/* Observable.create() */
/*
let source = Observable.create(observer => {
  for (let n of numbers) {

    if (n === 7) {
      observer.error('Something went wrong!');
    }

    observer.next(n);
  }

  observer.complete();
});

source.subscribe(
  value => console.log(`value ${value}`),
  err => console.log(`Error: ${err}`),
  () => console.log('Complete!!!')
);
*/


/* Let obmit some value over time */
/*
let source = Observable.create(observer => {
  let index = 0;

  let produceValue = () => {
    observer.next(numbers[index++]);

    if (index < numbers.length) {
      setTimeout(produceValue, 500);
    } else {
      observer.complete();
    }
  }

  produceValue();
}).map(n => n * 10)
  .filter(n => n > 30)

source.subscribe(
  value => console.log(`value ${value}`),
  err => console.log(`Error: ${err}`),
  () => console.log('Complete!!!')
);
*/


//Processing mouse events
/*
let circle = document.getElementById('circle');

let source = Observable.fromEvent(document, 'mousemove')
  .map((e: MouseEvent) => {
    return {
      x: e.clientX,
      y: e.clientY
    }
  })
  .delay(100);

const onNext = (value) => {
  document.getElementById('circle').style.left = value.x;
  document.getElementById('circle').style.top = value.y;
}

source.subscribe(
  onNext,
  err => console.log(`Error: ${err}`),
  () => console.log('Complete!!!')
);
*/


// Sending requests with XmlHttpRequest
/*
let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, 'click');

function load(url: string) {
  return Observable.create(observer => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      let data = JSON.parse(xhr.responseText);
      observer.next(data);
      observer.complete();
    });

    xhr.open('GET', url);
    xhr.send();
  });
}

const renderMovies = (movies) => {
  movies.forEach(element => {
    let div = document.createElement('div');
    div.innerText = element.title;
    output.appendChild(div);
  });
}

click.flatMap(e => load('movies.json'))
  .subscribe(
  renderMovies,
  err => console.log(`Error: ${err}`),
  () => console.log('Complete!!!')
  );

*/



// Retry logic - retry & retryWhen - scan - takeWhile

/*
let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, 'click');

function load(url: string) {
  return Observable.create(observer => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        observer.next(data);
        observer.complete();
      } else {
        observer.error(xhr.statusText);
      }
    });

    xhr.open('GET', url);
    xhr.send();
  }).retryWhen(retryStrategy(3, 100));
}

const retryStrategy = (attempts, delay) => {
  return (errors) => {
    return errors
      .scan((acc, value) => {
        console.log(acc, value);
        return acc + 1;
      }, 0)
      .takeWhile(acc => acc < attempts)
      .delay(delay);
  }
}

const renderMovies = (movies) => {
  movies.forEach(element => {
    let div = document.createElement('div');
    div.innerText = element.title;
    output.appendChild(div);
  });
}

click.flatMap(e => load('moviess.json'))
  .subscribe(
  renderMovies,
  err => console.log(`Error: ${err}`),
  () => console.log('Complete!!!')
  );
  */



// Setup to use the New Fetch Standard
