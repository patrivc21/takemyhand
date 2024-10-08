
import { LOCALE_ID, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
import { FormsModule } from '@angular/forms'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { DatePipe } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';
import { HttInterceptor } from './interceptors/http.interceptor';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { MessageService } from 'primeng/api';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ChatsModule } from './pages/chats/chats.module';
import { DialogModule } from 'primeng/dialog';
import { FooterComponent } from './components/footer/footer.component';

registerLocaleData(localeEs, 'es-ES');


export function HttpLoaderFactory (http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http)
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    // NavigationComponent,
    FooterComponent,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    DialogModule,
    ChatsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-ES'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttInterceptor,
      multi: true
    },
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}