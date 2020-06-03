import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PubMorePage } from './pub-more.page';

describe('PubMorePage', () => {
  let component: PubMorePage;
  let fixture: ComponentFixture<PubMorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubMorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PubMorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
