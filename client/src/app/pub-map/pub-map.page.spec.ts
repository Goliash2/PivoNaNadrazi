import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PubMapPage } from './pub-map.page';

describe('PubMapPage', () => {
  let component: PubMapPage;
  let fixture: ComponentFixture<PubMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PubMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
