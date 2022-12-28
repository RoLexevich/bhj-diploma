/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const { url, data, method, callback } = options;
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    xhr.responseType = 'json';
    xhr.withCredentials = true;

    try {
        xhr.open(method, setFullURL(data, url));
    } catch (e) {
        console.log(e);
    }

    if (method === 'GET') {
        xhr.send()
    } else {
        for (let item in data) {
            formData.append(item, data[item]);
        }
        xhr.send(formData);
    }

    xhr.onload = function () {
        callback(null, xhr.response);
    }
    xhr.onerror = function () {
        callback(xhr.statusText, null);
    }
};

function setFullURL(data = {}, url) {
    let fullURL = url + '?';
    for (let key in data) {
        fullURL += `${key}=${data[key]}&`;
    }
    return fullURL.substring(0, fullURL.length - 1);
}