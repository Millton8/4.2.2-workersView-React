
export default function errorsHandler(errorCode,errorText,setInformMessage) {

    switch (errorCode) {
        case 400:
            setInformMessage("Не верный пароль")
            console.log(errorCode,errorText)
            break
        case 401:
            setInformMessage("Ошибка доступа. Вы не авторизованы")
            console.log(errorCode,errorText)
            break
        case 404:
            setInformMessage("Ошибка. Клиент не правильно сформировал запрос")
           console.log(errorCode,errorText)
            break
            case 494:
            setInformMessage("Ошибка. Не удалось подключиться к серверу")
            setInformMessage("494")
           console.log(errorCode,errorText)
          
           return (<div>Big erros</div>)
            break
        case 500:
            setInformMessage("Произошла ошибка на сервере")
           console.log(errorCode,errorText)
            break
        default:
            setInformMessage("Неизвестная ошибка")
           console.log(errorCode,errorText)
            break
    }
}