document.addEventListener('DOMContentLoaded', () => {
  // контейнер игры
  const container = document.querySelector('.container');
  const timerBlock = document.querySelector('.timer');
  timerBlock.textContent = '60';
  // описание над игровым полем
  const retryBtn = document.querySelector('.retry__btn');
  // выбор поля
  const form = document.getElementById('size__select')
  form.addEventListener('submit', () => {
    localStorage.setItem('size', JSON.stringify(form.elements['rb'].value));
  })

  let array;
  let array1 = ['ो', 'ो', 'म', 'म', 'ु', 'ु', 'ह', 'ह', 'र', 'र', 'त', 'त', '४', '४', 'ॆ', 'ॆ'];

  let array2 = ['ौ', 'ौ', 'ै', 'ै', 'ा', 'ा', 'ी', 'ी', 'ू', 'ू', 'ब', 'ब', 'ह', 'ह', 'ग', 'ग', 'द', 'द', 'ज', 'ज', 'ड', 'ड', '़', '़', 'ो', 'ो', 'े', 'े', '्', '्', 'ि', 'ि', 'ु', 'ु', 'प', 'प'];

  let array3 = ['ौ', 'ौ', 'ै', 'ै', 'ा', 'ा', 'ी', 'ी', 'ू', 'ू', 'ब', 'ब', 'ह', 'ह', 'ग', 'ग', 'द', 'द', 'ज', 'ज', 'ड', 'ड', '़', '़', 'ो', 'ो', 'े', 'े', '्', '्', 'ि', 'ि', 'ु', 'ु', 'प', 'प', 'र', 'र', 'क', 'क', 'त', 'त', 'च', 'च', 'ट', 'ट', 'ॉ', 'ॉ', 'ॆ', 'ॆ', 'ं', 'ं', 'म', 'म', 'न', 'न', 'व', 'व', 'ल', 'ल', 'स', 'स', 'य', 'य'];

  let array4 = ['ौ', 'ौ', 'ै', 'ै', 'ा', 'ा', 'ी', 'ी', 'ू', 'ू', 'ब', 'ब', 'ह', 'ह', 'ग', 'ग', 'द', 'द', 'ज', 'ज', 'ड', 'ड', '़', '़', 'ो', 'ो', 'े', 'े', '्', '्', 'ि', 'ि', 'ु', 'ु', 'प', 'प', 'र', 'र', 'क', 'क', 'त', 'त', 'च', 'च', 'ट', 'ट', 'ॉ', 'ॉ', 'ॆ', 'ॆ', 'ं', 'ं', 'म', 'म', 'न', 'न', 'व', 'व', 'ल', 'ल', 'स', 'स', 'य', 'य', '१', '१', '२', '२', '३', '३', '४', '४', '५', '५', '६', '६', '७', '७', '८', '८', '९', '९', '०', '०', 'ॲ', 'ॲ', 'ॅ', 'ॅ', 'र्', 'र्', 'ज्ञ', 'ज्ञ', 'त्र', 'त्र', 'क्ष', 'क्ष', 'श्र', 'श्र', 'छ', 'छ'];

        let hasFlippedCard = false;
        let fildLocked = false;
        let firstCard;
        let secondCard;
        let matchPoints = 0;
        let allMatches = 8;
        let flag = false;

  let storageSize = JSON.parse(localStorage.getItem('size'));
  if (storageSize === null || storageSize === '0') {
    array = array1;
    } else if (storageSize === '1') {
    array = array2;
    } else if (storageSize === '2') {
    array = array3;
    } else if (storageSize === '3') {
      array = array4
  }

  function shuffle(array) {

    if (storageSize === '1') {
      array = array2;
      allMatches = 18;
      timerBlock.textContent = '120';
    } else if (storageSize === '2') {
      array = array3;
      allMatches = 32;
      timerBlock.textContent = '240';
    } else if (storageSize === '3') {
      array = array4
      allMatches = 50;
      timerBlock.textContent = '460';
    }

    for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
        }
}
    shuffle(array);

  const createGameTable = () => {
    for (let i = 0; i < array.length; ++i) {
        let card = document.createElement('div');
        card.classList.add('card__item');
        card.classList.add('hidden');
        card.textContent = array[i];
      if (storageSize === '1') {
        container.style.width = '600px';
        container.style.height = '600px';
        card.style.width = 'calc(16.5% - 1px)';
        card.style.height = 'calc(16.5% - 1px)';
      }
      if (storageSize === '2') {
        container.style.width = '600px';
        container.style.height = '600px';
        card.style.width = 'calc(12.5% - 1px)';
        card.style.height = 'calc(12.5% - 1px)';
        card.style.fontSize = '40px';
      }
      if (storageSize === '3') {
        container.style.width = '600px';
        container.style.height = '600px';
        card.style.width = 'calc(10% - 1px)';
        card.style.height = 'calc(10% - 1px)';
        card.style.fontSize = '40px';
      }
        container.appendChild(card);
    }
}
    createGameTable();


    const fildReset = () => {
    [hasFlippedCard, fildLocked] = [false, false];
    [firstCard, secondCard] = [null, null];
    }

  const openCard = event => {
        initialTimer();
        flag = true;
        if (fildLocked) return;
        const activeCard = event.target
        // console.log(activeCard);

        if (activeCard === firstCard) return;
        activeCard.classList.remove('hidden');

        if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = activeCard;
    } else {
        hasFlippedCard = false;
        secondCard = activeCard;
            checkingMatching();
        }
    }

    let count;
    const initialTimer = () => {
        if (flag === true) return;
        clearInterval(timer);
        count = timerBlock.textContent;
        timer = setInterval(() => {
        count = count--;
        timerBlock.textContent = count--;
            if (count === 0) {
                disableAllCards();
            clearInterval(timer);
            timerBlock.textContent = 'Kонец!';
            setTimeout(() => {
                    retryBtn.style.visibility = 'visible';
                }, 500);
            }
            if (matchPoints === allMatches) {
              timerBlock.textContent = 'Победа!'
              timerBlock.style.color = 'red';
                return;
            }
        }, 1000);
    }

    const checkingMatching = () => {
        if (firstCard.innerHTML === secondCard.innerHTML) {
            matchPoints += 1;
            if (matchPoints === allMatches) {
                setTimeout(() => {
                    retryBtn.style.visibility = 'visible';
                }, 500);
            }
            disableCards();
    } else {
        unflipCards();
    }
    }

    const disableAllCards = () => {
        let cards = document.querySelectorAll('.card__item');
        cards.forEach(card => {
            card.removeEventListener('click', openCard);
        })
}

const disableCards = () => {
    firstCard.removeEventListener('click', openCard);
    secondCard.removeEventListener('click', openCard);
}

const unflipCards = () => {
    fildLocked = true;
        setTimeout(() => {
            firstCard.classList.add('hidden');
            secondCard.classList.add('hidden');
            fildReset();
        }, 600);
}

    const createGamingProcess = () => {
        let cards = document.querySelectorAll('.card__item');
        cards.forEach(card => {
            card.addEventListener('click', openCard);
        })
      retryBtn.addEventListener('click', () => {
            window.location.reload();
      })
    }
    createGamingProcess();
});
