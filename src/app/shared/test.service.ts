import { Injectable } from "@angular/core";
import { of, Observable, from } from "rxjs";

import {
  request,
  getFile,
  getImage,
  getJSON,
  getString,
  HttpResponse
} from "tns-core-modules/http";
import { config } from "../environments/env";

@Injectable({
  providedIn: "root"
})
export class TestService {
  // tslint:disable-next-line:no-empty
  constructor() {}

  httpGetTestRequest() {
    return from(
      request({
        url: config.url + "testData",
        headers: this.setHeaders(),
        method: "GET"
      }).then(
        (response: HttpResponse) => {
          // Content property of the response is HttpContent
          // The toString method allows you to get the response body as string.
          const json = response.content.toJSON();

          console.log(json);

          return json;
          // The toJSON method allows you to parse the received content to JSON object
          // var obj = response.content.toJSON();
          // The toImage method allows you to get the response body as ImageSource.
          // var img = response.content.toImage();
        },
        e => {
          console.error(e);
        }
      )
    );
  }

  httpPostTestRequest() {
    return from(
      request({
        url: config.url + "postData",
        method: "POST",
        headers: this.setHeaders(),
        content: JSON.stringify({
          email: "himanshu@gmail.com",
          password: "123456"
        })
      }).then(
        (response) => {
          const result = response.content.toJSON();

          return result;
        },
        (e) => {
          console.error(e);
        }
      )
    );
  }

  private setHeaders() {
    return {
      Authorization: "Bearer " + config.token,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*"
     // "Access-Control-Allow-Headers": "Authorization, Content-Type"
    };

  }

}
