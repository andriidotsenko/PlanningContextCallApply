// // 1. Напишіть функцію detonatorTimer(delay) використовуючи setInterval
// Вона виводить в консоль число кожну секунду, 
// починаючи з delay (ціле число) і в кінці замість 0 виведе 'BOOM!'

function detonatorTimerOne(delay) {
	let count = delay

	const timer = setInterval(() => {
		if (count === 0) {
			clearInterval(timer)
			console.log('BOOM!')
		} else {
			console.log(count)
			count--
		}
	}, 1000)
}

detonatorTimerOne(3)
//========================================================================================================================================================
// 2. Напишіть функцію detonatorTimer(delay) використовуючи вкладений setTimeout
// Вона виводить в консоль число кожну секунду, починаючи з
//  delay (ціле число) і в кінці замість 0 виведе 'BOOM!'
//========================================================================================================================================================
function detonatorTimerTwo(delay) {
	let count = delay

	function pip() {
		if (count === 0) {
			console.log('BOOM!')
		} else {
			console.log(count)
			count--
			setTimeout(pip, 1000)
		}
	}
	pip()
}

detonatorTimerTwo(3);
//========================================================================================================================================================
// 3. Напишіть об'єкт в якому опишіть свої довільні властивості та довільні методи що ці властивості виводять.
//========================================================================================================================================================

let me = {
	name: 'Andrii',
	residency: 'Kyiv',
	gender: 'male',
	age: 25,
	bYear: '1997',
	bMonth: 'October',
	bDay: 20,
	hobby: 'photography',
	workHoursPerDay: 10.5,
	sleepHoursPerDay: 7,
	//========================================================================================================================================================

	formatTime(value) {
		return value.toString().padStart(2, '0')
	},
	//========================================================================================================================================================

	fullAge() {
		const diffInSeconds = (Date.now() - new Date(`${this.bYear}-${this.bMonth}-${this.bDay}`)) / 1000
		const [years, months, days, hours, minutes, seconds] = [
			diffInSeconds / 31536000 | 0,
			diffInSeconds / 2592000 % 12 | 0,
			diffInSeconds / 86400 % 30.44 | 0,
			diffInSeconds / 3600 % 24 | 0,
			diffInSeconds / 60 % 60 | 0,
			diffInSeconds % 60 | 0
		]
		return `${this.name}'s full age is:
${years} years, 
${months} months, 
${days} days, 
${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`
	},
	//========================================================================================================================================================

	calculateFreeTime() {
		const workHoursPerYear = this.workHoursPerDay * 365
		const sleepHoursPerYear = this.sleepHoursPerDay * 365
		const totalHoursPerYear = 24 * 365
		const workAndSleepHours = workHoursPerYear + sleepHoursPerYear
		const freeHoursPerYear = totalHoursPerYear - workAndSleepHours
		const [freeDays, freeHours, freeMinutes] = [
			freeHoursPerYear / 24 | 0,
			freeHoursPerYear % 24,
			(freeHoursPerYear % 1 * 60) | 0
		]
		return `On average, I have ${freeDays} days, ${freeHours} hours, and ${freeMinutes} minutes 
of free time per year for my ${this.hobby} hobby.`
	},
	//========================================================================================================================================================

	calculateNextBirthday() {
		const currentDate = new Date()
		const birthDateThisYear = new Date(currentDate.getFullYear(), this.getMonthNumber(this.bMonth) - 1, this.bDay)

		if (currentDate > birthDateThisYear) {
			birthDateThisYear.setFullYear(currentDate.getFullYear() + 1)
		}

		const timeUntilNextBirthday = birthDateThisYear - currentDate
		const daysUntilNextBirthday = timeUntilNextBirthday / (1000 * 60 * 60 * 24)

		return `My next birthday is on ${birthDateThisYear.toDateString()}.
There are ${Math.floor(daysUntilNextBirthday)} days until then.`
	},
	//========================================================================================================================================================

	getMonthNumber(monthName) {
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		]
		return months.indexOf(monthName) + 1;
	},
	//========================================================================================================================================================
}

console.log(me.fullAge())
console.log(me.calculateFreeTime())
console.log(me.calculateNextBirthday())

//========================================================================================================================================================

// 4. А тепер зробіть всі свої методи з попередньої задачі прив'язаними до контексту свого об'єкту
// Аби вони були захищені від перезапису об'єкту і їх можна було викликати в таймері:

let securedSelfFullAge = me.fullAge.bind(me)
let securedSelfCalculateFreeTime = me.calculateFreeTime.bind(me)
let securedSelfCalculateNextBirthday = me.calculateNextBirthday.bind(me)

setTimeout(securedSelfFullAge, 1000);
setTimeout(securedSelfCalculateFreeTime, 2000)
setTimeout(securedSelfCalculateNextBirthday, 3000)


console.log(me.fullAge())
console.log(me.calculateFreeTime())
console.log(me.calculateNextBirthday())

//========================================================================================================================================================

// 5. Напишіть функцію-декоратор яка вповільнює виконання довільної функції на вказану кількість секунд.

function slower(fn, seconds) {
	return function (...args) {
		setTimeout(() => {
			const result = fn(...args)
			console.log(result)
		}, seconds * 1000)
	}
}

function addFun(a, b) {
	return a + b;
}

function subFun(a, b) {
	return a - b;
}

const delayedAddFun = slower(addFun, 10)
const delaySubFun = slower(subFun, 8)


delayedAddFun(3, 5)
delaySubFun(3, 5)