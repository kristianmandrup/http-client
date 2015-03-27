import {Headers} from './headers';

export class HttpResponseMessage {
  constructor(requestMessage, fhr, responseType, reviver){
    this.requestMessage = requestMessage;
    this.statusCode = fhr.status;
    this.response = fhr.response;
    this.isSuccess = fhr.status >= 200 && fhr.status < 400;
    this.statusText = fhr.statusText;
    this.responseType = responseType;
    this.reviver = reviver;

    if(fhr.getAllResponseHeaders){
      this.headers = Headers.parse(fhr.getAllResponseHeaders());
    }else {
      this.headers = new Headers();
    }
  }

  get content(){
    try{
      if(this._content !== undefined){
        return this._content;
      }

      if(this.response === undefined || this.response === null){
        return this._content = this.response;
      }

      if(this.responseType === 'json'){
        return this._content = JSON.parse(this.response, this.reviver);
      }

      if(this.reviver){
        return this._content = this.reviver(this.response);
      }

      return this._content = this.response;
    }catch(e){
      if(this.isSuccess){
        throw e;
      }

      return this._content = null;
    }
  }
}
