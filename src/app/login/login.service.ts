import { Injectable } from "@angular/core";
import { from } from "rxjs";
import { request } from "tns-core-modules/http";

import { config } from "../environments/env";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor() {}

  signnIn(data) {
    return from(
      request({
        url: config.url + "postData",
        method: "POST",
        headers: this.setHeaders(),
        content: JSON.stringify(data)
      }).then(
        response => {
          const result = response.content.toJSON();

          return result;
        },
        e => {
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
