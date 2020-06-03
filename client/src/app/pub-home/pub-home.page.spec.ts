import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PubHomePage } from './pub-home.page';

describe('PubHomePage', () => {
  let component: PubHomePage;
  let fixture: ComponentFixture<PubHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PubHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
