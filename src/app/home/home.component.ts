import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { TestService } from "../shared/test.service";
import { EventData, BindingOptions } from "tns-core-modules/ui/page/page";
import { fromObject } from "tns-core-modules/data/observable/observable";

// import { BindingOptions } from "ui/core/bindable";
import { Label } from "ui/label";
import { StackLayout } from "ui/layouts/stack-layout";
import { TextField } from "ui/text-field";
import { config } from "../environments/env";
// import { EventData, fromObject } from "data/observable";

@Component({
  selector: "Home",
  moduleId: module.id,
  templateUrl: "./home.component.html"
})

export class HomeComponent implements OnInit {
  response: any = "Response";
  testData: any = "Incoming Data";
  post = 0;

  textViewData: string = "hey this is text view";
  labelData: string = "hey this is labelfffff";
  textFieldData: string = "hey this is text field";

  constructor(private testService: TestService) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
    console.log("init home");
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  onPost() {
    console.log("called");
    this.post++;

    this.testService.httpPostTestRequest().subscribe((res) => {
        this.response = JSON.stringify(res);
        this.testData = res;
        config.token = res.success.token;
    });
  }

  onTap() {
    console.log("called");

    this.testService.httpGetTestRequest().subscribe((res) => {
        this.response = JSON.stringify(res);
        this.testData = res;
    });

    // console.log(this.testData);
  }

  onAlert() {
      const email = "himanshusingh@gmail.com";
      alert(`you are using: ${email}`);
  }

}

// Event handler for StackLayout "loaded" event attached in home-page.xml
export function onStackLayoutLoaded(args: EventData) {
    /*
    This gets a reference this page’s <StackLayout> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_layouts_stack_layout_.stacklayout
    */
    const stackLayout = <StackLayout>args.object;

    const source = fromObject({
        textSource: "Text set via twoWay binding"
    });

    // create the TextField
    const targetTextField = new TextField();
    stackLayout.addChild(targetTextField);

    // binding the TextField
    const textFieldBindingOptions: BindingOptions = {
        sourceProperty: "textSource",
        targetProperty: "text",
        twoWay: true
    };
    targetTextField.bind(textFieldBindingOptions, source);

    // create the Label
    const targetLabel = new Label();
    stackLayout.addChild(targetLabel);

    // binding the Label
    const labelBindingOptions: BindingOptions = {
        sourceProperty: "textSource",
        targetProperty: "text",
        twoWay: false
    };
    targetLabel.bind(labelBindingOptions, source);
}
