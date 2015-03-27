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
  constructor(transformers){
    this.transformers = transformers;
  }

  abort(){
    // ??
  }

  process(client, message){
    return new Promise((resolve, reject) => {      
      var transformers = this.transformers,
        i, ii;

      buildFullUri(message);
      for(i = 0, ii = transformers.length; i < ii; ++i){
        transformers[i](client, this, message);
      }

      let status = function(response) {  
        if (response.status >= 200 && response.status < 300) {  
          return response
        } else {  
          reject(new Error(response.statusText)); 
        }  
      }

      let json = function(response) {  
        return response.json()  
      }

      let success = function(data) {  
        resolve(new HttpResponseMessage(message, message.options, message.reviver));
      }      

      let err = function(error) {  
        reject(new HttpResponseMessage(message, {
          response: error,
          status: error.status,
          statusText: error.message
        }, 'error'));
      }

      fetch(message.fullUri, message.options)
        .then(status)
        .then(json)
        .then(success)
        .catch(err);
    });
  }
}
