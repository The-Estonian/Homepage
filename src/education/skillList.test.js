import { skillList } from './skillList';

describe('educationList data', () => {
  it('should contain 13 items', () => {
    expect(skillList).toHaveLength(13);
  });

  it('each item should have the expected properties', () => {
    skillList.forEach((item) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('skill');
    });
  });
});
