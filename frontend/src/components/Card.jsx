import { Link } from "react-router-dom";
import React from "react";

const Card = ({ article, isAdmin, isBasic }) => {
    const { model, image, price } = article;
    return (
        <div className="card bg-base-100 shadow-xl pr-5">
            <figure>
                <img src={image} alt={model} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{model}</h2>
                <p className="text-lg font-semibold">${price}</p>
                <Link
                    to="/articles/article"
                    state={{ articleId: article.id, isAdmin: isAdmin, isBasic: isBasic }}
                    className="btn btn-outline btn-info mt-4">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default Card;
