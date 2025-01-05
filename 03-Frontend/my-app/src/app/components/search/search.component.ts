import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

  doSearch(value: string): void {
    this.router.navigateByUrl(`/search/${value}`); // Use backticks for template literals
  }
}

