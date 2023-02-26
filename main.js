const username = document.querySelector('#username')
const pass = document.querySelector('#password')
const pass2 = document.querySelector('#password2')
const email = document.querySelector('#email')
const inputs = document.querySelectorAll('input')
const sendBtn = document.querySelector('.send')
const clearBtn = document.querySelector('.clear')
const popup = document.querySelector('.popup')

const showError = (input, msg) => {
	// parametr input przechowuje nasze inputy
	// parametr msg przechowuje placeholder
	const formBox = input.parentElement
	const errorMsg = formBox.querySelector('.form__error-text')
	formBox.classList.add('error')
	errorMsg.textContent = msg
}

const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('error')
}

// parametr input z funkcji checkForm przechowuje tablicę z naszymi inputami
// parametr el odnosi się do nkażdej zmiennej, krórą umieścilismy w tablicy
const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			// console.log(el.placeholder)
			showError(el, el.placeholder)
		} else {
			clearError(el)
		}
	})
}

const checkLength = (input, min) => {
	if (input.value.length < min) {
        //metoda slice(0,-1) usuwa ostatni znak, czyli ":"
		showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} składa się z minimum ${min} znaków`)
	}
}

const checkPassword = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showError(pass2, 'Hasła do siebie nie pasują')
	}
}

const checkEmail = email => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (re.test(email.value)) {
		clearError(email)
	} else {
		showError(email, 'E-mail jest niepoprawny')
	}
}

// funkcja pobiera wszystkie elementy z klasą "form__box"
// iteruje te elementy i sprawdza czy zawierają klasę "error", jeśli tak to zwiększają zmienną "errorCount"
// jeśli zmienna "errorCount" wynosi 0 to do elementu "popup" dodawana jest klasa "show-popup"
const checkErrors = () => {
	const allInputs = document.querySelectorAll('.form__box')
	let errorCount = 0
	allInputs.forEach(el => {
		if (el.classList.contains('error')) {
			errorCount++
		}
	})

	if (errorCount === 0) {
		popup.classList.add('show-popup')
	}
}

sendBtn.addEventListener('click', e => {
	e.preventDefault()

	checkForm(inputs)
	checkLength(username, 3)
	checkLength(pass, 8)
	checkPassword(pass, pass2)
	checkEmail(email)
	checkErrors()
})

clearBtn.addEventListener('click', e => {
	e.preventDefault()

	inputs.forEach(el => {
		el.value = ''
		clearError(el)
	})
})
