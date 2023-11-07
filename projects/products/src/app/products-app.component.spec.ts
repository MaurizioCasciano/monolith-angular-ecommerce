import { TestBed } from '@angular/core/testing';
import { ProductsAppComponent } from './products-app.component';

describe('ProductsAppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ProductsAppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ProductsAppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'products' title`, () => {
    const fixture = TestBed.createComponent(ProductsAppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('products');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ProductsAppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('products app is running!');
  });
});
