import {Headers} from './headers';

export class HttpResponseMessage {
  constructor(requestMessage, response, responseType, reviver){
    this.requestMessage = requestMessage;
    this.statusCode = response.status;
    this.response = response;
    this.isSuccess = response.status >= 200 && response.status < 400;
    this.statusText = response.statusText;
    this.responseType = responseType;
    this.reviver = reviver;

    if(response.headers){
      this.headers = Headers.parse(response.headers);
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
