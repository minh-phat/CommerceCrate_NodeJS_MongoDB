import { ObjectId } from "mongodb";
import { faker } from "@faker-js/faker";

import { IReview } from "@/types/Review_Interface";
import { MIN_IMAGE, MAX_IMAGE } from "@/constant/Review_Constant";
import { createRandomComment } from "./Comment_seed";

function getRandomImage(min: number, max: number) {
  const number_of_image = faker.number.int({ min: min, max: max });

  const images = faker.helpers.multiple(faker.image.avatar, {
    count: number_of_image,
  });
  return images;
}
export function createRandomReview(
  userID: ObjectId,
  productID: ObjectId
): IReview {
  const review_id = new ObjectId();
  const comment = createRandomComment(userID)._id;
  return {
    _id: review_id,
    user_id: userID,
    product_id: productID,
    comment: faker.company.name(),
    images: getRandomImage(MIN_IMAGE, MAX_IMAGE),
    comments_id: [comment],
    startRating: faker.number.int({ min: 1, max: 5 }),
  };
}
