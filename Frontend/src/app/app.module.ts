import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './modules/shared/shared.module';
import { RichTextEditorModule,ToolbarService,HtmlEditorService,LinkService } from '@syncfusion/ej2-angular-richtexteditor';
import { registerLicense } from '@syncfusion/ej2-base';

//social login
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { EditLessonComponent } from './shared/edit-lesson/edit-lesson/edit-lesson.component';


@NgModule({
  declarations: [
    AppComponent,
    EditLessonComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    SocialLoginModule,
    RichTextEditorModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('911581706745198')
          }        
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    ToolbarService,
    HtmlEditorService,
    LinkService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    //full
    registerLicense('Mgo+DSMBaFt+QHFqUUdrXVNbdV5dVGpAd0N3RGlcdlR1fUUmHVdTRHRcQlhiSX5Qc01gWX1XcHc=;Mgo+DSMBPh8sVXJ1S0d+WFBPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXtSdkVgXHddcHdVQGM=;ORg4AjUWIQA/Gnt2VFhhQlVFfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5Wd0VjWnpWc3RWRGVf;MTk5MjA0M0AzMjMxMmUzMTJlMzQzMWdocnI1MXl5ZUJENnI4enJKT0RjdWtIcXp1UFJDNzJlNWw0dGs3aWd3L2M9;MTk5MjA0NEAzMjMxMmUzMTJlMzQzMUFXU1FYZnJ4eDE1REpLa01MYXF4dVgvSmREZ3k1SW9jYnJ3dm44QWxwY1k9;NRAiBiAaIQQuGjN/V0d+XU9Ad1RDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31Tc0RjWXxbeHdVQmBfUg==;MTk5MjA0NkAzMjMxMmUzMTJlMzQzMW1YdmppczNMNEhEVzZFamszdjhyd0pqOTBvQXl1TVhDT0lpcDNGY0xTeFk9;MTk5MjA0N0AzMjMxMmUzMTJlMzQzMU1iRWl1OW9sd0FTYzVrNjFWT1ZMay9SdGNRTEdPTmR6NGkycDcxUllzMTg9;Mgo+DSMBMAY9C3t2VFhhQlVFfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5Wd0VjWnpWc3RRTmJf;MTk5MjA0OUAzMjMxMmUzMTJlMzQzMUVaMERqUVZsL2VadGxwNitxbWNZcFRLU0tjTlFqVlVjeGpYRkZJcmg5aGM9;MTk5MjA1MEAzMjMxMmUzMTJlMzQzMUJpWEdlZjNEdEl0K0Fqakx3cGtxei8rYlNEbmp0ZW93UTBLVU44cWVNd009;MTk5MjA1MUAzMjMxMmUzMTJlMzQzMW1YdmppczNMNEhEVzZFamszdjhyd0pqOTBvQXl1TVhDT0lpcDNGY0xTeFk9');
   //7 day trial
    // registerLicense('MTkwNTg2MkAzMjMxMmUzMTJlMzMzNUxlMUgxaTEwU2dCVTdyZEp2cjJwZzc3Mk1KQVozTHV2TDJhYUYrS1R3cWs9;Mgo+DSMBaFt+QHFqVkNrWU5FdkBAXWFKblV8RWZTe1hgBShNYlxTR3ZaQl5jT35WckNmWnxY;Mgo+DSMBMAY9C3t2VFhhQlJBfVpdXGNWfFN0RnNfdV51flFAcC0sT3RfQF5jTH5QdkNjXHtYdXBTQA==;Mgo+DSMBPh8sVXJ1S0d+X1RPc0BDXXxLflF1VWVTf1t6cFNWESFaRnZdQV1mSX1TcEVmXXlbdX1T;MTkwNTg2NkAzMjMxMmUzMTJlMzMzNWp4K2RnUkd4bVJTTjlBMDVUeHNLTWJIdWZZK3V2QTd2SEZwMUxwNzNUQWs9;NRAiBiAaIQQuGjN/V0d+XU9Hc1RHQmJJYVF2R2BJeVRwcV9CZkwgOX1dQl9gSXtTdUVlWXpadnFcQmY=;ORg4AjUWIQA/Gnt2VFhhQlJBfVpdXGNWfFN0RnNfdV51flFAcC0sT3RfQF5jTH5QdkNjXHtYdnVVQA==;MTkwNTg2OUAzMjMxMmUzMTJlMzMzNWY3cHp2K1EzVndHeHA0aG8ySUFQeTBIM2h1V3BBNE1CVnljOXl6MXl5TmM9;MTkwNTg3MEAzMjMxMmUzMTJlMzMzNW1lK004VG5xUkd5WEdsZkUxVkVqWGJoRDJLRGxKdmJGTlNFZHNqSXZZUFU9;MTkwNTg3MUAzMjMxMmUzMTJlMzMzNVVaL1hDR1BJN0J3SFR3cGJhb0I4eitGQythaC80OVBWNUQ3ZGNvK1BKOEU9;MTkwNTg3MkAzMjMxMmUzMTJlMzMzNVlrTHNxOWxvTmpFNERZTVdSSG93OFgwa3FGaXBTTG5aaThnSGtOWVZJZTg9;MTkwNTg3M0AzMjMxMmUzMTJlMzMzNUxlMUgxaTEwU2dCVTdyZEp2cjJwZzc3Mk1KQVozTHV2TDJhYUYrS1R3cWs9');
    
  }
 }
