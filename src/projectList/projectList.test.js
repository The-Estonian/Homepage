import { projectList } from './projectList';

describe('educationList data', () => {
  it('should contain 15 items', () => {
    expect(projectList).toHaveLength(15);
  });

  it('each item should have the expected properties', () => {
    projectList.forEach((item) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('img');
      expect(item).toHaveProperty('url');
      expect(item).toHaveProperty('description');
      expect(item).toHaveProperty('languages');
    });
  });

  it('each project item should have valid url', () => {
    projectList.forEach((item) => {
      const websiteUrl = new URL(item.url);
      expect(websiteUrl).toBeDefined();
    });
  });
});
