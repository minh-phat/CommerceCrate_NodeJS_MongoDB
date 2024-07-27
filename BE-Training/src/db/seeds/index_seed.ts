import { createRandomAddress } from "@/db/seeds/Address_Seed";
import { createRandomUser } from "@/db/seeds/user_seed";
import Address from "@/models/Addresses_Schema";
import Category from "@/models/Categories_Schema";
import ProductsModel from "@/models/Products_Schema";
import ShopsModel from "@/models/Shops_Schema";
import User from "@/models/Users_Schema";
import { createRandomCategories } from "./Categories_Seed";
import { createRandomProducts } from "./products_seed";
import { createRandomShops } from "./shops_seed";

export async function randomUser(number: number) {
	const userArr = await Promise.all(
		Array.from({ length: number }).map(async () => {
			return createRandomUser();
		})
	);
	const shopArr = await Promise.all(
		Array.from({ length: number }).map(async () => {
			return createRandomShops();
		})
	);
	const categoryArr = await Promise.all(
		Array.from({ length: number }).map(async () => {
			return createRandomCategories();
		})
	);

	const USERID = userArr.map((users) => users._id);
	const CategoriesID = categoryArr.map((category) => category._id);

	const addressArr = USERID.map((id) => createRandomAddress(id));
	const productArr: any[] = [];
	shopArr.map((shop) => {
		CategoriesID.forEach((category) => {
			const product = createRandomProducts(shop._id, category);
			productArr.push(product);
		});
	});

	await ShopsModel.insertMany(shopArr);
	await User.insertMany(userArr);
	await Address.insertMany(addressArr);
	await Category.insertMany(categoryArr);
	await ProductsModel.insertMany(productArr);
}
