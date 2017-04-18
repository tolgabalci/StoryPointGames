import { StoryPointGamesPage } from './app.po';

describe('story-point-games App', () => {
  let page: StoryPointGamesPage;

  beforeEach(() => {
    page = new StoryPointGamesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
