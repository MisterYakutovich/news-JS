import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey:'7759f6fec1f849958f0b196a556f92e0', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
