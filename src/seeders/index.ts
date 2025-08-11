import { seedRoles } from './roleSeeder';

export const runSeeders = async () => {
  try {
    await seedRoles();
    console.log('All seeders completed successfully');
  } catch (error) {
    console.error('Error running seeders:', error);
  }
};
