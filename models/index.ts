import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../db";
import { IUser } from "../types/IUser";
import { IItem } from '../types/IItem';
import { IItemInfo } from '../types/IItemInfo';
import { ICart } from '../types/ICart';
import { ICartItem } from "../types/ICartItem";

//TYPES

interface UserCreationAttributes extends Optional<IUser, "id"> { };

interface UserInstance
   extends Model<IUser, UserCreationAttributes>,
   IUser { }


interface ItemInstance
   extends Model,
   IItem { }

interface ItemInfoInstance
   extends Model,
   IItemInfo { }

interface CartInstance
   extends Model,
   ICart { }

interface CartItemInstance
   extends Model,
   ICartItem { }



// MODELS

export const User = sequelize.define<UserInstance>('user', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   email: { type: DataTypes.STRING, unique: true, allowNull: false },
   password: { type: DataTypes.STRING(999), allowNull: false },
   role: { type: DataTypes.STRING, defaultValue: 'USER' }
})

export const Cart = sequelize.define<CartInstance>('cart', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

export const CartItem = sequelize.define<CartItemInstance>('cart_item', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   total: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false },
})

export const Item = sequelize.define<ItemInstance>('item', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
   price: { type: DataTypes.INTEGER, allowNull: false },
   rating: { type: DataTypes.INTEGER, defaultValue: 0 },
   image: { type: DataTypes.STRING, allowNull: false },
})

export const Type = sequelize.define('type', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

export const Brand = sequelize.define('brand', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
   image: { type: DataTypes.STRING(300), allowNull: false }
})

export const Rating = sequelize.define('rating', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   rate: { type: DataTypes.INTEGER, allowNull: false },
})

export const ItemInfo = sequelize.define<ItemInfoInstance>('item_info', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   title: { type: DataTypes.STRING, allowNull: false },
   description: { type: DataTypes.STRING, allowNull: false },
})

export const TypeBrand = sequelize.define('type_brand', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

User.hasOne(Cart, {
   onDelete: 'CASCADE'
});
Cart.belongsTo(User);

Cart.hasMany(CartItem, {
   onDelete: 'CASCADE'
});
CartItem.belongsTo(Cart);

Type.hasMany(Item, {
   onDelete: 'CASCADE'
});
Item.belongsTo(Type);

Brand.hasMany(Item, {
   onDelete: 'CASCADE'
});
Item.belongsTo(Brand);

Item.hasMany(Rating, {
   onDelete: 'CASCADE'
});
Rating.belongsTo(Item);

Item.hasMany(ItemInfo, {
   onDelete: 'CASCADE'
});
ItemInfo.belongsTo(Item);

Item.hasMany(CartItem, {
   onDelete: 'CASCADE'
});
CartItem.belongsTo(Item);

Type.belongsToMany(Brand, {
   through: TypeBrand,
});
Brand.belongsToMany(Type, {
   through: TypeBrand,
});