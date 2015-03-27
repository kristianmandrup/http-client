export function timeoutTransformer(client, processor, message, fhr){
  if(message.timeout !== undefined){
    fhr.timeout = message.timeout;
  }
}

export function callbackParameterNameTransformer(client, processor, message, fhr){
  if(message.callbackParameterName !== undefined){
    fhr.callbackParameterName = message.callbackParameterName;
  }
}

export function credentialsTransformer(client, processor, message, fhr){
  if(message.withCredentials !== undefined){
    fhr.withCredentials = message.withCredentials;
  }
}

export function progressTransformer(client, processor, message, fhr){
  if(message.progressCallback){
    fhr.upload.onprogress = message.progressCallback;
  }
}

export function responseTypeTransformer(client, processor, message, fhr){
  var responseType = message.responseType;

  if(responseType === 'json'){
    responseType = 'text'; //IE does not support json
  }

  fhr.responseType = responseType;
}

export function headerTransformer(client, processor, message, fhr){
  message.headers.configureFHR(fhr);
}

export function contentTransformer(client, processor, message, fhr){
  if(window.FormData && message.content instanceof FormData){
    return;
  }

  if(window.Blob && message.content instanceof Blob){
    return;
  }

  if(window.ArrayBufferView && message.content instanceof ArrayBufferView){
    return;
  }

  if(message.content instanceof Document){
    return;
  }

  if(typeof message.content === 'string'){
    return;
  }

  if(message.content === null || message.content === undefined){
    return;
  }

  message.content = JSON.stringify(message.content, message.replacer);
}
