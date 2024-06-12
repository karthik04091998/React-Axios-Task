import PropTypes from "prop-types";
import styles from "./Product.module.css";

const Product = ({
    name,
    phno,
    username,
    id,
    removeProduct,
    loadEditProd,
}) => {
    return (
        <div className={styles.container}>
            <h2>Name :{name}</h2>
            <h3>UserName: {username}</h3>
            <h4>PhoneNo: {phno}</h4>
            <button onClick={() => removeProduct(id)}>delete</button>{" "}
            <button onClick={() => loadEditProd(id)}>edit</button>
        </div>
    );
};

Product.propTypes = {
    name: PropTypes.string,
    phno: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    image: PropTypes.string,
    username: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    id: PropTypes.string,
    removeProduct: PropTypes.func,
    loadEditProd: PropTypes.func,
};

export default Product;