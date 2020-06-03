import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PubListPage } from './pub-list.page';

describe('PubListPage', () => {
  let component: PubListPage;
  let fixture: ComponentFixture<PubListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PubListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
