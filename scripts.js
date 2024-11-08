let currentDate = new Date();
let selectedDate = null;

function renderCalendar() {
    const monthYearElement = document.getElementById('monthYear');
    const datesContainer = document.getElementById('dates');
    
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    // Устанавливаем название месяца и года
    monthYearElement.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
    // Получаем первый день месяца и количество дней в месяце
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const firstDay = firstDayOfMonth.getDay();
    const lastDate = lastDayOfMonth.getDate();
    // Очищаем контейнер с датами
    datesContainer.innerHTML = '';
    // Добавляем пустые ячейки перед первым днем месяца
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('date', 'disabled');
        datesContainer.appendChild(emptyCell);
    }
    // Добавляем даты
    for (let day = 1; day <= lastDate; day++) {
        const dateCell = document.createElement('div');
        dateCell.classList.add('date');
        dateCell.textContent = day;
        dateCell.addEventListener('click', () => selectDate(day));
        datesContainer.appendChild(dateCell);
         // Разделяем недели горизонтальными линиями
        if ((day + firstDay) % 7 === 0) {
            const separator = document.createElement('div');
            separator.classList.add('week-separator');
            datesContainer.appendChild(separator);
        }
    }
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
}

function selectDate(day) {
    const previousSelected = document.querySelector('.date.selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }
    
    const allDates = document.querySelectorAll('.date');
    allDates.forEach(date => {
        if (date.textContent == day) {
            date.classList.add('selected');
            selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        }
    });
}

function getMonthName(monthIndex) {
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    return months[monthIndex];
}
// Инициализация календаря при загрузке страницы
renderCalendar();