import { faker } from "@faker-js/faker";
import { addDays } from "date-fns";

import type { EmploymentType, JobProps, ProviderType, UserProps } from "@/types";

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (max: number) => Math.round(Math.random() * max);

const MOCK_PROVIDERS: ProviderType[] = ["EMAIL", "GITHUB", "GOOGLE"];
const MOCK_EMPLOYMENT_TYPES: EmploymentType[] = ["CONTRACT", "FULL_TIME", "INTERNSHIP", "PART_TIME", "TEMPORARY"];

export const MOCK_USERS: UserProps[] = Array.from({ length: 18 }, () => ({
  created_at: new Date(),
  email: faker.internet.email(),
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  is_admin: false,
  is_premium: faker.datatype.boolean(),
  is_recruiter: true,
  provider: getRandomItem(MOCK_PROVIDERS),
  headline: faker.lorem.sentences(getRandomNumber(3)),
  summary: faker.lorem.paragraphs(getRandomNumber(3)),
  updated_at: new Date(),
  username: faker.person.firstName(),
  verified: true,
}));

export const MOCK_JOBS: JobProps[] = Array.from({ length: 30 }, () => ({
  applications: [],
  comments: [],
  company: faker.company.name(),
  created_at: new Date(),
  created_by: getRandomItem(MOCK_USERS),
  deadline: addDays(new Date(), getRandomNumber(10)),
  deleted_at: null,
  description: faker.lorem.paragraphs(getRandomNumber(5)),
  employment_type: getRandomItem(MOCK_EMPLOYMENT_TYPES),
  id: faker.string.uuid(),
  is_remote: faker.datatype.boolean(),
  location: faker.location.city(),
  posted_date: new Date(),
  reactions: [],
  requirements: [],
  title: faker.lorem.words({ max: 4, min: 2 }),
  updated_at: new Date(),
  salary: {
    currency: "USD",
    max: getRandomNumber(10000),
    min: getRandomNumber(5000),
  },
}));
