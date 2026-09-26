new WOW({
    animateClass: 'animate__animated',
}).init();


const swiper = new Swiper('.swiper', {
    slidesPerView: 3, // сколько элементов показывать одновременно
    spaceBetween: 3, // отступ между слайдами (в пикселях)
    loop: true, // зацикливание
    navigation: {
        nextEl: '.swiper-button-next', // кнопка "следующий"
        prevEl: '.swiper-button-prev', // кнопка "предыдущий"
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }

    }
});

// бургерное меню
document.getElementById('burger').onclick = function () {
    document.getElementById('menu').classList.add('open');
}
document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open');
    }
})

//попап кнопка заказать звонок
// Обертка для выполнения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Находим кнопку, которая открывает попап
    const openBtnMenu = document.querySelector('.header .btn-menu');
    const footerBtnMenu = document.querySelector('.footer .btn');
    // Находим сам попап
    const popupMenu = document.getElementById('menuPopup');
    // Кнопка закрытия попапа
    const closeBtnMenu = document.getElementById('menuClosePopup');
    // Внутри попапа — область для закрытия при клике на фон
    const overlayMenu = popupMenu.querySelector('.menu-popup-overlay');

    // Добавляем обработчики без условий проверки

    //открытие попап
    openBtnMenu.addEventListener('click', () => {
        popupMenu.style.display = 'flex';
    });
    footerBtnMenu.addEventListener('click', () => {
        popupMenu.style.display = 'flex';
    });
//закрытие попап кнопка
    closeBtnMenu.addEventListener('click', () => {
        popupMenu.style.display = 'none';
    });
//закрытие при нажатии на фон
    overlayMenu.addEventListener('click', () => {
        popupMenu.style.display = 'none';
    });
});
// проверка полей попапа
document.getElementById('menu-schedule-input-btn').addEventListener('click', function () {
    // Получаем значения полей
    const nameInput = document.getElementById('menu-input-name');
    const phoneInput = document.getElementById('menu-input-phone');
    const nameError = document.getElementById('menu-name-error');
    const phoneError = document.getElementById('menu-phone-error');
    const contactFormOrder = document.querySelector('.menu-popup-info');
    const thankWrapper = document.getElementById('thankYouBlockMenu');

    let valid = true;

    // Сброс ошибок и стилей
    nameError.style.display = 'none';
    phoneError.style.display = 'none';
    nameInput.style.borderColor = '';
    phoneInput.style.borderColor = '';

    // Валидация имени
    if (nameInput.value.trim() === '') {
        nameError.style.display = 'block';
        nameInput.style.borderColor = 'red';
        valid = false;
    }

    // Валидация телефона
    if (phoneInput.value.trim() === '') {
        phoneError.style.display = 'block';
        phoneInput.style.borderColor = 'red';
        valid = false;
    }

    if (!valid) {
        return; // Прерываем выполнение, если есть ошибки
    }

    // Отправка POST-запроса
    fetch('https://testologia.ru/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: nameInput.value.trim(),
            phone: phoneInput.value.trim(),
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success === 1) {
                // Ошибка от сервера — показываем alert
                alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
            } else if (data.success === 0) {
                // Успех: скрываем форму и показываем попап благодарности
                if (contactFormOrder) {
                    contactFormOrder.style.display = 'none';
                }
                if (thankWrapper) {
                    thankWrapper.style.display = 'flex';
                }
                // Очистить поля
                nameInput.value = '';
                phoneInput.value = '';
            }
        })


        .catch(error => {
            console.error('Ошибка при отправке:', error);
            alert('Ошибка при отправке данных. Попробуйте позже.');
        });
});


//попап расписание
// Находим кнопку, которая открывает попап
const openBtn = document.querySelector('.directions .btn');
const applyBtn = document.querySelector('.btn-apply');
const hallsBtn = document.querySelector('.btn-halls');
// const contactBtn = document.querySelector('.btn-contact');
// Находим сам попап
const popup = document.getElementById('schedulePopup');

// Кнопка закрытия попапа
const closeBtn = document.getElementById('closePopup');

// Внутри попапа — область для закрытия при клике на фон
const overlay = popup.querySelector('.popup-overlay');

// Все кнопки дней недели
const daysButtons = document.querySelectorAll('.day-btn');

// Область для отображения названия выбранного дня и расписания
const scheduleInfoDiv = document.querySelector('.schedule-info');
const selectedDayDiv = scheduleInfoDiv.querySelector('.selected-day');
const scheduleTableDiv = scheduleInfoDiv.querySelector('.schedule-table');

// Расписание
const scheduleData = {
    'Понедельник': [
        {time: '09:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '11:00', group: 'Хатха-йога', teacher: 'Ирина Ужегова', level: 'Средний'},
        {time: '13:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Профессиональный'},
        {time: '15:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '17:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '19:00', group: 'Термо-йога', teacher: 'Ирина Ужегова', level: 'Средний'},
        {time: '20:00', group: 'Термо-йога', teacher: 'Ирина Ужегова', level: 'Профессиональный'},
        {time: '21:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'}

    ],
    'Вторник': [
        {time: '09:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '11:00', group: 'Хатха-йога', teacher: 'Ирина Ужегова', level: 'Средний'},
        {time: '13:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Профессиональный'},
        {time: '15:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '17:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '19:00', group: 'Термо-йога', teacher: 'Ирина Ужегова', level: 'Средний'},
        {time: '20:00', group: 'Термо-йога', teacher: 'Ирина Ужегова', level: 'Профессиональный'},
        {time: '21:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'}
    ],
    'Среда': [
        {time: '09:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '11:00', group: 'Хатха-йога', teacher: 'Ирина Ужегова', level: 'Средний'},
        {time: '13:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Профессиональный'},
        {time: '15:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '17:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '19:00', group: 'Термо-йога', teacher: 'Ирина Ужегова', level: 'Средний'},
        {time: '20:00', group: 'Термо-йога', teacher: 'Ирина Ужегова', level: 'Профессиональный'},
        {time: '21:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'}
    ],
    'Четверг': [
        {time: '09:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '11:00', group: 'Хатха-йога', teacher: 'Ирина Ужегова', level: 'Средний'},
        {time: '13:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Профессиональный'},
        {time: '15:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '17:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '19:00', group: 'Термо-йога', teacher: 'Ирина Ужегова', level: 'Средний'},
        {time: '20:00', group: 'Термо-йога', teacher: 'Ирина Ужегова', level: 'Профессиональный'},
        {time: '21:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'}
    ],
    'Пятница': [
        {time: '09:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '11:00', group: 'Хатха-йога', teacher: 'Ирина Ужегова', level: 'Средний'},
        {time: '13:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Профессиональный'},
        {time: '15:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '17:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '19:00', group: 'Термо-йога', teacher: 'Ирина Ужегова', level: 'Средний'},
        {time: '20:00', group: 'Термо-йога', teacher: 'Ирина Ужегова', level: 'Профессиональный'},
        {time: '21:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'}
    ],
    'Суббота': [
        {time: '09:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '11:00', group: 'Хатха-йога', teacher: 'Ирина Ужегова', level: 'Средний'},
        {time: '13:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Профессиональный'},
        {time: '15:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '17:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '19:00', group: 'Термо-йога', teacher: 'Ирина Ужегова', level: 'Средний'},
        {time: '20:00', group: 'Термо-йога', teacher: 'Ирина Ужегова', level: 'Профессиональный'},
        {time: '21:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'}
    ],
    'Воскресенье': [
        {time: '09:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '11:00', group: 'Хатха-йога', teacher: 'Ирина Ужегова', level: 'Средний'},
        {time: '13:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Профессиональный'},
        {time: '15:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '17:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'},
        {time: '19:00', group: 'Термо-йога', teacher: 'Ирина Ужегова', level: 'Средний'},
        {time: '20:00', group: 'Термо-йога', teacher: 'Ирина Ужегова', level: 'Профессиональный'},
        {time: '21:00', group: 'Кундалини-йога', teacher: 'Ирина Ужегова', level: 'Начальный'}
    ]
};

// Открытие попапа с расписанием
openBtn.addEventListener('click', () => {
    popup.style.display = 'flex';
});
applyBtn.addEventListener('click', () => {
    document.getElementById('schedulePopup').style.display = 'flex';
});
hallsBtn.addEventListener('click', () => {
    document.getElementById('schedulePopup').style.display = 'flex';
});

// Закрытие попапа
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Закрытие при клике на фон
overlay.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Обработка выбора дня
daysButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Удаляем активный класс у всех
        daysButtons.forEach(b => b.classList.remove('active'));
        // Активируем выбранную
        btn.classList.add('active');

        const day = btn.dataset.day; // название дня

        // Обновляем название выбранного дня
        selectedDayDiv.textContent = `${day}`;

        // Получаем расписание для этого дня
        const schedule = scheduleData[day];

        // Очищаем содержимое таблицы
        scheduleTableDiv.innerHTML = '';

        if (schedule && schedule.length > 0) {
            // Создаем строки для каждого занятия
            schedule.forEach(item => {
                const row = document.createElement('div');
                row.className = 'schedule-row';

                const timeCol = document.createElement('div');
                timeCol.className = 'schedule-column';
                timeCol.textContent = item.time;

                const groupCol = document.createElement('div');
                groupCol.className = 'schedule-column';
                groupCol.textContent = item.group;

                const teacherCol = document.createElement('div');
                teacherCol.className = 'schedule-column';
                teacherCol.textContent = item.teacher;

                const levelCol = document.createElement('div');
                levelCol.className = 'schedule-column';
                levelCol.textContent = item.level;

                row.appendChild(timeCol);
                row.appendChild(groupCol);
                row.appendChild(teacherCol);
                row.appendChild(levelCol);

                scheduleTableDiv.appendChild(row);
            });
        } else {
            // Если расписание отсутствует
            scheduleTableDiv.innerHTML = '<p class="placeholder">Расписание для этого дня отсутствует.</p>';
        }
    });
});
// Обработка кликов по строкам расписания (делегирование)
scheduleTableDiv.addEventListener('click', (event) => {
    const row = event.target.closest('.schedule-row');
    if (row) {
        // Убираем активный класс у всех строк
        document.querySelectorAll('.schedule-row').forEach(r => r.classList.remove('active'));
        // Добавляем активный класс выбранной
        row.classList.add('active');
    }
});

// проверка полей попапа и отправка формы
document.getElementById('schedule-input-btn').addEventListener('click', function () {
    // Получаем значения полей
    const nameInput = document.getElementById('input-name');
    const phoneInput = document.getElementById('input-phone');
    const nameError = document.getElementById('name-error');
    const phoneError = document.getElementById('phone-error');
    const formContainer = document.querySelector('.formContainer');
    const thankWrapper = document.getElementById('thankYouBlockWrapper');

    let valid = true;

    // Сброс ошибок и стилей
    nameError.style.display = 'none';
    phoneError.style.display = 'none';
    nameInput.style.borderColor = '';
    phoneInput.style.borderColor = '';

    // Валидация имени
    if (nameInput.value.trim() === '') {
        nameError.style.display = 'block';
        nameInput.style.borderColor = 'red';
        valid = false;
    }

    // Валидация телефона
    if (phoneInput.value.trim() === '') {
        phoneError.style.display = 'block';
        phoneInput.style.borderColor = 'red';
        valid = false;
    }

    if (!valid) {
        return; // Прерываем выполнение, если есть ошибки
    }

    // Отправка POST-запроса
    fetch('https://testologia.ru/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: nameInput.value.trim(),
            phone: phoneInput.value.trim(),
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success === 1) {
                // Ошибка от сервера — показываем alert
                alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
            } else if (data.success === 0) {
                // Успех: скрываем форму и показываем попап благодарности
                if (formContainer) {
                    formContainer.style.display = 'none';
                }
                if (thankWrapper) {
                    thankWrapper.style.display = 'flex';
                }
                // Можно очистить поля
                nameInput.value = '';
                phoneInput.value = '';

            }
        })
        .catch(error => {
            console.error('Ошибка при отправке:', error);
            alert('Ошибка при отправке данных. Попробуйте позже.');
        });
});


// проверка полей формы в контактах
document.getElementById('btn-contact').addEventListener('click', function () {
    // Получаем значения полей
    const nameContact = document.getElementById('name');
    const phoneContact = document.getElementById('phone');
    const nameErrorContact = document.getElementById('name-error-contact');
    const phoneErrorContact = document.getElementById('phone-error-contact');
    const contactFormOrder = document.querySelector('.contact-form');
    const thankWrapper = document.getElementById('thankYouBlockWrapperContact');

    let valid = true;

    // Сброс ошибок и стилей
    nameErrorContact.style.display = 'none';
    phoneErrorContact.style.display = 'none';
    nameContact.style.borderColor = '';
    phoneContact.style.borderColor = '';

    // Валидация имени
    if (nameContact.value.trim() === '') {
        nameErrorContact.style.display = 'block';
        nameContact.style.borderColor = 'red';
        valid = false;
    }

    // Валидация телефона
    if (phoneContact.value.trim() === '') {
        phoneErrorContact.style.display = 'block';
        phoneContact.style.borderColor = 'red';
        valid = false;
    }

    if (!valid) {
        return; // Прерываем выполнение, если есть ошибки
    }

    // Отправка POST-запроса
    fetch('https://testologia.ru/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: nameContact.value.trim(),
            phone: phoneContact.value.trim(),
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success === 1) {
                // Ошибка от сервера — показываем alert
                alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
            } else if (data.success === 0) {
                // Успех: скрываем форму и показываем попап благодарности
                if (contactFormOrder) {
                    contactFormOrder.style.display = 'none';
                }
                if (thankWrapper) {
                    thankWrapper.style.display = 'flex';
                }
                // Можно очистить поля
                nameContact.value = '';
                phoneContact.value = '';

            }
        })
        .catch(error => {
            console.error('Ошибка при отправке:', error);
            alert('Ошибка при отправке данных. Попробуйте позже.');
        });
});