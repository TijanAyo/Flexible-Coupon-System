import { DataTypes} from "sequelize";
import { sequelize} from "../config/db.config";

const Cart= sequelize.define('Cart', {
    id: {
        type : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    cart_owner: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total: {
        type: DataTypes.INTEGER
    }
});

const Item = sequelize.define('Item', {
    id: {
        type : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

const Coupon = sequelize.define('Coupon', {
   id: {
       type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4,
       primaryKey: true
   },
    coupon_name: {
       type: DataTypes.STRING,
        allowNull: false
    },
    discount_type: {
        type: DataTypes.ENUM('FIXED10', 'PERCENT10', 'MIXED10', 'REJECTED10'),
        allowNull: false,
    },
});

// Association
Cart.hasMany(Item, {
    foreignKey: {
        allowNull: false
    }
})
Item.belongsTo(Cart);
Coupon.belongsTo(Cart);

export { Cart, Item, Coupon };
