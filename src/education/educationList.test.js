import { educationList } from './educationList';
import k_j_cert from './k-j-cert.pdf';
import bcs_cert from './bcs_cert.pdf';

describe('educationList data', () => {
  it('should contain 8 items', () => {
    expect(educationList).toHaveLength(8);
  });

  it('each item should have the expected properties', () => {
    educationList.forEach((item) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('date');
      expect(item).toHaveProperty('duration');
      expect(item).toHaveProperty('desc');
      expect(item).toHaveProperty('website');
      expect(item).toHaveProperty('cert');
    });
  });

  it('should have valid URLs for website and cert fields', () => {
    educationList.forEach((item) => {
      const websiteUrl = new URL(item.website);
      expect(websiteUrl).toBeDefined();

      if (item.cert) {
        if (item.cert.startsWith('http')) {
          try {
            const certUrl = new URL(item.cert);
            expect(certUrl).toBeDefined();
          } catch (e) {
            expect(true).toBeFalsy();
          }
        } else {
          if (item.cert === k_j_cert) {
            expect(item.cert).toBe(k_j_cert);
          } else if (item.cert === bcs_cert) {
            expect(item.cert).toBe(bcs_cert);
          }
        }
      }
    });
  });
});
