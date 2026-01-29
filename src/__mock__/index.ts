import { faker } from "@faker-js/faker";

import type { EmploymentType, ProviderType, ReviewProps, ReviewUserProps } from "@/types";

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (max: number) => Math.max(1, Math.round(Math.random() * max));

export const MOCK_REVIEWERS: ReviewUserProps[] = Array.from({ length: 18 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  image: faker.image.urlPicsumPhotos(),
  role: faker.person.jobTitle(),
}));

export const MOCK_REVIEWS: ReviewProps[] = Array.from({ length: 5 }, () => ({
  comment: faker.lorem.paragraphs(getRandomNumber(4)),
  createdAt: new Date(),
  id: faker.string.uuid(),
  rating: getRandomNumber(5),
  reviewer: getRandomItem(MOCK_REVIEWERS),
}));
