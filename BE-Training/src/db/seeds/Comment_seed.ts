import { ObjectId } from "mongodb";
import { faker } from "@faker-js/faker";
import { MIN_IMAGE, MAX_IMAGE } from "@/constant/Review_Constant";
import { IComment } from "@/types/Comment_Interface";

function getRandomImage(min: number, max: number) {
  const number_of_image = faker.number.int({ min: min, max: max });

  const images = faker.helpers.multiple(faker.image.avatar, {
    count: number_of_image,
  });
  return images;
}
export function createRandomComment(UserID: ObjectId): IComment {
  const CommentID = new ObjectId();
  return {
    _id: CommentID,
    user_id: UserID,
    comment: faker.company.name(),
    comment_lv1: [],
    comment_lv2: [],
    comment_lv3: [],
    images: getRandomImage(MIN_IMAGE, MAX_IMAGE),
  };
}
