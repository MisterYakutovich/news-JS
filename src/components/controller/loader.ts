
class Loader {
    constructor(public baseLink:string,private options:object) {
        this.baseLink = baseLink;//string
        this.options = options;//object {apiKey: '7759f6fec1f849958f0b196a556f92e0'}
            
    }

   public getResp(
        { endpoint, options = {} }:{endpoint:string,options:Object},
        callback : () => void =()=>{
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

   private errorHandler(res:Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

   private makeUrl(options :Object, endpoint:string) {
        const urlOptions = { ...this.options, ...options };//{apiKey: '7759f6fec1f849958f0b196a556f92e0'}
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

   private load(method:string, endpoint:string, callback:(data:any)=>void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));         
    }
   
}

export default Loader;
