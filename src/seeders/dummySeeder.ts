import 'reflect-metadata';
import { seedDummyData } from './seedDummyData';

(async () => {
  try {
    const result = await seedDummyData();
    console.log('✅ Seeding complete:', result);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
})();
