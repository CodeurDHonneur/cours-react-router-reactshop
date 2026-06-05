import { useNavigate, useParams } from "react-router-dom";

import products from "../data/products";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const product = products.find(
        (product) => product.id === Number(id)
    );
    const back = () => navigate(-1);

    if (!product) {
        return (
            <section className="container">
                Désolé, aucune correspondance trouvé pour l'ID : {id}
            </section>
        )
    }

    return (
       
            <section className="container">
            <button onClick={back}>
                Retour
            </button>

                <div>
                <h1>{product.name}</h1>

                <p>{product.description}</p>

                <h2>{product.price} €</h2>

                </div>
            </section>
       
    );
}

export default ProductDetails;