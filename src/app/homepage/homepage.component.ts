import { Component, OnInit, ChangeDetectorRef, OnDestroy, inject} from '@angular/core';
import { AppService } from '../app.service';
import { Observable, Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarAction,MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef} from '@angular/material/snack-bar';

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {
  
  isDarkMode$!: Observable<boolean>;
  darkModeSubscription!: Subscription;
  defaultLanguage: string = 'en';
  defaultOutLanguage: string = 'fil';
  inputText: string = '';
  translatedText: string = '';
  errorMessage: string = '';
  durationInSeconds = 5;

  constructor(
    private themeService: AppService, 
    private cdr: ChangeDetectorRef,
    private translationService: AppService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.isDarkMode$ = this.themeService.darkMode$;
    this.darkModeSubscription = this.isDarkMode$.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
  }

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }

  Languages: Category[] = [
    { value: 'af', viewValue: 'Afrikaans' },
    { value: 'sq', viewValue: 'Albanian' },
    { value: 'am', viewValue: 'Amhari' },
    { value: 'ar', viewValue: 'Arabic' },
    { value: 'hy', viewValue: 'Armenian' },
    { value: 'as', viewValue: 'Assamese' },
    { value: 'ay', viewValue: 'Aymara' },
    { value: 'az', viewValue: 'Azerbaijani' },
    { value: 'bm', viewValue: 'Bambara' },
    { value: 'eu', viewValue: 'Basque' },
    { value: 'be', viewValue: 'Belarusian' },
    { value: 'bn', viewValue: 'Bengali' },
    { value: 'bho', viewValue: 'Bhojpuri' },
    { value: 'bs', viewValue: 'Bosnian' },
    { value: 'bg', viewValue: 'Bulgarian' },
    { value: 'ca', viewValue: 'Catalan' },
    { value: 'ceb', viewValue: 'Cebuano' },
    { value: 'zh-CN', viewValue: 'Chinese (Simplified)' },
    { value: 'zh-TW', viewValue: 'Chinese (Traditional)' },
    { value: 'co', viewValue: 'Corsican' },
    { value: 'hr', viewValue: 'Croatian' },
    { value: 'cs', viewValue: 'Czech' },
    { value: 'da', viewValue: 'Danish' },
    { value: 'dv', viewValue: 'Dhivehi' },
    { value: 'doi', viewValue: 'Dogri' },
    { value: 'nl', viewValue: 'Dutch' },
    { value: 'en', viewValue: 'English' },
    { value: 'eo', viewValue: 'Esperanto' },
    { value: 'et', viewValue: 'Estonian' },
    { value: 'ee', viewValue: 'Ewe' },
    { value: 'fil', viewValue: 'Filipino' },
    { value: 'fy', viewValue: 'Finnish' },
    { value: 'fr', viewValue: 'French' },
    { value: 'fy', viewValue: 'Frisian' },
    { value: 'gl', viewValue: 'Galician' },
    { value: 'ka', viewValue: 'Georgian' },
    { value: 'de', viewValue: 'German' },
    { value: 'el', viewValue: 'Greek' },
    { value: 'gn', viewValue: 'Guarani' },
    { value: 'gu', viewValue: 'Gujarati' },
    { value: 'ht', viewValue: 'Haitian Creole' },
    { value: 'ha', viewValue: 'Hausa' },
    { value: 'haw', viewValue: 'Hawaiian' },
    { value: 'he', viewValue: 'Hebrew' },
    { value: 'hi', viewValue: 'Hindi' },
    { value: 'hmn', viewValue: 'Hmong' },
    { value: 'hu', viewValue: 'Hungarian' },
    { value: 'is', viewValue: 'Icelandic' },
    { value: 'ig', viewValue: 'Igbo' },
    { value: 'ilo', viewValue: 'Ilocano' },
    { value: 'id', viewValue: 'Indonesian' },
    { value: 'ga', viewValue: 'Irish' },
    { value: 'it', viewValue: 'Italian' },
    { value: 'ja', viewValue: 'Japanese' },
    { value: 'jv', viewValue: 'Javanese' },
    { value: 'kn', viewValue: 'Kannada' },
    { value: 'kk', viewValue: 'Kazakh' },
    { value: 'km', viewValue: 'Khmer' },
    { value: 'rw', viewValue: 'Kinyarwanda' },
    { value: 'gom', viewValue: 'Konkani' },
    { value: 'ko', viewValue: 'Korean' },
    { value: 'kri', viewValue: 'Krio' },
    { value: 'ku', viewValue: 'Kurdish' },
    { value: 'ckb', viewValue: 'Kurdish (Sorani)' },
    { value: 'ky', viewValue: 'Kyrgyz' },
    { value: 'lo', viewValue: 'Lao' },
    { value: 'la', viewValue: 'Latin' },
    { value: 'lv', viewValue: 'Latvian' },
    { value: 'ln', viewValue: 'Lingala' },
    { value: 'lt', viewValue: 'Lithuanian' },
    { value: 'lg', viewValue: 'Luganda' },
    { value: 'lb', viewValue: 'Luxembourgish' },
    { value: 'mk', viewValue: 'Macedonian' },
    { value: 'mai', viewValue: 'Maithili' },
    { value: 'mg', viewValue: 'Malagasy' },
    { value: 'ms', viewValue: 'Malay' },
    { value: 'ml', viewValue: 'Malayalam' },
    { value: 'mt', viewValue: 'Maltese' },
    { value: 'mi', viewValue: 'Maori' },
    { value: 'mr', viewValue: 'Marathi' },
    { value: 'mni-Mtei', viewValue: 'Meiteilon (Manipuri)' },
    { value: 'lus', viewValue: 'Mizo' },
    { value: 'mn', viewValue: 'Mongolian' },
    { value: 'my', viewValue: 'Myanmar (Burmese)' },
    { value: 'ne', viewValue: 'Nepali' },
    { value: 'no', viewValue: 'Norwegian' },
    { value: 'ny', viewValue: 'Nyanja (Chichewa)' },
    { value: 'or', viewValue: 'Odia (Oriya)' },
    { value: 'om', viewValue: 'Oromo' },
    { value: 'ps', viewValue: 'Pashto' },
    { value: 'fa', viewValue: 'Persian' },
    { value: 'pl', viewValue: 'Polish' },
    { value: 'pt', viewValue: 'Portuguese (Portugal, Brazil)' },
    { value: 'pa', viewValue: 'Punjabi' },
    { value: 'qu', viewValue: 'Quechua' },
    { value: 'ro', viewValue: 'Romanian' },
    { value: 'ru', viewValue: 'Russian' },
    { value: 'sm', viewValue: 'Samoan' },
    { value: 'sa', viewValue: 'Sanskrit' },
    { value: 'gd', viewValue: 'Scots Gaelic' },
    { value: 'nso', viewValue: 'Sepedi' },
    { value: 'sr', viewValue: 'Serbian' },
    { value: 'st', viewValue: 'Sesotho' },
    { value: 'sn', viewValue: 'Shona' },
    { value: 'sd', viewValue: 'Sindhi' },
    { value: 'si', viewValue: 'Sinhala (Sinhalese)' },
    { value: 'sk', viewValue: 'Slovak' },
    { value: 'sl', viewValue: 'Slovenian' },
    { value: 'so', viewValue: 'Somali' },
    { value: 'es', viewValue: 'Spanish' },
    { value: 'su', viewValue: 'Sundanese' },
    { value: 'sw', viewValue: 'Swahili' },
    { value: 'sv', viewValue: 'Swedish' },
    { value: 'tl', viewValue: 'Tagalog' },
    { value: 'tg', viewValue: 'Tajik' },
    { value: 'ta', viewValue: 'Tamil' },
    { value: 'tt', viewValue: 'Tatar' },
    { value: 'te', viewValue: 'Telugu' },
    { value: 'th', viewValue: 'Thai' },
    { value: 'ti', viewValue: 'Tigrinya' },
    { value: 'ts', viewValue: 'Tsonga' },
    { value: 'tr', viewValue: 'Turkish' },
    { value: 'tk', viewValue: 'Turkmen' },
    { value: 'ak', viewValue: 'Twi (Akan)' },
    { value: 'uk', viewValue: 'Ukrainian' },
    { value: 'ur', viewValue: 'Urdu' },
    { value: 'ug', viewValue: 'Uyghur' },
    { value: 'uz', viewValue: 'Uzbek' },
    { value: 'vi', viewValue: 'Vietnamese' },
    { value: 'cy', viewValue: 'Welsh' },
    { value: 'xh', viewValue: 'Xhosa' },
    { value: 'yi', viewValue: 'Yiddish' },
    { value: 'yo', viewValue: 'Yoruba' },
    { value: 'zu', viewValue: 'Zulu' },
  ];  

  swapLanguages() {
    const temp = this.defaultLanguage;
    this.defaultLanguage = this.defaultOutLanguage;
    this.defaultOutLanguage = temp;
  }

  translateText() {
    this.errorMessage = ''; // Reset the error message
    if (!this.inputText.trim()) {
      this._snackBar.openFromComponent(NotificationComponent, {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }
    this.translationService.translate(this.inputText, this.defaultOutLanguage).subscribe(
      response => {
        this.translatedText = response.data.translations[0].translatedText;
      },
      error => {
        console.error('Error translating text', error);
      }
    );
  }
  
}

@Component({
  selector: 'notification',
  templateUrl: 'notification.html',
  styles: `
    :host {
      display: flex;
    }

    .notification {
      color: white;
      font-family: "Orbitron", sans-serif;
    }
  `,
  standalone: true,
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
})
export class NotificationComponent {
  snackBarRef = inject(MatSnackBarRef);
}