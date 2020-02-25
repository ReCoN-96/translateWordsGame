import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { FormGroup, FormControl, Validators } from "@angular/forms"

@Component({
  selector: "app-translate-word",
  templateUrl: "./translate-word.component.html",
  styleUrls: ["./translate-word.component.scss"]
})
export class TranslateWordComponent {
  score: number = 10;
  wordToTranslate = "";
  wordTranslated = "";
  notAllowed = [];
  difficulty: number = 0;

  public nestedForm: FormGroup = new FormGroup({
    word: new FormControl("",[Validators.required, Validators.minLength(2)]),
  });

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getWord(this.difficulty)
    this.notAllowed.push(this.wordToTranslate)
  }

  // show the word to find
  getWord(difficulty){
    this.dataService.getWord(difficulty)
    .subscribe(data => {
        this.wordTranslated  = data['translatedWord'][0].translation;
        this.wordToTranslate = data['randomWord'];
      })
    }

  // try to find the word translated by user
  translateAndVerify() {
    if(this.nestedForm.value.word == this.wordTranslated) {
      this.score += 1
      this.difficulty != 2 ? this.difficulty += 1 : ''
    } else {
      this.score -= 1
      this.difficulty != 0 ? this.difficulty -= 1 : ''
    }
    this.nestedForm.reset()
    // Check if the word has already been submitted
    do {
      this.getWord(this.difficulty)
    }
    while (this.notAllowed.includes(this.wordToTranslate));
    this.notAllowed.push(this.wordToTranslate);
  }
}
