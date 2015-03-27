import {RequestMessage, createRequestMessageProcessor} from '../src/http-request-message';
import {Headers} from '../src/headers';
import {RequestMessageProcessor} from '../src/request-message-processor';
import { timeoutTransformer, callbackParameterNameTransformer } from '../src/transformers';

describe("RequestMessage with JSONP", () => {
  it("should have a constructor that correctly sets the methods and response type", () => {
    let uri = {}, callbackName = {};
    let jsonpRequest = new RequestMessage(uri, callbackName);
    expect(jsonpRequest.uri).toBe(uri);
    expect(jsonpRequest.content).toBeUndefined();
    expect(jsonpRequest.headers).toEqual(jasmine.any(Headers));
    expect(jsonpRequest.responseType).toBe('jsonp');
    expect(jsonpRequest.callbackParameterName).toBe(callbackName);
  });

  describe("createRequestMessageProcessor",() => {
    it("should create a RequestMessageProcessor with JSONP and the correct transformers", () => {
      let httpProcessor = createRequestMessageProcessor();

      expect(httpProcessor).toEqual(jasmine.any(RequestMessageProcessor));
      expect(httpProcessor.type).toBe('fetch');
      expect(httpProcessor.transformers).toContain(timeoutTransformer);
      expect(httpProcessor.transformers).toContain(callbackParameterNameTransformer);
    });
  });

  //TODO : Will have to create a jsonp preprocessor for karma to test an actual request
});
