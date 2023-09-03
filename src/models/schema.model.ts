import { DataTypes} from "sequelize";
import { sequelize} from "../config/db.config";

const Cart = sequelize.define('Cart', {
    id: {
        type : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total: {
        type: DataTypes.INTEGER
    }
});

const Coupon = sequelize.define('Coupon', {
   id: {
       type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4,
       primaryKey: true
   },
    name: {
       type: DataTypes.STRING,
        allowNull: false
    },
    discountType: {
        type: DataTypes.ENUM('FIXED10', 'PERCENT10', 'MIXED10', 'REJECTED10'),
        allowNull: false,
    },
});

// Association
Cart.hasMany(Coupon);
Coupon.belongsTo(Cart);

export { Cart, Coupon};
