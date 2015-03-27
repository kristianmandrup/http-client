export class Headers {
  constructor(headers={}){
    this.headers = headers;
  }

  add(key, value){
    this.headers[key] = value;
  }

  get(key){
    return this.headers[key];
  }

  clear(){
    this.headers = {};
  }

  /**
   * Use HTML5 Fetch API :)
   */
  configureFetch(fhr){
    var headers = this.headers, key;

    for(key in headers){
      fhr.setRequestHeader(key, headers[key]);
    }
  }

  /**
   * Use HTML5 Fetch API :)
   */
  static parse(headerStr){
    var headers = new Headers();
    if (!headerStr) {
      return headers;
    }

    var headerPairs = headerStr.split('\u000d\u000a');
    for (var i = 0; i < headerPairs.length; i++) {
      var headerPair = headerPairs[i];
      // Can't use split() here because it does the wrong thing
      // if the header value has the string ": " in it.
      var index = headerPair.indexOf('\u003a\u0020');
      if (index > 0) {
        var key = headerPair.substring(0, index);
        var val = headerPair.substring(index + 2);
        headers.add(key,val);
      }
    }

    return headers;
  }
}
