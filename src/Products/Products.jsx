import { useState } from "react";
import styles from "./Products.module.css";
import { useEffect } from "react";
import Product from "../Product/Product";

import {
    createProduct,
    deleteProduct,
    getAllItems,
    getProduct,
    updateProduct,
} from "../apis-axios";

const initialFormState = {
    name: "",
    username: "",
    phno: "",
};

const Products = () => {
    const [prods, setProds] = useState([]);

    const [formOpen, setFromOpen] = useState(false);

    const [formState, setFromState] = useState(initialFormState);

    const [editId, setEditId] = useState(null);

    const handleForm = () => {
        if (formOpen) {
            setFromOpen(false);
        } else {
            setFromOpen(true);
        }
    };

    const loadEditProd = async (itemId) => {
        setEditId(itemId);

        const item = await getProduct(itemId);

        setFromState(item);
        handleForm();
    };
    const loadProds = async () => {

        const data = await getAllItems();

        setProds(data);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;

        setFromState({
            ...formState,
            [name]: value,
        });
    };

    const createNewProd = async () => {
        const newProd = await createProduct(formState);

        setProds([...prods, newProd]);
    };

    const editProduct = async () => {
        const newProduct = await updateProduct(formState, editId);

        const index = prods.findIndex((pd) => pd.id === editId);

        const tempProds = [...prods];

        tempProds[index] = newProduct;

        setProds(tempProds);

        setEditId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            editProduct();
        } else {
            createNewProd();
        }
        handleForm();
        setFromState(initialFormState);
    };

    const removeProduct = async (itemId) => {
        await deleteProduct(itemId);

        setProds(prods.filter((pd) => pd.id !== itemId));
    };

    useEffect(() => {
        loadProds();
    }, []);

    return (
        <div className={styles.container}>
            <button className={styles["add-close-btn"]} onClick={handleForm}>
                +
            </button>
            {prods.map((pd) => (
                <Product
                    {...pd}
                    key={pd.id}
                    removeProduct={removeProduct}
                    loadEditProd={loadEditProd}
                />
            ))}
            {formOpen && (
                <div className={styles.overlay}>
                    <button className={styles["add-close-btn"]} onClick={handleForm}>
                        X
                    </button>
                    <form onSubmit={handleSubmit}>
                        <input
                            placeholder="name"
                            type="text"
                            name="name"
                            value={formState.title}
                            onChange={handleFormChange}
                        />
                        <input
                            placeholder="UserName"
                            type="text"
                            name="UserName"
                            value={formState.price}
                            onChange={handleFormChange}
                        />
                        <input
                            placeholder="Phno"
                            type="number"
                            name="phno"
                            value={formState.qty}
                            onChange={handleFormChange}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Products;