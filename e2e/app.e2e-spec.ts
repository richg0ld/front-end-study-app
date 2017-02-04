import { FrontEndStudyAppPage } from './app.po';

describe('front-end-study-app App', function() {
  let page: FrontEndStudyAppPage;

  beforeEach(() => {
    page = new FrontEndStudyAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
