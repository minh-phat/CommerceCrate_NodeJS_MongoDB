import ShopsModel from "@/models/Shops_Schema";
import { createRandomCategories } from "./Categories_Seed";
import { createRandomAddress, createRandomUser } from "./User_Seed";
import { createRandomProducts } from "./products_seed";
import { createRandomShops } from "./shops_seed";
import User from "@/models/Users_Schema";
import Address from "@/models/Addresses_Schema";
import Category from "@/models/Categories_Schema";
import ProductsModel from "@/models/Products_Schema";


export async function randomUser(number: number) {

    const userArr = await Promise.all(Array.from({ length: number }).map(async (_, idx) => {
        return await createRandomUser();
    }));
    const shopArr = await Promise.all(Array.from({ length: number }).map(async (_, idx) => {
        return await createRandomShops();
    }));
    const categoryArr = await Promise.all(Array.from({ length: number }).map(async (_, idx) => {
        return await createRandomCategories();
    }));


    const USERID = userArr.map(users => users._id)
    const CategoriesID = categoryArr.map(category => category._id)

    const addressArr = USERID.map(id => createRandomAddress(id));
    const productArr = [];
    shopArr.forEach(shop => {
        CategoriesID.forEach(category => {
            const product = createRandomProducts(shop._id, category);
            productArr.push(product);
        });
    });

    await ShopsModel.insertMany(shopArr)
    await User.insertMany(userArr);
    await Address.insertMany(addressArr);
    await Category.insertMany(categoryArr);
    await ProductsModel.insertMany(productArr)

}

