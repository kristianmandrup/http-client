import {HttpResponseMessage} from './http-response-message';
import {join, buildQueryString} from 'aurelia-path';

function buildFullUri(message){
  var uri = join(message.baseUri, message.uri),
      qs;

  if(message.params){
    qs = buildQueryString(message.params);
    uri = qs ? `${uri}?${qs}` : uri;
  }

  message.fullUri = uri;
}

// I think fetch can handle both normal request and jsonp :)
// No need for FHRType!!

export class RequestMessageProcessor {
  // takes fetcher (fetch) as first argument
  constructor(fhrType, transformers){
    this.FHRType = fhrType;
    this.transformers = transformers;
  }

  abort(){
    //The logic here is if the fhr object is not set then there is nothing to abort so the intent was carried out
    if(this.fhr){
      this.fhr.abort();
    }
  }

  process(client, message){
    return new Promise((resolve, reject) => {
      var fhr = this.fhr = new this.FHRType(),
          transformers = this.transformers,
          i, ii;

      buildFullUri(message);
      fhr.open(message.method, message.fullUri, true);

      for(i = 0, ii = transformers.length; i < ii; ++i){
        transformers[i](client, this, message, fhr);
      }

      fhr.onload = (e) => {
        var response = new HttpResponseMessage(message, fhr, message.responseType, message.reviver);
        if(response.isSuccess){
          resolve(response);
        }else{
          reject(response);
        }
      };

      fhr.ontimeout = (e) => {
        reject(new HttpResponseMessage(message, {
          response:e,
          status:fhr.status,
          statusText:fhr.statusText
        }, 'timeout'));
      };

      fhr.onerror = (e) => {
        reject(new HttpResponseMessage(message, {
          response:e,
          status:fhr.status,
          statusText:fhr.statusText
        }, 'error'));
      };

      fhr.onabort = (e) => {
        reject(new HttpResponseMessage(message, {
          response:e,
          status:fhr.status,
          statusText:fhr.statusText
        }, 'abort'));
      };

      fhr.send(message.content);
    });
  }
}
